import type { Dish, Filters, Preferences, MealType, WeekPlan } from './types';
import { DISHES } from './data/dishes';

const TODAY = new Date();
export const CURR_MONTH = TODAY.getMonth() + 1;

export const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner'];
export const MEAL_ICONS: Record<MealType, string> = { breakfast: '☀️', lunch: '🌿', dinner: '🌙' };
export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getPool(type: MealType, filters: Filters, prefs?: Preferences, usedIds?: Set<string>): Dish[] {
  let pool = DISHES[type].filter(d => {
    // 1. Tab Bar Hard Filters (from FilterBar)
    if (!filters.seas) {
      const allYear = d.seasons.length >= 12;
      if (!allYear && !d.seasons.includes(CURR_MONTH)) return false;
    }
    if (filters.sat && !d.sattvic) return false;
    if (filters.kids && !d.kids) return false;
    if (filters.quick && d.time > 20) return false;
    if (filters.easy && !d.easy) return false;
    if (filters.oilFree && !d.oilFree) return false;

    // 2. Preferences Hard Constraints
    if (prefs) {
      if (prefs.maxTime && d.time > prefs.maxTime) return false;
      if (prefs.diets.includes('sattvic') && !d.sattvic) return false;
      if (prefs.diets.includes('oilFree') && !d.oilFree) return false;
      if (prefs.diets.includes('kids') && !d.kids) return false;
    }
    
    // 3. Prevent Repetition
    if (usedIds && usedIds.has(d.id)) return false;

    return true;
  });

  if (pool.length === 0) {
    pool = DISHES[type]; // Fallback if everything is filtered out
    if (usedIds) {
      const unrepeated = pool.filter(d => !usedIds.has(d.id));
      if (unrepeated.length > 0) pool = unrepeated;
    }
  }

  // 3. Smart Scoring Engine
  if (prefs && prefs.cuisines.length > 0) {
    // Assign a score to each dish
    const scoredPool = pool.map(d => {
      let score = 0;
      // +10 if it matches favorite cuisines
      if (prefs.cuisines.includes(d.region)) score += 10;
      // +5 if it naturally aligns with current season
      if (d.seasons.includes(CURR_MONTH)) score += 5;
      // +2 if it's easy and they didn't explicitly demand easy but it's nice
      if (d.easy) score += 2;
      return { dish: d, score };
    });

    // Sort descending by score
    scoredPool.sort((a, b) => b.score - a.score);

    // Pick top 30% or at least 5 dishes to maintain randomness but skew towards preferences
    const topN = Math.max(5, Math.ceil(scoredPool.length * 0.3));
    pool = scoredPool.slice(0, topN).map(s => s.dish);
  }

  return pool;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWeek(filters: Filters, prefs: Preferences): WeekPlan {
  const usedIds = new Set<string>();
  return Array.from({ length: 7 }, () => {
    const day: Partial<Record<MealType, Dish | null>> = {};
    for (const t of MEAL_TYPES) {
      const pool = getPool(t, filters, prefs, usedIds);
      if (pool.length) {
        const picked = pickRandom(pool);
        usedIds.add(picked.id);
        day[t] = { ...picked, _type: t };
      } else {
        day[t] = null;
      }
    }
    return day as Record<MealType, Dish | null>;
  });
}

export function generateRand(days: number, filters: Filters, prefs: Preferences): Dish[][] {
  const usedIds = new Set<string>();
  return Array.from({ length: days }, () =>
    MEAL_TYPES.map(t => {
      const pool = getPool(t, filters, prefs, usedIds);
      if (pool.length) {
        const picked = pickRandom(pool);
        usedIds.add(picked.id);
        return { ...picked, _type: t };
      }
      return null;
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
