"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import { ShareButtons } from "@/components/ui/ShareButtons";
import RichArticleBody from "@/components/editorial/RichArticleBody";
import { NEWS_RICH_BLOCKS } from "@/lib/editorial/demoRichContent";
import { LATEST_NEWS } from "../page";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const newsId = Number(resolvedParams.id);

  const article = useMemo(
    () => LATEST_NEWS.find((n) => n.id === newsId) ?? LATEST_NEWS[0],
    [newsId]
  );

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ArticleHero
        backLink={
          <Link
            href="/news"
            className="inline-flex items-center text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to News
          </Link>
        }
        badges={
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <User className="w-3.5 h-3.5" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{article.readTime}</span>
          </div>
        }
        title={article.title}
        imageSrc={article.image}
        imageAlt={article.title}
      />

      <EditorialSection noPadding className="pt-8 lg:pt-12 pb-16 sm:pb-20 lg:pb-32">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              <p className={cn("text-lg sm:text-xl mb-8 leading-relaxed font-semibold text-[#1877F2]", hybrid.editorialBody)}>{article.excerpt}</p>
              <RichArticleBody blocks={NEWS_RICH_BLOCKS} />
            </div>

            <div className="lg:col-span-4 space-y-8">
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
                  <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
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
