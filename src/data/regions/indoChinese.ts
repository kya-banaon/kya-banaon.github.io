import type { Dish } from '../../types';

export const indoChineseBreakfast: Dish[] = [
  {
    id: 'chilli-cheese-toast',
    name: 'Chilli Cheese Toast',
    desc: 'Crispy bread topped with melted cheese, green chillies and capsicum.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 320, protein: 12, carbs: 35, fat: 15, fiber: 3, time: 15, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['4 bread slices', '1 cup grated mozzarella/cheddar', '1 green chilli chopped', '½ capsicum chopped', 'Butter'], steps: ['Butter bread slices.', 'Mix cheese, chilli, capsicum.', 'Top bread with mixture.', 'Toast in oven or pan until cheese melts.'] }
  },
  {
    id: 'veg-manchow-soup-breakfast',
    name: 'Manchow Soup (Light)',
    desc: 'Spicy and tangy dark brown soup with crispy noodles.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,10,11,12],
    kcal: 150, protein: 4, carbs: 25, fat: 5, fiber: 4, time: 20, easy: true, oilFree: true, serves: '2',
    recipe: { ingredients: ['2 cups mixed veggies finely chopped', '1 tbsp soy sauce', '1 tbsp vinegar', 'Crispy noodles'], steps: ['Boil veggies in 3 cups water.', 'Add soy sauce, vinegar, salt, pepper.', 'Thicken with cornstarch slurry if desired.', 'Serve topped with crispy noodles.'] }
  },
  {
    id: 'hakka-noodles-morning',
    name: 'Breakfast Hakka Noodles',
    desc: 'Wok-tossed noodles with shredded cabbage, carrot, and capsicum.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 350, protein: 8, carbs: 60, fat: 8, fiber: 5, time: 25, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['200g noodles boiled', '1 cup shredded cabbage/carrot/capsicum', '2 tbsp soy sauce', '1 tbsp garlic chopped', 'Oil, salt, pepper'], steps: ['Heat oil, fry garlic.', 'Stir fry veggies on high heat 2 min.', 'Add noodles, soy sauce, salt, pepper.', 'Toss well on high flame for 3 min. Serve hot.'] }
  },
  {
    id: 'schezwan-dosa',
    name: 'Schezwan Dosa',
    desc: 'Crispy dosa spread with spicy Schezwan sauce and veggies.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 300, protein: 6, carbs: 45, fat: 10, fiber: 4, time: 20, easy: false, oilFree: false, serves: '2',
    recipe: { ingredients: ['2 cups dosa batter', '¼ cup Schezwan sauce', '½ cup mixed chopped veggies', 'Oil'], steps: ['Spread batter on hot pan.', 'Drizzle oil. Spread Schezwan sauce over dosa.', 'Sprinkle veggies.', 'Cook till crispy, fold and serve.'] }
  },
  {
    id: 'chilli-paneer-wrap',
    name: 'Chilli Paneer Wrap',
    desc: 'Leftover roti stuffed with dry chilli paneer.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 420, protein: 18, carbs: 48, fat: 18, fiber: 5, time: 20, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['2 leftover rotis', '1 cup dry chilli paneer', 'Onion slices', 'Tomato ketchup'], steps: ['Warm rotis.', 'Spread ketchup.', 'Place chilli paneer and onion slices in center.', 'Roll tight and toast lightly on pan.'] }
  }
];

