"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { STORIES } from "../page";

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const storyId = Number(resolvedParams.id);

  const story = useMemo(
    () => STORIES.find((s) => s.id === storyId) ?? STORIES[0],
    [storyId]
  );

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
            {story.type}
          </span>
        }
        title={story.title}
        meta={
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="text-[#1877F2]">{story.author}</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {story.date}
            </span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {story.readTime}
            </span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>{story.tag}</span>
          </div>
        }
        imageSrc={story.image}
        imageAlt={story.title}
      />

      <EditorialSection noPadding className="pb-12 lg:pb-24">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1200px] py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#010B19] prose-a:text-[#1877F2] prose-p:text-slate-600 prose-p:leading-relaxed">
                {story.fullContent.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-[#f4f5f7] border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  This story is part of our lived-experience archive. Rich media embeds (YouTube, linked images) will appear here when connected to the CMS.
                </p>
                <Link
                  href="/stories?submit=1"
                  className="inline-flex items-center text-[#1877F2] text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Share your story <ChevronRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className={`${hybrid.editorialCard} p-6 sm:p-8 sticky top-32`}>
                <ShareButtons title={story.title} variant="editorial" />
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
