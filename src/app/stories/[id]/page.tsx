"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Calendar, Clock, ArrowLeft, Check, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_STORY = {
  id: "story-1",
  title: "Why I Spoke Out: Surviving a 4-Year Investigation",
  category: "Personal Experience",
  author: "Anonymous Officer",
  date: "October 12, 2025",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
  content: `I never thought it would happen to me. I was a response officer with an unblemished record spanning a decade. But one split-second decision during a chaotic public order incident changed everything.

The initial incident was investigated and cleared by professional standards within weeks. However, the IOPC decided to reopen the case. What followed was a 4-year ordeal of suspensions, restricted duties, and a complete lack of communication. 

### The Isolation

The hardest part wasn't the investigation itself; it was the isolation. The moment you are placed under investigation, your support network evaporates. You are told not to discuss the case with colleagues. Your warrant card is taken. Your identity is stripped away.

I spent months sitting at home, jumping every time the phone rang, expecting the worst. The lack of updates was agonizing. Weeks turned into months, and months into years. The toll on my mental health was devastating.

### The System is Broken

The current system doesn't seek the truth; it seeks a scalp. The presumption of innocence feels entirely absent. Officers are treated as guilty until proven innocent, and the process is used as a punishment in itself.

This is why I support the It Stops Now campaign. We need a statutory 12-month limit on investigations. Justice delayed is justice denied, not just for the public, but for the officers whose lives are put on hold indefinitely.

We need to reform this broken system before more lives are ruined.`
};

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
            href="/stories"
            className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest py-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Stories
          </Link>
        }
        badges={
          <span className="inline-flex bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {MOCK_STORY.category}
          </span>
        }
        title={MOCK_STORY.title}
        meta={
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="text-[#1877F2]">{MOCK_STORY.author}</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {MOCK_STORY.date}
            </span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {MOCK_STORY.readTime}
            </span>
          </div>
        }
        imageSrc={MOCK_STORY.image}
        imageAlt={MOCK_STORY.title}
      />

      {/* CONTENT */}
      <EditorialSection noPadding className="pb-12 lg:pb-24">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1200px] py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Main Article */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#010B19] prose-a:text-[#1877F2] prose-p:text-slate-600 prose-p:leading-relaxed">
              {MOCK_STORY.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-2xl mt-12 mb-6 text-[#010B19]">{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className={cn(hybrid.editorialCard, "p-6 sm:p-8 sticky top-32")}>
              <h3 className={cn("text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2", hybrid.editorialMuted)}>
                <Share2 className="w-3 h-3"/> SHARE THIS STORY
              </h3>
              <div className="flex flex-col gap-3">
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/20 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  Share on Facebook
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(MOCK_STORY.title)}`, '_blank')} className={cn("w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                  Share on X / Twitter
                </button>
                <button onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(MOCK_STORY.title)}&body=${encodeURIComponent(`I thought you might find this story interesting:\n\n`)}` + encodeURIComponent(window.location.href)} className={cn("w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                  <Mail className="w-4 h-4"/> Share via Email
                </button>
                <button onClick={handleCopyLink} className={cn("w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)}>
                  {isCopied ? <Check className="w-4 h-4 text-green-500"/> : <LinkIcon className="w-4 h-4"/>} 
                  {isCopied ? <span className="text-green-600">Link Copied!</span> : "Copy Share Link"}
                </button>
              </div>
            </div>
          </div>

        </div>
        </div>
      </EditorialSection>

    </div>
  );
}
