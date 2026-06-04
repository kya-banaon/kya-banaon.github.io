import type { Dish } from '../../types';

export const northIndianBreakfast: Dish[] = [
  {
    id: 'chole-kulche',
    name: 'Chole Kulche',
    desc: 'Spicy white peas curry served with soft leavened bread.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 400, protein: 12, carbs: 65, fat: 10, fiber: 8, time: 25, easy: false, oilFree: false, serves: '2',
    recipe: { ingredients: ['1 cup dried white peas (matar) boiled', '2 onions, 2 tomatoes chopped', 'Chaat masala, roasted cumin powder', 'Tamarind chutney', '4 Kulchas'], steps: ['Mix boiled matar with onions, tomatoes, spices and chutney.', 'Heat kulchas on pan with butter.', 'Serve hot.'] }
  },
  {
    id: 'paneer-bhurji-toast',
    name: 'Paneer Bhurji Toast',
    desc: 'Scrambled spiced paneer served over crisp toast.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 350, protein: 16, carbs: 30, fat: 18, fiber: 3, time: 15, easy: true, oilFree: false, serves: '2',
    recipe: { ingredients: ['200g paneer crumbled', '1 onion, 1 tomato chopped', '½ tsp turmeric, chilli powder', '4 slices bread toasted', 'Oil/Ghee'], steps: ['Sauté onion and tomato.', 'Add spices and crumbled paneer.', 'Cook 2 mins. Serve over toast.'] }
  },
  {
    id: 'moong-dal-kachori',
    name: 'Moong Dal Kachori',
    desc: 'Deep fried crispy pastry filled with spiced moong dal.',
    region: 'North Indian', sattvic: true, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 8, carbs: 45, fat: 18, fiber: 4, time: 45, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Dough: 2 cups maida, 4 tbsp ghee, salt', 'Filling: ½ cup yellow moong dal coarse ground', 'Fennel, coriander, cumin, amchur', 'Oil for frying'], steps: ['Make stiff dough.', 'Sauté dal with spices to make dry filling.', 'Fill dough balls, flatten gently.', 'Deep fry on very low heat until crisp.'] }
  },
  {
    id: 'bedmi-puri-aloo',
    name: 'Bedmi Puri & Aloo',
    desc: 'Urad dal stuffed spiced puris served with watery potato curry.',
    region: 'North Indian', sattvic: true, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 10, carbs: 60, fat: 18, fiber: 5, time: 40, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['Dough: whole wheat flour, coarse urad dal paste, fennel, chilli powder', 'Aloo: 3 potatoes boiled, tomato, ginger, green chilli', 'Oil for frying'], steps: ['Make dough with urad paste and spices.', 'Make thin aloo sabzi with tomatoes and spices.', 'Roll puris and deep fry.'] }
  }
];

export const northIndianLunch: Dish[] = [
  {
    id: 'rajma-masala-rice',
    name: 'Punjabi Rajma Chawal',
    desc: 'Thick, spiced kidney bean curry cooked Punjabi style.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 460, protein: 20, carbs: 75, fat: 8, fiber: 12, time: 45, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['1.5 cups rajma soaked overnight', '2 onions, 3 tomatoes pureed', 'Ginger-garlic paste', 'Rajma masala, garam masala', 'Ghee'], steps: ['Pressure cook rajma.', 'Make onion-tomato gravy with spices.', 'Mix with rajma and simmer 20 mins. Serve with rice.'] }
  },
  {
    id: 'sarson-ka-saag',
    name: 'Sarson ka Saag & Makki Roti',
    desc: 'Winter special mustard greens cooked slowly, served with cornmeal flatbread.',
    region: 'North Indian', sattvic: true, kids: false, seasons: [11,12,1,2],
    kcal: 380, protein: 14, carbs: 45, fat: 16, fiber: 8, time: 60, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['1 bunch mustard greens, ½ bunch spinach', 'Ginger, garlic, green chillies', 'Maize flour (makki atta)', 'Ghee'], steps: ['Boil greens with ginger, garlic. Blend coarse.', 'Cook in ghee, thicken with 2 tbsp makki atta.', 'Make rotis from makki atta. Serve with jaggery and butter.'] }
  },
  {
    id: 'shahi-paneer',
    name: 'Shahi Paneer',
    desc: 'Paneer in a thick creamy, slightly sweet white/yellow gravy.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 500, protein: 18, carbs: 20, fat: 38, fiber: 2, time: 35, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['250g paneer', 'Cashew & melon seed paste', '1 onion, ginger-garlic', 'Cream, saffron, cardamom', 'Ghee'], steps: ['Cook onion paste, add cashew paste.', 'Add spices, water, simmer.', 'Add paneer and cream. Garnish with saffron.'] }
  },
  {
    id: 'bharwa-bhindi',
    name: 'Bharwa Bhindi',
    desc: 'Okra stuffed with a dry spice mix and shallow fried.',
    region: 'North Indian', sattvic: true, kids: false, seasons: [5,6,7,8,9],
    kcal: 220, protein: 5, carbs: 18, fat: 14, fiber: 6, time: 30, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['300g okra slit', 'Spice mix: coriander powder, amchur, fennel powder, red chilli, salt, turmeric', 'Mustard oil'], steps: ['Mix spices with 1 tbsp oil.', 'Stuff slit okra with the mix.', 'Shallow fry in mustard oil on low heat until tender.'] }
  },
  {
    id: 'pindi-chole',
    name: 'Pindi Chole',
    desc: 'Dry, dark, tangy chickpeas cooked without onion-tomato gravy.',
    region: 'North Indian', sattvic: true, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 380, protein: 16, carbs: 55, fat: 12, fiber: 14, time: 40, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['1 cup chickpeas boiled with tea bag and amla', 'Chhole masala, anardana (pomegranate seed) powder', 'Ginger juliennes, green chillies', 'Ghee'], steps: ['Dry roast spices.', 'Mix boiled chickpeas with spices.', 'Heat ghee, pour over chickpeas. Toss well.'] }
  }
];

