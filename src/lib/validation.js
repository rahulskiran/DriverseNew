/**
 * Driverse Foundation — Shared Validation Library
 * Used by both frontend components and backend API functions.
 */

export const DONATION_MIN = 1;
export const DONATION_MAX = 25000;

/**
 * Validates a donation amount.
 * @param {number|string} amount
 * @returns {{ valid: boolean, error?: string, sanitized?: number }}
 */
export function validateDonationAmount(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'Please enter a valid number.' };
  }
  if (num < DONATION_MIN) {
    return { valid: false, error: `Minimum donation is $${DONATION_MIN}.` };
  }
  if (num > DONATION_MAX) {
    return { valid: false, error: `Maximum donation is $${DONATION_MAX.toLocaleString()}.` };
  }

  // Round to 2 decimal places
  const sanitized = Math.round(num * 100) / 100;
  return { valid: true, sanitized };
}

/**
 * Validates an email address.
 * @param {string} email
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Please enter an email address.' };
  }

  const trimmed = email.trim().toLowerCase();

  // RFC 5322 simplified — covers 99.99% of real addresses
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!regex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address is too long.' };
  }

  return { valid: true };
}

/**
 * Strips HTML tags from a string to prevent injection.
 * @param {string} str
 * @returns {string}
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}
