const fs = require('fs');
let code = fs.readFileSync('src/lib/research/data.ts', 'utf-8');

// Replace highlightStats arrays
code = code.replace(/\s*highlightStats:\s*\[[\s\S]*?\],/g, '');

// Replace recommendations arrays
code = code.replace(/\s*recommendations:\s*\[[\s\S]*?\],/g, '');

fs.writeFileSync('src/lib/research/data.ts', code);
console.log('Removed stats and recommendations from data.ts');
