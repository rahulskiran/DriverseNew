/**
 * Strict CORS for the public donation API.
 *
 * Allow rules:
 *   - Production: Origin host must equal SITE_URL host.
 *   - Preview:    Origin host must equal SITE_URL host or the current VERCEL_URL.
 *   - Dev:        localhost / 127.0.0.1 (any port) is allowed.
 *
 * No browser Origin → request is allowed (server-to-server / Stripe webhooks),
 *   but no ACAO header is reflected.
 *
 * Returns true if the request should be allowed to proceed; if false, the caller
 * MUST short-circuit with 403 to also block non-browser clients.
 */

function siteHost() {
  const site = process.env.SITE_URL?.trim();
  if (!site) return null;
  try {
    const u = new URL(site.startsWith('http') ? site : `https://${site}`);
    return u.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

function vercelHost() {
  const v = process.env.VERCEL_URL?.trim();
  if (!v) return null;
  try {
    const u = new URL(v.startsWith('http') ? v : `https://${v}`);
    return u.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

function originHost(origin) {
  try {
    return new URL(origin).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

function isLocalhostOrigin(origin) {
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

/**
 * Apply CORS headers. Returns:
 *   { allowed: true,  origin: <reflected or null> }
 *   { allowed: false, origin: null }                  → caller should 403
 *
 * "allowed: true with origin: null" means: no Origin header sent (e.g. curl,
 * Stripe webhook). The caller may still want to enforce its own Origin policy.
 */
export function applyCors(req, res) {
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '600');

  const origin = req.headers.origin;
  if (!origin) return { allowed: true, origin: null };

  const env = process.env.VERCEL_ENV;
  const allowDev = env !== 'production' && env !== 'preview';

  if (allowDev && isLocalhostOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    return { allowed: true, origin };
  }

  const oHost = originHost(origin);
  if (!oHost) return { allowed: false, origin: null };

  const allowedHosts = [siteHost(), env === 'preview' ? vercelHost() : null].filter(Boolean);

  if (allowedHosts.includes(oHost)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    return { allowed: true, origin };
  }
  return { allowed: false, origin: null };
}
