import type { Metadata } from 'next';
import LegalLayout from '@/components/legal/LegalLayout';
import Placeholder from '@/components/legal/Placeholder';

export const metadata: Metadata = {
  title: 'DMCA / Copyright Policy',
  description: 'How Iwacuflix handles copyright infringement notices and protects intellectual property rights.',
  alternates: { canonical: '/dmca' },
  openGraph: {
    title: 'DMCA / Copyright Policy | Iwacuflix',
    description: 'How Iwacuflix handles copyright infringement notices and protects intellectual property rights.',
    url: '/dmca',
  },
};

const LAST_UPDATED = 'August 23, 2026';

export default function DmcaPage() {
  return (
    <LegalLayout
      title="DMCA / Copyright Policy"
      lastUpdated={LAST_UPDATED}
      intro="Iwacuflix respects the intellectual property rights of others and expects users, uploaders, and administrators to do the same. This page explains how to report suspected copyright infringement and how such reports are handled."
    >
      <h2 id="respect">1. Our Commitment</h2>
      <p>We take copyright and intellectual property rights seriously. If you believe content available through the Service infringes your copyright, we want to hear from you so we can review the matter appropriately.</p>

      <h2 id="notices">2. Submitting a Copyright Infringement Notice</h2>
      <p>If you are a copyright owner, or an agent authorized to act on a copyright owner&apos;s behalf, and believe that content on the Service infringes your copyright, please send a written notice that includes:</p>
      <ul>
        <li>A description of the copyrighted work you claim has been infringed;</li>
        <li>The exact URL(s) or a clear description of the location of the allegedly infringing material on this website;</li>
        <li>Your name, mailing address, telephone number, and email address;</li>
        <li>A statement that you have a good-faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law;</li>
        <li>A statement, made under penalty of perjury (or the applicable equivalent in your jurisdiction), that the information in the notice is accurate and that you are the copyright owner or authorized to act on the owner&apos;s behalf; and</li>
        <li>Your physical or electronic signature.</li>
      </ul>
      <p>Incomplete notices may delay our ability to review and act on your report.</p>

      <h2 id="review-process">3. Review Process</h2>
      <p>Upon receiving a sufficiently complete notice, we will review it in good faith and may take one or more of the following actions where legally appropriate:</p>
      <ul>
        <li>Removing or disabling access to the reported content;</li>
        <li>Contacting the party responsible for adding the content for more information;</li>
        <li>Requesting additional information from the person submitting the notice; or</li>
        <li>Declining to act if the notice is incomplete, unsubstantiated, or does not reasonably identify infringing material.</li>
      </ul>
      <p>We do not guarantee the automatic or immediate removal of every reported item — each notice is reviewed on its own facts.</p>

      <h2 id="counter-notification">4. Counter-Notification</h2>
      <p>If you believe content you submitted or that is attributed to you was removed or disabled as a result of a mistake or misidentification, you may submit a counter-notification. A counter-notification should generally include your identification of the material removed, a statement under penalty of perjury that you have a good-faith belief the material was removed in error, your contact information, and your consent to the jurisdiction described in our <a href="/terms-and-conditions">Terms &amp; Conditions</a>. Where applicable law provides a specific counter-notice process, we intend to follow it in good faith.</p>

      <h2 id="repeat-infringers">5. Repeat Infringers</h2>
      <p>Where applicable, we may take appropriate action — up to and including removing content and restricting access — against parties who are found to repeatedly infringe the copyrights of others.</p>

      <h2 id="copyright-contact">6. Copyright / DMCA Contact</h2>
      <p>Copyright and DMCA notices should be sent to:</p>
      <p>
        <Placeholder>[DMCA/COPYRIGHT EMAIL — replace with your official copyright contact email]</Placeholder>
      </p>
      <p>You may also reach us via our <a href="/contact-us">Contact Us</a> page by selecting the &ldquo;Copyright / DMCA&rdquo; inquiry type. Please note that the email address above is a placeholder and must be replaced by the website owner with a real, monitored contact address before this policy is relied upon.</p>
    </LegalLayout>
  );
}
