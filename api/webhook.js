import Stripe from 'stripe';

// Stripe requires the raw body for webhook signature verification.
// Vercel exposes this when we disable body parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

// ─── Read Raw Body ────────────────────────────────────────────────────
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ─── Main Handler ─────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret not configured.' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    // Verify webhook signature — this is critical for security.
    // Without this, anyone could forge webhook events.
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid webhook signature.' });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // ─── Payment Successful ─────────────────────────────────
      // In production, you would:
      // 1. Record the donation in your database
      // 2. Send a thank-you / tax receipt email
      // 3. Update donation totals
      // For now, we log the successful payment.
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Payment succeeded:', {
          id: session.id,
          amount: session.amount_total / 100,
          currency: session.currency,
          email: session.customer_details?.email,
          status: session.payment_status,
        });
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      if (process.env.NODE_ENV !== 'production') {
        console.log('⏰ Checkout session expired:', session.id);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      if (process.env.NODE_ENV !== 'production') {
        console.log('❌ Payment failed:', {
          id: paymentIntent.id,
          error: paymentIntent.last_payment_error?.message,
        });
      }
      break;
    }

    default:
      // Unhandled event type — acknowledge but don't process
      break;
  }

  // Always return 200 to acknowledge receipt — Stripe retries on non-2xx
  return res.status(200).json({ received: true });
}
