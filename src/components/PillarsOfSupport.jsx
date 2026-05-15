import React, { useState } from 'react';
import { Heart, Shield, Users, GraduationCap, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const PillarsOfSupport = () => {
    const [activeTab, setActiveTab] = useState('crisis');

    const pillars = [
        {
            id: 'health',
            title: 'Health & Wellness',
            subtitle: 'Prioritizing the physical and mental well-being of every driver.',
            icon: <Heart size={20} />,
            color: 'blue',
            description: 'Long-haul driving takes a toll on the body and mind. Our comprehensive wellness initiatives focus on fatigue management, ergonomic practices, and mental resilience. We provide accessible resources that fit the on-the-road lifestyle.',
            features: [
                'Fatigue Management Strategies',
                'Mental Health First Aid',
                'Healthy Eating on the Road',
                'Ergonomic Driving Practices'
            ],
        },
        {
            id: 'safety',
            title: 'Safety Training Academy',
            subtitle: 'Equipping drivers with knowledge that saves lives.',
            icon: <Shield size={20} />,
            color: 'blue',
            description: "Safety is not just a policy; it's a culture. Our workshops are designed by industry veterans to address real-world challenges. From defensive driving techniques to understanding new regulations.",
            features: [
                'Defensive Driving Workshops',
                'Regulatory Compliance Updates',
                'Severe Weather Preparedness',
                'Vehicle Maintenance Basics'
            ],
        },
        {
            id: 'peer',
            title: 'Peer Support Network',
            subtitle: 'Building a brotherhood and sisterhood on the highway.',
            icon: <Users size={20} />,
            color: 'blue',
            description: 'Isolation is one of the biggest challenges drivers face. We create spaces—both digital and physical—where drivers can connect, share experiences, and find mentorship.',
            features: [
                '24/7 Peer Support Lines',
                'Mentorship for New Drivers',
                'Community Meetups',
                'Family Support Groups'
            ],
        },
        {
            id: 'newcomer',
            title: 'Newcomer Pathways',
            subtitle: 'Guiding the next generation of industry professionals.',
            icon: <GraduationCap size={20} />,
            color: 'blue',
            description: 'Entering the trucking industry can be overwhelming. We provide specialized resources for new drivers and mechanics, helping them navigate training standards and safety protocols.',
            features: [
                'Entry-Level Training Guides',
                'Safety Standards Certification',
                'Mechanic Apprenticeship Resources',
                'Industry Integration Workshops'
            ],
        },
        {
            id: 'crisis',
            title: 'Crisis Response Pathways',
            subtitle: 'Immediate assistance when it matters most.',
            icon: <AlertCircle size={20} />,
            color: 'blue',
            description: 'Accidents, medical emergencies, or sudden hardships can happen to anyone. Our crisis pathways connect drivers directly to trusted resources, emergency funds, and urgent care networks.',
            features: [
                'Emergency Financial Aid',
                'Urgent Medical Referrals',
                'Legal Aid Connections',
                'Family Emergency Coordination'
            ],
        }
    ];

    const activePillar = pillars.find(p => p.id === activeTab);

    return (
        <section className="relative min-h-screen bg-white flex items-center justify-center py-8 md:py-12 lg:py-16 font-sans text-slate-900 overflow-hidden">
            {/* ========== BACKGROUND NOISE / GRAIN EFFECT ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterPillars">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterPillars)" />
                </svg>
            </div>

            {/* ========== ACCENT GRADIENTS ========== */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-24">
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-12">
                    <div className="flex items-center justify-center gap-3 reveal delay-100">
                        <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-pulse" />
                        <span className="text-blue-600 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                            Core Initiatives
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl heading-display text-slate-900 mt-4 mb-4 reveal delay-200">
                        Five Pillars of <span className="text-blue-600">Support.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed body-light reveal delay-300">
                        We focus on the essential aspects of a driver's life, ensuring comprehensive support where it matters most—on and off the road.
                    </p>
                </div>

                {/* Interactive Section */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch reveal delay-400">

                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3">
                        {pillars.map((pillar) => (
                            <button
                                key={pillar.id}
                                onClick={() => setActiveTab(pillar.id)}
                                className={`flex flex-1 items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all duration-500 text-left border ${activeTab === pillar.id
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 lg:translate-x-2'
                                    : 'bg-white border-slate-200/50 text-slate-600 hover:border-blue-500/30 hover:bg-blue-50/30'
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl transition-colors duration-500 ${activeTab === pillar.id ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-blue-50'}`}>
                                    {pillar.icon}
                                </div>
                                <span className="font-bold text-sm md:text-base tracking-tight flex-grow">{pillar.title}</span>
                                {activeTab === pillar.id && <ArrowRight size={18} className="opacity-80 animate-pulse" />}
                            </button>
                        ))}
                    </div>

                    {/* Content Card */}
                    <div className="w-full lg:w-2/3 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-blue-500/5 border border-slate-200/50 flex flex-col justify-between transition-all duration-500">
                        <div className="animate-fadeInUp" key={activeTab}>
                            <div className="flex flex-col md:flex-row md:items-center gap-5 mb-6">
                                <div className="p-4 w-fit rounded-[1.25rem] shadow-lg bg-blue-50 text-blue-600 shadow-blue-500/10">
                                    {React.cloneElement(activePillar.icon, { size: 28 })}
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{activePillar.title}</h3>
                                    <p className="text-blue-600 font-semibold text-sm md:text-base body-light">{activePillar.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-3xl body-light italic">
                                "{activePillar.description}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
                                {activePillar.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-[1.125rem] bg-slate-50/50 border border-slate-200/40 hover:bg-white hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group">
                                        <CheckCircle2 size={18} className="text-blue-500 shrink-0 transition-transform group-hover:scale-110" />
                                        <span className="text-slate-700 font-semibold text-xs md:text-sm tracking-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 mt-auto">
                            <a
                                href="#donate"
                                className="inline-flex items-center gap-3 text-blue-600 text-sm md:text-base font-bold hover:gap-5 transition-all group"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.querySelector('#donate');
                                    if (el) {
                                        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                                    }
                                }}
                            >
                                Support this program
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PillarsOfSupport;
