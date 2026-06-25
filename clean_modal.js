const fs = require('fs');
let code = fs.readFileSync('src/components/research/ResearchViewerModal.tsx', 'utf-8');

// Remove `<ReportRecommendations report={report} />` call
code = code.replace(/\{report\.recommendations\?\.length \? <ReportRecommendations report=\{report\} \/> : null\}/g, '');

// Remove `ReportRecommendations` component completely
code = code.replace(/function ReportRecommendations[\s\S]*?\}\n/g, '');

// Remove `highlightStats` rendering block from `ReportSummary`
code = code.replace(/\{report\.highlightStats\?\.length \? \([\s\S]*?\) : null\}/g, '');

fs.writeFileSync('src/components/research/ResearchViewerModal.tsx', code);
console.log('Removed components from ResearchViewerModal.tsx');
