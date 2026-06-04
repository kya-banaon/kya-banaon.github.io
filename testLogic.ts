import { generateWeek, getPool } from './src/mealLogic';
import { DISHES } from './src/data/dishes';

function runTests() {
  console.log('--- RUNNING QA TESTS ---');
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, msg: string) => {
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
    }
  };

  // Test 1: Repetition Prevention
  console.log('\nTesting Repetition Prevention...');
  // Force strict constraints to shrink the pool
  const strictPrefs = { cuisines: [], maxTime: 15, diets: ['sattvic'] as any[] };
  const strictFilters = { seas: false, sat: true, kids: true, quick: true, easy: true, oilFree: true };
  
  const week = generateWeek(strictFilters, strictPrefs);
  
  // Check if any day has identical dishes in the week
  const usedIds = new Set();
  let hasRepetition = false;
  week.forEach(day => {
    ['breakfast', 'lunch', 'dinner'].forEach(type => {
      const dish = (day as any)[type];
      if (dish) {
        if (usedIds.has(dish.id)) {
          hasRepetition = true;
        }
        usedIds.add(dish.id);
      }
    });
  });

  assert(!hasRepetition, 'No repeated meals across the week even with extremely strict constraints');

  // Test 2: Fallback logic
  console.log('\nTesting Empty Pool Fallback...');
  const emptyPool = getPool('breakfast', { seas: false, sat: true, kids: true, quick: true, easy: true, oilFree: true });
  assert(emptyPool.length > 0, 'Pool never returns 0 items (always falls back gracefully)');

  console.log(`\nRESULTS: ${passed} Passed, ${failed} Failed`);
}

runTests();
