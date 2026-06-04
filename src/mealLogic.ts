import type { Dish, Filters, MealType, WeekPlan } from './types';
import { DISHES } from './data/dishes';

const TODAY = new Date();
export const CURR_MONTH = TODAY.getMonth() + 1;

export const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner'];
export const MEAL_ICONS: Record<MealType, string> = { breakfast: '☀️', lunch: '🌿', dinner: '🌙' };
export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getPool(type: MealType, filters: Filters): Dish[] {
  let pool = DISHES[type].filter(d => {
    if (!filters.seas) {
      const allYear = d.seasons.length >= 12;
      if (!allYear && !d.seasons.includes(CURR_MONTH)) return false;
    }
    if (filters.sat && !d.sattvic) return false;
    if (filters.kids && !d.kids) return false;
    if (filters.quick && d.time > 20) return false;
    if (filters.easy && !d.easy) return false;
    if (filters.oilFree && !d.oilFree) return false;
    return true;
  });

  if (pool.length === 0) {
    pool = DISHES[type];
  }

  return pool;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWeek(filters: Filters): WeekPlan {
  return Array.from({ length: 7 }, () => {
    const day: Partial<Record<MealType, Dish | null>> = {};
    for (const t of MEAL_TYPES) {
      const pool = getPool(t, filters);
      day[t] = pool.length ? { ...pickRandom(pool), _type: t } : null;
    }
    return day as Record<MealType, Dish | null>;
  });
}

export function generateRand(days: number, filters: Filters): Dish[][] {
  return Array.from({ length: days }, () =>
    MEAL_TYPES.map(t => {
      const pool = getPool(t, filters);
      return pool.length ? { ...pickRandom(pool), _type: t } : null;
    }) as Dish[]
  );
}

export function getDayDate(dayIndex: number): Date {
  const d = new Date(TODAY);
  const dow = d.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diff + dayIndex);
  return d;
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5)  return 'Late night 🌙';
  if (h < 12) return 'Good morning ☀️';
  if (h < 17) return 'Good afternoon 🌤';
  if (h < 21) return 'Good evening 🌅';
  return 'Good night 🌙';
}
