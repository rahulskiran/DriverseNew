import React from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationSuccess = () => {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center py-20 px-6 font-sans relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full text-center">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-green-900/10 border border-slate-100/50">
                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping opacity-30 pointer-events-none" />
                        <CheckCircle size={40} className="text-green-600 relative z-10" />
                    </div>

                    <h1 className="text-3xl md:text-4xl heading-display text-slate-900 mb-3">
                        Thank <span className="text-green-600">You!</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-4 max-w-sm mx-auto body-light">
                        Your donation to the Driverse Foundation has been processed successfully. Your generosity makes a real difference in the lives of truck drivers across the country.
                    </p>

                    <div className="bg-green-50 rounded-2xl p-4 mb-8 border border-green-100">
                        <p className="text-green-800 text-xs md:text-sm font-semibold">
                            A donation confirmation will be sent to your email address shortly.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-8 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 active:scale-[0.98] group"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>
                        <Link
                            to="/#donate"
                            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-8 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] group"
                        >
                            Donate Again
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationSuccess;
