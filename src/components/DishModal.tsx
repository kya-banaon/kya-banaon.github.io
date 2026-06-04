import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../store';
import { MEAL_ICONS } from '../mealLogic';
import type { MealType } from '../types';

const MONTH_NAMES = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const COLOR: Record<MealType, string> = { breakfast:'var(--c-b)', lunch:'var(--c-l)', dinner:'var(--c-d)' };

export default function DishModal() {
  const { modal, closeModal } = useStore();

  useEffect(() => {
    if (!modal) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [modal, closeModal]);

  if (!modal) return null;
  const { dish, mealType } = modal;
  const color = COLOR[mealType];
  const seasText = dish.seasons.length >= 12 ? 'All year' : dish.seasons.map(m => MONTH_NAMES[m]).join(', ');
  const diff = dish.easy ? 'Easy' : dish.time <= 30 ? 'Medium' : 'Hard';

  const GRAD: Record<MealType, string> = {
    breakfast: `linear-gradient(145deg, color-mix(in srgb, var(--c-b) 30%, var(--surface)), color-mix(in srgb, var(--c-b) 55%, var(--surface)))`,
    lunch:     `linear-gradient(145deg, color-mix(in srgb, var(--c-l) 26%, var(--surface)), color-mix(in srgb, var(--c-l) 50%, var(--surface)))`,
    dinner:    `linear-gradient(145deg, color-mix(in srgb, var(--c-d) 26%, var(--surface)), color-mix(in srgb, var(--c-d) 50%, var(--surface)))`,
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] animate-sheet-in sm:animate-slide-up"
        style={{ background:'var(--surface)' }}>
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-0 sm:hidden" style={{ background:'var(--border2)' }} />

        {/* Hero */}
        <div className="relative overflow-hidden px-6 pt-6 pb-5" style={{ background: GRAD[mealType] }}>
          <button onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all active:scale-90 z-10"
            style={{ background:'rgba(0,0,0,0.25)', color:'rgba(255,255,255,0.8)' }}>✕</button>

          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15" style={{ background: color }} />

          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background:`color-mix(in srgb, ${color} 20%, transparent)`, color }}>
            {MEAL_ICONS[mealType]} {mealType}
          </span>
          <h2 className="font-display text-3xl leading-tight mb-2">{dish.name}</h2>
          <p className="text-sm opacity-70 leading-relaxed">{dish.desc}</p>

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
            { icon:'🔥', label:'Calories', val:`${dish.kcal} kcal` },
            { icon:'🥩', label:'Protein',  val:`${dish.protein}g` },
            { icon:'🍚', label:'Carbs',    val:`${dish.carbs}g` },
            { icon:'🧈', label:'Fat',      val:`${dish.fat}g` },
            { icon:'🌿', label:'Fiber',    val:`${dish.fiber}g` },
            { icon:'🌱', label:'Season',   val: seasText },
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
          <h3 className="font-display text-xl mb-4" style={{ color:'var(--primary)' }}>📝 Recipe</h3>

          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'var(--sub)' }}>Ingredients</h4>
          <ul className="space-y-2 mb-5">
            {dish.recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm py-1.5 border-b" style={{ borderColor:'var(--border)', color:'var(--sub)' }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background:'var(--primary)' }} />
                {ing}
              </li>
            ))}
          </ul>

          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'var(--sub)' }}>Steps</h4>
          <ol className="space-y-3">
            {dish.recipe.steps.map((step, i) => (
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
