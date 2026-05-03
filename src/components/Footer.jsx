import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 md:mb-24">

                    {/* Column 1: Logo & About */}
                    <div className="flex flex-col items-start">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex items-center gap-2 mb-8 group cursor-pointer"
                        >
                            <img
                                src="/images/driverse-header-logo.png"
                                alt="Driverse"
                                className="h-5 w-auto shrink-0 md:h-6"
                                width={1453}
                                height={292}
                            />
                            <span className="text-2xl font-bold tracking-tight text-blue-500">
                                Foundation
                            </span>
                        </a>

                        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs body-light opacity-80">
                            A non-profit organization dedicated to the unsung heroes of our highways. Empowering truck drivers through health, wellness, and safety initiatives.
                        </p>
                    </div>

                    {/* Column 2: Programs */}
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8 heading-display">
                            Programs
                        </h4>
                        <ul className="space-y-4">
                            {['Health & Wellness', 'Safety Training', 'Peer Support', 'Newcomer Guide', 'Crisis Pathways'].map((link) => (
                                <li key={link}>
                                    <a href="/#programs" className="text-slate-400 hover:text-blue-500 text-sm transition-colors duration-300 flex items-center gap-2 group">
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
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=5200+Dixie+Rd+Suite+206+Mississauga+ON+L5T+1C7+Canada"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 text-sm leading-relaxed max-w-[240px] hover:text-blue-400 transition-colors"
                                >
                                    5200 Dixie Rd, Suite 206<br />
                                    Mississauga, ON L5T 1C7, Canada
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Phone size={18} />
                                </div>
                                <a
                                    href="tel:+14377781697"
                                    className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                                >
                                    +1 (437) 778-1697
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                    <Mail size={18} />
                                </div>
                                <a
                                    href="mailto:contact@driversefoundation.org"
                                    className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                                >
                                    contact@driversefoundation.org
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                        <p className="text-slate-500 text-xs font-medium">
                            © {new Date().getFullYear()} Driverse Foundation. All rights reserved.
                        </p>
                        <span className="hidden md:block text-slate-700">|</span>
                        <a
                            href="https://www.texnoid.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none border border-slate-800 md:border-none text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                            Built by <span className="text-slate-400 font-bold hover:text-blue-500 transition-colors">Texnoid Solution LLP</span>
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8">
                        <a
                            href="/contact"
                            className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors"
                        >
                            Contact Us
                        </a>
                        <a
                            href="/privacy"
                            className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/donation-terms"
                            className="text-slate-500 hover:text-blue-500 text-xs font-medium transition-colors"
                        >
                            Donation Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
