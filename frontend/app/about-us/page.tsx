import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FiTarget, FiEye, FiHeart, FiShield, FiZap, FiSmartphone,
  FiFilm, FiMessageSquare, FiArrowRight,
} from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn what Iwacuflix is, who it is for, and the values behind our free movie and series streaming platform.',
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: 'About Us | Iwacuflix',
    description: 'Learn what Iwacuflix is, who it is for, and the values behind our free movie and series streaming platform.',
    url: '/about-us',
  },
};

const VALUES = [
  { icon: FiShield, title: 'Respect for Rights',   text: 'We take copyright and intellectual property seriously and expect the same from anyone involved with our catalog.' },
  { icon: FiHeart,  title: 'Accessibility First',  text: 'No forced sign-ups to watch. Content should be easy to reach on any device, anywhere.' },
  { icon: FiZap,    title: 'Continuous Improvement', text: 'We keep refining performance, design, and catalog organization based on real usage.' },
  { icon: FiMessageSquare, title: 'Openness', text: 'We welcome feedback, questions, and copyright concerns through a real, monitored contact channel.' },
];

const REASONS = [
  { icon: FiFilm,       title: 'Simple, Focused Catalog', text: 'Movies and series organized by category, with search and mood filters to help you find something quickly.' },
  { icon: FiSmartphone, title: 'Built to Be Responsive',  text: 'The same experience works cleanly on desktop, laptop, tablet, and mobile screens.' },
  { icon: FiZap,        title: 'Pick Up Where You Left Off', text: '“Continue Watching” and “My List” work instantly in your browser — no account required.' },
  { icon: FiShield,     title: 'Clear Policies',          text: 'Straightforward Privacy, Terms, and Copyright pages explain exactly how the platform operates.' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 md:px-10 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(229,9,20,0.14), transparent 70%)' }}
        />
        <div className="max-w-3xl mx-auto text-center fade-up">
          <p className="font-bebas text-lg text-[#E50914] tracking-[0.2em] mb-3">ABOUT US</p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Movies &amp; series, made simple to reach.
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-5 max-w-xl mx-auto">
            Iwacuflix is a streaming platform for browsing and watching movies and series online,
            built with a clean, distraction-free interface and no account required to start watching.
          </p>
        </div>
      </section>

      {/* About the platform */}
      <section className="px-4 md:px-10 pb-4">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-6 md:p-10 fade-up">
          <h2 className="text-white text-xl font-bold mb-4">What Iwacuflix Is</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Iwacuflix is an online destination for discovering and watching movies and series. Visitors can
            browse by category, search by title or description, and jump straight into playback — whether
            that&apos;s a single film or the next episode of a series.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            The platform is intended for anyone looking for a fast, no-friction way to find something to
            watch: casual viewers, fans of a specific genre, and anyone who prefers not to create an account
            just to browse a catalog.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            We are committed to operating responsibly — that means respecting the intellectual property
            rights of content owners, being transparent about how the site works, and providing a clear,
            accessible way to reach us with questions or copyright concerns. See our{' '}
            <Link href="/dmca" className="text-[#E50914] hover:underline">DMCA / Copyright Policy</Link>{' '}
            for details.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="px-4 md:px-10 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-6 md:p-8 fade-up">
            <div className="w-11 h-11 rounded-xl bg-[#E50914]/15 flex items-center justify-center mb-4">
              <FiTarget className="text-[#E50914]" size={20} />
            </div>
            <h2 className="text-white text-lg font-bold mb-2">Our Mission</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              To make finding and watching movies and series as simple and fast as possible, with a clean
              interface that stays out of the way of the content itself.
            </p>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8 fade-up">
            <div className="w-11 h-11 rounded-xl bg-[#E50914]/15 flex items-center justify-center mb-4">
              <FiEye className="text-[#E50914]" size={20} />
            </div>
            <h2 className="text-white text-lg font-bold mb-2">Our Vision</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              To keep growing into a reliable, well-organized catalog that respects both viewers and
              rights holders, guided by clear policies rather than guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="px-4 md:px-10 py-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white text-xl font-bold text-center mb-8 fade-up">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass rounded-xl p-5 fade-up">
                <Icon className="text-[#E50914] mb-3" size={20} />
                <h3 className="text-white text-sm font-bold mb-1.5">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="px-4 md:px-10 py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white text-xl font-bold text-center mb-8 fade-up">Why Choose Iwacuflix</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 glass rounded-xl p-5 fade-up">
                <div className="w-10 h-10 rounded-lg bg-[#E50914]/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#E50914]" size={17} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-10 pb-20">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-12 text-center fade-up">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-3">Questions, feedback, or a copyright concern?</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            We&apos;d rather hear from you directly than have you guess. Reach out any time.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Contact Us <FiArrowRight size={15} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse Content
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
