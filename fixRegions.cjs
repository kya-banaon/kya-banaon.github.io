const fs = require('fs');

let code = fs.readFileSync('src/data/dishes.ts', 'utf8');
code = code.split('\n').map(line => {
  if (line.includes('sattvic:') && !line.includes('region:')) {
    return line.replace('sattvic:', 'region: \'North Indian\', sattvic:');
  }
  return line;
}).join('\n');

fs.writeFileSync('src/data/dishes.ts', code);
console.log('Fixed missing regions');
