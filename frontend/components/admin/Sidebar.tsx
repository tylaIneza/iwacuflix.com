'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiGrid, FiUpload, FiList, FiLogOut, FiFilm, FiX } from 'react-icons/fi';
import { removeToken } from '@/lib/auth';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { href: '/admin/upload',    label: 'Upload',     icon: FiUpload },
  { href: '/admin/manage',    label: 'Manage',     icon: FiList },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();

  const logout = () => {
    removeToken();
    router.push('/admin');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col min-h-screen transform transition-transform duration-200 ease-in-out
          md:sticky md:top-0 md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FiFilm className="text-[#E50914]" size={20} />
              <span
                className="font-bebas text-xl"
                style={{ color: '#E50914', letterSpacing: '0.12em' }}
              >
                IWACUFLIX
              </span>
            </div>
            <p className="text-gray-600 text-[11px] mt-0.5">Admin Panel</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#E50914] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#2a2a2a]">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <FiLogOut size={17} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
