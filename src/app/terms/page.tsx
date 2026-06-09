"use client";

import { Shield } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pb-32">
      <section className="relative w-full pt-40 pb-20 bg-[#050A14] flex flex-col justify-center border-b border-white/5">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto border border-white/20 rounded-md flex items-center justify-center relative mb-8">
            <Shield className="w-8 h-8 text-[#1877F2]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Terms & Conditions</h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Last Updated: June 2026</p>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-16 max-w-4xl mt-16">
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
