const fs = require('fs');
let code = fs.readFileSync('src/app/about/page.tsx', 'utf-8');

// FUNDING TRANSPARENCY
// Legal Counsel
code = code.replace(
`<div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 \${hybrid.editorialHeading}\`}>Legal Counsel</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-8 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
                </div>
                <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-0 md:mb-4 \${hybrid.editorialHeading}\`}>Legal Counsel</h3>
              </div>`
);

// Welfare Support
code = code.replace(
`<div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 \${hybrid.editorialHeading}\`}>Welfare Support</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-8 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
                </div>
                <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-0 md:mb-4 \${hybrid.editorialHeading}\`}>Welfare Support</h3>
              </div>`
);

// Campaign Logistics
code = code.replace(
`<div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 \${hybrid.editorialHeading}\`}>Campaign Logistics</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-8 group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
                </div>
                <h3 className={\`font-bold text-lg md:text-xl uppercase tracking-widest mb-0 md:mb-4 \${hybrid.editorialHeading}\`}>Campaign Logistics</h3>
              </div>`
);

// CTA SECTIONS
code = code.replace(/flex flex-col items-center text-center group/g, 'flex flex-col text-left md:text-center group');

// Operational Guidance
code = code.replace(
`<div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={\`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Operational Guidance</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-6 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
                </div>
                <h3 className={\`text-lg md:text-xl font-bold mb-0 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Operational Guidance</h3>
              </div>`
);

// Wellbeing Support
code = code.replace(
`<div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={\`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Wellbeing Support</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-6 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
                </div>
                <h3 className={\`text-lg md:text-xl font-bold mb-0 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Wellbeing Support</h3>
              </div>`
);

// Download Now
code = code.replace(
`<div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={\`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Download Now</h3>`,
`<div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 mb-3 md:mb-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mb-0 md:mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
                </div>
                <h3 className={\`text-lg md:text-xl font-bold mb-0 md:mb-4 uppercase tracking-widest \${hybrid.editorialHeading}\`}>Download Now</h3>
              </div>`
);

fs.writeFileSync('src/app/about/page.tsx', code);
console.log("Done side-by-side icons");
