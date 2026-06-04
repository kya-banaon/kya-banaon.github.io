import { useState, useMemo } from 'react';
import { useStore } from '../store';

export default function GroceryView() {
  const { weekPlan } = useStore();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    if (!weekPlan) return [];
    const items = new Map<string, number>();
    
    weekPlan.forEach(day => {
      ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        const dish = day[meal as 'breakfast'|'lunch'|'dinner'];
        if (dish && dish.recipe && dish.recipe.ingredients) {
          dish.recipe.ingredients.forEach(ing => {
            const clean = ing.toLowerCase().trim();
            items.set(clean, (items.get(clean) || 0) + 1);
          });
        }
      });
    });
    return Array.from(items.entries()).sort((a,b) => a[0].localeCompare(b[0]));
  }, [weekPlan]);

  if (!weekPlan) {
    return (
      <div className="pt-24 px-6 text-center animate-slide-up">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-2xl mb-2">No Week Plan</h2>
        <p className="text-sm opacity-70">Generate a weekly meal plan first to see your automated grocery list!</p>
      </div>
    );
  }

  const toggle = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = list.length ? (checkedCount / list.length) * 100 : 0;

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto animate-slide-up">
      <div className="mb-6">
        <h2 className="font-display text-3xl mb-2">Grocery List</h2>
        <p className="text-sm opacity-70 mb-4">Automatically compiled from your 7-day meal plan.</p>
        
        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full overflow-hidden mb-2" style={{ background: 'var(--surface2)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
        </div>
        <div className="text-xs font-bold text-right" style={{ color: 'var(--sub)' }}>
          {checkedCount} / {list.length} items collected
        </div>
      </div>

      <div className="space-y-2">
        {list.map(([item, count]) => (
          <label key={item} 
            className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all active:scale-[.98]"
            style={{ 
              background: checked[item] ? 'var(--surface2)' : 'var(--surface)', 
              border: '1px solid var(--border)',
              opacity: checked[item] ? 0.6 : 1
            }}>
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 transition-colors"
              style={{ 
                border: checked[item] ? 'none' : '2px solid var(--border2)',
                background: checked[item] ? 'var(--primary)' : 'transparent' 
              }}>
              {checked[item] && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <div className="flex-1 text-sm font-semibold capitalize" style={{ textDecoration: checked[item] ? 'line-through' : 'none' }}>
              {item}
            </div>
            {count > 1 && (
              <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--surface2)', color: 'var(--sub)' }}>
                x{count}
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
