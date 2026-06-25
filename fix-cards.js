const fs = require('fs');
let code = fs.readFileSync('src/app/about/page.tsx', 'utf-8');

// Grid gap
code = code.replace(/className="grid grid-cols-1 md:grid-cols-3 gap-8"/g, 'className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"');
code = code.replace(/className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"/g, 'className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto"');

// Card Padding
code = code.replace(/p-6 md:p-10/g, 'p-5 md:p-10');

// Card Icon wrappers
code = code.replace(/w-14 h-14 bg-\[#1877F2\]\/10 rounded-2xl flex items-center justify-center mb-8/g, 'w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8');
code = code.replace(/w-16 h-16 bg-\[#1877F2\]\/10 rounded-2xl flex items-center justify-center mb-6/g, 'w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6');

// Icons inside wrappers
code = code.replace(/w-7 h-7 text-\[#1877F2\]/g, 'w-5 h-5 md:w-7 md:h-7 text-[#1877F2]');
code = code.replace(/w-8 h-8 text-\[#1877F2\]/g, 'w-6 h-6 md:w-8 md:h-8 text-[#1877F2]');

// Headings
code = code.replace(/text-xl font-bold mb-4 uppercase/g, 'text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase');
code = code.replace(/font-bold text-xl uppercase/g, 'font-bold text-lg md:text-xl uppercase');
code = code.replace(/tracking-widest mb-4 \$\{hybrid\.editorialHeading\}/g, 'tracking-widest mb-3 md:mb-4 ${hybrid.editorialHeading}');

// Paragraphs in cards
code = code.replace(/text-sm leading-relaxed mb-6/g, 'text-sm leading-relaxed mb-4 md:mb-6');
code = code.replace(/text-sm leading-relaxed mb-8 flex-grow/g, 'text-sm leading-relaxed mb-5 md:mb-8 flex-grow');

// Lists
code = code.replace(/<ul className="space-y-3">/g, '<ul className="space-y-2 md:space-y-3">');

// Buttons
code = code.replace(/text-\[11px\] py-4 rounded-xl/g, 'text-[11px] py-3 md:py-4 rounded-xl');

fs.writeFileSync('src/app/about/page.tsx', code);
console.log("Done");
