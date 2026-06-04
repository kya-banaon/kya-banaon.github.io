import { useState } from 'react';
import { useStore } from '../store';

const MONTH_NAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AppBar() {
  const { theme, setTheme } = useStore();
  const [showPanel, setShowPanel] = useState(false);

  const today = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dateStr = `${days[today.getDay()]} ${today.getDate()} ${MONTH_NAMES[today.getMonth()+1]}`;

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #2C0F00 0%, var(--primary) 100%)', boxShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
        <div>
          <h1 className="font-display text-2xl leading-none"
            style={{ background: 'linear-gradient(90deg,#FFD700,#FFF8DC,#FFD700)', backgroundSize:'200% auto',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              animation:'shimmer 3s linear infinite' }}>
            🍽 Kya Banaon?
          </h1>
          <p className="text-xs mt-0.5 opacity-60 text-white tracking-wider">Vegetarian Meal Planner</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
            {dateStr}
          </span>
          <button onClick={() => setShowPanel(v => !v)}
            className="w-9 h-9 rounded-full text-base flex items-center justify-center transition-all active:scale-90"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
            🎨
          </button>
        </div>
      </header>

      {/* Theme Panel */}
      {showPanel && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowPanel(false)} />
          <div className="fixed top-16 right-3 z-50 rounded-2xl p-4 shadow-float animate-fade-in w-52"
            style={{ background:'var(--surface2)', border:'1px solid var(--border2)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'var(--sub)' }}>Theme</p>
            <div className="flex gap-3">
              {(['dark','light'] as const).map(t => (
                <button key={t} onClick={() => { setTheme(t); setShowPanel(false); }}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${theme===t ? 'ring-2 ring-offset-1 ring-[var(--primary)]' : ''}`}
                  style={{ background: t==='dark' ? '#0C0907' : '#F4EFE8',
                    color: t==='dark' ? '#F0E4D0' : '#1E110A',
                    border: '1px solid var(--border2)' }}>
                  {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
