const fs = require('fs');

function cleanButtons(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');

  // Replace Link import
  code = code.replace(/import Link from "next\/link";\n/g, '');

  const oldButtonsRegex = /<Link\s+href=\{`\/research\/\$\{publication\.slug\}`\}\s+className=\{cn\(actionBtn, "bg-\[#1877F2\] text-white hover:bg-\[#010B19\]"\)\}\s*>\s*Read story\s*<ArrowRight className="w-3\.5 h-3\.5" \/>\s*<\/Link>\s*<button\s+type="button"\s+onClick=\{[^}]+\}\s+className=\{cn\(actionBtn, hybrid\.editorialChip\)\}\s*>\s*<FileText className="w-3\.5 h-3\.5" \/>\s*\{publication\.hasPdf \? "View PDF" : "Quick view"\}\s*<\/button>/g;

  const newButtons = `<button
              type="button"
              onClick={() => onViewReport(publication)}
              className={cn(actionBtn, "bg-[#1877F2] text-white hover:bg-[#010B19]")}
            >
              Read Research Story
              <FileText className="w-3.5 h-3.5" />
            </button>`;

  // for list component which might use item.slug
  const listOldButtonsRegex = /<Link\s+href=\{`\/research\/\$\{item\.slug\}`\}\s+className=\{cn\(actionBtn, "bg-\[#1877F2\] text-white hover:bg-\[#010B19\]"\)\}\s*>\s*Read story\s*<ArrowRight className="w-3\.5 h-3\.5" \/>\s*<\/Link>\s*<button\s+type="button"\s+onClick=\{[^}]+\}\s+className=\{cn\(actionBtn, hybrid\.editorialChip\)\}\s*>\s*<FileText className="w-3\.5 h-3\.5" \/>\s*\{item\.hasPdf \? "View PDF" : "Quick view"\}\s*<\/button>/g;

  const newListButtons = `<button
                    type="button"
                    onClick={() => onViewReport(item)}
                    className={cn(actionBtn, "bg-[#1877F2] text-white hover:bg-[#010B19]")}
                  >
                    Read Research Story
                    <FileText className="w-3.5 h-3.5" />
                  </button>`;

  code = code.replace(oldButtonsRegex, newButtons);
  code = code.replace(listOldButtonsRegex, newListButtons);

  fs.writeFileSync(filePath, code);
}

cleanButtons('src/components/research/ResearchFeaturedPublication.tsx');
cleanButtons('src/components/research/ResearchEvidenceList.tsx');
console.log('Buttons cleaned');
