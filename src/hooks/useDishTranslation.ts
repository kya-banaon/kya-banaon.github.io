import { useState, useEffect } from 'react';
import type { Dish } from '../types';
import { useStore } from '../store';
import { translateDish } from '../translation';

export function useDishTranslation(dish: Dish | null): Dish | null {
  const { lang } = useStore();
  const [translatedDish, setTranslatedDish] = useState<Dish | null>(dish);

  useEffect(() => {
    if (!dish) {
      setTranslatedDish(null);
      return;
    }

    if (lang === 'en') {
      setTranslatedDish(dish);
      return;
    }

    // Attempt translation
    let mounted = true;
    translateDish(dish, lang).then((res) => {
      if (mounted) {
        setTranslatedDish(res);
      }
    });

    return () => {
      mounted = false;
    };
  }, [dish, lang]);

  return translatedDish;
}
