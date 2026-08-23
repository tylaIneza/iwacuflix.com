export default function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded px-1.5 py-0.5 text-[0.85em] font-mono align-baseline">
      {children}
    </span>
  );
}
