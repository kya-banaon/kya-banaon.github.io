import { useStore } from '../store';
import { useTranslation } from '../i18n';
import { useDishTranslation } from '../hooks/useDishTranslation';
import { getPool, pickRandom, MEAL_ICONS } from '../mealLogic';
import type { Dish, MealType } from '../types';

interface Props {
  dish: Dish | null;
  mealType: MealType;
  dayIdx: number;
  animDelay?: number;
}

const GRAD: Record<MealType, string> = {
  breakfast: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  lunch: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  dinner: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
};

export default function MealCard({ dish: rawDish, mealType, dayIdx, animDelay = 0 }: Props) {
  const { filters, openModal, regenMeal, lang } = useStore();
  const { t } = useTranslation();
  const dish = useDishTranslation(rawDish);

  const handleRegen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pool = getPool(mealType, filters);
    if (pool.length) regenMeal(dayIdx, mealType, { ...pickRandom(pool), _type: mealType });
  };

  if (!dish) return (
    <div className="rounded-xl p-5 text-center text-sm animate-slide-up"
      style={{ background:'var(--surface)', border:'1px solid var(--border)', animationDelay:`${animDelay}ms`, color:'var(--sub)' }}>
      {t('card.no_dish')}
    </div>
  );

  const tags: string[] = [];
  if (dish.sattvic) tags.push('🙏');
  if (dish.kids) tags.push('👦');
  if (dish.easy) tags.push('👌');
  if (dish.oilFree) tags.push('💧');

  return (
    <div className="rounded-xl overflow-hidden cursor-pointer active:scale-[.978] transition-transform animate-slide-up"
      style={{ background:'var(--surface)', border:'1px solid var(--border)',
        boxShadow:'0 4px 24px rgba(0,0,0,0.3)', animationDelay:`${animDelay}ms` }}
      onClick={() => openModal({ dish, mealType })}>

      {/* Gradient header */}
      <div className={`relative overflow-hidden px-5 pt-5 pb-4 min-h-[120px] flex flex-col justify-end text-white`}
        style={{ background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%), ${GRAD[mealType]}` }}>
        
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 w-fit"
          style={{ background:`rgba(255,255,255,0.2)`, color: '#fff', backdropFilter: 'blur(4px)' }}>
          {MEAL_ICONS[mealType]} {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </span>

        <h3 className="font-display text-2xl leading-tight text-white shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {lang === 'hi' && dish.nameHi ? dish.nameHi : dish.name}
        </h3>
      </div>

      {/* Macro strip */}
      <div className="flex gap-4 px-5 py-2.5 text-sm" style={{ borderBottom:`1px solid var(--border)`, background:'var(--surface2)' }}>
        <span className="font-bold" style={{ color:'var(--primary)' }}>🔥 {dish.kcal}</span>
        <span style={{ color:'var(--sub)' }}>🥩 {dish.protein}g</span>
        <span style={{ color:'var(--sub)' }}>⏱ {dish.time}m</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {tags.map(t => (
            <span key={t} className="text-sm px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background:'var(--surface2)', color:'var(--sub)' }}>{t}</span>
          ))}
        </div>
        {dayIdx !== -1 && (
          <button onClick={handleRegen}
            className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 transition-all active:scale-95"
            style={{ background:'var(--surface2)', border:'1.5px solid var(--border)', color:'var(--sub)' }}>
            {t('card.change')}
          </button>
        )}
      </div>
    </div>
  );
}
