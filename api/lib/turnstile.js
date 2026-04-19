/**
 * Cloudflare Turnstile server-side verification.
 *
 * If TURNSTILE_SECRET_KEY is unset:
 *   - In production (VERCEL_ENV === 'production') verification fails closed.
 *   - In dev/preview a warning is logged and verification is skipped, so
 *     local development keeps working without a Turnstile account.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const isProd = process.env.VERCEL_ENV === 'production';

  if (!secret) {
    if (isProd) {
      return { success: false, reason: 'turnstile-not-configured' };
    }
    console.warn('TURNSTILE_SECRET_KEY not set — skipping bot check (dev/preview only)');
    return { success: true, skipped: true };
  }

  if (!token || typeof token !== 'string' || token.length > 4096) {
    return { success: false, reason: 'missing-token' };
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);

  let resp;
  try {
    resp = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch (err) {
    console.error('Turnstile siteverify network error:', err);
    return { success: false, reason: 'network-error' };
  }

  if (!resp.ok) {
    return { success: false, reason: `siteverify-${resp.status}` };
  }

  let json;
  try {
    json = await resp.json();
  } catch {
    return { success: false, reason: 'siteverify-bad-json' };
  }

  if (!json.success) {
    return {
      success: false,
      reason: 'challenge-failed',
      codes: json['error-codes'] || [],
    };
  }
  return { success: true };
}
