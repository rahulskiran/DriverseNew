import React from 'react';
import LegalPage from './LegalPage';

const TermsOfService = () => (
  <LegalPage title="Terms of Service" lastUpdated="April 2026">
    <p>
      These Terms of Service ("Terms") govern your use of the Driverse
      Foundation website at{' '}
      <a href="https://driversefoundation.com">driversefoundation.com</a> (the
      "Site"). By using the Site you agree to these Terms. If you do not agree,
      please do not use the Site.
    </p>

    <h2>1. About Driverse Foundation</h2>
    <p>
      Driverse Foundation is a nonprofit initiative focused on the safety,
      health, and wellness of professional drivers. Specific tax-exempt status,
      registered entity name, and state of formation are listed in our{' '}
      <a href="/donation-terms">Donation Terms</a>.
    </p>

    <h2>2. Use of the Site</h2>
    <ul>
      <li>
        You agree to use the Site only for lawful purposes and in a way that
        does not infringe the rights of others or restrict their use of the
        Site.
      </li>
      <li>
        You may not attempt to gain unauthorized access to any portion of the
        Site, probe for vulnerabilities, or run automated tooling that degrades
        service for other users.
      </li>
      <li>
        You may not use the Site to transmit malware, send spam, or solicit
        donors on our behalf without written permission.
      </li>
    </ul>

    <h2>3. Donations</h2>
    <p>
      Online donations are processed by Stripe. By making a donation you
      acknowledge that you have read and agreed to our{' '}
      <a href="/donation-terms">Donation Terms</a> and our{' '}
      <a href="/privacy">Privacy Policy</a>.
    </p>

    <h2>4. Intellectual property</h2>
    <p>
      All content on the Site — including text, graphics, logos, and the
      "Driverse" and "Driverse Foundation" names — is owned by Driverse
      Foundation or its licensors and is protected by applicable copyright and
      trademark laws. You may view and share content for personal,
      non-commercial purposes, with attribution. You may not copy, modify, or
      use the content for commercial purposes without our prior written consent.
    </p>

    <h2>5. Third-party links and services</h2>
    <p>
      The Site may link to or integrate with third-party services (such as
      Stripe for payments). Driverse Foundation is not responsible for the
      content, privacy practices, or availability of third-party services, and
      your use of those services is governed by their own terms.
    </p>

    <h2>6. Disclaimers</h2>
    <p>
      The Site and all content are provided "as is" and "as available" without
      warranties of any kind, whether express or implied, including warranties
      of merchantability, fitness for a particular purpose, or
      non-infringement. We do not warrant that the Site will be uninterrupted,
      secure, or error-free.
    </p>
    <p>
      Information on the Site is provided for general educational and
      informational purposes and is not a substitute for professional medical,
      legal, financial, or safety advice.
    </p>

    <h2>7. Limitation of liability</h2>
    <p>
      To the maximum extent permitted by law, Driverse Foundation and its
      directors, officers, employees, and volunteers shall not be liable for any
      indirect, incidental, special, consequential, or punitive damages arising
      out of or relating to your use of the Site, even if advised of the
      possibility of such damages. Our total liability for any claim arising
      from the Site is limited to the greater of (a) the amount you donated in
      the 12 months preceding the claim, or (b) USD 100.
    </p>

    <h2>8. Indemnification</h2>
    <p>
      You agree to defend, indemnify, and hold harmless Driverse Foundation from
      and against any claims, damages, or expenses arising out of your use of
      the Site or violation of these Terms.
    </p>

    <h2>9. Termination</h2>
    <p>
      We may suspend or terminate your access to the Site at any time, without
      notice, for any reason, including violation of these Terms.
    </p>

    <h2>10. Changes to these Terms</h2>
    <p>
      We may update these Terms from time to time. Updates are effective when
      posted. Continued use of the Site after an update constitutes acceptance
      of the revised Terms.
    </p>

    <h2>11. Governing law</h2>
    <p>
      These Terms are governed by the laws of the United States and the state
      of Driverse Foundation's principal place of business, without regard to
      conflict-of-laws rules. You agree to the exclusive jurisdiction of the
      state and federal courts located in that state.
    </p>

    <h2>12. Contact</h2>
    <p>
      Questions about these Terms? Email{' '}
      <a href="mailto:contact@driversefoundation.org">contact@driversefoundation.org</a>.
    </p>

    <p className="text-xs text-slate-500 mt-8 italic">
      This page is a starting template. Before publishing widely, please have it
      reviewed by qualified counsel and fill in your registered entity name,
      mailing address, EIN, and state of formation where applicable.
    </p>
  </LegalPage>
);

export default TermsOfService;
