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
import PwaBanner from './components/PwaBanner';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import Tour from './components/Tour';
import { useTranslation } from './i18n';
import type { TabType } from './types';

const TAB_ICONS: Record<TabType, string> = { weekly: '📅', random: '🎲', seasonal: '🌿', groceries: '🛒', saved: '❤️' };
const TAB_LABEL_KEYS: Record<TabType, string> = { weekly: 'tab.weekly', random: 'tab.random', seasonal: 'tab.seasonal', groceries: 'tab.groceries', saved: 'tab.saved' };

export default function App() {
  const { currentTab, setTab, theme, fontScale, isReady, initializeApp, hasOnboarded } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    document.documentElement.classList.remove('font-normal', 'font-large', 'font-xlarge');
    document.documentElement.classList.add(`font-${fontScale}`);
  }, [theme, fontScale]);

  if (!isReady) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="text-4xl">🍲</div>
          <div className="text-sm font-bold" style={{ color: 'var(--sub)' }}>{t('toast.loading')}</div>
        </div>
      </div>
    );
  }

  const currentHour = new Date().getHours();
  let bgPhase = 'bg_lunch';
  if (currentHour >= 5 && currentHour < 11) bgPhase = 'bg_breakfast';
  else if (currentHour >= 17 || currentHour < 5) bgPhase = 'bg_dinner';

  return (
    <div className="max-w-2xl mx-auto min-h-dvh relative flex flex-col bg-cover bg-fixed bg-center" 
         style={{ backgroundImage: `url('/images/${bgPhase}.png')`, backgroundColor: 'var(--bg)' }}>
      <AppBar />
      <PwaBanner />
      {['weekly','random','seasonal'].includes(currentTab) && <FilterBar />}

      {/* Desktop tab nav */}
      <div className="hidden sm:flex border-b sticky z-40 overflow-x-auto hide-scrollbar backdrop-blur-md" 
           style={{ top:'112px', background:'var(--surface)', borderColor:'var(--border)' }}>
        {(['weekly','random','seasonal','groceries','saved'] as TabType[]).map(tab => (
          <button key={tab} onClick={() => setTab(tab)}
            className="px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap"
            style={currentTab === tab
              ? { color:'var(--primary)', borderColor:'var(--primary)' }
              : { color:'var(--sub)', borderColor:'transparent' }}>
            {TAB_ICONS[tab]} {t(TAB_LABEL_KEYS[tab] as any)}
          </button>
        ))}
      </div>

      <main className="flex-1">
        {currentTab === 'weekly'   && <WeeklyView />}
        {currentTab === 'random'   && <RandomView />}
        {currentTab === 'seasonal' && <SeasonalView />}
        {currentTab === 'groceries' && <GroceryView />}
        {currentTab === 'saved' && <SavedView />}
      </main>

      <Footer />

      <BottomNav />
      <DishModal />
      <Toast />
      
      {!hasOnboarded && <Onboarding />}
      <Tour />
    </div>
  );
}
