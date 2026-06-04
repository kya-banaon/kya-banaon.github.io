import { useStore } from '../store';
import type { TabType } from '../types';
import { useTranslation } from '../i18n';

const TABS: { key: TabType; icon: string; labelKey: string }[] = [
  { key: 'weekly',   icon: '📅', labelKey: 'tab.weekly' },
  { key: 'random',   icon: '🎲', labelKey: 'tab.random' },
  { key: 'seasonal', icon: '🌿', labelKey: 'tab.seasonal' },
  { key: 'groceries', icon: '🛒', labelKey: 'tab.groceries' },
  { key: 'saved',    icon: '❤️', labelKey: 'tab.saved' },
];

export default function BottomNav() {
  const { currentTab, setTab } = useStore();
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
      <div className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{ background:'var(--surface2)', border:'1px solid var(--border2)',
          boxShadow:'0 8px 40px rgba(0,0,0,0.6)', backdropFilter:'blur(16px)' }}>
        {TABS.map(({ key, icon, labelKey }) => {
          const active = currentTab === key;
          return (
            <button key={key} onClick={() => setTab(key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95"
              style={active
                ? { background:'var(--primary)', color:'#fff', boxShadow:'0 3px 14px var(--primary-glow)' }
                : { color:'var(--sub)' }
              }>
              <span className="text-base leading-none">{icon}</span>
              {active && <span className="text-xs font-bold">{t(labelKey as any)}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
