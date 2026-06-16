"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Share2, Calendar, ArrowLeft, Check, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans pb-24">
      
      {/* HERO / BANNER */}
      <section className="relative w-full min-h-[500px] flex flex-col justify-end pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={MOCK_NEWS.image} 
            alt={MOCK_NEWS.title} 
            className="w-full h-full object-cover object-center opacity-30 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1000px]">
          <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to News
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {MOCK_NEWS.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest"><Calendar className="w-3.5 h-3.5"/> {MOCK_NEWS.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
            {MOCK_NEWS.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full px-6 lg:px-16 mx-auto max-w-[1000px] mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#1877F2] prose-p:text-slate-300 prose-p:leading-relaxed">
              {MOCK_NEWS.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-2xl mt-12 mb-6">{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
            
            {/* Inline Share actions at the bottom of the article for mobile/desktop */}
            <div className="mt-16 pt-8 border-t border-white/10">
               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Share this update</h4>
               <div className="flex flex-wrap gap-3">
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(MOCK_NEWS.title)}`, '_blank')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    X / Twitter
                  </button>
                  <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Facebook
                  </button>
                  <button onClick={handleCopyLink} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    {isCopied ? <Check className="w-3 h-3 text-green-400"/> : <LinkIcon className="w-3 h-3"/>} 
                    {isCopied ? <span className="text-green-400">Copied!</span> : "Copy Link"}
                  </button>
               </div>
            </div>
          </div>

          {/* Sidebar / Related / Extra Actions */}
          <div className="lg:col-span-4">
            <div className="bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-3xl p-8 sticky top-32">
              <h3 className="font-bold text-white uppercase tracking-widest text-sm mb-4">Take Action Now</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
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
      </section>

    </div>
  );
}
