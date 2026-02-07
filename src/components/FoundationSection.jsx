import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Shield, MapPin, Globe, Clock } from 'lucide-react';

const FoundationSection = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const sectionRef = useRef(null);

    const stats = [
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            value: "500",
            target: 500,
            suffix: "+",
            label: "Drivers Supported"
        },
        {
            icon: <Award className="w-6 h-6 text-blue-500" />,
            value: "50",
            target: 50,
            suffix: "+",
            label: "Safety Workshops"
        },
        {
            icon: <Shield className="w-6 h-6 text-blue-500" />,
            value: "100",
            target: 100,
            suffix: "%",
            label: "Crisis Interventions"
        },
        {
            icon: <MapPin className="w-6 h-6 text-blue-500" />,
            value: "48",
            target: 48,
            suffix: "",
            label: "States Covered"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateNumbers();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateNumbers = () => {
        const duration = 2000; // 2 seconds
        const frameRate = 1000 / 60; // 60 fps
        const totalFrames = Math.round(duration / frameRate);

        let frame = 0;
        const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad: 1 - (1 - x)^2
            const easedProgress = 1 - (1 - progress) * (1 - progress);

            setCounts(stats.map(stat => Math.floor(stat.target * easedProgress)));

            if (frame === totalFrames) {
                clearInterval(interval);
                setCounts(stats.map(stat => stat.target));
            }
        }, frameRate);
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-white flex items-center justify-center py-10 md:py-14 lg:py-16 font-sans text-slate-900 overflow-hidden">
            {/* ========== BACKGROUND NOISE / GRAIN EFFECT ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterSection">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterSection)" />
                </svg>
            </div>

            {/* ========== ACCENT GRADIENTS (Light Mode Style) ========== */}
            <div className="absolute top-0 -left-24 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-blue-500/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -right-24 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-blue-600/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

                    {/* Left Content Column */}
                    <div className="space-y-10 md:space-y-12">
                        <div className="space-y-6 md:space-y-8">
                            {/* Mission Identifier */}
                            <div className="flex items-center gap-3 reveal delay-100">
                                <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-pulse" />
                                <span className="text-blue-600 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                                    Our Mission
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-display text-slate-900 reveal delay-200 leading-[1.1]">
                                Bridging the Gap<br />
                                Between <span className="text-blue-600">the Road<br className="md:hidden" /> and Life.</span>
                            </h2>

                            <div className="space-y-5 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed max-w-xl body-light reveal delay-300">
                                <p className="text-slate-700">
                                    The road can be demanding and lonely. The Driverse Foundation bridges the gap between the pressures of logistics and the human needs of drivers.
                                </p>
                                <p className="text-slate-500">
                                    We believe healthy drivers are safer drivers—and we're here with support when it matters most.
                                </p>
                            </div>
                        </div>

                        {/* Feature Boxes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 reveal delay-400">
                            <div className="group flex items-start gap-4 p-5 md:p-6 border border-slate-200/40 rounded-[1.75rem] bg-gradient-to-br from-white to-slate-50/30 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-500">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-500 flex-shrink-0">
                                    <Globe className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="pt-0.5">
                                    <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1 tracking-tight">Nationwide</h4>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Resources across the country</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-4 p-5 md:p-6 border border-slate-200/40 rounded-[1.75rem] bg-gradient-to-br from-white to-slate-50/30 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-500">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-500 flex-shrink-0">
                                    <Clock className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="pt-0.5">
                                    <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1 tracking-tight">24/7 Support</h4>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Available whenever wheels turn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Stats Grid Column */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 reveal delay-500">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative p-6 sm:p-7 md:p-9 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/30 bg-gradient-to-br from-white via-white to-blue-50/20 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/8 hover:-translate-y-2 transition-all duration-700 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 overflow-hidden"
                            >
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/5 transition-all duration-700 rounded-[2rem] md:rounded-[2.5rem]" />

                                <div className="relative bg-blue-50 w-14 h-14 md:w-16 md:h-16 rounded-[1.125rem] md:rounded-[1.25rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
                                    {React.cloneElement(stat.icon, { className: "w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:text-white transition-colors duration-500" })}
                                </div>
                                <div className="relative space-y-1">
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                                        {counts[index]}{stat.suffix}
                                    </div>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FoundationSection;