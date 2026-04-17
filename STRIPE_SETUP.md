# Stripe Payment Integration Setup Guide

## Overview
This project uses **Stripe Checkout** for secure payment processing. The integration follows PCI DSS compliance standards and uses server-side session creation for maximum security.

## Architecture
- **Frontend**: React + Vite with Stripe.js for client-side tokenization
- **Backend**: Netlify Functions for secure server-side operations
- **Security**: Content Security Policy, HSTS, XSS protection enabled

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Sign up at [stripe.com](https://stripe.com) if you haven't already
2. Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Client-side (safe to expose, used in browser)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Server-side (NEVER expose in client code)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**⚠️ SECURITY WARNING**: Never commit the `.env` file to git!

### 3. Configure Netlify Environment Variables

When deploying to Netlify, set these in your site settings:

| Variable | Value | Context |
|----------|-------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Production |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production |
| `NODE_ENV` | `production` | All |

### 4. Configure Stripe Webhook

1. In your Stripe Dashboard, go to Developers → Webhooks
2. Add endpoint: `https://your-site.netlify.app/.netlify/functions/webhook`
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_failed`
4. Copy the webhook secret and add to environment variables

### 5. Test the Integration

```bash
# Run locally
npm run dev

# In another terminal, test the function
netlify dev
```

Visit `http://localhost:5173/donate` and test a donation.

## Security Features

### Implemented
- ✅ Content Security Policy (CSP) headers
- ✅ PCI DSS compliant (via Stripe Checkout)
- ✅ 256-bit SSL encryption
- ✅ XSS protection headers
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Webhook signature verification
- ✅ Amount validation (server-side)
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

## Testing Cards (Test Mode)

Use these test card numbers in development:

| Card | Number | CVC | Date |
|------|--------|-----|------|
| Success | `4242 4242 4242 4242` | Any 3 digits | Any future date |
| Declined | `4000 0000 0000 0002` | Any 3 digits | Any future date |
| 3D Secure | `4000 0025 0000 3155` | Any 3 digits | Any future date |

## Going Live

1. Switch to **Live Mode** in Stripe Dashboard
2. Replace test keys with live keys in Netlify environment variables
3. Update webhook endpoint to production URL
4. Test with a small real payment ($1)
5. Enable tax receipts if needed

## Troubleshooting

### "No publishable key configured"
- Check `.env` file exists with `VITE_STRIPE_PUBLISHABLE_KEY`
- Restart dev server after adding env vars

### "Failed to create checkout session"
- Verify `STRIPE_SECRET_KEY` is set in Netlify environment variables
- Check function logs in Netlify Dashboard

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
