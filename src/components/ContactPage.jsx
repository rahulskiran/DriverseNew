import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Send, Clock, MoveRight, CheckCircle2 } from 'lucide-react';
import Button from './Button';

const PHONE_DISPLAY = '+1 (437) 778-1697';
const PHONE_TEL = '+14377781697';
const EMAIL = 'contact@driversefoundation.org';
const ADDRESS_LINE_1 = '5200 Dixie Rd, Suite 206';
const ADDRESS_LINE_2 = 'Mississauga, ON L5T 1C7';
const ADDRESS_COUNTRY = 'Canada';
const MAPS_QUERY = encodeURIComponent('5200 Dixie Rd, Suite 206, Mississauga, ON L5T 1C7, Canada');

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(form.subject || `Contact form — ${form.name || 'New message'}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setSent(true);
    };

    return (
        <div className="relative min-h-screen bg-[#020617] font-sans text-white overflow-hidden">
            {/* ========== BACKGROUND NOISE ========== */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterContact">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterContact)" />
                </svg>
            </div>

            {/* ========== AMBIENT GLOWS ========== */}
            <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-[520px] h-[520px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-16">

                {/* ========== BACK LINK ========== */}
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Driverse Foundation
                </a>

                {/* ========== HERO HEADER ========== */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
                            We're here to help
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold heading-display text-white mb-6 leading-[1.05]">
                        Get in <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">touch</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed body-light max-w-2xl">
                        Whether you're a driver in need, a partner organization, a donor, or simply curious about our work — we'd love to hear from you. Reach out and a member of our team will get back to you shortly.
                    </p>
                </div>

                {/* ========== CONTACT INFO CARDS ========== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">

                    {/* Phone */}
                    <a
                        href={`tel:${PHONE_TEL}`}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/80 hover:border-blue-500/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                                <Phone size={20} />
                            </div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                                Call Us
                            </h3>
                            <p className="text-white text-lg md:text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                                {PHONE_DISPLAY}
                            </p>
                            <p className="text-slate-500 text-sm">
                                Tap to dial directly
                            </p>
                        </div>
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:${EMAIL}`}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/80 hover:border-blue-500/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                                <Mail size={20} />
                            </div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                                Email Us
                            </h3>
                            <p className="text-white text-base md:text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors break-all">
                                {EMAIL}
                            </p>
                            <p className="text-slate-500 text-sm">
                                We reply within 1–2 business days
                            </p>
                        </div>
                    </a>

                    {/* Address */}
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/80 hover:border-blue-500/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                                <MapPin size={20} />
                            </div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                                Visit Us
                            </h3>
                            <p className="text-white text-sm md:text-base font-semibold leading-relaxed group-hover:text-blue-400 transition-colors">
                                {ADDRESS_LINE_1}<br />
                                {ADDRESS_LINE_2}<br />
                                {ADDRESS_COUNTRY}
                            </p>
                        </div>
                    </a>
                </div>

                {/* ========== FORM + MAP ========== */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">

                    {/* ----- FORM ----- */}
                    <div className="lg:col-span-3 relative rounded-3xl bg-gradient-to-br from-slate-900/95 to-slate-900/60 border border-slate-800/80 p-6 md:p-10 backdrop-blur-xl overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative">
                            <h2 className="text-2xl md:text-3xl font-bold heading-display text-white mb-2">
                                Send us a message
                            </h2>
                            <p className="text-slate-400 text-sm md:text-base mb-8 body-light">
                                Fill out the form and we'll route it to the right person on our team.
                            </p>

                            {sent ? (
                                <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                                    <div className="w-14 h-14 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Almost there!</h3>
                                    <p className="text-slate-400 text-sm max-w-md">
                                        Your email client just opened with the message ready to send. If nothing appeared, just email us directly at{' '}
                                        <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:underline">{EMAIL}</a>.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Jane Doe"
                                                className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us a bit about your inquiry..."
                                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm transition-all resize-none"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full sm:w-auto sm:px-10"
                                        >
                                            Send Message
                                            <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                                        </Button>
                                        <p className="text-slate-500 text-xs mt-4">
                                            By submitting, you agree to be contacted at the email you provided. We never share your details.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* ----- MAP + HOURS ----- */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Map */}
                        <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/60 group">
                            <div className="aspect-[4/3] lg:aspect-auto lg:h-[360px] w-full">
                                <iframe
                                    title="Driverse Foundation office location"
                                    src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(0.4) contrast(1.1) brightness(0.85)' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 hover:bg-slate-950/90 text-white text-sm font-medium transition-all group/link"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-400" />
                                    Open in Google Maps
                                </span>
                                <MoveRight size={16} className="text-slate-400 group-hover/link:text-blue-400 group-hover/link:translate-x-1 transition-all" />
                            </a>
                        </div>

                        {/* Office Hours */}
                        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 to-slate-900/60 border border-slate-800/80 p-6 md:p-7 overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Clock size={18} />
                                    </div>
                                    <h3 className="text-white font-bold text-base tracking-tight">
                                        Office Hours
                                    </h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                                        <span className="text-slate-400">Monday – Friday</span>
                                        <span className="text-white font-medium">9:00 AM – 6:00 PM</span>
                                    </li>
                                    <li className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                                        <span className="text-slate-400">Saturday</span>
                                        <span className="text-white font-medium">10:00 AM – 4:00 PM</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-slate-400">Sunday</span>
                                        <span className="text-slate-500 font-medium">Closed</span>
                                    </li>
                                </ul>
                                <p className="text-slate-500 text-xs mt-5 leading-relaxed">
                                    All times Eastern (ET). For urgent driver support outside these hours, please email us — we monitor inboxes daily.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== FOOTER NOTE ========== */}
                <div className="mt-16 md:mt-24 text-center">
                    <p className="text-slate-500 text-sm">
                        Looking for something else?{' '}
                        <a href="/" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Return to homepage
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
