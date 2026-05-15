import React, { useState } from 'react';
import { Heart, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { validateDonationAmount, DONATION_MIN, DONATION_MAX } from '../lib/validation';

const API_URL = import.meta.env.VITE_API_URL || '';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const DonationSection = () => {
    const [selectedAmount, setSelectedAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [honeypot, setHoneypot] = useState('');

    const presets = [
        { value: 50, impact: "Provides 1 Safety Kit" },
        { value: 100, impact: "10h Veteran Mentorship" },
        { value: 250, impact: "Emergency Lodging Support" }
    ];

    const getRecaptchaToken = async () => {
        if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return '';
        try {
            return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'donate' });
        } catch {
            return '';
        }
    };

    const handleDonation = async (e) => {
        e.preventDefault();
        setError('');

        const rawAmount = customAmount ? customAmount : selectedAmount;
        const validation = validateDonationAmount(rawAmount);

        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        setIsProcessing(true);

        try {
            const recaptchaToken = await getRecaptchaToken();

            const response = await fetch(`${API_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: validation.sanitized,
                    recaptchaToken,
                    honeypot,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Payment service unavailable. Please try again.');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Unable to create checkout session.');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    const handleCustomAmountChange = (e) => {
        const val = e.target.value;

        // Prevent negatives
        if (val !== '' && parseFloat(val) < 0) return;

        // Limit decimal places to 2
        if (val.includes('.') && val.split('.')[1]?.length > 2) return;

        // Prevent exceeding max
        if (val !== '' && parseFloat(val) > DONATION_MAX) return;

        setCustomAmount(val);
        setSelectedAmount(null);
        setError('');
    };

    return (
        <section className="relative bg-white py-10 md:py-14 lg:py-16 overflow-hidden flex items-center justify-center font-sans border-t border-slate-100">
            {/* ========== DOT GRID BACKGROUND ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* ========== BACKGROUND NOISE EFFECT ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterDonation">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterDonation)" />
                </svg>
            </div>

            {/* ========== ACCENT GRADIENTS ========== */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full px-6">
                {/* Unified Donation Block */}
                <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-blue-900/10 border border-slate-100/50 reveal transition-all duration-500 hover:shadow-blue-900/15 delay-200">

                    {/* Header Inside Card */}
                    <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-lg shadow-blue-500/10 mb-4 group-hover:scale-110 transition-transform duration-500 relative">
                            {/* Subtle Pulse Ring */}
                            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping opacity-20 pointer-events-none" />
                            <Heart size={24} fill="currentColor" strokeWidth={1.5} className="relative z-10" />
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl heading-display text-slate-900 mb-2 md:mb-3">
                            Fuel the <span className="text-blue-600">Foundation.</span>
                        </h2>

                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-sm body-light italic">
                            "Every mile driven is a sacrifice. Your contribution honors that sacrifice by providing safety, health, and hope to those behind the wheel."
                        </p>
                    </div>

                    {/* Honeypot — invisible anti-bot field */}
                    <div className="absolute" style={{ left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                        <label htmlFor="website_url">Website</label>
                        <input
                            type="text"
                            id="website_url"
                            name="website_url"
                            autoComplete="off"
                            tabIndex={-1}
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </div>

                    {/* Form Controls */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5 md:mb-6">
                        {presets.map((preset) => (
                            <button
                                key={preset.value}
                                disabled={isProcessing}
                                onClick={() => {
                                    setSelectedAmount(preset.value);
                                    setCustomAmount('');
                                    setError('');
                                }}
                                className={`flex flex-col items-center justify-center py-3 md:py-4 rounded-xl transition-all duration-300 border ${selectedAmount === preset.value && !customAmount
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-500/30 hover:bg-blue-50/30'
                                    }`}
                            >
                                <span className="font-bold text-sm md:text-base">${preset.value}</span>
                                <span className={`text-[8px] md:text-[9px] mt-1 font-medium px-1 opacity-80 ${selectedAmount === preset.value && !customAmount ? 'text-blue-100' : 'text-slate-400'}`}>
                                    {preset.impact}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="relative mb-5 md:mb-6">
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm md:text-base group-focus-within:text-blue-600 transition-colors">$</span>
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                min={DONATION_MIN}
                                max={DONATION_MAX}
                                step="0.01"
                                disabled={isProcessing}
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 md:py-3.5 pl-12 pr-6 text-sm md:text-base font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1.5 pl-1">
                            Min ${DONATION_MIN} — Max ${DONATION_MAX.toLocaleString()}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm rounded-xl px-4 py-3 mb-5 md:mb-6 animate-fade-in-up">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 mb-6 md:mb-8 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4 md:pr-6 last:border-0 last:pr-0">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            Canadian Nonprofit
                        </div>
                        <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4 md:pr-6 last:border-0 last:pr-0">
                            <Lock size={10} className="text-blue-500" />
                            Encrypted Payment
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            100% Impact
                        </div>
                    </div>

                    <button
                        onClick={handleDonation}
                        disabled={isProcessing}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 active:scale-[0.98] group ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Redirecting to Checkout...
                            </>
                        ) : (
                            <>
                                Process Secure Donation
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>

                    {/* Security Footer */}
                    <p className="mt-4 text-[9px] text-slate-400 text-center font-medium opacity-60 flex items-center justify-center gap-1.5">
                        <Lock size={10} />
                        Payment secured by Stripe — PCI DSS Level 1 Certified
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DonationSection;
