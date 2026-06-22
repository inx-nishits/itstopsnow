"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { LATEST_NEWS } from "../page";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const newsId = Number(resolvedParams.id);

  const article = useMemo(
    () => LATEST_NEWS.find((n) => n.id === newsId) ?? LATEST_NEWS[0],
    [newsId]
  );

  const content = `In a major breakthrough for the 'It Stops Now' campaign, a cross-party coalition of MPs has secured a parliamentary debate to discuss the implementation of a statutory 12-month limit on police misconduct investigations.

This milestone comes after months of tireless campaigning by former and serving officers, their families, and our legal advocacy teams. Over 10,000 constituents have written to their MPs using our template letter system, ensuring this issue could no longer be ignored by the Home Office.

### What the Debate Will Cover

The debate will focus on the severe mental health impact of multi-year investigations, the financial cost to taxpayers, and the proposed legislative framework for a strict 12-month limit.

### How You Can Help

If you haven't already, please use our Take Action page to contact your MP and urge them to attend.`;

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
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <User className="w-3.5 h-3.5" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{article.readTime}</span>
          </div>
        }
        title={article.title}
        imageSrc={article.image}
        imageAlt={article.title}
      />

      <EditorialSection noPadding className="pb-12 lg:pb-24">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1000px] py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              
              {/* Featured Image inside content area */}
              <div className="w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <p className={cn("text-sm mb-8 leading-relaxed font-medium text-[#1877F2]", hybrid.editorialBody)}>{article.excerpt}</p>
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#010B19] prose-a:text-[#1877F2] prose-p:text-slate-600 prose-p:leading-relaxed">
                {content.split("\n\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("###")) {
                    return (
                      <h3 key={idx} className="text-2xl mt-12 mb-6 text-[#010B19]">
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className={cn(hybrid.editorialCard, "p-8 sticky top-32")}>
                <ShareButtons title={article.title} variant="editorial" />
              </div>
              <div className={cn(hybrid.editorialCard, "p-8 border-[#1877F2]/20 bg-[#1877F2]/5")}>
                <h3 className={cn("font-bold uppercase tracking-widest text-sm mb-4", hybrid.editorialHeading)}>
                  Take Action Now
                </h3>
                <p className={cn("text-sm mb-6 leading-relaxed", hybrid.editorialBody)}>
                  Contact your MP today and ask them to support the 12-month investigation limit.
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
