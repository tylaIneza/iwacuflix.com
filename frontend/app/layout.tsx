import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Iwacuflix — Stream Movies & Series',
  description: 'Watch the best movies and series on Iwacuflix, completely free.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
