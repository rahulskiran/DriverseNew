import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;

function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src^="${SCRIPT_URL.split('?')[0]}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.turnstile));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = SCRIPT_URL;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(window.turnstile);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export const TURNSTILE_ENABLED = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);

/**
 * Drop-in Cloudflare Turnstile widget.
 *
 * Props:
 *   onToken(token | null)  — fires when the user passes/expires the challenge
 *
 * Imperative handle:
 *   ref.current.reset() — clear the current token and re-prompt
 *
 * Renders nothing if VITE_TURNSTILE_SITE_KEY is unset.
 */
const TurnstileGate = forwardRef(function TurnstileGate({ onToken }, ref) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || null;
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        if (widgetIdRef.current && typeof window !== 'undefined' && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch {
            /* ignore */
          }
        }
        if (onTokenRef.current) onTokenRef.current(null);
      },
    }),
    []
  );

  useEffect(() => {
    if (!siteKey) return undefined;
    let cancelled = false;
    loadTurnstileScript()
      .then((ts) => {
        if (!cancelled && ts) setScriptReady(true);
      })
      .catch((err) => console.error('Failed to load Turnstile:', err));
    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptReady) return undefined;
    const node = containerRef.current;
    const ts = typeof window !== 'undefined' ? window.turnstile : null;
    if (!node || !ts || widgetIdRef.current) return undefined;
    try {
      widgetIdRef.current = ts.render(node, {
        sitekey: siteKey,
        callback: (t) => onTokenRef.current && onTokenRef.current(t),
        'error-callback': () => onTokenRef.current && onTokenRef.current(null),
        'expired-callback': () => onTokenRef.current && onTokenRef.current(null),
        'timeout-callback': () => onTokenRef.current && onTokenRef.current(null),
        theme: 'light',
        size: 'flexible',
      });
    } catch (err) {
      console.error('Turnstile render error:', err);
    }
    return () => {
      const id = widgetIdRef.current;
      widgetIdRef.current = null;
      if (id && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          /* ignore */
        }
      }
    };
  }, [siteKey, scriptReady]);

  if (!siteKey) return null;
  return <div ref={containerRef} />;
});

export default TurnstileGate;
