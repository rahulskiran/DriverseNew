/**
 * Webhook idempotency / replay defense via Upstash Redis.
 *
 * Stripe retries delivered events for up to ~3 days; this layer ensures any
 * downstream side-effect (DB write, email, counter) only runs once per event.id.
 */
import { Redis } from '@upstash/redis';

const TTL_SECONDS = 60 * 60 * 24 * 7;

let cachedRedis;

function getRedis() {
  if (cachedRedis) return cachedRedis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  cachedRedis = Redis.fromEnv();
  return cachedRedis;
}

/**
 * Returns:
 *   { firstSeen: true }  → safe to process this event for the first time
 *   { firstSeen: false } → duplicate, skip side effects
 *   { unavailable: true }→ Redis unreachable / not configured (caller decides)
 */
export async function claimEvent(eventId) {
  if (!eventId || typeof eventId !== 'string') {
    return { firstSeen: false };
  }
  const redis = getRedis();
  if (!redis) return { unavailable: true };

  try {
    const key = `stripe:event:${eventId}`;
    const result = await redis.set(key, '1', { nx: true, ex: TTL_SECONDS });
    return { firstSeen: result === 'OK' };
  } catch (err) {
    console.error('Idempotency Redis error:', err);
    return { unavailable: true };
  }
}
