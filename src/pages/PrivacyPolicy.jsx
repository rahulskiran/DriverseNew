import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Header */}
            <div className="bg-[#020617] py-16 md:py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium mb-8 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                            <Shield size={24} className="text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl heading-display text-white">Privacy Policy</h1>
                    </div>
                    <p className="text-slate-400 text-sm">Last updated: April 19, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The Driverse Foundation ("we," "our," or "us") is committed to protecting the privacy of our donors, 
                            volunteers, and website visitors. This Privacy Policy explains how we collect, use, disclose, and 
                            safeguard your information when you visit our website or make a donation. We comply with the 
                            Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable international 
                            privacy regulations including the General Data Protection Regulation (GDPR).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">We may collect the following types of information:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li><strong>Donation Information:</strong> Name, email address, billing address, and donation amount. Payment card information is processed directly by Stripe and is never stored on our servers.</li>
                            <li><strong>Newsletter Subscriptions:</strong> Email address only.</li>
                            <li><strong>Automatically Collected Data:</strong> IP address, browser type, operating system, referring URLs, and pages visited. This data is collected through standard web server logs.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>Process and confirm your donations</li>
                            <li>Issue donation acknowledgement letters</li>
                            <li>Send newsletter updates (only if you subscribe)</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal and regulatory requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Payment Processing</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            All payment transactions are processed through Stripe, a PCI DSS Level 1 certified payment processor. 
                            We never receive, store, or have access to your full credit card number. Stripe's privacy policy 
                            is available at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">stripe.com/privacy</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Sharing and Disclosure</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                            We do not sell, trade, or rent your personal information to third parties. We may share your data only with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li><strong>Payment Processors:</strong> Stripe, for processing donations</li>
                            <li><strong>Legal Authorities:</strong> When required by law, court order, or governmental regulation</li>
                            <li><strong>Service Providers:</strong> Trusted vendors who assist in operating our website, under strict confidentiality agreements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, 
                            Content Security Policy headers, rate limiting, and bot detection mechanisms. All sensitive data is 
                            encrypted at rest. However, no electronic transmission or storage method is 100% secure, and we 
                            cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>Access and obtain a copy of your personal data</li>
                            <li>Request correction of inaccurate personal data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Unsubscribe from newsletter communications at any time</li>
                            <li>Withdraw consent for data processing</li>
                        </ul>
                        <p className="text-slate-600 text-sm leading-relaxed mt-3">
                            To exercise any of these rights, please contact us at <strong>driversefoundation@gmail.com</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">8. Cookies</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Our website may use essential cookies required for security features (such as reCAPTCHA). We do not 
                            use tracking cookies or third-party advertising cookies. We do not use Google Analytics or similar 
                            tracking tools.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">9. Data Retention</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Donation records are retained for a minimum of 7 years as required by Canadian tax law. Newsletter 
                            subscriptions are retained until you unsubscribe. All other personal data is deleted when no longer 
                            necessary for the purposes for which it was collected.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to This Policy</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with 
                            an updated revision date. Continued use of our website after changes constitutes acceptance of the 
                            revised policy.
                        </p>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-2">Contact Us</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            For questions about this Privacy Policy or to exercise your data rights, contact us at:<br />
                            <strong>Email:</strong> driversefoundation@gmail.com<br />
                            <strong>Phone:</strong> +1 437 383 9224<br />
                            <strong>Address:</strong> 5200 Dixie Rd, Mississauga, ON L4W 1E4, Canada
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
