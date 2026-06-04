const fs = require('fs');

const code = fs.readFileSync('src/data/dishes.ts', 'utf8');

// This is slightly tricky, let's just make dishes.ts export let DISHES and we load it.
// Actually, I'll just remove the static imports at the top and instead of exporting const DISHES,
// I'll leave the arrays but remove the spread operators for regions, and then we dynamically load regions.

let newCode = code;

// Remove imports
newCode = newCode.replace(/import \{ .* \} from '\.\/regions\/.*';\n/g, '');

// Remove spread arrays
newCode = newCode.replace(/\.\.\.indoChinese(Breakfast|Lunch|Dinner),\n/g, '');
newCode = newCode.replace(/\.\.\.northIndian(Breakfast|Lunch|Dinner),\n/g, '');
newCode = newCode.replace(/\.\.\.southIndian(Breakfast|Lunch|Dinner),\n/g, '');
newCode = newCode.replace(/\.\.\.otherRegions(Breakfast|Lunch|Dinner),\n/g, '');

// Make DISHES mutable (change export const to export let or keep const but we will push to it)
newCode += `\n\nexport function registerDishes(mealType, dishes) { DISHES[mealType].push(...dishes); }\n`;

fs.writeFileSync('src/data/dishes.ts', newCode);
console.log('dishes.ts simplified for lazy loading');
