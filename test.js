const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Projects/ISN/src/app').concat(walk('c:/Projects/ISN/src/components'));

let found = false;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const pRegex = /<p([^>]*)className=[\`\"\{]+([^\`\"\}]+)[\`\"\}]+([^>]*)>/g;
    
    let match;
    while ((match = pRegex.exec(content)) !== null) {
        const cls = match[2];
        if (cls && !cls.includes('text-sm') && !cls.includes('text-xs') && !cls.includes('text-[13px]') && !cls.includes('text-[14px]') && !cls.includes('text-[10px]') && !cls.includes('text-[11px]') && !cls.includes('text-[12px]')) {
            // Find if it has other text sizes
            if (cls.match(/(text-base|text-lg|text-\[15px\]|text-\[16px\]|text-xl|text-2xl)/)) {
                 console.log(file + ' MISSING text-sm: ' + cls);
                 found = true;
            }
        }
    }
});
if (!found) console.log("All clean!");
