/**
 * Temporary diagnostic endpoint. Reports which env vars the serverless
 * function can see and whether Upstash responds.
 *
 * Safe to expose: returns only booleans and generic status strings, never the
 * actual values of secrets.
 *
 * Remove this file once the deployment is verified healthy.
 */
import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const env = {
    VERCEL_ENV: process.env.VERCEL_ENV || null,
    SITE_URL_set: Boolean(process.env.SITE_URL),
    STRIPE_SECRET_KEY_set: Boolean(process.env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET_set: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    UPSTASH_REDIS_REST_URL_set: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN_set: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    UPSTASH_REDIS_REST_URL_looksValid: /^https:\/\/[\w.-]+\.upstash\.io\/?$/.test(
      process.env.UPSTASH_REDIS_REST_URL || ''
    ),
  };

  let upstash = { attempted: false };
  if (env.UPSTASH_REDIS_REST_URL_set && env.UPSTASH_REDIS_REST_TOKEN_set) {
    upstash = { attempted: true, ok: false };
    try {
      const redis = Redis.fromEnv();
      const pong = await redis.ping();
      upstash.ok = pong === 'PONG' || pong === true;
      upstash.response = String(pong).slice(0, 32);
    } catch (err) {
      upstash.ok = false;
      upstash.error = String(err && err.message ? err.message : err).slice(0, 200);
    }
  }

  return res.status(200).json({ env, upstash });
}
