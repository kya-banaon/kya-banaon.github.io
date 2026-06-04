const fs = require('fs');
let code = fs.readFileSync('src/data/dishes.ts', 'utf8');

const regions = {
  'idli-sambar': 'South Indian',
  'masala-dosa': 'South Indian',
  'uttapam': 'South Indian',
  'rava-idli': 'South Indian',
  'sambar-rice': 'South Indian',
  'dahi-rice': 'South Indian',
  'methi-thepla': 'Gujarati',
  'khaman-dhokla': 'Gujarati',
  'sabudana-khichdi': 'Maharashtrian',
  'sabudana-vada': 'Maharashtrian',
  'pav-bhaji': 'Maharashtrian'
};

code = code.replace(/id:\s*'([^']+)',\s*name:[^,]+,\s*desc:\s*'[^']+',\n\s*sattvic:/g, (match, id) => {
  const region = regions[id] || 'North Indian';
  return match.replace(/sattvic:/, `region: '${region}', sattvic:`);
});

fs.writeFileSync('src/data/dishes.ts', code);
console.log('Updated regions in dishes.ts');
