/**
 * Tiny schema validators for inbound API bodies. No external deps.
 */

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,189}\.[^\s@]{2,24}$/;
const NAME_RE = /^[\p{L}\p{M}\p{N}\s.,'\-]{1,80}$/u;
const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]{20,200}$/;
const IDEMP_RE = /^[A-Za-z0-9_-]{8,128}$/;

export function validateAmount(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return { ok: false, error: 'Invalid donation amount' };
  if (n < 1 || n > 100000) return { ok: false, error: 'Donation must be between $1 and $100,000' };
  if (Math.round(n * 100) <= 0) return { ok: false, error: 'Invalid donation amount' };
  return { ok: true, amountMinor: Math.round(n * 100) };
}

export function validateDonorInfo(raw) {
  if (raw == null) return { ok: true, value: { name: null, email: null } };
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Invalid donor info' };
  }
  const out = { name: null, email: null };

  if (raw.name != null) {
    if (typeof raw.name !== 'string' || !NAME_RE.test(raw.name.trim())) {
      return { ok: false, error: 'Invalid donor name' };
    }
    out.name = raw.name.trim().slice(0, 80);
  }

  if (raw.email != null) {
    if (typeof raw.email !== 'string') return { ok: false, error: 'Invalid donor email' };
    const e = raw.email.trim().toLowerCase();
    if (e.length > 254 || !EMAIL_RE.test(e)) {
      return { ok: false, error: 'Invalid donor email' };
    }
    out.email = e;
  }

  return { ok: true, value: out };
}

export function validateSessionId(raw) {
  if (typeof raw !== 'string' || !SESSION_ID_RE.test(raw)) {
    return { ok: false, error: 'Invalid session id' };
  }
  return { ok: true, value: raw };
}

export function validateIdempotencyKey(raw) {
  if (raw == null) return { ok: true, value: null };
  if (typeof raw !== 'string' || !IDEMP_RE.test(raw)) {
    return { ok: false, error: 'Invalid idempotency key' };
  }
  return { ok: true, value: raw };
}
