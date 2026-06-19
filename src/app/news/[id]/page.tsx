"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Share2, Calendar, ArrowLeft, Check, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_NEWS = {
  id: "news-1",
  title: "Parliamentary Debate Scheduled for 12-Month Investigation Limit",
  category: "Campaign Update",
  date: "October 15, 2024",
  readTime: "4 min read",
  image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200",
  content: `In a major breakthrough for the 'It Stops Now' campaign, a cross-party coalition of MPs has secured a parliamentary debate to discuss the implementation of a statutory 12-month limit on police misconduct investigations.

This milestone comes after months of tireless campaigning by former and serving officers, their families, and our legal advocacy teams. Over 10,000 constituents have written to their MPs using our template letter system, ensuring this issue could no longer be ignored by the Home Office.

### What the Debate Will Cover

The debate, scheduled for next Tuesday, will focus on three key areas:
1. The severe mental health impact of multi-year investigations on officers and their families.
2. The financial cost to the taxpayer of suspending officers on full pay for years without resolution.
3. The proposed legislative framework for a strict 12-month limit, after which investigations must be concluded or dropped, barring exceptional circumstances.

### Why This Matters

Currently, there is no hard limit on how long the IOPC or internal Professional Standards Departments can take to investigate an allegation. This has led to officers waiting an average of 4 years for a resolution, with devastating consequences for their mental health.

"This debate is the first step towards actual legislative change," said a spokesperson for It Stops Now. "For too long, the system has treated officers as guilty until proven innocent, using the process itself as a punishment. We are finally seeing parliamentarians acknowledge that this is unacceptable."

### How You Can Help

While securing the debate is a huge victory, the fight is far from over. We need to ensure that as many MPs as possible attend the debate and support the proposed changes.

If you haven't already, please use our Take Action page to contact your MP and urge them to attend.`
};

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <ArticleHero
        backLink={
          <Link
            href="/news"
            className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to News
          </Link>
        }
        badges={
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {MOCK_NEWS.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> {MOCK_NEWS.date}
            </span>
          </div>
        }
        title={MOCK_NEWS.title}
        imageSrc={MOCK_NEWS.image}
        imageAlt={MOCK_NEWS.title}
      />

      {/* CONTENT */}
      <EditorialSection noPadding className="pb-12 lg:pb-24">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1000px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#010B19] prose-a:text-[#1877F2] prose-p:text-slate-600 prose-p:leading-relaxed">
              {MOCK_NEWS.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-2xl mt-12 mb-6 text-[#010B19]">{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
            
            <div className={cn("mt-8 lg:mt-16 pt-8 border-t", hybrid.editorialBorder)}>
               <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-4", hybrid.editorialMuted)}>Share this update</h4>
               <div className="flex flex-wrap gap-3">
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(MOCK_NEWS.title)}`, '_blank')} className={cn("px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                    X / Twitter
                  </button>
                  <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className={cn("px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                    Facebook
                  </button>
                  <button onClick={handleCopyLink} className={cn("px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                    {isCopied ? <Check className="w-3 h-3 text-green-500"/> : <LinkIcon className="w-3 h-3"/>} 
                    {isCopied ? <span className="text-green-600">Copied!</span> : "Copy Link"}
                  </button>
               </div>
            </div>
          </div>

          {/* Sidebar / Related / Extra Actions */}
          <div className="lg:col-span-4">
            <div className={cn(hybrid.editorialCard, "p-8 sticky top-32 border-[#1877F2]/20 bg-[#1877F2]/5")}>
              <h3 className={cn("font-bold uppercase tracking-widest text-sm mb-4", hybrid.editorialHeading)}>Take Action Now</h3>
              <p className={cn("text-sm mb-6 leading-relaxed", hybrid.editorialBody)}>
                Our voice is strongest when we stand together. Contact your MP today and ask them to support the 12-month investigation limit.
              </p>
              <Link href="/take-action">
                <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                  Write to Your MP
                </Button>
              </Link>
            </div>
          </div>

        </div>
        </div>
      </EditorialSection>

    </div>
  );
}
