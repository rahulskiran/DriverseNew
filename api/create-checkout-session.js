/**
 * Vercel API Route: Create Stripe Checkout Session
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { amount, donorInfo = {} } = req.body;

    // Validate amount
    if (!amount || amount < 1 || amount > 100000) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Driverse Foundation Donation',
              description: 'Thank you for supporting driver safety, health, and wellness programs.',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://driversefoundation.com/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://driversefoundation.com/donate/cancel`,
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
    return res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message,
    });
  }
}
