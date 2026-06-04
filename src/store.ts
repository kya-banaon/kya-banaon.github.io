import { create } from 'zustand';
import type { Filters, WeekPlan, TabType, ModalState, SeasonKey, ThemeKey } from './types';

interface AppState {
  theme: ThemeKey;
  filters: Filters;
  weekPlan: WeekPlan | null;
  randPlan: any[][];
  randPeriod: 1 | 2 | 3;
  currentTab: TabType;
  selectedDay: number;
  modal: ModalState | null;
  activeSeason: SeasonKey | null;

  setTheme: (t: ThemeKey) => void;
  toggleFilter: (key: keyof Filters) => void;
  setWeekPlan: (plan: WeekPlan) => void;
  regenMeal: (dayIdx: number, mealType: string, dish: any) => void;
  setRandPlan: (plan: any[][]) => void;
  regenRandMeal: (dayIdx: number, mealIdx: number, dish: any) => void;
  setRandPeriod: (p: 1 | 2 | 3) => void;
  setTab: (tab: TabType) => void;
  selectDay: (idx: number) => void;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
  setSeason: (key: SeasonKey) => void;
}

const todayIdx = () => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; };

const load = <T>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const save = (key: string, val: any) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

export const useStore = create<AppState>((set, get) => ({
  theme: load('kb_theme', 'dark') as ThemeKey,
  filters: load('kb_filters', { sat: false, kids: false, seas: false, quick: false, easy: false, oilFree: false }),
  weekPlan: load('kb_week', null),
  randPlan: [],
  randPeriod: 1,
  currentTab: 'weekly',
  selectedDay: todayIdx(),
  modal: null,
  activeSeason: null,

  setTheme: (t) => {
    set({ theme: t });
    save('kb_theme', t);
    document.documentElement.classList.toggle('light', t === 'light');
    document.documentElement.classList.toggle('dark', t === 'dark');
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
    const plan = get().randPlan.map((d, di) => di === dayIdx ? d.map((m: any, mi: number) => mi === mealIdx ? dish : m) : d);
    set({ randPlan: plan });
  },

  setRandPeriod: (p) => { set({ randPeriod: p, randPlan: [] }); },
  setTab: (tab) => set({ currentTab: tab }),
  selectDay: (idx) => set({ selectedDay: idx }),
  openModal: (state) => set({ modal: state }),
  closeModal: () => set({ modal: null }),
  setSeason: (key) => set({ activeSeason: key }),
}));
