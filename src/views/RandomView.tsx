import { useEffect } from 'react';
import { useStore } from '../store';
import { generateRand, MEAL_TYPES, MEAL_ICONS, getPool, pickRandom } from '../mealLogic';
import type { MealType, Dish } from '../types';

const MONTH_NAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MEAL_COLOR: Record<MealType,string> = { breakfast:'var(--c-b)', lunch:'var(--c-l)', dinner:'var(--c-d)' };
const GRAD: Record<MealType,string> = {
  breakfast: 'meal-grad-b',
  lunch: 'meal-grad-l',
  dinner: 'meal-grad-d',
};

export default function RandomView() {
  const { randPlan, setRandPlan, randPeriod, setRandPeriod, filters, openModal, regenRandMeal } = useStore();
  const today = new Date();

  useEffect(() => {
    if (!randPlan.length) setRandPlan(generateRand(randPeriod, filters));
  }, [randPlan.length, randPeriod, filters, setRandPlan]);

  const dayLabel = (i: number) => {
    const d = new Date(today); d.setDate(today.getDate() + i);
    return i === 0 ? `Today · ${d.getDate()} ${MONTH_NAMES[d.getMonth()+1]}` :
           i === 1 ? `Tomorrow · ${d.getDate()} ${MONTH_NAMES[d.getMonth()+1]}` :
                    `Day ${i+1} · ${d.getDate()} ${MONTH_NAMES[d.getMonth()+1]}`;
  };

  return (
    <div className="px-4 pb-28 pt-4">
      {/* Period selector */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-bold" style={{ color:'var(--sub)' }}>Plan for:</span>
        {([1,2,3] as const).map(d => (
          <button key={d} onClick={() => setRandPeriod(d)}
            className="px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95"
            style={randPeriod === d
              ? { background:'var(--primary)', color:'#fff', boxShadow:'0 3px 14px var(--primary-glow)' }
              : { background:'var(--surface2)', border:'1.5px solid var(--border)', color:'var(--sub)' }}>
            {d === 1 ? 'Today' : `${d} Days`}
          </button>
        ))}
      </div>

      {randPlan.map((dayMeals, di) => (
        <div key={di} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color:'var(--sub)' }}>{dayLabel(di)}</span>
            <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {dayMeals.map((meal: Dish | null, mi: number) => {
              const mtype = MEAL_TYPES[mi];
              const color = MEAL_COLOR[mtype];
              if (!meal) return (
                <div key={mi} className="rounded-3xl p-5 text-center text-sm" style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--sub)' }}>
                  No match
                </div>
              );
              return (
                <div key={mi} className={`rounded-3xl overflow-hidden cursor-pointer active:scale-[.978] transition-transform animate-slide-up`}
                  style={{ background:'var(--surface)', border:'1px solid var(--border)', boxShadow:'0 4px 20px rgba(0,0,0,0.25)', animationDelay:`${mi*70}ms` }}
                  onClick={() => openModal({ dish: meal, mealType: mtype })}>

                  <div className={`${GRAD[mtype]} relative overflow-hidden px-5 pt-5 pb-4`} style={{ minHeight:'100px' }}>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15" style={{ background:color }} />
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                      style={{ background:`color-mix(in srgb, ${color} 18%, transparent)`, color }}>
                      {MEAL_ICONS[mtype]} {mtype}
                    </span>
                    <div className="font-display text-xl leading-tight">{meal.name}</div>
                    <div className="text-xs mt-1.5 font-semibold opacity-60">⏱ {meal.time}m · 🔥 {meal.kcal} kcal</div>
                  </div>

                  <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-xs font-semibold" style={{ color:'var(--sub)' }}>
                      🥩 {meal.protein}g · 🌾 {meal.carbs}g
                    </span>
                    <button onClick={e => {
                      e.stopPropagation();
                      const pool = getPool(mtype, filters);
                      if (pool.length) regenRandMeal(di, mi, { ...pickRandom(pool), _type: mtype });
                    }} className="text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95"
                      style={{ background:'var(--surface2)', border:'1.5px solid var(--border)', color:'var(--sub)' }}>
                      ↺ Change
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
