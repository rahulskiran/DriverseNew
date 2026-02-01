import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Send } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer className="relative bg-[#020617] pt-16 md:pt-24 pb-8 overflow-hidden font-sans border-t border-slate-800/50">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 md:mb-24">

                    {/* Column 1: Logo & About */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-xl font-black">D</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Driverse<span className="text-blue-500">Foundation</span>
                            </span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs body-light opacity-80">
                            A non-profit organization dedicated to the unsung heroes of our highways. Empowering truck drivers through health, wellness, and safety initiatives.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-xl">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Programs */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8 heading-display">
                            Programs
                        </h4>
                        <ul className="space-y-4">
                            {['Health & Wellness', 'Safety Training', 'Peer Support', 'Newcomer Guide', 'Crisis Pathways'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 hover:text-blue-500 text-sm transition-colors duration-300 flex items-center gap-2 group">
                                        <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Get In Touch */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8 heading-display">
                            Get In Touch
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500 mt-1">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                                    123 Transport Boulevard, Logistics District, TC 90210
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Phone size={18} />
                                </div>
                                <span className="text-slate-400 text-sm font-bold">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Mail size={18} />
                                </div>
                                <span className="text-slate-400 text-sm">
                                    contact@driversefoundation.org
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Stay Updated */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8 heading-display">
                            Stay Updated
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-80">
                            Subscribe to our newsletter for the latest updates on workshops and driver resources.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    disabled={subscribed}
                                    className="w-full bg-[#0a1122] border border-slate-800 rounded-xl py-4 px-5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={subscribed}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-sm transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {subscribed ? (
                                    <>
                                        Subscribed! ✓
                                    </>
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
                    <p className="text-slate-500 text-xs font-medium">
                        © 2026 Driverse Foundation. All rights reserved.
                    </p>

                    <div className="flex items-center gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                            <a key={link} href="#" className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