export const northIndianDinner: Dish[] = [
  {
    id: 'malai-kofta',
    name: 'Malai Kofta',
    desc: 'Deep fried potato and paneer balls in a rich creamy tomato-cashew gravy.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 550, protein: 14, carbs: 45, fat: 35, fiber: 4, time: 50, easy: false, oilFree: false, serves: '4',
    recipe: { ingredients: ['Kofta: 2 potatoes boiled, 100g paneer, cornflour, raisins', 'Gravy: 3 tomatoes, 1 onion, cashews, cream', 'Garam masala, cardamom'], steps: ['Make koftas and deep fry.', 'Prepare smooth tomato-cashew gravy.', 'Add koftas right before serving.'] }
  },
  {
    id: 'dal-tadka-dhaba',
    name: 'Dhaba Style Dal Tadka',
    desc: 'Smoky mixed lentils with a double garlic-cumin tempering.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 340, protein: 18, carbs: 48, fat: 12, fiber: 8, time: 35, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['½ cup toor dal, ¼ cup chana dal, ¼ cup masoor dal', '2 onions, 2 tomatoes', 'Lots of garlic, dry red chillies, cumin', 'Ghee'], steps: ['Boil dals together.', 'Make first tadka with onion, tomato, spices.', 'Before serving, make second tadka with ghee, garlic, red chillies.'] }
  },
  {
    id: 'kashmiri-dum-aloo',
    name: 'Kashmiri Dum Aloo',
    desc: 'Baby potatoes deep fried and slow cooked in a spicy yogurt and fennel gravy.',
    region: 'North Indian', sattvic: true, kids: false, seasons: [10,11,12,1,2],
    kcal: 420, protein: 6, carbs: 45, fat: 22, fiber: 5, time: 45, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['500g baby potatoes peeled', '1 cup whisked yogurt', 'Kashmiri red chilli powder, fennel powder, ginger powder', 'Mustard oil'], steps: ['Prick potatoes and deep fry till golden.', 'Whisk spices into yogurt.', 'Heat oil, add yogurt mix, stir continuously till boiling.', 'Add potatoes, simmer for 20 mins.'] }
  },
  {
    id: 'baingan-bharta-dhaba',
    name: 'Dhaba Baingan Bharta',
    desc: 'Fire-roasted eggplant mashed with onions, tomatoes and green peas.',
    region: 'North Indian', sattvic: false, kids: false, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 260, protein: 5, carbs: 25, fat: 14, fiber: 7, time: 35, easy: true, oilFree: false, serves: '3',
    recipe: { ingredients: ['1 large eggplant roasted', '2 onions, 2 tomatoes chopped', '½ cup green peas', 'Garlic, green chillies, coriander'], steps: ['Mash roasted eggplant.', 'Sauté garlic, onion, tomato. Add peas.', 'Mix eggplant and cook for 10 mins.'] }
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    desc: 'Paneer and bell peppers tossed in freshly ground coriander-chilli masala.',
    region: 'North Indian', sattvic: false, kids: true, seasons: [1,2,3,4,5,6,7,8,9,10,11,12],
    kcal: 450, protein: 18, carbs: 18, fat: 32, fiber: 4, time: 30, easy: false, oilFree: false, serves: '3',
    recipe: { ingredients: ['250g paneer', '1 onion, 1 capsicum diced', 'Kadai masala (coriander seeds, dry chillies roasted & ground)', 'Tomato puree', 'Oil/Ghee'], steps: ['Sauté onion and capsicum petals.', 'Add tomato puree and kadai masala.', 'Add paneer and toss well.'] }
  }
];
