/**
 * Vercel Serverless: create Stripe Checkout Session (hosted).
 *
 * Hardening:
 *  - Strict CORS allow-list (fail closed).
 *  - Cloudflare Turnstile bot check (required in production).
 *  - Rate limit by trusted IP, fails closed in production.
 *  - Strict body schema validation.
 *  - Stripe API version pinned + Idempotency-Key per request.
 *  - Donor email passed as customer_email (Stripe owns the field).
 */
import Stripe from 'stripe';
import { applyCors } from './lib/cors.js';
import { getClientIp, limitCheckoutSession, isProd } from './lib/rate-limit.js';
import { verifyTurnstile } from './lib/turnstile.js';
import {
  validateAmount,
  validateDonorInfo,
  validateIdempotencyKey,
  validateTurnstileToken,
} from './lib/validate.js';

const STRIPE_API_VERSION = '2024-06-20';

function siteOrigin() {
  const site = process.env.SITE_URL?.trim();
  if (site) return site.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  return 'http://localhost:5173';
}

export default async function handler(req, res) {
  const cors = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(cors.allowed ? 204 : 403).end();
  }
  if (!cors.allowed) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  let withinLimit = true;
  let reset;
  try {
    const rl = await limitCheckoutSession(`checkout:${ip}`);
    withinLimit = rl.success;
    reset = rl.reset;
  } catch (err) {
    if (isProd()) {
      console.error('Rate limit unavailable in production (failing closed):', err);
      return res.status(503).json({ error: 'Service temporarily unavailable' });
    }
    console.warn('Rate limit unavailable (dev/preview, allowing):', err);
  }
  if (!withinLimit) {
    const retrySec = reset ? Math.max(1, Math.ceil((reset - Date.now()) / 1000)) : 60;
    res.setHeader('Retry-After', String(retrySec));
    return res.status(429).json({
      error: 'Too many donation attempts. Please wait a moment and try again.',
    });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment configuration error' });
  }

  const body = req.body || {};
  const amountCheck = validateAmount(body.amount);
  if (!amountCheck.ok) return res.status(400).json({ error: amountCheck.error });

  const donorCheck = validateDonorInfo(body.donorInfo);
  if (!donorCheck.ok) return res.status(400).json({ error: donorCheck.error });

  const idempCheck = validateIdempotencyKey(body.idempotencyKey);
  if (!idempCheck.ok) return res.status(400).json({ error: idempCheck.error });

  const turnstileCheck = validateTurnstileToken(body.turnstileToken);
  if (!turnstileCheck.ok) return res.status(400).json({ error: turnstileCheck.error });

  const tsResult = await verifyTurnstile(turnstileCheck.value, ip);
  if (!tsResult.success) {
    return res.status(403).json({ error: 'Bot check failed. Please try again.' });
  }

  try {
    const stripe = new Stripe(secret.trim(), { apiVersion: STRIPE_API_VERSION });

    const origin = siteOrigin();
    const sessionParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      submit_type: 'donate',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Driverse Foundation Donation',
              description:
                'Thank you for supporting driver safety, health, and wellness programs.',
            },
            unit_amount: amountCheck.amountMinor,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
      metadata: {
        donor_name: donorCheck.value.name || 'Anonymous',
      },
    };

    if (donorCheck.value.email) {
      sessionParams.customer_email = donorCheck.value.email;
    }

    const requestOptions = idempCheck.value
      ? { idempotencyKey: `checkout:${idempCheck.value}` }
      : {};

    const session = await stripe.checkout.sessions.create(sessionParams, requestOptions);

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
