const fs = require('fs');

let code = fs.readFileSync('src/data/dishes.ts', 'utf8');

const imports = `import { indoChineseBreakfast, indoChineseLunch, indoChineseDinner } from './regions/indoChinese';
import { northIndianBreakfast, northIndianLunch, northIndianDinner } from './regions/northIndian';
import { southIndianBreakfast, southIndianLunch, southIndianDinner } from './regions/southIndian';
import { otherRegionsBreakfast, otherRegionsLunch, otherRegionsDinner } from './regions/otherRegions';
`;

// Insert imports after the first import
code = code.replace(/import type { Dish } from '\.\.\/types';\n/, `import type { Dish } from '../types';\n${imports}\n`);

// Merge into breakfast
code = code.replace(/(breakfast:\s*\[)/, `$1\n    ...indoChineseBreakfast,\n    ...northIndianBreakfast,\n    ...southIndianBreakfast,\n    ...otherRegionsBreakfast,`);

// Merge into lunch
code = code.replace(/(lunch:\s*\[)/, `$1\n    ...indoChineseLunch,\n    ...northIndianLunch,\n    ...southIndianLunch,\n    ...otherRegionsLunch,`);

// Merge into dinner
code = code.replace(/(dinner:\s*\[)/, `$1\n    ...indoChineseDinner,\n    ...northIndianDinner,\n    ...southIndianDinner,\n    ...otherRegionsDinner,`);

fs.writeFileSync('src/data/dishes.ts', code);
console.log('Merged new recipes into dishes.ts');
