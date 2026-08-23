import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';
import Placeholder from '@/components/legal/Placeholder';
import { FiMessageSquare, FiShield, FiBriefcase } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Iwacuflix for general questions, copyright/DMCA inquiries, or business matters.',
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact Us | Iwacuflix',
    description: 'Get in touch with Iwacuflix for general questions, copyright/DMCA inquiries, or business matters.',
    url: '/contact-us',
  },
};

const INFO_CARDS = [
  {
    icon: FiMessageSquare,
    title: 'General Inquiries',
    text: 'Questions, feedback, or something not working right — select "General Inquiry" in the form.',
  },
  {
    icon: FiShield,
    title: 'Copyright / DMCA',
    text: (
      <>
        Rights holders can select &ldquo;Copyright / DMCA&rdquo; below, or read our{' '}
        <a href="/dmca" className="text-[#E50914] hover:underline">DMCA Policy</a> for the full notice
        requirements. Official contact: <Placeholder>[DMCA/COPYRIGHT EMAIL]</Placeholder>.
      </>
    ),
  },
  {
    icon: FiBriefcase,
    title: 'Business Inquiries',
    text: (
      <>
        For partnerships or business matters, select &ldquo;Business / Partnership&rdquo; below. Official
        contact: <Placeholder>[BUSINESS CONTACT EMAIL]</Placeholder>.
      </>
    ),
  },
];

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="pt-28 pb-20 px-4 md:px-10">
        <div className="max-w-5xl mx-auto fade-up">
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">Contact Us</h1>
          <p className="text-gray-400 text-sm leading-relaxed mt-3 max-w-xl">
            Have a question, feedback, or a copyright concern? Send us a message below and we&apos;ll get back to you.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {/* Form */}
            <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8">
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="space-y-4">
              {INFO_CARDS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="glass rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#E50914]/15 flex items-center justify-center mb-3">
                    <Icon className="text-[#E50914]" size={16} />
                  </div>
                  <h2 className="text-white text-sm font-bold mb-1.5">{title}</h2>
                  <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
