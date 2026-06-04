import { useEffect } from 'react';
import { useStore } from '../store';
import { generateWeek, MEAL_TYPES, getDayDate, DAY_NAMES, MEAL_ICONS, getPool } from '../mealLogic';
import DaySelector from '../components/DaySelector';
import MealCard from '../components/MealCard';
import TodayHero from '../components/TodayHero';
import type { MealType, Dish } from '../types';

const TODAY = new Date();

export default function WeeklyView() {
  const { weekPlan, setWeekPlan, filters, selectedDay } = useStore();

  useEffect(() => {
    if (!weekPlan) setWeekPlan(generateWeek(filters));
  }, [weekPlan, filters, setWeekPlan]);

  if (!weekPlan) return null;

  return (
    <div className="pb-28">
      {/* Mobile layout */}
      <div className="sm:hidden">
        <TodayHero />
        <DaySelector />
        <div className="px-4 pt-4 flex flex-col gap-4">
          {MEAL_TYPES.map((mtype, i) => (
            <MealCard key={mtype} dish={weekPlan[selectedDay]?.[mtype] ?? null}
              mealType={mtype} dayIdx={selectedDay} animDelay={i * 80} />
          ))}
        </div>
      </div>

      {/* Desktop layout: week grid */}
      <div className="hidden sm:block p-6">
        <div className="overflow-x-auto rounded-3xl" style={{ border:`1px solid var(--border)`, boxShadow:'0 4px 32px rgba(0,0,0,0.3)' }}>
          <table className="w-full min-w-[700px]" style={{ background:'var(--surface)' }}>
            <thead>
              <tr>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-left w-24"
                  style={{ background:'var(--surface2)', color:'var(--sub)', borderBottom:`1px solid var(--border)` }}>Meal</th>
                {DAY_NAMES.map((d, i) => {
                  const dt = getDayDate(i);
                  const isToday = dt.toDateString() === TODAY.toDateString();
                  return (
                    <th key={d} className="p-3 text-center text-xs font-bold"
                      style={{ background: isToday ? 'var(--primary-dim)' : 'var(--surface2)',
                        color: isToday ? 'var(--primary)' : 'var(--sub)',
                        borderBottom:`1px solid var(--border)` }}>
                      <div>{d}</div>
                      <div className="text-base font-bold mt-0.5" style={{ color: isToday ? 'var(--primary)' : 'var(--text)' }}>
                        {dt.getDate()}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {MEAL_TYPES.map(mtype => (
                <tr key={mtype} style={{ borderBottom:`1px solid var(--border)` }}>
                  <td className="p-3 text-xs font-bold uppercase tracking-wider" style={{ background:'var(--surface2)', color:'var(--sub)' }}>
                    {MEAL_ICONS[mtype as MealType]}<br/>{mtype}
                  </td>
                  {weekPlan.map((day, di) => (
                    <DesktopCell key={di} dish={day[mtype]} mealType={mtype} dayIdx={di} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DesktopCell({ dish, mealType, dayIdx }: { dish: Dish | null; mealType: MealType; dayIdx: number }) {
  const { openModal, filters, regenMeal } = useStore();
  if (!dish) return <td className="p-2 text-center text-xs" style={{ color:'var(--muted)' }}>—</td>;

  const COLOR: Record<MealType,string> = { breakfast:'var(--c-b)', lunch:'var(--c-l)', dinner:'var(--c-d)' };

  return (
    <td className="p-2" style={{ borderLeft:`1px solid var(--border)` }}>
      <div className="rounded-xl p-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[.98] group relative"
        style={{ background:'var(--surface2)' }}
        onClick={() => openModal({ dish, mealType })}>
        <div className="w-full h-0.5 rounded-full mb-2" style={{ background:COLOR[mealType] }} />
        <div className="text-xs font-bold leading-snug">{dish.name}</div>
        <button onClick={e => { e.stopPropagation(); const pool = getPool(mealType, filters); if(pool?.length) regenMeal(dayIdx, mealType, { ...pool[Math.floor(Math.random()*pool.length)], _type:mealType }); }}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-[10px] px-1.5 py-0.5 rounded-lg transition-all"
          style={{ background:'var(--primary-dim)', color:'var(--primary)' }}>↺</button>
      </div>
    </td>
  );
}
