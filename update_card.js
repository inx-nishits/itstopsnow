const fs = require('fs');

let code = fs.readFileSync('src/components/research/ResearchCard.tsx', 'utf-8');

// Update article wrapper
code = code.replace(
  /"group flex flex-col h-full overflow-hidden hover:-translate-y-1"/g,
  '"group flex flex-row sm:flex-col h-full overflow-hidden hover:-translate-y-1"'
);

// Update image container
code = code.replace(
  /className=\{cn\("relative aspect-\[16\/10\] overflow-hidden bg-slate-100 border-b", hybrid\.editorialBorder\)\}/g,
  'className={cn("relative w-[120px] sm:w-auto shrink-0 sm:aspect-[16/10] overflow-hidden bg-slate-100 border-r sm:border-r-0 sm:border-b", hybrid.editorialBorder)}'
);

// Update tags container inside image to hide on very small mobile if needed, or just scale down
code = code.replace(
  /<div className="absolute top-3 left-3 flex flex-wrap gap-2">/g,
  '<div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">'
);

// Scale down badges on mobile
code = code.replace(
  /px-3 py-1.5 rounded-full/g,
  'px-2 sm:px-3 py-1 sm:py-1.5 rounded-full'
);

// Update content wrapper
code = code.replace(
  /<div className="flex flex-col flex-1 p-4 sm:p-5">/g,
  '<div className="flex flex-col flex-1 p-3 sm:p-5 min-w-0">'
);

// Hide summary on mobile
code = code.replace(
  /<p className=\{cn\("text-sm leading-relaxed line-clamp-3 mb-4 flex-1", hybrid\.editorialBody\)\}/g,
  '<p className={cn("text-sm leading-relaxed line-clamp-3 mb-4 flex-1 hidden sm:block", hybrid.editorialBody)}'
);

// Hide key findings on mobile
code = code.replace(
  /<div className="mb-4 space-y-2">/g,
  '<div className="mb-4 space-y-2 hidden sm:block">'
);

fs.writeFileSync('src/components/research/ResearchCard.tsx', code);
console.log('ResearchCard updated');
