// ─── In-Memory Rate Limiter ───────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 subscribe requests per IP per minute

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
  if (!process.env.RECAPTCHA_SECRET_KEY) return true;
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

// ─── Email Validation (Server-Side) ───────────────────────────────────
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(trimmed) && trimmed.length <= 254;
}

// ─── Main Handler ─────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // CORS
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
    const { email, recaptchaToken, honeypot } = req.body || {};

    // Honeypot check
    if (honeypot) {
      return res.status(200).json({ success: true });
    }

    // reCAPTCHA verification
    if (process.env.RECAPTCHA_SECRET_KEY && !await verifyRecaptcha(recaptchaToken)) {
      return res.status(403).json({ error: 'Security verification failed.' });
    }

    // Email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // ─── Store the subscription ───────────────────────────────
    // In production, integrate with your email service:
    //
    // Mailchimp example:
    //   await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //     email_address: sanitizedEmail,
    //     status: 'subscribed',
    //   });
    //
    // SendGrid example:
    //   await sgClient.request({
    //     method: 'PUT',
    //     url: '/v3/marketing/contacts',
    //     body: { contacts: [{ email: sanitizedEmail }] },
    //   });
    //
    // For now, log it (replace with your preferred service):
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 New newsletter subscription:', sanitizedEmail);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  } catch {
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