export const indoChineseLunch: Dish[] = [
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    desc: 'Classic Indo-Chinese fried rice with crunchy vegetables and soy sauce.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 8, carbs: 70, fat: 10, fiber: 6, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['3 cups cooked rice (cold)', '1.5 cups mixed fine chopped veg (carrot, beans, capsicum)', '2 tbsp soy sauce', '1 tbsp garlic', '2 tbsp oil', 'Spring onions'], steps: ['Heat oil in wok, fry garlic.', 'Add veggies, stir fry high heat 3 mins.', 'Add rice, soy sauce, salt, pepper.', 'Toss thoroughly 3-4 mins. Garnish spring onion.'] }
  },
  {
    id: 'chilli-paneer-gravy',
    name: 'Chilli Paneer Gravy',
    desc: 'Paneer cubes in spicy soy-garlic gravy with capsicum.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 18, carbs: 35, fat: 25, fiber: 3, time: 30, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['250g paneer cubed', '1 capsicum, 1 onion diced', '2 tbsp soy sauce, 1 tbsp chilli sauce', '1 tbsp cornflour', 'Garlic, ginger', 'Oil'], steps: ['Fry paneer lightly.', 'Sauté garlic, ginger, onion, capsicum.', 'Add sauces and 1.5 cups water. Bring to boil.', 'Add cornflour slurry to thicken. Add paneer, simmer 3 mins.'] }
  },
  {
    id: 'gobi-manchurian',
    name: 'Gobi Manchurian',
    desc: 'Crispy cauliflower florets tossed in sweet and spicy Manchurian sauce.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [11,12,1,2],
    kcal: 380, protein: 6, carbs: 45, fat: 18, fiber: 5, time: 40, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['1 medium cauliflower cut to florets', 'Batter: maida, cornflour, salt, pepper', 'Sauce: soy, chilli, ketchup, garlic, ginger', 'Oil for frying'], steps: ['Dip florets in batter, deep fry till crisp.', 'For sauce: sauté garlic, ginger, green chilli.', 'Add sauces, a little water, thicken with cornflour.', 'Toss fried gobi in sauce. Garnish spring onion.'] }
  },
  {
    id: 'burnt-garlic-rice',
    name: 'Burnt Garlic Fried Rice',
    desc: 'Fried rice flavored with deeply browned crispy garlic.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 400, protein: 7, carbs: 72, fat: 12, fiber: 4, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['3 cups cooked rice', '3 tbsp finely chopped garlic', '½ cup chopped veggies', '1 tbsp soy sauce', 'Oil, spring onion'], steps: ['Fry garlic in oil on low till golden brown and crispy.', 'Remove half garlic for garnish.', 'Add veggies, stir fry. Add rice, soy sauce.', 'Toss well. Garnish with burnt garlic and spring onions.'] }
  },
  {
    id: 'sweet-sour-veg',
    name: 'Sweet & Sour Veg',
    desc: 'Mixed vegetables and pineapple in a sweet and tangy glossy sauce.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 280, protein: 4, carbs: 55, fat: 6, fiber: 6, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['2 cups mixed veg (broccoli, carrot, bell pepper)', '½ cup pineapple chunks', 'Sauce: 2 tbsp ketchup, 1 tbsp vinegar, 1 tbsp sugar, soy sauce', 'Cornflour'], steps: ['Stir fry veggies till tender-crisp.', 'Mix sauce ingredients with 1 cup water, pour over veggies.', 'Thicken with cornflour slurry.', 'Add pineapple, toss and serve with rice.'] }
  },
  {
    id: 'veg-chop-suey',
    name: 'Veg Chop Suey',
    desc: 'Crispy fried noodles topped with sweet and sour vegetable gravy.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 7, carbs: 65, fat: 18, fiber: 5, time: 35, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Crispy fried noodles', '2 cups shredded cabbage, carrot, capsicum', 'Sauce: ketchup, soy sauce, vinegar, sugar', 'Cornflour'], steps: ['Prepare sweet and tangy gravy with veggies.', 'Thicken with cornflour.', 'Place crispy noodles on plate.', 'Pour hot gravy over noodles right before serving.'] }
  },
  {
    id: 'dragon-chicken-veg',
    name: 'Dragon Paneer',
    desc: 'Spicy, fiery red paneer tossed with cashews and red chillies.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 480, protein: 18, carbs: 25, fat: 32, fiber: 3, time: 30, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['250g paneer in long strips', '2 tbsp cashew nuts', '3 dry red chillies', 'Schezwan sauce 2 tbsp, ketchup 1 tbsp', 'Oil'], steps: ['Fry paneer strips.', 'Sauté dry chillies, cashews, garlic.', 'Add sauces and 2 tbsp water.', 'Toss paneer till coated. Garnish spring onion.'] }
  },
  {
    id: 'singapore-noodles',
    name: 'Singapore Noodles',
    desc: 'Thin rice noodles tossed with curry powder and vegetables.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 360, protein: 6, carbs: 68, fat: 8, fiber: 5, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['200g rice vermicelli (soaked)', '1.5 cups julienne veggies', '1 tbsp Madras curry powder', 'Soy sauce 1 tbsp', 'Oil'], steps: ['Stir fry veggies on high heat.', 'Add curry powder, toss 30 seconds.', 'Add soaked noodles, soy sauce, salt.', 'Toss gently until noodles are hot and coated.'] }
  }
];

