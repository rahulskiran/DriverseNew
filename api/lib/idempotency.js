/**
 * Webhook idempotency.
 *
 * Upstash-backed dedupe is currently DISABLED. Stripe may retry an event
 * multiple times (up to ~3 days); while this is off, the webhook will
 * process each delivery. That is safe today because the only side effect
 * is a console.log. Re-enable before adding real side effects (DB writes,
 * emails, counters) by restoring an Upstash (or equivalent) claim store.
 */

/**
 * Returns:
 *   { firstSeen: true }  → always, while dedupe is disabled
 */
export async function claimEvent(_eventId) {
  return { firstSeen: true };
}
