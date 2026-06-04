import { useEffect } from 'react';
import { useStore } from './store';
import AppBar from './components/AppBar';
import FilterBar from './components/FilterBar';
import BottomNav from './components/BottomNav';
import DishModal from './components/DishModal';
import Toast from './components/Toast';
import WeeklyView from './views/WeeklyView';
import RandomView from './views/RandomView';
import SeasonalView from './views/SeasonalView';
import GroceryView from './views/GroceryView';
import SavedView from './views/SavedView';
import type { TabType } from './types';

const TAB_ICONS: Record<TabType, string> = { weekly: '📅', random: '🎲', seasonal: '🌿', groceries: '🛒', saved: '❤️' };
const TAB_LABELS: Record<TabType, string> = { weekly: 'Weekly', random: 'Random', seasonal: 'Seasonal', groceries: 'Groceries', saved: 'Saved' };

export default function App() {
  const { currentTab, setTab, theme, isReady, initializeApp } = useStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (!isReady) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="text-4xl">🍲</div>
          <div className="text-sm font-bold" style={{ color: 'var(--sub)' }}>Loading flavors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto min-h-dvh relative" style={{ background:'var(--bg)' }}>
      <AppBar />
      {['weekly','random','seasonal'].includes(currentTab) && <FilterBar />}

      {/* Desktop tab nav */}
      <div className="hidden sm:flex border-b sticky z-40 overflow-x-auto hide-scrollbar" style={{ top:'112px', background:'var(--surface)', borderColor:'var(--border)' }}>
        {(['weekly','random','seasonal','groceries','saved'] as TabType[]).map(tab => (
          <button key={tab} onClick={() => setTab(tab)}
            className="px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap"
            style={currentTab === tab
              ? { color:'var(--primary)', borderColor:'var(--primary)' }
              : { color:'var(--sub)', borderColor:'transparent' }}>
            {TAB_ICONS[tab]} {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <main>
        {currentTab === 'weekly'   && <WeeklyView />}
        {currentTab === 'random'   && <RandomView />}
        {currentTab === 'seasonal' && <SeasonalView />}
        {currentTab === 'groceries' && <GroceryView />}
        {currentTab === 'saved' && <SavedView />}
      </main>

      <BottomNav />
      <DishModal />
      <Toast />
    </div>
  );
}
