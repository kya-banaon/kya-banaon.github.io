import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../store';
import { useTranslation } from '../i18n';
import { useDishTranslation } from '../hooks/useDishTranslation';
import { MEAL_ICONS } from '../mealLogic';
import type { MealType } from '../types';

const MONTH_NAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const COLOR: Record<MealType, string> = { breakfast:'var(--c-b)', lunch:'var(--c-l)', dinner:'var(--c-d)' };

export default function DishModal() {
  const { modal, closeModal, favorites, toggleFavorite, lang } = useStore();
  const { t } = useTranslation();
  const rawDish = modal?.dish || null;
  const mealType = modal?.mealType || 'lunch';
  const dish = useDishTranslation(rawDish);

  useEffect(() => {
    if (!modal) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [modal, closeModal]);

  if (!modal || !dish) return null;
  
  const color = COLOR[mealType];
  const seasText = dish.seasons.length >= 12 ? (lang === 'hi' ? 'पूरा साल' : 'All year') : dish.seasons.map(m => MONTH_NAMES[m]).join(', ');
  const diff = dish.easy ? t('modal.easy') : dish.time <= 30 ? t('modal.medium') : t('modal.hard');

  const GRAD: Record<MealType, string> = {
    breakfast: `linear-gradient(to top, var(--surface) 0%, rgba(0,0,0,0.4) 100%), url(/images/breakfast.png) center/cover`,
    lunch:     `linear-gradient(to top, var(--surface) 0%, rgba(0,0,0,0.4) 100%), url(/images/lunch.png) center/cover`,
    dinner:    `linear-gradient(to top, var(--surface) 0%, rgba(0,0,0,0.4) 100%), url(/images/dinner.png) center/cover`,
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-xl sm:rounded-xl animate-sheet-in sm:animate-slide-up"
        style={{ background:'var(--surface)' }}>
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-0 sm:hidden" style={{ background:'var(--border2)' }} />

        {/* Hero */}
        <div className="relative overflow-hidden px-6 pt-6 pb-5 bg-black text-white" style={{ background: GRAD[mealType] }}>
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button onClick={() => toggleFavorite(dish.id)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all active:scale-90"
              style={{ background:'rgba(255,255,255,0.2)', color: favorites.includes(dish.id) ? '#ff4757' : 'white', backdropFilter:'blur(4px)' }}>
              {favorites.includes(dish.id) ? '❤️' : '🤍'}
            </button>
            <button onClick={closeModal}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all active:scale-90"
              style={{ background:'rgba(0,0,0,0.25)', color:'rgba(255,255,255,0.8)', backdropFilter:'blur(4px)' }}>✕</button>
          </div>

          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15" style={{ background: color }} />

          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background:`color-mix(in srgb, ${color} 20%, transparent)`, color }}>
            {MEAL_ICONS[mealType]} {mealType}
          </span>
          <h2 className="font-display text-3xl leading-tight mb-2">
            {lang === 'hi' && dish.nameHi ? dish.nameHi : dish.name}
          </h2>
          <p className="text-sm opacity-70 leading-relaxed">
            {lang === 'hi' && dish.descHi ? dish.descHi : dish.desc}
          </p>

          <div className="flex gap-3 mt-4 text-sm flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold opacity-70">⏱ {dish.time} min</span>
            <span className="flex items-center gap-1.5 font-semibold opacity-70">👤 {dish.serves}</span>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold"
              style={{ background:`color-mix(in srgb, ${color} 18%, transparent)`, color }}>
              🌍 {dish.region}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold"
              style={{ background:`color-mix(in srgb, ${color} 18%, transparent)`, color }}>
              {diff}
            </span>
          </div>
        </div>

        {/* Nutrition */}
        <div className="grid grid-cols-3 gap-2 p-4" style={{ borderBottom:`1px solid var(--border)` }}>
          {[
            { icon:'🔥', label:t('modal.calories'), val:`${dish.kcal} kcal` },
            { icon:'🥩', label:t('modal.protein'),  val:`${dish.protein}g` },
            { icon:'🍚', label:t('modal.carbs'),    val:`${dish.carbs}g` },
            { icon:'🧈', label:t('modal.fat'),      val:`${dish.fat}g` },
            { icon:'🌿', label:t('modal.fiber'),    val:`${dish.fiber}g` },
            { icon:'🌱', label:t('modal.season'),   val: seasText },
          ].map(({ icon, label, val }) => (
            <div key={label} className="rounded-2xl p-3 text-center" style={{ background:'var(--surface2)' }}>
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color:'var(--sub)' }}>{label}</div>
              <div className="text-sm font-bold">{val}</div>
            </div>
          ))}
        </div>

        {/* Recipe */}
        <div className="p-5 pb-8">
          <h3 className="font-display text-xl mb-4" style={{ color:'var(--primary)' }}>{t('modal.recipe')}</h3>

          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'var(--sub)' }}>{t('modal.ingredients')}</h4>
          <ul className="space-y-2 mb-5">
            {(lang === 'hi' && dish.recipeHi ? dish.recipeHi.ingredients : dish.recipe.ingredients).map((ing, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm py-1.5 border-b" style={{ borderColor:'var(--border)', color:'var(--sub)' }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background:'var(--primary)' }} />
                {ing}
              </li>
            ))}
          </ul>

          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'var(--sub)' }}>{t('modal.steps')}</h4>
          <ol className="space-y-3">
            {(lang === 'hi' && dish.recipeHi ? dish.recipeHi.steps : dish.recipe.steps).map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ background:'var(--primary)', marginTop:'1px' }}>
                  {i+1}
                </span>
                <span style={{ color:'var(--sub)' }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>,
    document.body
  );
}
