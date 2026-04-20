import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared layout for static legal pages (Privacy, Terms, Donation Terms).
 * Keep the markup simple: dark page, white card, readable prose.
 */
const LegalPage = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-[#020617] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Driverse Foundation
        </a>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-slate-500 text-sm mb-8">
              Last updated: {lastUpdated}
            </p>
          )}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a:hover]:underline">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
