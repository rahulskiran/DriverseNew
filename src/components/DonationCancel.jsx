import React from 'react';
import { XCircle, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationCancel = () => {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center py-20 px-6 font-sans relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full text-center">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/10 border border-slate-100/50">
                    {/* Cancel Icon */}
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                        <XCircle size={40} className="text-slate-400" />
                    </div>

                    <h1 className="text-3xl md:text-4xl heading-display text-slate-900 mb-3">
                        Payment <span className="text-slate-500">Cancelled</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto body-light">
                        Your donation was not completed. No charges have been made. If you experienced any issues, please don't hesitate to reach out to our team.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/#donate"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-8 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 active:scale-[0.98] group"
                        >
                            Try Again
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-8 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] group"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationCancel;
