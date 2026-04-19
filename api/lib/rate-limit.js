/**
 * Distributed rate limit for Vercel serverless (Upstash Redis).
 *
 * Behavior:
 *  - In production (VERCEL_ENV === 'production') Upstash MUST be configured;
 *    otherwise getLimiter() throws and callers should fail closed.
 *  - In dev/preview, missing Upstash returns a noop limiter so local work isn't blocked.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_CHECKOUT_PER_MINUTE) || 15;
const MAX_VERIFY_REQUESTS = Number(process.env.RATE_LIMIT_VERIFY_PER_MINUTE) || 30;

let checkoutLimiter;
let verifyLimiter;
let cachedRedis;

function isProd() {
  return process.env.VERCEL_ENV === 'production';
}

function getRedis() {
  if (cachedRedis) return cachedRedis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  cachedRedis = Redis.fromEnv();
  return cachedRedis;
}

function getCheckoutLimiter() {
  const redis = getRedis();
  if (!redis) {
    if (isProd()) {
      throw new Error('Upstash Redis is not configured (UPSTASH_REDIS_REST_URL / TOKEN)');
    }
    return null;
  }
  if (!checkoutLimiter) {
    checkoutLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1 m'),
      analytics: false,
      prefix: 'ratelimit:checkout',
    });
  }
  return checkoutLimiter;
}

function getVerifyLimiter() {
  const redis = getRedis();
  if (!redis) {
    if (isProd()) {
      throw new Error('Upstash Redis is not configured (UPSTASH_REDIS_REST_URL / TOKEN)');
    }
    return null;
  }
  if (!verifyLimiter) {
    verifyLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_VERIFY_REQUESTS, '1 m'),
      analytics: false,
      prefix: 'ratelimit:verify',
    });
  }
  return verifyLimiter;
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
 * @param {string} key  e.g. `checkout:${ip}`
 * @returns {Promise<{ success: boolean, reset?: number }>}
 */
export async function limitCheckoutSession(key) {
  const limiter = getCheckoutLimiter();
  if (!limiter) return { success: true };
  const result = await limiter.limit(key);
  return { success: result.success, reset: result.reset };
}

/**
 * @param {string} key  e.g. `verify:${ip}`
 * @returns {Promise<{ success: boolean, reset?: number }>}
 */
export async function limitVerify(key) {
  const limiter = getVerifyLimiter();
  if (!limiter) return { success: true };
  const result = await limiter.limit(key);
  return { success: result.success, reset: result.reset };
}

export { isProd };
