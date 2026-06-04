import { useStore } from './store';

const dict = {
  // Tabs
  'tab.weekly': { en: 'Weekly', hi: 'साप्ताहिक' },
  'tab.random': { en: 'Random', hi: 'रैंडम' },
  'tab.seasonal': { en: 'Seasonal', hi: 'मौसमी' },
  'tab.groceries': { en: 'Groceries', hi: 'किराना' },
  'tab.saved': { en: 'Saved', hi: 'पसंदीदा' },

  // Filter Bar
  'filter.sat': { en: 'Sattvic', hi: 'सात्विक' },
  'filter.kids': { en: 'Kids', hi: 'बच्चों के लिए' },
  'filter.seas': { en: 'Seasonal', hi: 'मौसमी' },
  'filter.quick': { en: '<30m', hi: '<30m' },
  'filter.easy': { en: 'Easy', hi: 'आसान' },
  'filter.oilFree': { en: 'No Oil', hi: 'बिना तेल' },

  // App Bar & Hero
  'app.title': { en: 'Kya Banaon?', hi: 'क्या बनाऊं?' },
  'app.subtitle': { en: 'Vegetarian Meal Planner', hi: 'शाकाहारी भोजन योजनाकार' },

  'greeting.morning': { en: 'Good Morning', hi: 'सुप्रभात' },
  'greeting.afternoon': { en: 'Good Afternoon', hi: 'शुभ दोपहर' },
  'greeting.evening': { en: 'Good Evening', hi: 'शुभ संध्या' },

  // Meals & Days
  'header.meal': { en: 'Meal', hi: 'भोजन' },
  'meal.breakfast': { en: 'Breakfast', hi: 'नाश्ता' },
  'meal.lunch': { en: 'Lunch', hi: 'दोपहर का भोजन' },
  'meal.dinner': { en: 'Dinner', hi: 'रात का भोजन' },

  'day.mon': { en: 'Mon', hi: 'सोम' },
  'day.tue': { en: 'Tue', hi: 'मंगल' },
  'day.wed': { en: 'Wed', hi: 'बुध' },
  'day.thu': { en: 'Thu', hi: 'गुरु' },
  'day.fri': { en: 'Fri', hi: 'शुक्र' },
  'day.sat': { en: 'Sat', hi: 'शनि' },
  'day.sun': { en: 'Sun', hi: 'रवि' },

  'month.1': { en: 'Jan', hi: 'जनवरी' },
  'month.2': { en: 'Feb', hi: 'फरवरी' },
  'month.3': { en: 'Mar', hi: 'मार्च' },
  'month.4': { en: 'Apr', hi: 'अप्रैल' },
  'month.5': { en: 'May', hi: 'मई' },
  'month.6': { en: 'Jun', hi: 'जून' },
  'month.7': { en: 'Jul', hi: 'जुलाई' },
  'month.8': { en: 'Aug', hi: 'अगस्त' },
  'month.9': { en: 'Sep', hi: 'सितंबर' },
  'month.10': { en: 'Oct', hi: 'अक्टूबर' },
  'month.11': { en: 'Nov', hi: 'नवंबर' },
  'month.12': { en: 'Dec', hi: 'दिसंबर' },

  // Modals & Cards
  'card.change': { en: '↺ Change', hi: '↺ बदलें' },
  'card.no_dish': { en: 'No dish matches filters', hi: 'फ़िल्टर से कोई डिश मेल नहीं खाती' },
  'modal.calories': { en: 'Calories', hi: 'कैलोरी' },
  'modal.protein': { en: 'Protein', hi: 'प्रोटीन' },
  'modal.carbs': { en: 'Carbs', hi: 'कार्ब्स' },
  'modal.fat': { en: 'Fat', hi: 'फैट' },
  'modal.fiber': { en: 'Fiber', hi: 'फाइबर' },
  'modal.season': { en: 'Season', hi: 'मौसम' },
  'modal.recipe': { en: '📝 Recipe', hi: '📝 रेसिपी' },
  'modal.ingredients': { en: 'Ingredients', hi: 'सामग्री' },
  'modal.steps': { en: 'Steps', hi: 'कदम' },
  'modal.easy': { en: 'Easy', hi: 'आसान' },
  'modal.medium': { en: 'Medium', hi: 'मध्यम' },
  'modal.hard': { en: 'Hard', hi: 'कठिन' },

  // Groceries & Saved
  'grocery.title': { en: 'Grocery List', hi: 'किराना सूची' },
  'grocery.desc': { en: 'Automatically compiled from your 7-day meal plan.', hi: 'आपके 7-दिन के भोजन योजना से स्वचालित रूप से संकलित।' },
  'grocery.no_plan': { en: 'No Week Plan', hi: 'कोई साप्ताहिक योजना नहीं' },
  'grocery.no_plan_desc': { en: 'Generate a weekly meal plan first to see your automated grocery list!', hi: 'अपनी स्वचालित किराना सूची देखने के लिए पहले एक साप्ताहिक भोजन योजना बनाएं!' },
  'grocery.items': { en: 'items collected', hi: 'सामग्री एकत्र की गई' },

  'saved.title': { en: 'Saved Meals', hi: 'पसंदीदा भोजन' },
  'saved.desc': { en: 'Your personal collection of favorites.', hi: 'पसंदीदा भोजन का आपका व्यक्तिगत संग्रह।' },
  'saved.no_saved': { en: 'No Saved Meals', hi: 'कोई पसंदीदा भोजन नहीं' },
  'saved.no_saved_desc': { en: 'Tap the heart icon on any dish to save it here for quick access!', hi: 'त्वरित पहुँच के लिए किसी भी डिश पर हार्ट आइकन टैप करके उसे यहाँ सेव करें!' },

  // Toast
  'toast.removed': { en: 'Removed from saved', hi: 'पसंदीदा से हटाया गया' },
  'toast.saved': { en: 'Saved to favorites', hi: 'पसंदीदा में जोड़ा गया' },
  'toast.loading': { en: 'Loading flavors...', hi: 'स्वाद लोड हो रहे हैं...' },
};

type DictKey = keyof typeof dict;

export function useTranslation() {
  const { lang } = useStore();
  
  const t = (key: DictKey): string => {
    return dict[key][lang] || dict[key]['en'];
  };

  return { t, lang };
}
