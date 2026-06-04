import type { Dish, Lang } from './types';

const DELIMITER = '\n\n===\n\n';

const queue: (() => Promise<void>)[] = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;
  while (queue.length > 0) {
    const task = queue.shift();
    if (task) {
      await task();
      // Wait 300ms between requests to avoid 429 Too Many Requests
      await new Promise(r => setTimeout(r, 300));
    }
  }
  isProcessing = false;
}

export function translateDish(dish: Dish, targetLang: Lang): Promise<Dish> {
  return new Promise((resolve) => {
    if (targetLang === 'en') return resolve(dish);
    if (targetLang === 'hi' && dish.nameHi) return resolve(dish);

    const cacheKey = `kb_tx_${targetLang}_${dish.id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return resolve(JSON.parse(cached));
      } catch (e) {
        // Ignore parse error and refetch
      }
    }

    queue.push(async () => {
      // Combine fields to translate into one string
      const parts = [
        dish.name,
        dish.desc,
        ...dish.recipe.ingredients,
        ...dish.recipe.steps,
      ];
      
      const text = parts.join(DELIMITER);
      
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        
        // Google translate splits large text into multiple arrays
        const translatedText = data[0].map((item: any) => item[0]).join('');
        
        // Split back by delimiter
        const translatedParts = translatedText.split(/\s*===\s*/);
        
        if (translatedParts.length >= 2) {
          const nameHi = translatedParts[0].trim();
          const descHi = translatedParts[1].trim();
          const numIngredients = dish.recipe.ingredients.length;
          
          const ingredientsHi = translatedParts.slice(2, 2 + numIngredients).map((s: string) => s.trim());
          const stepsHi = translatedParts.slice(2 + numIngredients).map((s: string) => s.trim());
          
          const translatedDish: Dish = {
            ...dish,
            nameHi,
            descHi,
            recipeHi: {
              ingredients: ingredientsHi.length === numIngredients ? ingredientsHi : dish.recipe.ingredients,
              steps: stepsHi.length === dish.recipe.steps.length ? stepsHi : dish.recipe.steps,
            }
          };
          
          localStorage.setItem(cacheKey, JSON.stringify(translatedDish));
          return resolve(translatedDish);
        }
      } catch (e) {
        console.error('Translation failed', e);
      }
      resolve(dish);
    });
    
    processQueue();
  });
}
