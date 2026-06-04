import type { Dish } from '../../types';

export const otherRegionsBreakfast: Dish[] = [
  {
    id: 'kanda-poha',
    name: 'Kanda Poha',
    desc: 'Maharashtrian flattened rice cooked with onions and peanuts.',
    region: 'Maharashtrian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 280, protein: 6, carbs: 45, fat: 8, fiber: 3, time: 15, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['1.5 cups thick poha', '1 onion chopped', 'Peanuts, green chillies, curry leaves', 'Mustard seeds, turmeric, salt', 'Lemon, coriander'], steps: ['Wash poha. Sauté peanuts, mustard, onion.', 'Add turmeric, poha, salt.', 'Steam 2 mins. Garnish with lemon and coriander.'] }
  },
  {
    id: 'misal-pav',
    name: 'Misal Pav',
    desc: 'Spicy moth bean sprout curry topped with farsan, served with pav.',
    region: 'Maharashtrian', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 14, carbs: 60, fat: 18, fiber: 8, time: 35, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Sprouted moth beans', 'Goda masala, red chilli, onion, tomato', 'Farsan/sev', 'Pav buns'], steps: ['Cook sprouts in a thin fiery, oily gravy (kat).', 'Serve in bowl topped with farsan and chopped onions.', 'Eat with pav.'] }
  },
  {
    id: 'dhokla',
    name: 'Nylon Khaman Dhokla',
    desc: 'Spongy, sweet and sour gram flour cake tempered with mustard and chillies.',
    region: 'Gujarati', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 220, protein: 8, carbs: 30, fat: 6, fiber: 4, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['1 cup besan, citric acid/lemon, sugar, salt', 'Eno fruit salt', 'Tempering: mustard, sesame seeds, green chillies, water'], steps: ['Make batter, add Eno, steam 15 mins.', 'Make sweet and sour tempering water.', 'Pour over cut dhokla pieces.'] }
  }
];

export const otherRegionsLunch: Dish[] = [
  {
    id: 'dal-dhokli',
    name: 'Dal Dhokli',
    desc: 'Whole wheat pasta-like squares boiled in a sweet and spicy tuvar dal.',
    region: 'Gujarati', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 12, carbs: 65, fat: 8, fiber: 8, time: 40, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['½ cup tuvar dal', 'Jaggery, kokum, peanuts', 'Dough: wheat flour, besan, spices'], steps: ['Cook dal, temper with spices, add jaggery and kokum.', 'Roll dough, cut into squares (dhokli).', 'Drop dhokli into boiling dal. Cook 15 mins.'] }
  },
  {
    id: 'zhunka-bhakar',
    name: 'Zhunka Bhakri',
    desc: 'Dry, spicy besan preparation served with jowar or bajra flatbread.',
    region: 'Maharashtrian', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 400, protein: 15, carbs: 55, fat: 12, fiber: 10, time: 30, easy: false, oilFree: false, serves: '2',
    recipe: { ingredients: ['1 cup besan', 'Garlic, onion, mustard seeds, red chilli', 'Jowar flour for bhakri'], steps: ['Sauté onion and garlic, add water and boil.', 'Gradually stir in besan till it forms a dry mass.', 'Serve with hot jowar bhakri and raw onion.'] }
  }
];

export const otherRegionsDinner: Dish[] = [
  {
    id: 'pav-bhaji-mumbai',
    name: 'Mumbai Pav Bhaji',
    desc: 'Spicy mashed vegetable curry cooked in butter, served with soft bread rolls.',
    region: 'Maharashtrian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 480, protein: 10, carbs: 65, fat: 22, fiber: 8, time: 40, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['Potatoes, peas, cauliflower boiled & mashed', 'Onion, capsicum, tomatoes', 'Pav bhaji masala, butter', 'Pav buns'], steps: ['Sauté onion, capsicum, tomatoes in butter.', 'Add mashed veggies, spices, more butter.', 'Mash thoroughly. Serve with butter-toasted pav.'] }
  },
  {
    id: 'undhiyu-puri',
    name: 'Undhiyu & Puri',
    desc: 'Winter special mixed vegetable dish with fenugreek dumplings (muthias).',
    region: 'Gujarati', sattvic: true, kids: false, seasons: [11,12,1,2],
    kcal: 500, protein: 12, carbs: 60, fat: 25, fiber: 12, time: 60, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['Surti papdi, purple yam, baby potatoes, eggplant', 'Muthias (fried fenugreek-besan dumplings)', 'Green garlic, coconut, coriander paste'], steps: ['Stuff potatoes and eggplant with coconut-spice paste.', 'Layer veggies and muthias in a pot.', 'Slow cook with oil and spices until tender. Serve with puri.'] }
  }
];
