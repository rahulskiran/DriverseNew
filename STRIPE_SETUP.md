# Stripe Payment Integration Setup Guide

## Overview
This project uses **Stripe Checkout** for secure payment processing. The integration follows PCI DSS compliance standards and uses server-side session creation for maximum security.

## Architecture
- **Frontend**: React + Vite; donations call your API then redirect to **Stripe Checkout** (hosted)
- **Backend**: **Vercel** serverless routes under `api/`:
  - `POST /api/create-checkout-session` — creates a session (rate-limited, Turnstile-gated, idempotent)
  - `GET  /api/checkout-session?id=cs_…` — verifies a session by re-fetching from Stripe (used by the success page)
  - `POST /api/webhook` — Stripe webhook receiver (signature-verified, deduped by `event.id`)
- **Security**: Strict CORS allow-list, Cloudflare Turnstile bot check, per-IP sliding-window rate limit, Stripe API version pinned, request idempotency keys, webhook idempotency dedupe via Upstash, server-side session re-fetch.

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Sign up at [stripe.com](https://stripe.com) if you haven't already
2. Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Server-side (NEVER expose in client code) — set in Vercel Project → Settings → Environment Variables
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# REQUIRED in production AND preview — used for CORS allow-list and Stripe redirect URLs
SITE_URL=https://your-domain.com

# Cloudflare Turnstile — REQUIRED in production
# Frontend site key (must be VITE_-prefixed to be available to the bundle)
VITE_TURNSTILE_SITE_KEY=0xAAAAAAAAAAAAAAAAAAAAAA
# Server secret used to verify the token at /turnstile/v0/siteverify
TURNSTILE_SECRET_KEY=0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

# Upstash Redis — REQUIRED in production (rate limit + webhook idempotency)
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxx
# Optional overrides
# RATE_LIMIT_CHECKOUT_PER_MINUTE=15
# RATE_LIMIT_VERIFY_PER_MINUTE=30
```

**⚠️ SECURITY WARNING**: Never commit the `.env` file to git!

Production fail-closed behavior:

- Missing `SITE_URL` → all browser CORS rejected.
- Missing `TURNSTILE_SECRET_KEY` → `/api/create-checkout-session` returns 403 for every request.
- Missing Upstash env vars → rate limiter and webhook idempotency return 503.

In local dev (no `VERCEL_ENV`), all three degrade gracefully so you can iterate without external services.

### 3. Configure Vercel environment variables

In **Vercel** → your project → **Settings** → **Environment Variables**, add:

| Variable | Value | Context |
|----------|-------|---------|
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` | Production / Preview |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production / Preview |
| `SITE_URL` | `https://your-domain.com` (no trailing slash) | Production / Preview (REQUIRED) |
| `VITE_TURNSTILE_SITE_KEY` | From [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) | Production / Preview (REQUIRED) |
| `TURNSTILE_SECRET_KEY` | From Cloudflare Turnstile | Production / Preview (REQUIRED) |
| `UPSTASH_REDIS_REST_URL` | From [Upstash console](https://console.upstash.com) | Production / Preview (REQUIRED) |
| `UPSTASH_REDIS_REST_TOKEN` | From Upstash console | Production / Preview (REQUIRED) |
| `RATE_LIMIT_CHECKOUT_PER_MINUTE` | e.g. `15` | Optional; default 15 |
| `RATE_LIMIT_VERIFY_PER_MINUTE` | e.g. `30` | Optional; default 30 |

### 4. Configure Stripe webhook

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhook` (your deployed Vercel URL)
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_failed`
   - `charge.refunded`
   - `charge.dispute.created`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET` in Vercel
5. Pin the API version on the webhook to **the same value used in code** (see `STRIPE_API_VERSION` constant in `api/create-checkout-session.js` and `api/webhook.js`).

### 5. Test the integration

```bash
npm run dev
```

For full local API testing, use Vercel CLI (`vercel dev`) so `/api/*` routes run, or deploy to a preview URL and test there.

Visit `/donate` and run a test donation.

## Security Features

### Implemented
- ✅ Content Security Policy without `'unsafe-inline'` for scripts
- ✅ HSTS (HTTP Strict Transport Security) with `includeSubDomains`
- ✅ Strict CORS allow-list (fail-closed in production)
- ✅ Cloudflare Turnstile bot challenge (fail-closed in production)
- ✅ Per-IP sliding-window rate limit (Upstash) using non-spoofable IP source
- ✅ Stripe API version pinned in code
- ✅ Idempotency-Key on `checkout.sessions.create` (prevents duplicate sessions on retry)
- ✅ Webhook signature verification + `event.id` dedupe (Upstash) + re-fetch from Stripe before acting
- ✅ Strict server-side schema validation for amount, donor name, donor email, session id
- ✅ Server-side success-page verification (`GET /api/checkout-session?id=…`) — never trust the URL `session_id` alone
- ✅ Stripe Checkout (hosted) handles all card data — none ever touches our server

### Client-Side Security
- Payment data never touches your server
- Stripe.js handles tokenization in iframe
- Input validation for donation amounts
- Error handling without data exposure

### Server-Side Security
- Secret keys never exposed to client
- Webhook signature verification
- CORS restrictions on API endpoints
- Request validation and sanitization
- Per-IP sliding-window limits on `/api/create-checkout-session` (Upstash)

## Testing Cards (Test Mode)

Use these test card numbers in development:

| Card | Number | CVC | Date |
|------|--------|-----|------|
| Success | `4242 4242 4242 4242` | Any 3 digits | Any future date |
| Declined | `4000 0000 0000 0002` | Any 3 digits | Any future date |
| 3D Secure | `4000 0025 0000 3155` | Any 3 digits | Any future date |

## Going Live

1. Switch to **Live Mode** in Stripe Dashboard
2. Replace test keys with live keys in Vercel environment variables
3. Update webhook endpoint to production URL
4. Test with a small real payment ($1)
5. Enable tax receipts if needed

## Troubleshooting

### "Failed to create checkout session"
- Verify `STRIPE_SECRET_KEY` is set in Vercel (and redeploy after changing env)
- In local dev, ensure `/api/create-checkout-session` is reachable (e.g. `vercel dev`)
- Check **Vercel** → project → **Logs** for the function

### Webhook failures
- Verify webhook secret matches `STRIPE_WEBHOOK_SECRET`
- Ensure webhook URL is publicly accessible
- Check Stripe Dashboard for event delivery logs

## Compliance Notes

- Stripe Checkout is **PCI DSS Level 1** compliant
- You don't need your own PCI compliance certification
- Follow GDPR/CCPA guidelines for data handling
- Maintain donation records for tax purposes

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Support](https://support.stripe.com)
