import React from 'react';
import LegalPage from './LegalPage';

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" lastUpdated="April 2026">
    <p>
      Driverse Foundation ("Driverse Foundation," "we," "us," or "our") operates
      the website at <a href="https://driversefoundation.com">driversefoundation.com</a>{' '}
      (the "Site"). This Privacy Policy explains what information we collect when
      you visit the Site or make a donation, how we use it, and the choices you
      have.
    </p>

    <h2>1. Information we collect</h2>
    <h3>Information you provide</h3>
    <ul>
      <li>
        <strong>Donation details.</strong> When you donate, our payment processor
        (Stripe) collects your name, email address, billing address, and payment
        card information. Driverse Foundation receives the donation amount, a
        donation reference ID, and the name and email you provided; we do not
        receive or store full card numbers, CVVs, or bank credentials.
      </li>
      <li>
        <strong>Contact messages.</strong> If you email us or fill in a form, we
        receive the contents of that message along with your email address.
      </li>
    </ul>
    <h3>Information collected automatically</h3>
    <ul>
      <li>
        <strong>Technical data.</strong> Basic request metadata such as IP
        address, browser type, referring URL, and page accessed. This is used
        for security, error diagnostics, and aggregate analytics.
      </li>
      <li>
        <strong>Cookies.</strong> The Site may use a small number of
        strictly-necessary cookies to operate (for example, to maintain a
        session during checkout). We do not use third-party advertising cookies.
      </li>
    </ul>

    <h2>2. How we use information</h2>
    <ul>
      <li>To process donations and send acknowledgments / receipts.</li>
      <li>To respond to questions, feedback, and support requests.</li>
      <li>To operate, maintain, and improve the Site and our programs.</li>
      <li>
        To comply with our legal obligations (for example, nonprofit
        recordkeeping and tax reporting).
      </li>
    </ul>

    <h2>3. Payment processing</h2>
    <p>
      All card payments are handled by <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe, Inc.</a>,
      a PCI-DSS compliant payment processor. Stripe's handling of your payment
      information is governed by their own privacy policy and terms. Driverse
      Foundation does not have access to your full card details.
    </p>

    <h2>4. How we share information</h2>
    <p>We do not sell or rent your personal information. We share data only:</p>
    <ul>
      <li>
        With service providers that help us operate the Site (for example,
        Stripe for payments, and hosting/email providers) under obligations of
        confidentiality.
      </li>
      <li>
        When required by law, subpoena, or valid government request, or to
        protect the rights, property, or safety of Driverse Foundation, our
        donors, or the public.
      </li>
      <li>
        In connection with a merger, acquisition, or asset transfer of the
        organization, subject to this Privacy Policy.
      </li>
    </ul>

    <h2>5. Data retention</h2>
    <p>
      We keep donation records for as long as required by applicable tax and
      nonprofit recordkeeping laws. Other personal data is retained only as long
      as necessary for the purposes described above.
    </p>

    <h2>6. Security</h2>
    <p>
      We use industry-standard safeguards, including HTTPS/TLS, strict
      server-side validation of donation requests, and secure credential
      handling. No online service can be guaranteed 100% secure; you share
      information with us at your own risk.
    </p>

    <h2>7. Your rights</h2>
    <p>
      Depending on where you live, you may have the right to request access to,
      correction of, or deletion of your personal information, and to object to
      or restrict certain processing. To make a request, email us at
      {' '}<a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>.
      We will verify your identity before acting on a request.
    </p>

    <h2>8. Children's privacy</h2>
    <p>
      The Site is not directed to children under 13, and we do not knowingly
      collect personal information from children. If you believe a child has
      provided us personal information, please contact us so we can delete it.
    </p>

    <h2>9. International users</h2>
    <p>
      Driverse Foundation operates in the United States. If you access the Site
      from outside the U.S., your information may be transferred to, stored, and
      processed in the United States.
    </p>

    <h2>10. Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. When we do, we will
      revise the "Last updated" date above and, for material changes, provide a
      more prominent notice on the Site.
    </p>

    <h2>11. Contact</h2>
    <p>
      Questions? Email{' '}
      <a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>.
    </p>

    <p className="text-xs text-slate-500 mt-8 italic">
      This page is a starting template. Before publishing widely, please have it
      reviewed by qualified counsel and fill in your registered entity name,
      mailing address, EIN, and state of formation where applicable.
    </p>
  </LegalPage>
);

export default PrivacyPolicy;
