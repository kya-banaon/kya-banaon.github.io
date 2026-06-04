import { useEffect } from 'react';
import { useStore } from '../store';
import { CURR_MONTH } from '../mealLogic';
import { SEASONS, SEASONAL_VEGS } from '../data/seasons';
import type { SeasonKey, MealType } from '../types';
import { DISHES } from '../data/dishes';

const MONTH_NAMES = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
const MEAL_ICONS: Record<MealType,string> = { breakfast:'☀️', lunch:'🌿', dinner:'🌙' };
const MEAL_COLOR: Record<MealType,string> = { breakfast:'var(--c-b)', lunch:'var(--c-l)', dinner:'var(--c-d)' };

function findDish(name: string) {
  for (const type of ['breakfast','lunch','dinner'] as MealType[]) {
    const d = DISHES[type].find(x => x.name === name);
    if (d) return { ...d, _type: type };
  }
  return null;
}

export default function SeasonalView() {
  const { activeSeason, setSeason, openModal } = useStore();

  useEffect(() => {
    if (!activeSeason) {
      const current = SEASONS.find(s => s.months.includes(CURR_MONTH));
      setSeason(current?.key || 'win');
    }
  }, []);

  const season = SEASONS.find(s => s.key === activeSeason) || SEASONS[0];
  const vegs = SEASONAL_VEGS[CURR_MONTH] || [];

  const SEASON_COLORS: Record<SeasonKey, { from: string; to: string }> = {
    win: { from:'#1A3A6B', to:'#2C6FBF' },
    spr: { from:'#0F3D25', to:'#2D7A4F' },
    sum: { from:'#4A1800', to:'#B84A00' },
    mon: { from:'#003344', to:'#1A6B8A' },
    aut: { from:'#3A1E00', to:'#7B4A00' },
  };

  const sc = SEASON_COLORS[season.key];

  return (
    <div className="pb-28">
      {/* Season selector */}
      <div className="flex gap-2 px-4 pt-4 pb-3 overflow-x-auto hide-scrollbar">
        {SEASONS.map(s => {
          const active = s.key === activeSeason;
          return (
            <button key={s.key} onClick={() => setSeason(s.key)}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all active:scale-95 min-w-[90px]"
              style={{ background: active ? `linear-gradient(135deg, ${SEASON_COLORS[s.key].from}, ${SEASON_COLORS[s.key].to})` : 'var(--surface)',
                border: `1.5px solid ${active ? 'transparent' : 'var(--border)'}`,
                boxShadow: active ? `0 4px 16px rgba(0,0,0,0.35)` : 'none' }}>
              <span className="text-2xl">{s.ico}</span>
              <span className="text-xs font-bold" style={{ color: active ? '#fff' : 'var(--sub)' }}>{s.name}</span>
              <span className="text-[10px]" style={{ color: active ? 'rgba(255,255,255,0.6)' : 'var(--muted)' }}>{s.label}</span>
              {s.months.includes(CURR_MONTH) && <span className="text-[9px] font-bold" style={{ color: active ? 'rgba(255,255,255,0.8)' : 'var(--primary)' }}>▶ Now</span>}
            </button>
          );
        })}
      </div>

      {/* Veg chips */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
          style={{ background:`linear-gradient(135deg, ${sc.from}, ${sc.to})` }}>
          🌱 {MONTH_NAMES[CURR_MONTH]} picks
        </span>
        {vegs.map(v => (
          <span key={v} className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--sub)' }}>{v}</span>
        ))}
      </div>

      {/* Why card */}
      <div className="mx-4 mb-5 p-4 rounded-2xl text-sm leading-relaxed"
        style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--sub)' }}
        dangerouslySetInnerHTML={{ __html: `${season.ico} ${season.why}` }} />

      {/* Dish picks */}
      {(['breakfast','lunch','dinner'] as MealType[]).map(mtype => {
        const names = season.picks[mtype] || [];
        if (!names.length) return null;
        return (
          <div key={mtype} className="px-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold" style={{ color: MEAL_COLOR[mtype] }}>
                {MEAL_ICONS[mtype]} {mtype.charAt(0).toUpperCase() + mtype.slice(1)} Picks
              </span>
              <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {names.map((name, i) => {
                const dish = findDish(name);
                if (!dish) return null;
                const why = season.whyDish[name] || dish.desc;
                return (
                  <button key={i} onClick={() => dish && openModal({ dish, mealType: mtype })}
                    className="flex gap-3 text-left p-4 rounded-2xl transition-all active:scale-[.98] animate-slide-up"
                    style={{ background:'var(--surface)', border:'1px solid var(--border)',
                      borderLeft:`3px solid ${MEAL_COLOR[mtype]}`, animationDelay:`${i*50}ms`,
                      boxShadow:'0 2px 12px rgba(0,0,0,0.2)' }}>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm mb-1">{dish.name}</div>
                      <div className="text-xs leading-relaxed" style={{ color:'var(--sub)' }}>{why}</div>
                      <div className="mt-2 flex gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background:`color-mix(in srgb, ${MEAL_COLOR[mtype]} 14%, transparent)`, color:MEAL_COLOR[mtype] }}>
                          ⏱ {dish.time} min
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background:'var(--surface2)', color:'var(--sub)' }}>
                          🔥 {dish.kcal}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
