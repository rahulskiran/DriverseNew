# Stripe Payment Integration Setup Guide

## Overview
This project uses **Stripe Checkout** for secure payment processing. The integration follows PCI DSS compliance standards and uses server-side session creation for maximum security.

## Architecture
- **Frontend**: React + Vite; donations call your API then redirect to **Stripe Checkout** (hosted)
- **Backend**: **Vercel** serverless routes under `api/` (`create-checkout-session`, `webhook`)
- **Security**: Webhook signature verification, server-side amount limits, CORS on checkout API, optional **rate limiting** (Upstash) on `create-checkout-session`

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Sign up at [stripe.com](https://stripe.com) if you haven't already
2. Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Optional: override checkout API URL (default `/api/create-checkout-session` on Vercel)
# VITE_STRIPE_API_URL=https://your-domain.com/api/create-checkout-session

# Server-side (NEVER expose in client code) — set in Vercel Project → Settings → Environment Variables
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Production: canonical site URL for success/cancel redirects
# SITE_URL=https://your-domain.com

# Rate limiting (production recommended) — create a free Redis on https://console.upstash.com
# UPSTASH_REDIS_REST_URL=...
# UPSTASH_REDIS_REST_TOKEN=...
# RATE_LIMIT_CHECKOUT_PER_MINUTE=15
```

**⚠️ SECURITY WARNING**: Never commit the `.env` file to git!

Without Upstash env vars, rate limiting is **disabled** (fine for local dev). **Enable in Vercel production** to cap checkout-session abuse per IP.

### 3. Configure Vercel environment variables

In **Vercel** → your project → **Settings** → **Environment Variables**, add:

| Variable | Value | Context |
|----------|-------|---------|
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` | Production / Preview as needed |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production / Preview as needed |
| `SITE_URL` | `https://your-domain.com` | Production (no trailing slash) |
| `UPSTASH_REDIS_REST_URL` | From [Upstash console](https://console.upstash.com) | Production (recommended) |
| `UPSTASH_REDIS_REST_TOKEN` | From Upstash console | Production (recommended) |
| `RATE_LIMIT_CHECKOUT_PER_MINUTE` | e.g. `15` | Optional; default 15 requests/min/IP |

### 4. Configure Stripe webhook

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhook` (your deployed Vercel URL)
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_failed`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET` in Vercel

### 5. Test the integration

```bash
npm run dev
```

For full local API testing, use Vercel CLI (`vercel dev`) so `/api/*` routes run, or deploy to a preview URL and test there.

Visit `/donate` and run a test donation.

## Security Features

### Implemented
- ✅ Content Security Policy (CSP) headers
- ✅ PCI DSS compliant (via Stripe Checkout)
- ✅ 256-bit SSL encryption
- ✅ XSS protection headers
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Webhook signature verification
- ✅ Amount validation (server-side)
- ✅ Rate limiting on checkout API (when Upstash is configured)
- ✅ No sensitive data stored on servers

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
