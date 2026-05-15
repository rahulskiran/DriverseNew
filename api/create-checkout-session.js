import Stripe from 'stripe';

// ─── In-Memory Rate Limiter ───────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per IP per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// ─── reCAPTCHA Verification ───────────────────────────────────────────
async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET_KEY) return true; // Skip if not configured
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

// ─── Amount Validation (Server-Side) ──────────────────────────────────
const DONATION_MIN = 1;
const DONATION_MAX = 25000;

function validateAmount(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num) || !isFinite(num)) return { valid: false, error: 'Invalid amount.' };
  if (num < DONATION_MIN) return { valid: false, error: `Minimum donation is $${DONATION_MIN}.` };
  if (num > DONATION_MAX) return { valid: false, error: `Maximum donation is $${DONATION_MAX.toLocaleString()}.` };
  return { valid: true, sanitized: Math.round(num * 100) / 100 };
}

// ─── Main Handler ─────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // CORS headers
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { amount, recaptchaToken, honeypot } = req.body || {};

    // Honeypot check — if filled, it's a bot
    if (honeypot) {
      // Silently succeed to not reveal detection
      return res.status(200).json({ url: '#' });
    }

    // reCAPTCHA verification
    if (process.env.RECAPTCHA_SECRET_KEY && !await verifyRecaptcha(recaptchaToken)) {
      return res.status(403).json({ error: 'Security verification failed. Please try again.' });
    }

    // Validate amount
    const validation = validateAmount(amount);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Create Stripe Checkout Session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Driverse Foundation',
              description: `Your $${validation.sanitized} donation supports truck driver health, safety, and wellness programs.`,
            },
            unit_amount: Math.round(validation.sanitized * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${allowedOrigin}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${allowedOrigin}/donation-cancel`,
      metadata: {
        source: 'driverse_website',
        ip: clientIp,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    // Don't leak internal errors to clients
    const isStripeError = err?.type?.startsWith('Stripe');
    return res.status(isStripeError ? 400 : 500).json({
      error: isStripeError
        ? 'Payment service error. Please try again.'
        : 'An unexpected error occurred. Please try again later.',
    });
  }
}
