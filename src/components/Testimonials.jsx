import React from 'react';
import { ArrowRight, Users, Wrench, Handshake } from 'lucide-react';

const Testimonials = () => {
    const roles = [
        { icon: <Users className="w-5 h-5" />, label: "Drivers" },
        { icon: <Wrench className="w-5 h-5" />, label: "Mechanics" },
        { icon: <Handshake className="w-5 h-5" />, label: "Industry Partners" },
    ];

    return (
        <section className="relative bg-white flex flex-col items-center justify-center py-10 md:py-14 lg:py-16 overflow-hidden font-sans border-t border-slate-100/50">
            {/* ========== BACKGROUND NOISE Layer ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterTestimonials">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterTestimonials)" />
                </svg>
            </div>

            {/* Background Graphic Element (Soft Blur) */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform origin-top translate-x-20 pointer-events-none blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto w-full px-6 md:px-12 lg:px-24 text-center">
                {/* Section Tag */}
                <div className="flex items-center justify-center gap-3 mb-6 reveal delay-100">
                    <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-pulse" />
                    <span className="text-blue-600 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                        Join the Movement
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl heading-display text-slate-900 mb-4 md:mb-6 reveal delay-200">
                    Be Part of <span className="text-blue-600">Our Story.</span>
                </h2>

                {/* Subtext */}
                <p className="text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8 md:mb-10 body-light reveal delay-300">
                    Our programs launch in 2026. We're looking for drivers, mechanics, and industry partners to help us build something meaningful.
                </p>

                {/* Role Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-10 reveal delay-400">
                    {roles.map((role, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/30 text-slate-600 text-xs md:text-sm font-semibold hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-500"
                        >
                            <span className="text-blue-600">{role.icon}</span>
                            {role.label}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="reveal delay-500">
                    <a
                        href="mailto:info@driversefoundation.com"
                        className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-8 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-xl shadow-blue-500/25 active:scale-[0.98] group"
                    >
                        Contact Us
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            {/* Subtle bottom fade to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
        </section>
    );
};

export default Testimonials;
