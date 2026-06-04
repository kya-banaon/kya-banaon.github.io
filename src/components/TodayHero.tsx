import { useStore } from '../store';
import { getGreeting, MEAL_ICONS, MEAL_TYPES, DAY_NAMES } from '../mealLogic';
import type { MealType } from '../types';

const MONTH_NAMES = ['','January','February','March','April','May','June','July','August','September','October','November','December'];

export default function TodayHero() {
  const { weekPlan, openModal } = useStore();
  const today = new Date();
  const dow = today.getDay();
  const todayIdx = dow === 0 ? 6 : dow - 1;
  const todayData = weekPlan?.[todayIdx];

  const dateLabel = `${DAY_NAMES[todayIdx]}, ${today.getDate()} ${MONTH_NAMES[today.getMonth()+1]}`;

  return (
    <div className="mx-4 mt-4 mb-1 rounded-3xl overflow-hidden relative"
      style={{ background:'linear-gradient(135deg, color-mix(in srgb, var(--primary) 80%, #000), color-mix(in srgb, var(--primary) 40%, #000))',
        boxShadow:'0 8px 32px var(--primary-glow)' }}>
      {/* Decorative */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white" />
      <div className="absolute bottom-0 right-12 w-24 h-24 rounded-full opacity-5 bg-white" />

      <div className="relative p-5">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{getGreeting()}</p>
        <p className="text-white font-bold text-lg mb-4">{dateLabel}</p>

        <div className="flex flex-col gap-2">
          {MEAL_TYPES.map(mtype => {
            const meal = todayData?.[mtype];
            if (!meal) return null;
            return (
              <button key={mtype} onClick={() => openModal({ dish: meal, mealType: mtype })}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left transition-all active:scale-[.98]"
                style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(8px)' }}>
                <span className="text-base">{MEAL_ICONS[mtype as MealType]}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider capitalize">{mtype}</div>
                  <div className="text-white font-bold text-sm truncate">{meal.name}</div>
                </div>
                <span className="text-white/50 text-xs font-bold flex-shrink-0">{meal.kcal} kcal</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
