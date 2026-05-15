import React from 'react';
import { ArrowLeft } from 'lucide-react';

const CancelPage = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 font-sans">
    <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Checkout canceled</h1>
      <p className="text-slate-600 mb-6">
        No payment was processed. You can return home or try donating again anytime.
      </p>
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

export default CancelPage;
