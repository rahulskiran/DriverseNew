/**
 * Vercel Serverless: GET /api/checkout-session?id=cs_...
 *
 * Returns ONLY the safe fields needed by the success page, after re-fetching
 * the session directly from Stripe. Never trust the URL session_id alone.
 */
import Stripe from 'stripe';
import { applyCors } from './lib/cors.js';
import { getClientIp, limitVerify, isProd } from './lib/rate-limit.js';
import { validateSessionId } from './lib/validate.js';

const STRIPE_API_VERSION = '2024-06-20';

export default async function handler(req, res) {
  const cors = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(cors.allowed ? 204 : 403).end();
  }
  if (!cors.allowed) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  let withinLimit = true;
  let reset;
  try {
    const rl = await limitVerify(`verify:${ip}`);
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
    return res.status(429).json({ error: 'Too many requests' });
  }

  const idCheck = validateSessionId(req.query?.id);
  if (!idCheck.ok) return res.status(400).json({ error: idCheck.error });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const stripe = new Stripe(secret.trim(), { apiVersion: STRIPE_API_VERSION });
    const session = await stripe.checkout.sessions.retrieve(idCheck.value);
    const paid = session.payment_status === 'paid';
    return res.status(200).json({
      paid,
      amountTotal: paid ? session.amount_total : null,
      currency: paid ? session.currency : null,
    });
  } catch (err) {
    if (err && err.statusCode === 404) {
      return res.status(404).json({ error: 'Session not found' });
    }
    console.error('Stripe retrieve error:', err);
    return res.status(500).json({ error: 'Failed to verify session' });
  }
}
