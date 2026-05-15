import React from 'react';
import LegalPage from './LegalPage';

const DonationTerms = () => (
  <LegalPage title="Donation Terms" lastUpdated="April 2026">
    <p>
      Thank you for supporting Driverse Foundation. These Donation Terms
      describe how donations are processed and acknowledged. Please read them
      carefully.
    </p>

    <h2>1. Organization details</h2>
    <ul>
      <li>
        <strong>Operating name:</strong> Driverse Foundation
      </li>
      <li>
        <strong>Registered legal name:</strong> [Registered legal name — to be
        filled in]
      </li>
      <li>
        <strong>EIN (Employer Identification Number):</strong> [EIN — to be
        filled in once issued by the IRS]
      </li>
      <li>
        <strong>U.S. tax-exempt status:</strong> [State current status clearly,
        e.g. "501(c)(3) application pending" or "Recognized as tax-exempt under
        IRC §501(c)(3), determination letter dated ____"]
      </li>
      <li>
        <strong>Mailing address:</strong> [Registered mailing address — to be
        filled in]
      </li>
    </ul>

    <h2>2. How donations are processed</h2>
    <p>
      Online donations on this Site are processed by{' '}
      <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe, Inc.</a>
      Your payment card information is sent directly to Stripe over a secure
      connection; Driverse Foundation does not receive or store your full card
      details.
    </p>
    <p>
      You will receive a payment confirmation from Stripe by email. Driverse
      Foundation may separately send an acknowledgment email for your records.
    </p>

    <h2>3. Currency and amounts</h2>
    <p>
      All donation amounts on the Site are listed and processed in United
      States dollars (USD). Minimum donation: $1. Maximum online donation per
      transaction: $100,000; for larger gifts, please email{' '}
      <a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>.
    </p>

    <h2>4. Tax deductibility</h2>
    <p>
      If Driverse Foundation is recognized as tax-exempt under Internal Revenue
      Code §501(c)(3), contributions to Driverse Foundation are deductible to
      the extent permitted by U.S. federal tax law. No goods or services are
      provided in exchange for your donation, unless expressly stated at the
      time of the gift.
    </p>
    <p>
      We recommend you consult your tax advisor regarding deductibility. This
      Site does not provide tax advice. If our tax-exempt status has not yet
      been recognized, we will make this clear at the point of donation and
      will not represent donations as tax-deductible until we have received a
      formal IRS determination.
    </p>

    <h2>5. Use of funds</h2>
    <p>
      Unless you designate a specific program, donations support the general
      mission of Driverse Foundation, including driver health and wellness,
      safety training, peer support, newcomer guidance, and crisis pathways.
      Driverse Foundation retains full discretion over how unrestricted funds
      are applied.
    </p>

    <h2>6. Refunds</h2>
    <p>
      Donations are generally non-refundable. If you believe your donation was
      made in error (for example, a duplicate charge or the wrong amount),
      please email{' '}
      <a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>{' '}
      within 30 days of the transaction. Each request is reviewed
      individually; refunds, when granted, are returned to the original payment
      method via Stripe.
    </p>

    <h2>7. Chargebacks</h2>
    <p>
      If you dispute a charge with your card issuer instead of contacting us,
      we may be prevented from responding quickly. We strongly encourage you to
      contact us first so we can help resolve the issue.
    </p>

    <h2>8. Recurring donations</h2>
    <p>
      Recurring (subscription) donations are not offered at this time. All
      online donations are one-time gifts.
    </p>

    <h2>9. Privacy of donor information</h2>
    <p>
      We handle donor information in accordance with our{' '}
      <a href="/privacy">Privacy Policy</a>. We do not sell or rent donor
      information.
    </p>

    <h2>10. Contact</h2>
    <p>
      Questions about donations, acknowledgments, or tax receipts? Email{' '}
      <a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>.
    </p>

    <p className="text-xs text-slate-500 mt-8 italic">
      This page is a starting template. Before publishing widely, please have
      it reviewed by qualified counsel and fill in the registered entity name,
      EIN, mailing address, and current IRS tax-exempt status.
    </p>
  </LegalPage>
);

export default DonationTerms;
