"use client";

import { Shield } from "lucide-react";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <PageHero
        variant="utility"
        eyebrow={
          <>
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> LEGAL AGREEMENT
          </>
        }
        title={
          <>
            TERMS &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              CONDITIONS.
            </span>
          </>
        }
        meta={
          <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase">Last Updated: June 2026</p>
        }
        imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Signing legal documents"
      />

      <EditorialSection>
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="prose prose-sm sm:prose-base md:prose-lg prose-editorial max-w-4xl mx-auto">
            <h2 className="font-bold uppercase tracking-widest text-lg sm:text-xl mb-3 sm:mb-4 mt-8 sm:mt-12 text-[#1877F2]">1. Acceptance of Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              By accessing and using the It Stops Now website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>

            <h2 className="font-bold uppercase tracking-widest text-lg sm:text-xl mb-3 sm:mb-4 mt-8 sm:mt-12 text-[#1877F2]">2. Use of the Site</h2>
            <p className="text-slate-700 leading-relaxed">
              This platform is dedicated to supporting police officers and advocating for systemic reform. You agree to use the site respectfully and not to post defamatory, offensive, or highly confidential legal materials that could prejudice active investigations.
            </p>

            <h2 className="font-bold uppercase tracking-widest text-lg sm:text-xl mb-3 sm:mb-4 mt-8 sm:mt-12 text-[#1877F2]">3. Content Submissions</h2>
            <p className="text-slate-700 leading-relaxed">
              When submitting stories or tributes, you retain ownership of your content. However, you grant It Stops Now a non-exclusive license to use, reproduce, and display the content for advocacy purposes, in accordance with our Privacy Policy and your anonymity preferences.
            </p>

            <h2 className="font-bold uppercase tracking-widest text-lg sm:text-xl mb-3 sm:mb-4 mt-8 sm:mt-12 text-[#1877F2]">4. Disclaimers</h2>
            <p className="text-slate-700 leading-relaxed">
              The information provided on this site, including legal and mental health resources, is for general informational purposes and does not constitute professional legal or medical advice. Always consult a qualified professional for your specific circumstances.
            </p>

            <h2 className="font-bold uppercase tracking-widest text-lg sm:text-xl mb-3 sm:mb-4 mt-8 sm:mt-12 text-[#1877F2]">5. Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the site following any changes constitutes your acceptance of the new terms.
            </p>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
