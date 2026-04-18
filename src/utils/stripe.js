/**
 * Stripe Checkout (hosted) — session is created on the server; client only redirects.
 */

export async function createCheckoutSession(amount, donorInfo = {}) {
  const donationAmount = parseFloat(amount);
  if (isNaN(donationAmount) || donationAmount < 1 || donationAmount > 100000) {
    throw new Error('Invalid donation amount. Must be between $1 and $100,000');
  }

  const apiUrl = import.meta.env.VITE_STRIPE_API_URL || '/api/create-checkout-session';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: donationAmount,
      donorInfo,
    }),
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    const snippet = text.replace(/\s+/g, ' ').slice(0, 120);
    throw new Error(
      response.ok
        ? `Payment server returned non-JSON (is /api wired on Vercel?). ${snippet}`
        : `Server error (${response.status}). ${snippet}`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Failed to create checkout session');
  }

  return data;
}

export function redirectToCheckout(checkoutUrl) {
  if (!checkoutUrl || typeof checkoutUrl !== 'string') {
    throw new Error('Invalid checkout URL');
  }
  let parsed;
  try {
    parsed = new URL(checkoutUrl, window.location.origin);
  } catch {
    throw new Error('Invalid checkout URL');
  }
  if (parsed.protocol !== 'https:') {
    throw new Error('Invalid checkout URL');
  }
  const host = parsed.hostname.toLowerCase();
  if (!host.endsWith('.stripe.com') && host !== 'stripe.com') {
    throw new Error('Invalid checkout URL');
  }
  window.location.href = checkoutUrl;
}
