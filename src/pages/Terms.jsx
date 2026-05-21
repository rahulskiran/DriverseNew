import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
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
                            <FileText size={24} className="text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl heading-display text-white">Terms & Conditions</h1>
                    </div>
                    <p className="text-slate-400 text-sm">Last updated: April 19, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            By accessing and using the Driverse Foundation website ("Site"), you accept and agree to be bound by 
                            these Terms & Conditions. If you do not agree with any part of these terms, you must not use the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. About the Driverse Foundation</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The Driverse Foundation is a registered non-profit organization dedicated to the health, safety, and 
                            well-being of truck drivers. We operate out of Mississauga, Ontario, Canada, and provide services 
                            to drivers nationwide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Donations</h2>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>All donations are voluntary and processed securely through Stripe.</li>
                            <li>Driverse Foundation is a federally incorporated Canadian nonprofit (Corporation No. 1758326-5). We are not yet a registered charity with the CRA and are unable to issue tax receipts at this time. Donors will be notified once charitable status is obtained.</li>
                            <li>The minimum donation amount is $1 USD and the maximum is $25,000 USD per transaction.</li>
                            <li>All donations are in United States Dollars (USD) unless otherwise specified.</li>
                            <li>By making a donation, you confirm that the payment method used belongs to you or that you have authorization to use it.</li>
                            <li>The Driverse Foundation reserves the right to refuse any donation at its discretion.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Use of Funds</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Donations are used to fund our core programs: Health & Wellness initiatives, Safety Training Academy, 
                            Peer Support Network, Newcomer Pathways, and Crisis Response. While we strive to allocate funds 
                            according to donor preferences, the Foundation reserves the right to direct funds where they are most needed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Intellectual Property</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            All content on this Site, including but not limited to text, graphics, logos, images, audio, video, 
                            and software, is the property of the Driverse Foundation and is protected by Canadian and international 
                            copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content 
                            on this Site without prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The Driverse Foundation provides this Site on an "as is" and "as available" basis. We make no warranties 
                            or representations about the accuracy, completeness, or reliability of the Site. To the fullest extent 
                            permitted by law, we disclaim all liability for any direct, indirect, incidental, consequential, or 
                            special damages arising from your use of the Site or any donation made through the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">7. User Conduct</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">When using this Site, you agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>Use the Site for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
                            <li>Transmit any malicious code, viruses, or harmful data</li>
                            <li>Use automated tools (bots, scrapers, etc.) against the Site</li>
                            <li>Make fraudulent donations or use stolen payment instruments</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">8. Third-Party Services</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Our Site uses third-party services including Stripe for payment processing and Google reCAPTCHA for 
                            security. Your use of these services is subject to their respective terms and privacy policies. We 
                            are not responsible for the practices of third-party service providers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">9. Governing Law</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            These Terms are governed by and construed in accordance with the laws of the Province of Ontario, 
                            Canada. Any disputes arising from these Terms or your use of the Site shall be subject to the 
                            exclusive jurisdiction of the courts of Ontario, Canada.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to Terms</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                            posting on this page. Your continued use of the Site after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-2">Questions?</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            If you have questions about these Terms & Conditions, please contact us at:<br />
                            <strong>Email:</strong> driversefoundation@gmail.com<br />
                            <strong>Phone:</strong> +1 437 383 9224
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
