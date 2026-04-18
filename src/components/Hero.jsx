import React, { useState, useEffect } from 'react';
import { Menu, MoveRight, X } from 'lucide-react';
import Button from './Button';

const Hero = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Our Foundation", href: "#foundation" },
        { name: "Programs", href: "#programs" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" }
    ];

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu on click
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="font-inter text-white bg-[#020617]">
            {/* Navigation Header */}
            <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-center">
                <nav className="w-full max-w-6xl bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 px-5 py-2.5 md:px-8 md:py-3 flex items-center justify-between shadow-2xl relative z-50">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center cursor-pointer group/logo">
                        <img
                            src="/images/driverse-header-logo.png"
                            alt="Driverse"
                            className="h-10 w-auto shrink-0 sm:h-11 md:h-12 lg:h-14"
                            width={1453}
                            height={292}
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-[11px] nav-text uppercase text-slate-300 hover:text-white transition-all duration-300 relative group/link"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-white rounded-full transition-all duration-300 group-hover/link:w-4" />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="sm"
                            className="hidden sm:flex whitespace-nowrap px-6 border-none font-medium"
                            onClick={() => {
                                const donateSection = document.querySelector('#donate');
                                if (donateSection) {
                                    const offsetTop = donateSection.offsetTop - 100;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                        >
                            Donate Now
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2.5 hover:bg-white/10 transition-colors rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5 text-white" />
                            ) : (
                                <Menu className="h-5 w-5 text-white" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    <nav className="flex flex-col items-center gap-8 w-full px-6">
                        {navLinks.map((link, idx) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-2xl font-bold tracking-tight text-white hover:text-blue-500 transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div
                            className={`mt-8 w-full max-w-xs transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <Button
                                variant="primary"
                                className="w-full justify-center h-14"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const donateSection = document.querySelector('#donate');
                                    if (donateSection) {
                                        const offsetTop = donateSection.offsetTop - 100;
                                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                    }
                                }}
                            >
                                Donate Now
                            </Button>
                        </div>
                    </nav>
                </div>
            </header>


            {/* Hero Section Wrapper - Bottom-aligned on mobile, vertically centered on desktop */}
            <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end lg:justify-center">
                {/* Background Layer - Scoped specifically to this section */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Desktop Image */}
                    <div
                        className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: 'url("/images/16-9.webp")' }}
                    />
                    {/* Mobile Image */}
                    <div
                        className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: 'url("/images/Driverse Hero Mobile_1.webp")' }}
                    />

                    {/* ========== MOBILE OVERLAY ========== */}
                    <div className="block md:hidden absolute inset-0 bg-black/10" />

                    {/* ========== DESKTOP OVERLAY ========== */}
                    <div className="hidden md:block absolute inset-0 bg-black/30" />

                    {/* ========== MOBILE VIGNETTE ========== */}
                    <div
                        className="block md:hidden absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.5) 100%)'
                        }}
                    />

                    {/* ========== DESKTOP VIGNETTE ========== */}
                    <div
                        className="hidden md:block absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.7) 100%)'
                        }}
                    />
                </div>

                {/* Hero Content Area - Bottom-aligned on mobile, left-center on desktop */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 md:px-12 lg:px-24 flex flex-col lg:items-start lg:text-left">
                    <div className="mb-6 lg:mb-8 text-left w-full reveal delay-100">
                        <p className="text-blue-500 font-black text-sm md:text-sm uppercase tracking-[0.05em] drop-shadow-[0_0_12px_rgba(59,158,255,0.8)]">
                            Supporting Drivers, Every Mile
                        </p>
                    </div>

                    <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold heading-display mb-8 text-white w-full text-left reveal delay-200">
                        Driving Change<br />
                        for the Heroes.
                    </h1>

                    <p className="text-white/60 text-base md:text-base lg:text-lg mb-12 leading-relaxed max-w-2xl lg:max-w-xl body-light text-left reveal delay-300">
                        We are dedicated to the health, safety, and well-being of truck drivers.
                        Providing the essential resources needed to keep our global supply chain moving forward.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:max-w-md lg:max-w-4xl reveal delay-400">
                        <Button
                            variant="primary"
                            className="lg:w-fit lg:h-14 lg:text-base"
                            onClick={() => {
                                const donateSection = document.querySelector('#donate');
                                if (donateSection) {
                                    const offsetTop = donateSection.offsetTop - 100;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                        >
                            Make a Donation
                            <MoveRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                        </Button>
                        <Button
                            variant="secondary"
                            className="lg:w-fit lg:h-14 lg:text-base"
                            onClick={() => {
                                const programsSection = document.querySelector('#programs');
                                if (programsSection) {
                                    const offsetTop = programsSection.offsetTop - 100;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                        >
                            Our Programs
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
