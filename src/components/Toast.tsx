import { useStore } from '../store';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-slide-up pointer-events-none">
      <div className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg backdrop-blur-md"
        style={{ background: 'var(--primary)', boxShadow: '0 4px 20px var(--primary-glow)' }}>
        {toast}
      </div>
    </div>
  );
}
