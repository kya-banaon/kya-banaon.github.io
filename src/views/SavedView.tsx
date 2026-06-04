import { useMemo } from 'react';
import { useStore } from '../store';
import MealCard from '../components/MealCard';
import type { Dish, MealType } from '../types';
import { DISHES } from '../data/dishes';

function findDishById(id: string): { dish: Dish; type: MealType } | null {
  for (const type of ['breakfast', 'lunch', 'dinner'] as MealType[]) {
    const d = DISHES[type].find(x => x.id === id);
    if (d) return { dish: d, type };
  }
  return null;
}

export default function SavedView() {
  const { favorites } = useStore();

  const savedDishes = useMemo(() => {
    return favorites.map(id => findDishById(id)).filter(Boolean) as { dish: Dish; type: MealType }[];
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="pt-24 px-6 text-center animate-slide-up">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="font-display text-2xl mb-2">No Saved Meals</h2>
        <p className="text-sm opacity-70">Tap the heart icon on any dish to save it here for quick access!</p>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-4 px-4 max-w-xl mx-auto animate-slide-up">
      <div className="mb-6">
        <h2 className="font-display text-3xl mb-2">Saved Meals</h2>
        <p className="text-sm opacity-70">Your personal collection of favorites.</p>
      </div>

      <div className="grid gap-4">
        {savedDishes.map(({ dish, type }, i) => (
          <MealCard key={dish.id} dish={dish} mealType={type} dayIdx={-1} animDelay={i * 50} />
        ))}
      </div>
    </div>
  );
}
