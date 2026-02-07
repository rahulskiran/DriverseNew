import React, { useState } from 'react';
import { HelpCircle, Plus, Minus, ArrowRight } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick, delay }) => {
    return (
        <div
            className={`group mb-3 reveal`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-5 md:p-6 rounded-[1.25rem] transition-all duration-500 text-left border ${isOpen
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-500/10'
                    : 'bg-slate-900/40 border-slate-800/50 hover:border-blue-500/30 hover:bg-slate-900/60'
                    }`}
            >
                <span className={`font-bold text-sm md:text-base tracking-tight transition-colors duration-500 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-xl transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 md:p-8 text-slate-400 text-sm md:text-base leading-relaxed body-light">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How can I apply for financial assistance?",
            answer: "Applications can be submitted through our secure portal. You'll need to provide proof of CDL status and documentation of the hardship. Our review committee typically responds within 48-72 hours for urgent cases."
        },
        {
            question: "Are the safety workshops free for all drivers?",
            answer: "Yes! All Driverse Foundation workshops, including defensive driving and regulatory compliance, are 100% free for active drivers and fleet mechanics thanks to our generous donors."
        },
        {
            question: "I am a new driver. How do I find a mentor?",
            answer: "Our Newcomer Pathway program connects rookies with veterans based on their specific equipment type and route preferences. Simply sign up in the 'Mentorship' section of our app to get started."
        },
        {
            question: "Is my donation tax-deductible?",
            answer: "Absolutely. The Driverse Foundation is a registered 501(c)(3) non-profit organization. Every donation is tax-deductible to the full extent allowed by law, and you'll receive a receipt immediately."
        }
    ];

    return (
        <section className="relative bg-[#020617] py-10 md:py-14 lg:py-16 overflow-hidden flex items-center justify-center">
            {/* ========== BACKGROUND NOISE EFFECT ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterFAQ">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterFAQ)" />
                </svg>
            </div>

            {/* ========== ACCENT GRADIENTS (Dark Mode Style) ========== */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Header Content */}
                    <div className="sticky top-12">
                        <div className="flex items-center gap-3 mb-6 reveal delay-100">
                            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/10">
                                <HelpCircle size={22} />
                            </div>
                            <span className="text-blue-500 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs">
                                FAQ
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl heading-display text-white mb-4 md:mb-6 reveal delay-200">
                            Common <br /> <span className="text-blue-500">Questions.</span>
                        </h2>

                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-md body-light reveal delay-300">
                            We know you don't have time to waste. Here are quick answers to the most common questions about our programs and assistance.
                        </p>

                        <button className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3 group reveal shadow-xl shadow-black/20 delay-400">
                            Contact Support
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="w-full">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={activeIndex === index}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                delay={0.5 + index * 0.1}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
