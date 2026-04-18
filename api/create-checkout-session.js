/**
 * Vercel Serverless: create Stripe Checkout Session (hosted).
 */
import Stripe from 'stripe';
import { getClientIp, limitCheckoutSession } from './lib/rate-limit.js';

function siteOrigin() {
  const site = process.env.SITE_URL?.trim();
  if (site) return site.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  return 'http://localhost:5173';
}

function hostMatchesSite(originHeader, siteBase) {
  try {
    const o = new URL(originHeader).hostname.replace(/^www\./, '');
    const s = new URL(siteBase.startsWith('http') ? siteBase : `https://${siteBase}`).hostname.replace(/^www\./, '');
    return o === s;
  } catch {
    return false;
  }
}

/** Limits browser cross-origin abuse: only your site (or local dev) may call this API from JS. */
function setCors(req, res) {
  const site = process.env.SITE_URL?.trim().replace(/\/$/, '');
  const origin = req.headers.origin;

  if (!origin) {
    return;
  }

  let allowed = false;
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    allowed = true;
  } else if (site && hostMatchesSite(origin, site)) {
    allowed = true;
  } else if (process.env.VERCEL_URL) {
    const previewBase = `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`;
    if (hostMatchesSite(origin, previewBase)) {
      allowed = true;
    }
  } else if (!site && process.env.VERCEL_ENV !== 'production') {
    allowed = true;
  }

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
}

export default async function handler(req, res) {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  const { success: withinLimit, reset } = await limitCheckoutSession(`checkout:${ip}`);
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

  const stripe = new Stripe(secret);

  try {
    const { amount, donorInfo = {} } = req.body || {};

    if (amount == null || Number(amount) < 1 || Number(amount) > 100000) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    const origin = siteOrigin();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Driverse Foundation Donation',
              description:
                'Thank you for supporting driver safety, health, and wellness programs.',
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
      metadata: {
        donor_name: donorInfo.name || 'Anonymous',
        donor_email: donorInfo.email || 'Not provided',
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const isProd = process.env.VERCEL_ENV === 'production';
    return res.status(500).json({
      error: 'Failed to create checkout session',
      ...(isProd ? {} : { message: error.message }),
    });
  }
}
