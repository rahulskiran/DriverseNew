/**
 * Vercel API Route: Stripe Webhook Handler
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Raw body needed for webhook verification
  },
};

async function getRawBody(req) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString('utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let payload;
  try {
    payload = await getRawBody(req);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to read body' });
  }

  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      console.warn('Webhook secret not configured');
      event = JSON.parse(payload);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful:', session.id);
        // Handle successful payment (send email, update database, etc.)
        break;

      case 'checkout.session.async_payment_failed':
        const failedSession = event.data.object;
        console.error('Payment failed:', failedSession.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