export const indoChineseDinner: Dish[] = [
  {
    id: 'triple-schezwan-rice',
    name: 'Triple Schezwan Rice',
    desc: 'Mumbai street food special: rice, noodles and crispy noodles in Schezwan gravy.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 600, protein: 10, carbs: 95, fat: 22, fiber: 6, time: 45, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['2 cups rice, 1 cup noodles', 'Schezwan sauce 4 tbsp', 'Mixed veg, garlic, ginger', 'Crispy noodles'], steps: ['Make Schezwan fried rice.', 'Make Schezwan hakka noodles.', 'Make a spicy Schezwan veg gravy.', 'Serve rice and noodles topped with gravy and crispy noodles.'] }
  },
  {
    id: 'chilli-garlic-noodles',
    name: 'Chilli Garlic Noodles',
    desc: 'Spicy noodles tossed with heavy garlic and red chilli paste.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 7, carbs: 65, fat: 10, fiber: 5, time: 20, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['200g noodles boiled', '2 tbsp minced garlic', '1 tbsp red chilli paste', 'Mixed veg juliennes', 'Oil, soy sauce'], steps: ['Fry garlic till fragrant.', 'Add chilli paste and veggies, stir fry 2 mins.', 'Add noodles, soy sauce, salt.', 'Toss on high heat.'] }
  },
  {
    id: 'mushroom-manchurian',
    name: 'Mushroom Manchurian',
    desc: 'Crispy button mushrooms in dark soy Manchurian sauce.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 320, protein: 6, carbs: 35, fat: 16, fiber: 4, time: 35, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['200g button mushrooms halved', 'Batter: maida, cornflour', 'Sauce: soy, garlic, ginger, green chilli', 'Oil'], steps: ['Batter fry mushrooms till crisp.', 'Prepare Manchurian sauce in wok.', 'Toss fried mushrooms immediately before serving.', 'Garnish with spring onions.'] }
  },
  {
    id: 'paneer-fried-rice',
    name: 'Paneer Fried Rice',
    desc: 'Fried rice tossed with small paneer cubes and mild spices.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 14, carbs: 65, fat: 15, fiber: 4, time: 25, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['3 cups cooked rice', '100g paneer small cubes', '1 cup mixed veggies', '1 tbsp soy sauce', 'White pepper, oil'], steps: ['Pan fry paneer cubes lightly. Set aside.', 'Stir fry veggies and garlic in wok.', 'Add rice, paneer, soy sauce, pepper.', 'Toss well.'] }
  },
  {
    id: 'hot-sour-soup',
    name: 'Hot & Sour Soup',
    desc: 'Thick, spicy and sour vegetable soup with tofu/paneer.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,10,11,12],
    kcal: 180, protein: 6, carbs: 22, fat: 6, fiber: 4, time: 25, easy: true, oilFree: true, serves: '2',
    recipe: { ingredients: ['2 cups finely chopped veg (cabbage, carrot, mushroom)', '50g tofu/paneer diced', '1 tbsp soy, 2 tbsp vinegar, 1 tsp chilli sauce', 'Cornflour'], steps: ['Boil veggies in vegetable stock.', 'Add tofu, sauces, salt, pepper.', 'Thicken with cornflour slurry.', 'Serve hot.'] }
  },
  {
    id: 'american-chopsuey',
    name: 'American Chopsuey',
    desc: 'Sweet, red, tomato-based gravy over crispy noodles.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 460, protein: 6, carbs: 70, fat: 16, fiber: 5, time: 30, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Crispy noodles', '1.5 cups veggies (carrot, cabbage, capsicum)', '½ cup pineapple', 'Sauce: 4 tbsp tomato ketchup, sugar, cornflour'], steps: ['Make sweet tomato-based gravy with veggies.', 'Add pineapple chunks.', 'Pour over crispy noodles on plate.'] }
  },
  {
    id: 'veg-ball-manchurian',
    name: 'Veg Ball Manchurian (Gravy)',
    desc: 'Deep fried vegetable dumplings in spicy brown gravy.',
    region: 'Indo-Chinese', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 420, protein: 8, carbs: 55, fat: 18, fiber: 8, time: 45, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['2 cups grated mixed veg (cabbage, carrot, beans)', '¼ cup maida, ¼ cup cornflour', 'Sauce: soy, chilli, garlic, ginger', 'Oil'], steps: ['Squeeze water from veg, mix with flours, form balls.', 'Deep fry balls till golden.', 'Make manchurian gravy in wok.', 'Simmer veg balls in gravy for 5 mins. Serve with fried rice.'] }
  },
  {
    id: 'schezwan-noodles',
    name: 'Schezwan Noodles',
    desc: 'Spicy noodles tossed in fiery Schezwan sauce.',
    region: 'Indo-Chinese', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 8, carbs: 65, fat: 10, fiber: 5, time: 20, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['200g noodles boiled', '1 cup julienne veggies', '3 tbsp Schezwan sauce', '1 tbsp oil'], steps: ['Heat oil, stir fry veggies.', 'Add Schezwan sauce.', 'Add noodles, toss on high flame till coated.', 'Garnish spring onion.'] }
  }
];
