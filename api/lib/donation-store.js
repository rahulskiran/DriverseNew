/**
 * Donation persistence.
 *
 * We intentionally don't hard-wire a database here. Instead, a paid donation
 * record is:
 *   1. Always written to the function log as a single structured JSON line
 *      prefixed with [donation:paid] so it's searchable in Vercel's logs.
 *   2. Optionally POSTed to a webhook URL of your choice
 *      (env: DONATIONS_WEBHOOK_URL). Point this at a Google Sheets
 *      Apps Script web app, a Zapier / Make / n8n webhook, Airtable via a
 *      middleman, or your own endpoint.
 *
 * Optional auth: if DONATIONS_WEBHOOK_SECRET is set, it is sent as
 * `X-Donation-Secret` so your receiving endpoint can reject unauthenticated
 * calls.
 */

/**
 * @param {object} session  Stripe Checkout Session (already retrieved from Stripe)
 * @param {string} eventId  Stripe event.id (for dedupe on the receiving side)
 */
export async function recordDonation(session, eventId) {
  const record = buildRecord(session, eventId);

  console.log('[donation:paid]', JSON.stringify(record));

  const webhookUrl = process.env.DONATIONS_WEBHOOK_URL?.trim();
  if (!webhookUrl) return;

  try {
    const headers = { 'Content-Type': 'application/json' };
    const secret = process.env.DONATIONS_WEBHOOK_SECRET?.trim();
    if (secret) headers['X-Donation-Secret'] = secret;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(record),
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await safeText(res);
        console.error(
          '[donation:webhook_failed]',
          res.status,
          (text || '').slice(0, 200)
        );
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    console.error('[donation:webhook_error]', String(err && err.message ? err.message : err));
  }
}

function buildRecord(session, eventId) {
  const details = session.customer_details || {};
  return {
    type: 'donation.paid',
    eventId,
    sessionId: session.id,
    paymentIntentId: typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null,
    amountMinor: session.amount_total,
    amountMajor:
      typeof session.amount_total === 'number'
        ? session.amount_total / 100
        : null,
    currency: session.currency,
    donor: {
      name: details.name || session.metadata?.donor_name || null,
      email: details.email || session.customer_email || null,
      country: details.address?.country || null,
    },
    paymentStatus: session.payment_status,
    livemode: session.livemode,
    createdAt: new Date(
      (session.created || Math.floor(Date.now() / 1000)) * 1000
    ).toISOString(),
    metadata: session.metadata || {},
  };
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
