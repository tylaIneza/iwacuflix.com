'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetchStats, adminFetchContent } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Content } from '@/components/ContentCard';
import { FiFilm, FiTv, FiEye, FiEyeOff, FiUpload, FiLoader, FiMail } from 'react-icons/fi';

interface Stats {
  total: number;
  movies: number;
  series: number;
  published: number;
  unpublished: number;
  unreadMessages: number;
}

export default function DashboardPage() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [recent,  setRecent]  = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken()!;
    Promise.all([adminFetchStats(token), adminFetchContent(token)])
      .then(([s, content]) => {
        setStats(s);
        setRecent((content as Content[]).slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="animate-spin text-[#E50914]" size={32} />
      </div>
    );
  }

  const cards = [
    { label: 'Total Content', value: stats?.total ?? 0,          icon: FiFilm,   color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',   href: '/admin/manage' },
    { label: 'Movies',        value: stats?.movies ?? 0,         icon: FiFilm,   color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', href: '/admin/manage' },
    { label: 'Series',        value: stats?.series ?? 0,         icon: FiTv,     color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', href: '/admin/manage' },
    { label: 'Published',     value: stats?.published ?? 0,      icon: FiEye,    color: 'bg-green-500/10 text-green-400 border-green-500/20', href: '/admin/manage' },
    { label: 'Unpublished',   value: stats?.unpublished ?? 0,    icon: FiEyeOff, color: 'bg-red-500/10 text-red-400 border-red-500/20',       href: '/admin/manage' },
    { label: 'Unread Messages', value: stats?.unreadMessages ?? 0, icon: FiMail, color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',    href: '/admin/messages' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
        </div>
        <Link
          href="/admin/upload"
          className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <FiUpload size={15} /> Upload Content
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className={`border rounded-xl p-4 transition-transform hover:-translate-y-0.5 ${color}`}>
            <Icon size={22} className="mb-2" />
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs mt-0.5 opacity-80">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent uploads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Uploads</h2>
          <Link href="/admin/manage" className="text-[#E50914] text-xs hover:underline">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-12 text-gray-600 border border-[#2a2a2a] rounded-xl">
            No content yet.{' '}
            <Link href="/admin/upload" className="text-[#E50914] hover:underline">
              Upload now
            </Link>
          </div>
        ) : (
          <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c._id} className="border-b border-[#1e1e1e] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white font-medium truncate max-w-[180px]">{c.title}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell capitalize">{c.type}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{c.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-1 rounded-full font-semibold ${
                        c.isPublished
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-yellow-500/15 text-yellow-400'
                      }`}>
                        {c.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
