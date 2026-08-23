'use client';
import { useEffect, useState, useCallback } from 'react';
import { adminFetchMessages, adminSetMessageStatus, adminDeleteMessage, ContactMessage } from '@/lib/api';
import { getToken } from '@/lib/auth';
import {
  FiMail, FiInbox, FiTrash2, FiLoader, FiSearch, FiX,
  FiCheckCircle, FiAlertCircle,
} from 'react-icons/fi';

const CATEGORY_LABEL: Record<string, string> = {
  general: 'General',
  copyright: 'Copyright / DMCA',
  business: 'Business',
};

export default function AdminMessagesPage() {
  const [items,      setItems]      = useState<ContactMessage[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast,      setToast]      = useState<{ msg: string; ok: boolean } | null>(null);
  const [viewItem,   setViewItem]   = useState<ContactMessage | null>(null);
  const [delId,      setDelId]      = useState<string | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken()!;
      const data = await adminFetchMessages(token, statusFilter ? { status: statusFilter } : undefined);
      setItems(data);
    } catch {
      showToast('Failed to load messages', false);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const openMessage = async (m: ContactMessage) => {
    setViewItem(m);
    if (m.status === 'unread') {
      try {
        const updated = await adminSetMessageStatus(getToken()!, m._id, 'read');
        setItems((prev) => prev.map((i) => (i._id === m._id ? updated : i)));
        setViewItem(updated);
      } catch { /* non-critical */ }
    }
  };

  const toggleStatus = async (m: ContactMessage) => {
    const next = m.status === 'unread' ? 'read' : 'unread';
    try {
      const updated = await adminSetMessageStatus(getToken()!, m._id, next);
      setItems((prev) => prev.map((i) => (i._id === m._id ? updated : i)));
      showToast(next === 'read' ? 'Marked as read' : 'Marked as unread');
    } catch {
      showToast('Failed to update status', false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDeleteMessage(getToken()!, id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      showToast('Deleted');
      if (viewItem?._id === id) setViewItem(null);
    } catch {
      showToast('Delete failed', false);
    } finally {
      setDelId(null);
    }
  };

  const filtered = items.filter((m) => {
    const q = search.toLowerCase();
    return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
  });

  const unreadCount = items.filter((m) => m.status === 'unread').length;

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Contact Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          {items.length} total · {unreadCount} unread
        </p>
      </div>

      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium shadow-xl animate-fade-in ${
          toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.ok ? <FiCheckCircle /> : <FiAlertCircle />} {toast.msg}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2">
          <FiSearch size={14} className="text-gray-500" />
          <input
            type="text" placeholder="Search name, email, subject…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none w-52 placeholder-gray-600"
          />
        </div>
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 text-sm rounded-lg px-3 py-2 outline-none"
        >
          <option value="">All statuses</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <button
          onClick={load}
          className="px-4 py-2 border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="animate-spin text-[#E50914]" size={30} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600 border border-[#2a2a2a] rounded-xl">
          No messages found.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((m) => (
            <button
              key={m._id}
              onClick={() => openMessage(m)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                m.status === 'unread'
                  ? 'border-[#E50914]/30 bg-[#E50914]/[0.04] hover:bg-[#E50914]/[0.08]'
                  : 'border-[#2a2a2a] hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex-shrink-0">
                {m.status === 'unread' ? (
                  <FiMail className="text-[#E50914]" size={17} />
                ) : (
                  <FiInbox className="text-gray-600" size={17} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm truncate ${m.status === 'unread' ? 'text-white font-semibold' : 'text-gray-300'}`}>
                    {m.subject}
                  </p>
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500 flex-shrink-0">
                    {CATEGORY_LABEL[m.category] || m.category}
                  </span>
                </div>
                <p className="text-gray-500 text-xs truncate mt-0.5">{m.name} · {m.email}</p>
              </div>
              <p className="text-gray-600 text-xs flex-shrink-0 hidden sm:block">
                {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* View / delete confirmation modal */}
      {viewItem && (
        <Modal onClose={() => setViewItem(null)}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <h2 className="text-white font-bold text-lg truncate">{viewItem.subject}</h2>
              <p className="text-gray-500 text-xs mt-1">
                {viewItem.name} &lt;{viewItem.email}&gt;
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/5 text-gray-400 flex-shrink-0">
              {CATEGORY_LABEL[viewItem.category] || viewItem.category}
            </span>
          </div>
          <p className="text-gray-600 text-xs mb-4">
            Received {new Date(viewItem.createdAt).toLocaleString()}
          </p>
          <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 mb-5 max-h-64 overflow-y-auto">
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{viewItem.message}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${viewItem.email}?subject=${encodeURIComponent(`Re: ${viewItem.subject}`)}`}
              className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Reply by Email
            </a>
            <button
              onClick={() => toggleStatus(viewItem)}
              className="px-4 py-2 border border-[#333] text-gray-400 hover:text-white rounded-lg text-sm transition-colors"
            >
              Mark as {viewItem.status === 'unread' ? 'Read' : 'Unread'}
            </button>
            <button
              onClick={() => setDelId(viewItem._id)}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors ml-auto"
            >
              <FiTrash2 size={14} /> Delete
            </button>
          </div>
        </Modal>
      )}

      {delId && (
        <Modal onClose={() => setDelId(null)}>
          <div className="text-center p-2">
            <p className="text-white font-semibold text-lg mb-2">Delete this message?</p>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDelId(null)} className="px-5 py-2 border border-[#333] text-gray-400 hover:text-white rounded-lg text-sm transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(delId)} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <FiX size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
