/**
 * Vercel Serverless: Stripe webhooks.
 *
 * - Raw body required for signature verification.
 * - Stripe API version is pinned.
 * - event.id would be deduped through claimEvent(); deduplication is currently
 *   disabled (see api/lib/idempotency.js). Re-enable before adding side effects
 *   that are not idempotent on the receiving end.
 * - Paid checkout sessions are forwarded to api/lib/donation-store.js, which
 *   always logs and optionally POSTs to DONATIONS_WEBHOOK_URL.
 */
import { buffer } from 'micro';
import Stripe from 'stripe';
import { claimEvent } from './lib/idempotency.js';
import { recordDonation } from './lib/donation-store.js';

const STRIPE_API_VERSION = '2024-06-20';

export const config = {
  api: {
    bodyParser: false,
  },
};

function isProd() {
  return process.env.VERCEL_ENV === 'production';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set — refusing webhook');
    return res.status(503).json({ error: 'Webhook not configured' });
  }

  const stripe = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });

  let payload;
  try {
    payload = (await buffer(req)).toString('utf8');
  } catch (err) {
    console.error('Webhook body read error:', err);
    return res.status(400).json({ error: 'Failed to read body' });
  }

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const claim = await claimEvent(event.id);
  if (claim.unavailable) {
    if (isProd()) {
      console.error(
        'Idempotency store unavailable — refusing event to avoid double processing'
      );
      return res.status(503).json({ error: 'Idempotency store unavailable' });
    }
    console.warn('Idempotency store unavailable (dev/preview, processing once)');
  } else if (!claim.firstSeen) {
    return res.status(200).json({ received: true, deduped: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const sessionRef = event.data.object;
        // Re-fetch from Stripe to avoid trusting any field on the event payload
        // for money-affecting decisions.
        const session = await stripe.checkout.sessions.retrieve(sessionRef.id);
        if (session.payment_status === 'paid') {
          await recordDonation(session, event.id);
        } else {
          console.log('Session completed but not paid:', session.id, session.payment_status);
        }
        break;
      }
      case 'checkout.session.async_payment_failed': {
        console.error('Async payment failed:', event.data.object.id);
        break;
      }
      case 'charge.refunded':
      case 'charge.dispute.created': {
        console.warn(`Stripe event needing attention: ${event.type}`, event.data.object.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
