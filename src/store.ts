import { create } from 'zustand';
import type { Filters, Preferences, WeekPlan, TabType, ModalState, SeasonKey, ThemeKey, Dish, Lang } from './types';

interface AppState {
  isReady: boolean;
  theme: ThemeKey;
  lang: Lang;
  filters: Filters;
  weekPlan: WeekPlan | null;
  randPlan: (Dish | null)[][];
  randPeriod: 1 | 2 | 3;
  currentTab: TabType;
  selectedDay: number;
  modal: ModalState | null;
  activeSeason: SeasonKey | null;
  favorites: string[];
  toast: string | null;
  preferences: Preferences;
  hasOnboarded: boolean;
  showTour: boolean;

  initializeApp: () => Promise<void>;
  setTheme: (t: ThemeKey) => void;
  setLang: (l: Lang) => void;
  toggleFilter: (key: keyof Filters) => void;
  setWeekPlan: (plan: WeekPlan) => void;
  regenMeal: (dayIdx: number, mealType: string, dish: Dish | null) => void;
  setRandPlan: (plan: (Dish | null)[][]) => void;
  regenRandMeal: (dayIdx: number, mealIdx: number, dish: Dish | null) => void;
  setRandPeriod: (p: 1 | 2 | 3) => void;
  setTab: (tab: TabType) => void;
  selectDay: (idx: number) => void;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
  setSeason: (key: SeasonKey) => void;
  toggleFavorite: (id: string) => void;
  showToast: (msg: string) => void;
  setPreferences: (prefs: Preferences) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  completeTour: () => void;
}

const todayIdx = () => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; };

const load = <T>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    const parsed = JSON.parse(v);
    if (key === 'kb_week' && Array.isArray(parsed) && parsed.length > 0) {
      const firstDay = parsed[0];
      const someMeal = firstDay.breakfast || firstDay.lunch || firstDay.dinner;
      if (someMeal && !someMeal.region) return fallback;
    }
    return parsed;
  } catch { return fallback; }
};
const save = (key: string, val: unknown) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error('Failed to save state:', e); } };

export const useStore = create<AppState>((set, get) => ({
  isReady: false,
  theme: load('kb_theme', 'dark') as ThemeKey,
  lang: load('kb_lang', 'en') as Lang,
  filters: load('kb_filters', { sat: false, kids: false, seas: false, quick: false, easy: false, oilFree: false }),
  weekPlan: load('kb_week', null),
  randPlan: [],
  randPeriod: 1,
  currentTab: 'weekly',
  selectedDay: todayIdx(),
  modal: null,
  activeSeason: null,
  favorites: load('kb_favs', []),
  toast: null,
  preferences: load('kb_prefs', { cuisines: [], maxTime: null, diets: [] }),
  hasOnboarded: load('kb_onboarded', false) as boolean,
  showTour: load('kb_tour', false) as boolean,

  initializeApp: async () => {
    if (get().isReady) return;
    const { registerDishes } = await import('./data/dishes');
    const modules = import.meta.glob('./data/regions/*.ts');
    for (const path in modules) {
      const mod = await modules[path]() as Record<string, Dish[]>;
      for (const key in mod) {
        if (key.includes('Breakfast')) registerDishes('breakfast', mod[key]);
        else if (key.includes('Lunch')) registerDishes('lunch', mod[key]);
        else if (key.includes('Dinner')) registerDishes('dinner', mod[key]);
      }
    }
    set({ isReady: true });

    // PWA Local Notification Reminders (Requires app to be open or in background tab)
    if ('Notification' in window && Notification.permission !== 'denied') {
      const checkMealTime = () => {
        const hour = new Date().getHours();
        const min = new Date().getMinutes();
        if (min === 0) {
          let meal = '';
          if (hour === 8) meal = 'Breakfast';
          if (hour === 12) meal = 'Lunch';
          if (hour === 19) meal = 'Dinner';
          
          if (meal && Notification.permission === 'granted') {
            new Notification(`Time for ${meal}!`, {
              body: 'Check out your Kya Banaon recommendation.',
              icon: '/icons/icon-192x192.png'
            });
          }
        }
      };
      
      // Request permission on first load if default
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      setInterval(checkMealTime, 60000); // check every minute
      checkMealTime();
    }
  },

  setTheme: (t) => {
    set({ theme: t });
    save('kb_theme', t);
    document.documentElement.classList.toggle('light', t === 'light');
    document.documentElement.classList.toggle('dark', t === 'dark');
  },

  setLang: (l) => {
    set({ lang: l });
    save('kb_lang', l);
  },

  toggleFilter: (key) => {
    const filters = { ...get().filters, [key]: !get().filters[key] };
    set({ filters, weekPlan: null, randPlan: [] });
    save('kb_filters', filters);
  },

  setWeekPlan: (plan) => { set({ weekPlan: plan }); save('kb_week', plan); },
  regenMeal: (dayIdx, mealType, dish) => {
    const plan = get().weekPlan ? [...get().weekPlan!] : [];
    if (plan[dayIdx]) plan[dayIdx] = { ...plan[dayIdx], [mealType]: dish };
    set({ weekPlan: plan }); save('kb_week', plan);
  },

  setRandPlan: (plan) => set({ randPlan: plan }),
  regenRandMeal: (dayIdx, mealIdx, dish) => {
    const plan = get().randPlan.map((d, di) => di === dayIdx ? d.map((m, mi) => mi === mealIdx ? dish : m) : d);
    set({ randPlan: plan });
  },

  setRandPeriod: (p) => { set({ randPeriod: p, randPlan: [] }); },
  setTab: (tab) => set({ currentTab: tab }),
  selectDay: (idx) => set({ selectedDay: idx }),
  openModal: (state) => set({ modal: state }),
  closeModal: () => set({ modal: null }),
  setSeason: (key) => set({ activeSeason: key }),
  
  toggleFavorite: (id) => {
    const favs = get().favorites;
    const newFavs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
    set({ favorites: newFavs });
    save('kb_favs', newFavs);
    get().showToast(favs.includes(id) ? 'Removed from saved' : 'Saved to favorites');
  },
  
  showToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => { if (get().toast === msg) set({ toast: null }); }, 3000);
  },
  
  setPreferences: (prefs) => {
    set({ preferences: prefs });
    save('kb_prefs', prefs);
  },
  
  completeOnboarding: () => {
    set({ hasOnboarded: true, showTour: true });
    save('kb_onboarded', true);
    save('kb_tour', true);
  },
  
  resetOnboarding: () => {
    set({ hasOnboarded: false });
  },
  
  completeTour: () => {
    set({ showTour: false });
    save('kb_tour', false);
  }
}));
