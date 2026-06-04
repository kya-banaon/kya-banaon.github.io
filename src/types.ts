export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type TabType = 'weekly' | 'random' | 'seasonal' | 'groceries' | 'saved';
export type SeasonKey = 'win' | 'spr' | 'sum' | 'mon' | 'aut';
export type ThemeKey = 'dark' | 'light';
export type FilterKey = 'sat' | 'kids' | 'seas' | 'quick' | 'easy' | 'oilFree';
export type RegionType = 'North Indian' | 'South Indian' | 'Indo-Chinese' | 'Maharashtrian' | 'Gujarati' | 'Continental' | 'Other';

export interface Recipe {
  ingredients: string[];
  steps: string[];
}

export interface Dish {
  id: string;
  name: string;
  desc: string;
  region: RegionType;
  sattvic: boolean;
  kids: boolean;
  seasons: number[];
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  time: number;
  easy: boolean;
  oilFree: boolean;
  serves: string;
  recipe: Recipe;
  _type?: MealType;
}

export interface Filters {
  sat: boolean;
  kids: boolean;
  seas: boolean;
  quick: boolean;
  easy: boolean;
  oilFree: boolean;
}

export type DayPlan = Record<MealType, Dish | null>;
export type WeekPlan = DayPlan[];

export interface ModalState {
  dish: Dish;
  mealType: MealType;
}

export interface Season {
  key: SeasonKey;
  name: string;
  ico: string;
  cls: string;
  months: number[];
  label: string;
  why: string;
  picks: Record<MealType, string[]>;
  whyDish: Record<string, string>;
}
