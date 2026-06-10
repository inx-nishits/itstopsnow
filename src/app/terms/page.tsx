"use client";

import { Shield } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pb-32">
      {/* HERO */}
      <section className="relative w-full min-h-[50vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920" 
            alt="Courthouse justice system" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5" /> LEGAL AGREEMENT
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              TERMS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">CONDITIONS.</span>
            </h1>
            <p className="text-slate-400 text-sm tracking-widest uppercase drop-shadow">Last Updated: June 2026</p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-16 mx-auto max-w-4xl mt-16">
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the It Stops Now website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">2. Use of the Site</h2>
          <p>
            This platform is dedicated to supporting police officers and advocating for systemic reform. You agree to use the site respectfully and not to post defamatory, offensive, or highly confidential legal materials that could prejudice active investigations.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">3. Content Submissions</h2>
          <p>
            When submitting stories or tributes, you retain ownership of your content. However, you grant It Stops Now a non-exclusive license to use, reproduce, and display the content for advocacy purposes, in accordance with our Privacy Policy and your anonymity preferences.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">4. Disclaimers</h2>
          <p>
            The information provided on this site, including legal and mental health resources, is for general informational purposes and does not constitute professional legal or medical advice. Always consult a qualified professional for your specific circumstances.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the site following any changes constitutes your acceptance of the new terms.
          </p>
        </div>
      </section>
    </div>
  );
}
