/**
 * Stripe Configuration
 * Securely loads Stripe with publishable key from environment
 */

import { loadStripe } from '@stripe/stripe-js';

// Validate environment variable exists
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn('Stripe publishable key is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY in your .env file');
}

// Initialize Stripe with publishable key (safe for client-side)
export const stripePromise = publishableKey
  ? loadStripe(publishableKey)
  : Promise.resolve(null);

/**
 * Create a checkout session by calling the backend API
 * @param {number} amount - Donation amount in dollars
 * @param {Object} donorInfo - Optional donor information
 * @returns {Promise<{sessionId: string, url: string}>}
 */
export async function createCheckoutSession(amount, donorInfo = {}) {
  // Validate amount
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return response.json();
}

/**
 * Redirect to Stripe Checkout
 * @param {string} checkoutUrl - The Stripe checkout URL
 */
export function redirectToCheckout(checkoutUrl) {
  if (!checkoutUrl) {
    throw new Error('Invalid checkout URL');
  }
  window.location.href = checkoutUrl;
}
