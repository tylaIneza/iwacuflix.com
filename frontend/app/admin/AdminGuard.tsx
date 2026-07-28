'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { getToken } from '@/lib/auth';
import { verifyToken } from '@/lib/api';
import { FiLoader, FiMenu, FiFilm } from 'react-icons/fi';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin') {
      setChecking(false);
      return;
    }
    const token = getToken();
    if (!token) {
      router.replace('/admin');
      return;
    }
    verifyToken(token)
      .then(() => setChecking(false))
      .catch(() => router.replace('/admin'));
  }, [pathname, router]);

  if (pathname === '/admin') return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <FiLoader className="animate-spin text-[#E50914]" size={36} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#141414]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2a] bg-[#0d0d0d]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <FiFilm className="text-[#E50914]" size={18} />
          <span
            className="font-bebas text-lg"
            style={{ color: '#E50914', letterSpacing: '0.12em' }}
          >
            IWACUFLIX
          </span>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
