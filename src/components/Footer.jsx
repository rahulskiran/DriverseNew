import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Send, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../lib/validation';

const API_URL = import.meta.env.VITE_API_URL || '';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [honeypot, setHoneypot] = useState('');

    const getRecaptchaToken = async () => {
        if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return '';
        try {
            return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'subscribe' });
        } catch {
            return '';
        }
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setError('');

        const emailValidation = validateEmail(email);
        if (!emailValidation.valid) {
            setError(emailValidation.error);
            return;
        }

        setIsSubmitting(true);

        try {
            const recaptchaToken = await getRecaptchaToken();

            const response = await fetch(`${API_URL}/api/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    recaptchaToken,
                    honeypot,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Subscription failed. Please try again.');
            }

            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const legalLinks = [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Refund Policy', to: '/refund' },
    ];

    const socialLinks = [
        { Icon: Facebook, href: '#', label: 'Facebook' },
        { Icon: Twitter, href: '#', label: 'Twitter' },
        { Icon: Instagram, href: '#', label: 'Instagram' },
        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="relative bg-[#020617] pt-20 md:pt-28 pb-12 overflow-hidden font-sans border-t border-slate-800/50">
            {/* ========== BACKGROUND NOISE EFFECT ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterFooter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterFooter)" />
                </svg>
            </div>

            {/* ========== ACCENT GRADIENTS ========== */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-16 md:mb-24">

                    {/* Column 1: Logo & About */}
                    <div className="flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-2 mb-8 group cursor-pointer block">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-xl font-black">D</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Driverse<span className="text-blue-500">Foundation</span>
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs body-light opacity-80">
                            A non-profit organization dedicated to the unsung heroes of our highways. Empowering truck drivers through health, wellness, and safety initiatives.
                        </p>

                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-xl"
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>


                    {/* Column 2: Support */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8 heading-display">
                            Support
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Donate Now', href: '#donate' },
                                { label: 'Volunteer With Us', href: '#donate' },
                                { label: 'Partner With Us', href: '#foundation' },
                                { label: 'Request Support', href: '#programs' }
                            ].map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-slate-400 hover:text-blue-500 text-sm transition-colors duration-300 flex items-center gap-2 group">
                                        <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Get In Touch */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8 heading-display">
                            Get In Touch
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500 mt-1">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                                    5200 Dixie Rd, Mississauga, ON L4W 1E4, Canada
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Phone size={18} />
                                </div>
                                <span className="text-slate-400 text-sm font-bold">
                                    +1 437 778 1697
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Mail size={18} />
                                </div>
                                <span className="text-slate-400 text-sm">
                                    driversefoundation@gmail.com
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Stay Updated */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8 heading-display">
                            Stay Updated
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-80">
                            Subscribe to our newsletter for the latest updates on workshops and driver resources.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            {/* Honeypot — invisible anti-bot field */}
                            <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                                <input
                                    type="text"
                                    name="phone_number"
                                    autoComplete="off"
                                    tabIndex={-1}
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    placeholder="Email Address"
                                    disabled={subscribed || isSubmitting}
                                    className="w-full bg-[#0a1122] border border-slate-800 rounded-xl py-4 px-5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-xs">
                                    <AlertCircle size={14} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={subscribed || isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-sm transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {subscribed ? (
                                    <>Subscribed! ✓</>
                                ) : isSubmitting ? (
                                    <>Subscribing...</>
                                ) : (
                                    <>
                                        Subscribe
                                        <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                        <p className="text-slate-500 text-xs font-medium">
                            © 2026 Driverse Foundation. All Rights Reserved.<br />
                            Driverse Foundation is a federally incorporated Canadian nonprofit organization.<br />
                            Corporation No. 1758326-5 · BN: 748767639 RC0001 · Registered under the Canada Not-for-profit Corporations Act.
                        </p>
                        <span className="hidden md:block text-slate-700">|</span>
                        <a
                            href="https://www.texnoid.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none border border-slate-800 md:border-none text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                            Built by <span className="text-slate-400 font-bold hover:text-blue-500 transition-colors">Texnoid Solutions LLP</span>
                        </a>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
