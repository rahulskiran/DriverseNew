import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const RefundPolicy = () => {
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
                            <RotateCcw size={24} className="text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl heading-display text-white">Refund Policy</h1>
                    </div>
                    <p className="text-slate-400 text-sm">Last updated: April 19, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The Driverse Foundation values every donor's generosity. We understand that circumstances may arise 
                            where a refund is necessary. This policy outlines the conditions under which refunds may be issued 
                            for donations made through our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Refund Eligibility</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">Refunds may be issued in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li><strong>Duplicate Donations:</strong> If a donor is charged more than once for the same intended donation due to a technical error</li>
                            <li><strong>Incorrect Amount:</strong> If the donor was charged an amount different from what was intended</li>
                            <li><strong>Unauthorized Transactions:</strong> If a donation was made without the cardholder's authorization</li>
                            <li><strong>Request Within 30 Days:</strong> Voluntary refund requests submitted within 30 days of the donation date</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. How to Request a Refund</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">To request a refund, please contact us with the following information:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>Your full name</li>
                            <li>Email address used for the donation</li>
                            <li>Date and amount of the donation</li>
                            <li>Reason for the refund request</li>
                        </ul>
                        <p className="text-slate-600 text-sm leading-relaxed mt-3">
                            Send your request to <strong>driversefoundation@gmail.com</strong> with the subject line "Refund Request."
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Processing Time</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Refund requests are reviewed within 5–7 business days. If approved, the refund will be processed 
                            through the original payment method (Stripe). Please allow an additional 5–10 business days for the 
                            refund to appear on your statement, depending on your financial institution.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Non-Refundable Circumstances</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">Refunds will generally not be issued for:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                            <li>Donations made more than 30 days ago (unless unauthorized)</li>
                            <li>Donations where a tax receipt has already been claimed (a corrected receipt will be issued if refunded)</li>
                            <li>Change of mind after funds have already been allocated to a specific program</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Tax Implications</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            If a tax receipt was issued for a donation that is subsequently refunded, a corrected or voided receipt 
                            will be provided. It is the donor's responsibility to adjust their tax filings accordingly. The 
                            Driverse Foundation is not responsible for any tax consequences arising from a refunded donation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">7. Chargebacks</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We encourage donors to contact us directly before initiating a chargeback with their bank. We are 
                            committed to resolving any issues promptly and fairly. Chargebacks incur processing fees and may 
                            delay resolution.
                        </p>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-2">Contact Us</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            For refund requests or questions about this policy:<br />
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

export default RefundPolicy;
