import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../store';
import { useTranslation } from '../i18n';

function useGroceryTranslation(list: [string, number][], lang: string) {
  const [translatedList, setTranslatedList] = useState<[string, number][]>(list);

  useEffect(() => {
    if (lang === 'en') {
      setTranslatedList(list);
      return;
    }

    let mounted = true;
    const fetchTranslations = async () => {
      try {
        const textToTranslate = list.map(item => item[0]).join('\n\n===\n\n');
        if (!textToTranslate) {
          setTranslatedList(list);
          return;
        }

        const cacheKey = `kb_tx_groc_${lang}_${textToTranslate.length}`;
        const cached = localStorage.getItem(cacheKey);
        
        let translatedItems: string[] = [];
        
        if (cached) {
          translatedItems = JSON.parse(cached);
        } else {
          const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
          const data = await res.json();
          const translatedText = data[0].map((item: any) => item[0]).join('');
          translatedItems = translatedText.split(/\s*===\s*/).map((s: string) => s.trim());
          
          if (translatedItems.length === list.length) {
            localStorage.setItem(cacheKey, JSON.stringify(translatedItems));
          }
        }

        if (mounted && translatedItems.length === list.length) {
          setTranslatedList(list.map((item, i) => [translatedItems[i], item[1]]));
        } else if (mounted) {
          setTranslatedList(list); // Fallback
        }
      } catch (e) {
        if (mounted) setTranslatedList(list);
      }
    };

    fetchTranslations();

    return () => { mounted = false; };
  }, [list, lang]);

  return translatedList;
}

export default function GroceryView() {
  const { weekPlan, lang } = useStore();
  const { t } = useTranslation();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    if (!weekPlan) return [];
    const items = new Map<string, number>();
    
    // A simple heuristic to extract base ingredients from strings like "1 cup rice" or "1/2 tsp salt"
    const extractBaseIngredient = (raw: string) => {
      let s = raw.toLowerCase().trim();
      
      // Remove all numbers and fractions
      s = s.replace(/[\d/¼½¾.-]+/g, '');
      
      // Remove common measurement units and adjectives
      const stopWords = ['cup', 'cups', 'tsp', 'tbsp', 'teaspoon', 'tablespoon', 'tablespoons', 'teaspoons', 'pinch', 'handful', 'bunch', 'pieces', 'pc', 'gram', 'grams', 'g', 'ml', 'liter', 'kg', 'sprig', 'leaves', 'chopped', 'diced', 'sliced', 'boiled', 'soaked', 'to taste', 'finely', 'freshly', 'ground', 'crushed', 'grated', 'peeled', 'to', 'for', 'of', 'a', 'an'];
      
      const words = s.split(/\s+/).filter(w => !stopWords.includes(w));
      s = words.join(' ').trim();
      
      // Remove trailing/leading punctuation
      s = s.replace(/^[^a-z]+|[^a-z]+$/g, '');
      
      return s || raw; // fallback if stripped completely
    };

    weekPlan.forEach(day => {
      ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        const dish = day[meal as 'breakfast'|'lunch'|'dinner'];
        if (dish && dish.recipe && dish.recipe.ingredients) {
          dish.recipe.ingredients.forEach(ing => {
            const clean = extractBaseIngredient(ing);
            items.set(clean, (items.get(clean) || 0) + 1);
          });
        }
      });
    });
    return Array.from(items.entries()).sort((a,b) => a[0].localeCompare(b[0]));
  }, [weekPlan]);

  const displayList = useGroceryTranslation(list, lang);

  if (!weekPlan) {
    return (
      <div className="pt-24 px-6 text-center animate-slide-up">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-2xl mb-2">{t('grocery.no_plan')}</h2>
        <p className="text-sm opacity-70">{t('grocery.no_plan_desc')}</p>
      </div>
    );
  }

  const toggle = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = displayList.length ? (checkedCount / displayList.length) * 100 : 0;

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto animate-slide-up">
      <div className="mb-6">
        <h2 className="font-display text-3xl mb-2">{t('grocery.title')}</h2>
        <p className="text-sm opacity-70 mb-4">{t('grocery.desc')}</p>
        
        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full overflow-hidden mb-2" style={{ background: 'var(--surface2)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
        </div>
        <div className="text-xs font-bold text-right" style={{ color: 'var(--sub)' }}>
          {checkedCount} / {displayList.length} {t('grocery.items')}
        </div>
      </div>

      <div className="space-y-2">
        {displayList.map(([item, count], i) => {
          // Use original english name for tracking checkbox state so it persists across language changes
          const originalItem = list[i][0]; 
          return (
          <label key={originalItem} 
            onClick={() => toggle(originalItem)}
            className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all active:scale-[.98]"
            style={{ 
              background: checked[originalItem] ? 'var(--surface2)' : 'var(--surface)', 
              border: '1px solid var(--border)',
              opacity: checked[originalItem] ? 0.6 : 1
            }}>
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 transition-colors"
              style={{ 
                border: checked[originalItem] ? 'none' : '2px solid var(--border2)',
                background: checked[originalItem] ? 'var(--primary)' : 'transparent' 
              }}>
              {checked[originalItem] && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <div className="flex-1 text-sm font-semibold capitalize" style={{ textDecoration: checked[originalItem] ? 'line-through' : 'none' }}>
              {item}
            </div>
            {count > 1 && (
              <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--surface2)', color: 'var(--sub)' }}>
                x{count}
              </div>
            )}
          </label>
        )})}
      </div>
    </div>
  );
}
