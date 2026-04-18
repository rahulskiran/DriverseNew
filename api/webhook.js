/**
 * Vercel Serverless: Stripe webhooks (raw body required for signature).
 */
import { buffer } from 'micro';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const stripe = new Stripe(secretKey);

  let payload;
  try {
    payload = (await buffer(req)).toString('utf8');
  } catch (err) {
    console.error('Webhook body read error:', err);
    return res.status(400).json({ error: 'Failed to read body' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set — refusing webhook (prevents forged payment events)');
    return res.status(503).json({ error: 'Webhook not configured' });
  }

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Payment successful:', session.id);
        break;
      }
      case 'checkout.session.async_payment_failed': {
        const failedSession = event.data.object;
        console.error('Payment failed:', failedSession.id);
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
