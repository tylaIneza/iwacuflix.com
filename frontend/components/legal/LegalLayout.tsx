import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  title: string;
  lastUpdated: string;
  intro?: string;
  children: React.ReactNode;
}

// Shared shell for long-form policy pages (Privacy, Terms, DMCA) so headings,
// spacing, and typography stay consistent without duplicating markup 3x.
export default function LegalLayout({ title, lastUpdated, intro, children }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="pt-28 pb-20 px-4 md:px-10">
        <div className="max-w-3xl mx-auto fade-up">
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{title}</h1>
          <p className="text-gray-500 text-xs mt-3 uppercase tracking-wide">Last updated: {lastUpdated}</p>
          {intro && <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-2xl">{intro}</p>}

          <div className="legal-prose mt-10">{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
