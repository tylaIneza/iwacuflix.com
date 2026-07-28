'use client';
import { useRef, useEffect, useCallback } from 'react';
import { saveWatchProgress } from '@/lib/auth';

interface Content {
  _id: string; title: string; thumbnail: string;
  type: 'movie' | 'series'; season?: number; episode?: number;
}
interface Props {
  url: string;
  content: Content;
  startTime?: number;
  onEnded?: () => void;
}

// ── URL resolver ──────────────────────────────────────────
interface Resolved { kind: 'iframe' | 'video'; src: string }

function resolveUrl(raw: string, startTime = 0): Resolved {
  const url = raw.trim();

  const ytId = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )?.[1];
  if (ytId) {
    const t = startTime > 0 ? `&start=${Math.floor(startTime)}` : '';
    return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white${t}` };
  }
  if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/'))
    return { kind: 'iframe', src: url };

  const vimeoId = !url.includes('player.vimeo.com') && url.match(/vimeo\.com\/(\d+)/)?.[1];
  if (vimeoId) {
    const t = startTime > 0 ? `#t=${Math.floor(startTime)}s` : '';
    return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&color=E50914${t}` };
  }
  if (url.includes('player.vimeo.com')) return { kind: 'iframe', src: url };

  if (url.includes('cloudflarestream.com') || url.includes('videodelivery.net')) {
    if (url.includes('iframe.cloudflarestream.com')) return { kind: 'iframe', src: url };
    const cfId = url.match(/(?:cloudflarestream\.com|videodelivery\.net)\/([a-f0-9]+)/)?.[1];
    if (cfId) {
      const t = startTime > 0 ? `&startTime=${Math.floor(startTime)}` : '';
      return { kind: 'iframe', src: `https://iframe.cloudflarestream.com/${cfId}?preload=true${t}` };
    }
    return { kind: 'iframe', src: url };
  }
  if (/^[0-9a-f]{32}$/.test(url))
    return { kind: 'iframe', src: `https://iframe.cloudflarestream.com/${url}` };

  const driveId = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  if (driveId) return { kind: 'iframe', src: `https://drive.google.com/file/d/${driveId}/preview` };

  const dmId = url.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/)?.[1];
  if (dmId) return { kind: 'iframe', src: `https://www.dailymotion.com/embed/video/${dmId}?autoplay=1` };

  const okId = url.match(/ok\.ru\/video\/(\d+)/)?.[1];
  if (okId) return { kind: 'iframe', src: `https://ok.ru/videoembed/${okId}` };

  if (url.includes('facebook.com/') && url.includes('/videos/')) {
    return { kind: 'iframe', src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true` };
  }

  if (url.includes('/embed') || url.includes('player.') || url.includes('/iframe'))
    return { kind: 'iframe', src: url };

  if (/\.(mp4|webm|ogg|m3u8|mkv|mov|avi)(\?.*)?$/i.test(url))
    return { kind: 'video', src: url };

  return { kind: 'iframe', src: url };
}

// ── Component ─────────────────────────────────────────────
// No custom loading/error UI — the embedded source (Google Drive, YouTube, etc.)
// renders its own player chrome, which is more reliable across devices.
export default function VideoPlayer({ url, content, startTime = 0, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const saveProgress = useCallback(() => {
    const v = videoRef.current;
    if (!v || isNaN(v.duration)) return;
    saveWatchProgress(content, v.currentTime, v.duration);
  }, [content]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (startTime > 0) v.currentTime = startTime;
    const iv = setInterval(saveProgress, 5000);
    v.addEventListener('ended', saveProgress);
    return () => { clearInterval(iv); v.removeEventListener('ended', saveProgress); };
  }, [saveProgress, startTime]);

  if (!url?.trim()) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0d0d0d]" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-4xl mb-3">🎬</p>
            <p className="text-gray-500 text-sm">No video URL provided.</p>
          </div>
        </div>
      </div>
    );
  }

  const { kind, src } = resolveUrl(url, startTime);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
      {kind === 'iframe' ? (
        <iframe
          key={src}
          src={src}
          title={content.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; gyroscope; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <video
          ref={videoRef}
          key={src}
          src={src}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
          style={{ background: '#000' }}
          onEnded={() => { saveProgress(); onEnded?.(); }}
        />
      )}
    </div>
  );
}
