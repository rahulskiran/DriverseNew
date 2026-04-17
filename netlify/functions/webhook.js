/**
 * Netlify Function: Stripe Webhook Handler
 * Processes Stripe events securely
 * Validates webhook signature to ensure authenticity
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = event.body;

  let stripeEvent;

  try {
    // Verify webhook signature for security
    if (webhookSecret) {
      stripeEvent = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      // Development mode without signature verification
      console.warn('Warning: Webhook secret not configured. Skipping signature verification.');
      stripeEvent = JSON.parse(payload);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid signature' }),
    };
  }

  // Handle specific events
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        console.log('Payment successful:', session.id);
        console.log('Customer:', session.customer_email || 'Guest');
        console.log('Amount:', session.amount_total / 100, session.currency);
        
        // Here you would typically:
        // - Send confirmation email
        // - Update database
        // - Send tax receipt
        // - Notify admin
        await handleSuccessfulPayment(session);
        break;

      case 'checkout.session.async_payment_failed':
        const failedSession = stripeEvent.data.object;
        console.error('Payment failed:', failedSession.id);
        await handleFailedPayment(failedSession);
        break;

      case 'invoice.payment_succeeded':
        const invoice = stripeEvent.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

async function handleSuccessfulPayment(session) {
  // TODO: Implement your business logic here
  // Examples:
  // - Save to database
  // - Send email notification
  // - Update CRM
  // - Generate tax receipt
  
  console.log('Processing successful payment for session:', session.id);
  console.log('Donor info:', {
    name: session.metadata?.donor_name,
    email: session.customer_email || session.metadata?.donor_email,
    amount: session.amount_total / 100,
  });
}

async function handleFailedPayment(session) {
  // TODO: Handle failed payment logic
  // - Log failure
  // - Send notification to donor
  // - Retry logic if needed
  
  console.error('Processing failed payment for session:', session.id);
}
