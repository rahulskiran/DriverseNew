/**
 * Rate limit helpers.
 *
 * Upstash-backed rate limiting is currently DISABLED. These helpers are
 * no-ops so the checkout and verify endpoints run without any external
 * dependency. Re-enable by reintroducing an Upstash (or equivalent) client
 * and returning real limit results from limitCheckoutSession / limitVerify.
 */

function isProd() {
  return process.env.VERCEL_ENV === 'production';
}

/**
 * Returns the client IP using the most trustworthy source available on Vercel.
 *
 * x-vercel-forwarded-for and x-real-ip are set by Vercel's edge and are NOT
 * directly settable by the client. Falls back to the LAST entry of x-forwarded-for
 * (closest to our edge), since the leftmost entry can be spoofed by the client.
 */
export function getClientIp(req) {
  const vercel = req.headers['x-vercel-forwarded-for'];
  if (typeof vercel === 'string' && vercel.length > 0) {
    return vercel.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return 'unknown';
}

/**
 * @param {string} _key  ignored while rate limiting is disabled
 * @returns {Promise<{ success: boolean, reset?: number }>}
 */
export async function limitCheckoutSession(_key) {
  return { success: true };
}

/**
 * @param {string} _key  ignored while rate limiting is disabled
 * @returns {Promise<{ success: boolean, reset?: number }>}
 */
export async function limitVerify(_key) {
  return { success: true };
}

export { isProd };
