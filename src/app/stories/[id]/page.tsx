"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { ShareButtons } from "@/components/ui/ShareButtons";
import RichArticleBody from "@/components/editorial/RichArticleBody";
import { buildStoryRichBlocks } from "@/lib/editorial/demoRichContent";
import { STORIES } from "../page";

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const storyId = Number(resolvedParams.id);

  const story = useMemo(
    () => STORIES.find((s) => s.id === storyId) ?? STORIES[0],
    [storyId]
  );

  const richBlocks = useMemo(
    () => buildStoryRichBlocks(story.fullContent.split("\n\n"), story.id),
    [story.fullContent, story.id]
  );

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ArticleHero
        backLink={
          <Link
            href="/stories"
            className="inline-flex items-center text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest py-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Stories
          </Link>
        }
        badges={
          <span className="inline-flex bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
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

      <EditorialSection noPadding className="pt-8 lg:pt-12 pb-16 sm:pb-20 lg:pb-32">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              <RichArticleBody blocks={richBlocks} />

              <div className="mt-8 p-6 rounded-2xl bg-[#f4f5f7] border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Your story could save a life. Share your lived experience with the campaign.
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
              <div className="sticky top-32 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <ShareButtons title={story.title} variant="editorial" />
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
