import type { Dish } from '../../types';

export const southIndianBreakfast: Dish[] = [
  {
    id: 'pongal',
    name: 'Ven Pongal',
    desc: 'Soft and savory rice and lentil porridge tempered with black pepper and cumin in ghee.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 320, protein: 10, carbs: 45, fat: 12, fiber: 4, time: 25, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['½ cup rice', '½ cup moong dal', '1 tsp black peppercorns, 1 tsp cumin', 'Curry leaves, cashews', 'Ghee'], steps: ['Pressure cook rice and dal till mushy.', 'Temper pepper, cumin, cashews in ghee.', 'Pour over pongal and mix well.'] }
  },
  {
    id: 'appam-stew',
    name: 'Appam & Veg Stew',
    desc: 'Lacy fermented rice pancakes with a mild coconut milk vegetable stew.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 6, carbs: 65, fat: 12, fiber: 5, time: 35, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Appam batter (rice, coconut, yeast)', 'Mixed veg (carrot, potato, peas)', '1 cup thin coconut milk, ½ cup thick coconut milk', 'Ginger, green chilli, whole spices'], steps: ['Make appams in an appachatty.', 'Simmer veggies in thin coconut milk with spices.', 'Add thick milk at the end, do not boil.'] }
  },
  {
    id: 'pesarattu',
    name: 'Pesarattu (Green Gram Dosa)',
    desc: 'Protein-packed Andhra style dosa made from green moong dal.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 260, protein: 14, carbs: 38, fat: 6, fiber: 8, time: 20, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['1 cup green moong dal (soaked overnight)', '1 inch ginger, 2 green chillies', 'Chopped onions', 'Oil'], steps: ['Grind soaked dal, ginger, chilli to a batter.', 'Spread like a dosa.', 'Top with chopped onions and cook till crisp.'] }
  }
];

export const southIndianLunch: Dish[] = [
  {
    id: 'bisi-bele-bath',
    name: 'Bisi Bele Bath',
    desc: 'Karnataka special: spicy, tangy rice, lentil and vegetable dish.',
    region: 'South Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 420, protein: 12, carbs: 68, fat: 12, fiber: 8, time: 45, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['½ cup rice, ½ cup toor dal', 'Mixed veggies', 'Bisi bele bath powder, tamarind extract', 'Ghee, cashews, curry leaves'], steps: ['Cook rice, dal, and veggies together.', 'Add tamarind and spice powder.', 'Temper with ghee, mustard, cashews.'] }
  },
  {
    id: 'lemon-rice',
    name: 'Lemon Rice',
    desc: 'Tangy, yellow, peanut-studded rice – a lunchbox classic.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 350, protein: 8, carbs: 55, fat: 12, fiber: 4, time: 15, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['2 cups cooked rice', 'Juice of 1 large lemon', 'Peanuts, chana dal, urad dal', 'Mustard seeds, curry leaves, turmeric', 'Oil'], steps: ['Fry peanuts and dals in oil.', 'Add mustard, curry leaves, turmeric.', 'Turn off heat, add lemon juice.', 'Mix with rice.'] }
  },
  {
    id: 'avial',
    name: 'Avial & Matta Rice',
    desc: 'Kerala style mixed vegetables in a thick coconut and yogurt paste.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 10, carbs: 50, fat: 16, fiber: 10, time: 30, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Mixed veg batons (ash gourd, carrot, drumstick, raw banana)', 'Coconut, cumin, green chilli paste', '½ cup sour yogurt', 'Coconut oil, curry leaves'], steps: ['Cook veggies in minimal water.', 'Add coconut paste.', 'Turn off heat, stir in yogurt.', 'Drizzle coconut oil and curry leaves.'] }
  }
];

export const southIndianDinner: Dish[] = [
  {
    id: 'idiyappam-kurma',
    name: 'Idiyappam & Kurma',
    desc: 'Steamed rice flour string hoppers served with vegetable coconut curry.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 400, protein: 8, carbs: 65, fat: 12, fiber: 5, time: 40, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Roasted rice flour', 'Mixed veg for kurma', 'Coconut, fennel, cashew paste', 'Spices'], steps: ['Make dough with hot water, press into strings, steam.', 'For kurma, boil veg.', 'Add coconut-cashew paste and simmer.'] }
  },
  {
    id: 'rasam-rice',
    name: 'Rasam Rice',
    desc: 'Thin, spicy, tangy tomato-tamarind broth served with hot rice.',
    region: 'South Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 280, protein: 6, carbs: 55, fat: 4, fiber: 3, time: 20, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['1 tomato, tamarind water', 'Rasam powder (pepper, cumin, coriander)', 'Garlic (optional), mustard, curry leaves', 'Cooked rice'], steps: ['Boil tamarind water with tomato.', 'Add rasam powder, simmer.', 'Temper mustard and curry leaves in ghee. Mix with rice.'] }
  },
  {
    id: 'malabar-parotta-kurma',
    name: 'Malabar Parotta & Kurma',
    desc: 'Flaky layered flatbread served with spicy vegetable kurma.',
    region: 'South Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 500, protein: 10, carbs: 60, fat: 22, fiber: 5, time: 45, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Readymade or homemade parottas', 'Veg kurma (coconut, poppy seeds, spices)'], steps: ['Heat parottas on tawa, crush to open layers.', 'Serve hot with kurma.'] }
  }
];
