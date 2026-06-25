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

// Match className="something" and className={`something`}
const pRegex1 = /<p([^>]*)className=\"([^\"]+)\"([^>]*)>/g;
const pRegex2 = /<p([^>]*)className=\{\`([^\`]+)\`\}([^>]*)>/g;

function processContent(content) {
    let newContent = content;
    
    function replacer(match, before, className, after, isTemplateLiteral) {
        if (className.includes('text-xs') || className.includes('text-sm') || className.includes('text-[13px]') || className.includes('text-[14px]')) {
            return match;
        }
        
        // Find text-base, text-lg, text-[15px], etc.
        const textRegex = /(^|\s)(text-base|text-lg|text-\[15px\]|text-\[16px\]|text-xl|text-2xl)(?=\s|$)/g;
        let newClassName = className.replace(textRegex, (m, space, cls) => {
            return space + 'text-sm sm:' + cls;
        });
        
        if (newClassName !== className) {
            if (isTemplateLiteral) {
                return '<p' + before + 'className={`' + newClassName + '`}' + after + '>';
            } else {
                return '<p' + before + 'className=\"' + newClassName + '\"' + after + '>';
            }
        }
        return match;
    }

    newContent = newContent.replace(pRegex1, (match, b, c, a) => replacer(match, b, c, a, false));
    newContent = newContent.replace(pRegex2, (match, b, c, a) => replacer(match, b, c, a, true));
    return newContent;
}

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = processContent(content);

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated', file);
    }
});
