import type { Metadata } from 'next';
import LegalLayout from '@/components/legal/LegalLayout';
import Placeholder from '@/components/legal/Placeholder';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing your use of Iwacuflix.',
  alternates: { canonical: '/terms-and-conditions' },
  openGraph: {
    title: 'Terms & Conditions | Iwacuflix',
    description: 'The terms and conditions governing your use of Iwacuflix.',
    url: '/terms-and-conditions',
  },
};

const LAST_UPDATED = 'August 23, 2026';

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms &amp; Conditions"
      lastUpdated={LAST_UPDATED}
      intro="These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of Iwacuflix (&ldquo;the Service&rdquo;). By using the Service, you agree to these Terms."
    >
      <h2 id="acceptance">1. Acceptance of Terms</h2>
      <p>By accessing or using Iwacuflix, you agree to be bound by these Terms and by our <a href="/privacy-policy">Privacy Policy</a>. If you do not agree, please do not use the Service.</p>

      <h2 id="eligibility">2. Eligibility</h2>
      <p>You must be legally permitted to use online streaming services in your jurisdiction, and meet any applicable minimum age requirements (generally <Placeholder>[MINIMUM AGE, e.g., 13 or 16]</Placeholder> years or older, or the age of majority where you live) to use the Service. By using the Service, you represent that you meet these requirements.</p>

      <h2 id="accounts">3. Accounts</h2>
      <p>The Service does not currently offer public user registration — you can browse and watch published content without creating an account. A separate administrative login exists solely so the site operator can manage content, and is not available for public sign-up. Whoever holds administrative credentials is responsible for keeping them confidential and for all activity under that login.</p>

      <h2 id="acceptable-use">4. Acceptable Use</h2>
      <p>When using the Service, you agree not to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose or in violation of any applicable law;</li>
        <li>Attempt to gain unauthorized access to the Service, its underlying systems, or the administrative panel;</li>
        <li>Interfere with, disrupt, or place undue load on the Service (including automated scraping or denial-of-service attempts);</li>
        <li>Upload or transmit malware, or otherwise compromise the security of the Service;</li>
        <li>Use the contact form to send spam, phishing attempts, or harassing messages;</li>
        <li>Impersonate any person or entity, or misrepresent your affiliation with anyone;</li>
        <li>Infringe the intellectual property or other rights of any third party; or</li>
        <li>Circumvent, disable, or otherwise interfere with security-related features of the Service.</li>
      </ul>

      <h2 id="intellectual-property">5. Intellectual Property</h2>
      <p>The Iwacuflix name, logo, website design, layout, original graphics, and underlying software are owned by us or our licensors and are protected by applicable intellectual property laws. You may not copy, modify, distribute, or create derivative works from these elements without prior written permission.</p>
      <p>Video content made available through the Service may be sourced from, hosted by, or embedded from third-party providers. We do not claim ownership over third-party content that we do not own, and all trademarks, titles, and content remain the property of their respective owners. See our <a href="/dmca">DMCA / Copyright Policy</a> for how we handle infringement concerns.</p>

      <h2 id="user-submitted-content">6. User-Submitted Content</h2>
      <p>Public visitors do not upload or publish content on the Service — the content catalog is managed solely by the site administrator. If you submit information through the Contact Us form, you confirm that it is accurate, that you have the right to share it, and that it does not infringe any third party&apos;s rights or violate any law. We may retain, use, and act on submitted messages as described in our <a href="/privacy-policy">Privacy Policy</a>, and may decline to act on or may remove/ignore messages that violate these Terms.</p>

      <h2 id="third-party-links">7. Third-Party Links &amp; Content</h2>
      <p>The Service may link to, or embed players from, third-party websites that we do not control (for example, video hosting or embed platforms). We are not responsible for the content, accuracy, availability, or practices of any third-party site, and your use of those sites is subject to their own terms and privacy policies.</p>

      <h2 id="disclaimer">8. Disclaimer</h2>
      <p>The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted and error-free operation. We do not guarantee that content will always be available, accurate, or free of errors.</p>

      <h2 id="limitation-of-liability">9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by applicable law, Iwacuflix and its operator(s) shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, or profits, arising out of or related to your use of, or inability to use, the Service, even if advised of the possibility of such damages.</p>

      <h2 id="termination">10. Termination</h2>
      <p>We may suspend or restrict access to the Service, in whole or in part, at any time and without prior notice — for example, in response to a violation of these Terms, a valid legal request, or for operational or security reasons.</p>

      <h2 id="changes">11. Changes to These Terms</h2>
      <p>We may revise these Terms from time to time. Material changes will be reflected by updating the &ldquo;Last updated&rdquo; date above. Continuing to use the Service after changes take effect constitutes your acceptance of the revised Terms.</p>

      <h2 id="governing-law">12. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of{' '}
        <Placeholder>[GOVERNING LAW / JURISDICTION TO BE SPECIFIED BY THE WEBSITE OWNER]</Placeholder>, without regard to its conflict of law principles.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>Questions about these Terms can be sent via our <a href="/contact-us">Contact Us</a> page, or by email at <Placeholder>[OFFICIAL CONTACT EMAIL]</Placeholder>.</p>
    </LegalLayout>
  );
}
