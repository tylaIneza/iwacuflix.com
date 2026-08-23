import Link from 'next/link';
import { FiFilm } from 'react-icons/fi';

const FOOTER_LINKS: Record<string, { href: string; label: string }[]> = {
  Company: [
    { href: '/about-us',   label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
  ],
  Legal: [
    { href: '/privacy-policy',       label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/dmca',                 label: 'DMCA / Copyright Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <FiFilm className="text-[#E50914]" size={18} />
            <span className="font-bebas text-2xl" style={{ color: '#E50914', letterSpacing: '0.15em' }}>
              IWACUFLIX
            </span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed max-w-[240px]">
            Stream movies and series, browse by category, and pick up right where you left off — no account required.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <p className="text-white text-xs font-bold uppercase tracking-wide mb-3">{section}</p>
            <ul className="space-y-2.5">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-white text-xs transition-colors focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-6 px-4 text-center">
        <p className="text-gray-700 text-xs">© {new Date().getFullYear()} Iwacuflix. All rights reserved.</p>
      </div>
    </footer>
  );
}
