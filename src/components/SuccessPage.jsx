import React, { useEffect, useState } from 'react';
import { CheckCircle, Heart, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { verifyCheckoutSession } from '../utils/stripe';

const STATES = { LOADING: 'loading', PAID: 'paid', UNPAID: 'unpaid', ERROR: 'error' };

function formatAmount(minor, currency) {
  if (typeof minor !== 'number' || !currency) return null;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(minor / 100);
  } catch {
    return `${(minor / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

const SuccessPage = () => {
  const [state, setState] = useState(STATES.LOADING);
  const [details, setDetails] = useState({ amount: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (!sessionId) {
        if (!cancelled) setState(STATES.ERROR);
        return;
      }
      try {
        const data = await verifyCheckoutSession(sessionId);
        if (cancelled) return;
        if (data.paid) {
          setDetails({ amount: formatAmount(data.amountTotal, data.currency) });
          setState(STATES.PAID);
        } else {
          setState(STATES.UNPAID);
        }
      } catch {
        if (!cancelled) setState(STATES.ERROR);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
        {state === STATES.LOADING && (
          <>
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifying your donation…</h1>
            <p className="text-slate-600">Please wait a moment.</p>
          </>
        )}

        {state === STATES.PAID && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Thank You for Your Donation!
            </h1>
            <p className="text-slate-600 mb-6">
              Your generous contribution helps us support driver safety, health, and wellness
              programs. Stripe will email a payment receipt to the address you entered at checkout.
            </p>
            {details.amount && (
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span className="text-sm font-medium">Amount</span>
                </div>
                <p className="text-lg font-semibold text-slate-800">{details.amount}</p>
              </div>
            )}
          </>
        )}

        {state === STATES.UNPAID && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment not completed</h1>
            <p className="text-slate-600 mb-6">
              We couldn't confirm a successful payment for this session. If you were charged,
              please wait a moment and refresh, or contact us with your transaction details.
            </p>
          </>
        )}

        {state === STATES.ERROR && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Couldn't verify your donation</h1>
            <p className="text-slate-600 mb-6">
              We were unable to confirm this session. If you were charged, please contact us and
              we'll look into it.
            </p>
          </>
        )}

        <a
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
