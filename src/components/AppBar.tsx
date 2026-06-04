import { useState } from 'react';
import { useStore } from '../store';
import { useTranslation } from '../i18n';


export default function AppBar() {
  const { theme, setTheme, lang, setLang, resetOnboarding } = useStore();
  const { t } = useTranslation();
  const [showPanel, setShowPanel] = useState(false);

  const today = new Date();
  const days = ['day.sun','day.mon','day.tue','day.wed','day.thu','day.fri','day.sat'] as const;
  const monthKey = `month.${today.getMonth() + 1}` as any;
  const dateStr = `${t(days[today.getDay()])} ${today.getDate()} ${t(monthKey)}`;

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #2C0F00 0%, var(--primary) 100%)', boxShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
        <div>
          <h1 className="font-display text-2xl leading-none"
            style={{ background: 'linear-gradient(90deg,#FFD700,#FFF8DC,#FFD700)', backgroundSize:'200% auto',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              animation:'shimmer 3s linear infinite' }}>
            🍽 {t('app.title')}
          </h1>
          <p className="text-xs mt-0.5 opacity-60 text-white tracking-wider">{t('app.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-[10px] font-bold px-2 py-1 rounded-full hidden sm:block"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
            {dateStr}
          </span>
          {/* 
          <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="w-9 h-9 rounded-full text-base font-bold flex items-center justify-center transition-all active:scale-90"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
            {lang === 'en' ? 'अ' : 'A'}
          </button>
          */}
          <button onClick={resetOnboarding}
            className="w-9 h-9 rounded-full text-base flex items-center justify-center transition-all active:scale-90"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
            ⚙️
          </button>
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
