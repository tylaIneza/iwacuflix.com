import type { Metadata } from 'next';
import LegalLayout from '@/components/legal/LegalLayout';
import Placeholder from '@/components/legal/Placeholder';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Iwacuflix collects, uses, and protects information when you use our streaming platform.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Iwacuflix',
    description: 'Learn how Iwacuflix collects, uses, and protects information when you use our streaming platform.',
    url: '/privacy-policy',
  },
};

const LAST_UPDATED = 'August 23, 2026';

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro="This Privacy Policy explains what information Iwacuflix (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;the Service&rdquo;) collects, how it is used, and the choices available to you. It applies to everyone who visits or uses this website."
    >
      <h2 id="information-we-collect">1. Information We Collect</h2>
      <p>We aim to collect as little personal information as possible. Depending on how you use the Service, the following information may be involved:</p>
      <ul>
        <li><strong>Information you submit voluntarily</strong> — such as your name, email address, subject, and message when you use our <a href="/contact-us">Contact Us</a> form.</li>
        <li><strong>Locally stored browsing data</strong> — your &ldquo;My List&rdquo; and &ldquo;Continue Watching&rdquo; progress are saved using your browser&apos;s local storage. This data stays on your device and is never transmitted to or stored on our servers.</li>
        <li><strong>Administrative account data</strong> — the Service has a single administrative login used only by the site operator to manage content. Public visitors do not create accounts to browse or watch content.</li>
        <li><strong>Standard technical information</strong> — like most websites, our servers and/or hosting provider may automatically log technical details such as IP address, browser type, device type, and general usage patterns (e.g. pages requested and timestamps), primarily for security, abuse prevention, and troubleshooting.</li>
      </ul>
      <p>We do not currently ask visitors to create public accounts, and we do not currently collect payment information, as the Service does not process payments.</p>

      <h2 id="how-we-use-information">2. How We Use Information</h2>
      <p>Any information described above may be used to:</p>
      <ul>
        <li>Operate, maintain, and improve the Service;</li>
        <li>Respond to messages sent through the Contact Us form, including general, copyright/DMCA, and business inquiries;</li>
        <li>Protect the security and integrity of the Service and prevent abuse, spam, or fraud;</li>
        <li>Understand general usage patterns so we can improve site performance and reliability;</li>
        <li>Comply with applicable legal obligations.</li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2 id="cookies">3. Cookies &amp; Local Storage</h2>
      <p>Cookies are small text files a website can ask your browser to store. &ldquo;Local storage&rdquo; is a similar browser feature that keeps data on your device rather than sending it to a server.</p>
      <ul>
        <li><strong>Local storage (not cookies):</strong> We use your browser&apos;s local storage to remember your watchlist, playback progress, and (for the administrator only) a login session token. This information is not accessible to us and is only ever read by your own browser.</li>
        <li><strong>Analytics cookies:</strong> We do not currently use analytics cookies or tracking services on this website.</li>
        <li><strong>Advertising cookies:</strong> We do not currently display advertising on this website. If that changes in the future (for example, by integrating an advertising network), this Policy will be updated beforehand to accurately describe the cookies and data involved.</li>
        <li><strong>Third-party embedded players:</strong> Some video content may be embedded from third-party platforms (for example YouTube, Vimeo, Cloudflare Stream, Google Drive, Dailymotion, OK.ru, or Facebook, depending on how a given title is configured). When you play an embedded video, that third-party platform may set its own cookies or collect data according to its own privacy policy, independent of this Service.</li>
      </ul>

      <h2 id="third-party-services">4. Third-Party Services</h2>
      <p>We rely on a limited number of third parties to operate the Service:</p>
      <ul>
        <li><strong>Hosting/infrastructure provider:</strong> <Placeholder>[HOSTING PROVIDER NAME]</Placeholder> — processes data as necessary to serve the website and store its database.</li>
        <li><strong>Video hosting/embed platforms:</strong> as listed above, used only for playback of specific titles configured by the administrator.</li>
      </ul>
      <p>We do not currently use analytics providers, advertising networks, payment providers, or third-party email/marketing services. If we begin using any such service in the future, this section will be updated to name it and describe what it does.</p>

      <h2 id="data-security">5. Data Security</h2>
      <p>We use reasonable technical measures to protect information, including password hashing for the administrative account and token-based authentication for the admin panel. However, no method of transmission or storage over the internet is completely secure, and we cannot guarantee absolute security.</p>

      <h2 id="data-retention">6. Data Retention</h2>
      <p>We retain information only for as long as reasonably necessary for the purposes described in this Policy — for example, to respond to and keep a record of contact messages, to maintain the content catalog, or to meet legal obligations and resolve disputes. Data stored in your own browser&apos;s local storage remains there until you clear it or your browser removes it.</p>

      <h2 id="user-rights">7. Your Rights</h2>
      <p>Depending on where you live, you may have rights regarding your personal information, which can generally include the right to:</p>
      <ul>
        <li>Access the information we hold about you;</li>
        <li>Request correction of inaccurate information;</li>
        <li>Request deletion of information (for example, messages you submitted via the contact form);</li>
        <li>Object to or request restriction of certain processing;</li>
        <li>Request a portable copy of your information, where applicable.</li>
      </ul>
      <p>To exercise any of these rights, please contact us using the details in Section 10 below. We will respond in accordance with applicable law. Because your watchlist and viewing progress are stored only in your own browser, you can clear them at any time by clearing your browser&apos;s site data.</p>

      <h2 id="childrens-privacy">8. Children&apos;s Privacy</h2>
      <p>The Service is not directed at children under the age of <Placeholder>[MINIMUM AGE, e.g., 13 or 16]</Placeholder> and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information (for example, through the contact form), please contact us so we can remove it.</p>

      <h2 id="policy-updates">9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time to reflect changes to the Service or for legal reasons. The &ldquo;Last updated&rdquo; date at the top of this page indicates when it was last revised. Continued use of the Service after an update constitutes acceptance of the revised Policy.</p>

      <h2 id="contact">10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or how your information is handled, you can reach us:</p>
      <ul>
        <li>Through our <a href="/contact-us">Contact Us</a> page (select &ldquo;General Inquiry&rdquo;); or</li>
        <li>By email at <Placeholder>[PRIVACY CONTACT EMAIL]</Placeholder>.</li>
      </ul>
    </LegalLayout>
  );
}
