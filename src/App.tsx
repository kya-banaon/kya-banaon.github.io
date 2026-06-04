import { useEffect } from 'react';
import { useStore } from './store';
import AppBar from './components/AppBar';
import FilterBar from './components/FilterBar';
import BottomNav from './components/BottomNav';
import DishModal from './components/DishModal';
import WeeklyView from './views/WeeklyView';
import RandomView from './views/RandomView';
import SeasonalView from './views/SeasonalView';
import type { TabType } from './types';

const TAB_ICONS: Record<TabType, string> = { weekly: '📅', random: '🎲', seasonal: '🌿' };
const TAB_LABELS: Record<TabType, string> = { weekly: 'Weekly', random: 'Random', seasonal: 'Seasonal' };

export default function App() {
  const { currentTab, setTab, theme } = useStore();

  // Apply saved theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="max-w-2xl mx-auto min-h-dvh relative" style={{ background:'var(--bg)' }}>
      <AppBar />
      <FilterBar />

      {/* Desktop tab nav */}
      <div className="hidden sm:flex border-b sticky z-40" style={{ top:'112px', background:'var(--surface)', borderColor:'var(--border)' }}>
        {(['weekly','random','seasonal'] as TabType[]).map(tab => (
          <button key={tab} onClick={() => setTab(tab)}
            className="px-6 py-3 text-sm font-bold transition-all border-b-2"
            style={currentTab === tab
              ? { color:'var(--primary)', borderColor:'var(--primary)' }
              : { color:'var(--sub)', borderColor:'transparent' }}>
            {TAB_ICONS[tab]} {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Views */}
      <main>
        {currentTab === 'weekly'   && <WeeklyView />}
        {currentTab === 'random'   && <RandomView />}
        {currentTab === 'seasonal' && <SeasonalView />}
      </main>

      <BottomNav />
      <DishModal />
    </div>
  );
}
