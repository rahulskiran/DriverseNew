/**
 * Distributed rate limit for Vercel serverless (Upstash Redis).
 * If UPSTASH_* env vars are unset, limits are skipped (local dev).
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/** Max checkout-session creations per IP per window */
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_CHECKOUT_PER_MINUTE) || 15;

let ratelimit;

function getLimiter() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    const redis = Redis.fromEnv();
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1 m'),
      analytics: true,
      prefix: 'ratelimit:checkout',
    });
  }
  return ratelimit;
}

export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }
  return 'unknown';
}

/**
 * @param {string} key e.g. ip or ip+userAgent slice
 * @returns {Promise<{ success: boolean, reset?: number }>}
 */
export async function limitCheckoutSession(key) {
  const limiter = getLimiter();
  if (!limiter) {
    return { success: true };
  }
  const result = await limiter.limit(key);
  return {
    success: result.success,
    reset: result.reset,
  };
}
