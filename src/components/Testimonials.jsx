import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, role }) => (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white rounded-2xl p-5 md:p-6 shadow-xl shadow-blue-500/5 border border-slate-200/40 flex flex-col justify-between mx-3 my-1.5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
        <div>
            <div className="text-blue-500/20 mb-3 md:mb-4 group-hover:text-blue-500/40 transition-colors">
                <Quote size={24} fill="currentColor" />
            </div>
            <p className="text-slate-600 italic text-xs md:text-[13px] leading-relaxed mb-4 body-light whitespace-normal">
                "{quote}"
            </p>
        </div>

        <div className="pt-4 border-t border-slate-100/50">
            <h4 className="font-bold text-slate-900 text-xs tracking-tight">{name}</h4>
            <p className="text-blue-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">{role}</p>
        </div>
    </div>
);

const Testimonials = () => {
    const row1 = [
        {
            quote: "After my accident, I thought my career was over. The Foundation helped me navigate the legal maze and supported my family while I recovered.",
            name: "Michael R.",
            role: "Owner Operator, 15 Years"
        },
        {
            quote: "The mental health resources kept me sane during the holidays. Knowing there's someone to talk to at 2 AM makes all the difference.",
            name: "Gary T.",
            role: "Long-Haul Driver"
        },
        {
            quote: "As a new driver, the mentorship program was a lifesaver. I learned more in 3 months with my mentor than I did in driving school.",
            name: "David K.",
            role: "Rookie Driver"
        },
        {
            quote: "The emergency fund provided me with a bridge when my truck was in the shop for three weeks. It saved my small business.",
            name: "Marcus L.",
            role: "Independent Contractor"
        }
    ];

    const row2 = [
        {
            quote: "Their financial planning workshops helped me save enough to buy my own rig. I'm finally my own boss after 10 years on the road.",
            name: "Robert P.",
            role: "Owner Operator"
        },
        {
            quote: "The legal support they offer is unmatched. They helped me fight an unfair citation that would have ruined my clean CDL record.",
            name: "Chris W.",
            role: "Fleet Driver"
        },
        {
            quote: "The family support network is what makes this foundation special. They actually care about our families back home.",
            name: "John D.",
            role: "Cross-Country Driver"
        },
        {
            quote: "Being part of this community has changed my perspective on the industry. It's good to know someone has your back.",
            name: "Steve M.",
            role: "Regional Hauler"
        }
    ];

    return (
        <section className="relative bg-white flex flex-col py-10 md:py-12 lg:py-14 overflow-hidden font-sans border-t border-slate-100/50">
            {/* ========== BACKGROUND NOISELayer ========== */}
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

            {/* Header Section */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 mb-8 md:mb-10 relative z-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-pulse" />
                    <span className="text-blue-600 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                        Voices from the Road
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl heading-display text-slate-900 mt-4 md:max-w-2xl opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Real Stories, <span className="text-blue-600">Real Impact.</span>
                </h2>
            </div>

            {/* Marquee Rows Container */}
            <div className="relative z-10 space-y-2 md:space-y-3">
                {/* Lateral Fades for Premium "Contained" Look - Increased Dissolve */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-48 lg:w-64 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-48 lg:w-64 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none" />

                {/* Marquee Row 1: Right to Left */}
                <div className="flex overflow-hidden group select-none relative">
                    <div className="flex animate-scroll-left group-hover:[animation-play-state:paused] whitespace-nowrap">
                        {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                            <TestimonialCard key={`row1-${idx}`} {...item} />
                        ))}
                    </div>
                </div>

                {/* Marquee Row 2: Left to Right */}
                <div className="flex overflow-hidden group select-none relative">
                    <div className="flex animate-scroll-right group-hover:[animation-play-state:paused] whitespace-nowrap">
                        {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                            <TestimonialCard key={`row2-${idx}`} {...item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle bottom fade to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
        </section>
    );
};

export default Testimonials;
