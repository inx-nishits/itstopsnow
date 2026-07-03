"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { EditorialSection } from "@/components/layout/PageSection";
import { ArticleHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { ShareButtons } from "@/components/ui/ShareButtons";
import RichArticleBody, { RichBlock } from "@/components/editorial/RichArticleBody";
import { getResearchBySlug } from "@/lib/research/data";
import { downloadResearchPdf } from "@/lib/research/utils";

export default function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const research = useMemo(() => getResearchBySlug(slug), [slug]);

  if (!research) {
    notFound();
  }

  const richBlocks: RichBlock[] = useMemo(() => {
    if (!research.articleContent) return [];
    return research.articleContent.split("\n\n").map((text) => ({
      type: "paragraph" as const,
      text,
    }));
  }, [research.articleContent]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ArticleHero
        backLink={
          <Link
            href="/research"
            className="inline-flex items-center text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest py-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Research
          </Link>
        }
        badges={
          <span className="inline-flex bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {research.category}
          </span>
        }
        title={research.title}
        meta={
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="text-[#1877F2]">{research.author}</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {research.date}
            </span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>{research.institution}</span>
          </div>
        }
        imageSrc={research.image}
        imageAlt={research.title}
      />

      <EditorialSection noPadding className="pt-8 lg:pt-12 pb-16 sm:pb-20 lg:pb-32">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              {research.summary && (
                <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed mb-8">
                  {research.summary}
                </p>
              )}

              {research.keyFindings && research.keyFindings.length > 0 && (
                <div className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#1877F2] mb-4">
                    Key Findings
                  </h3>
                  <ul className="space-y-3">
                    {research.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[#1877F2] font-bold">•</span>
                        <span className="text-slate-700 leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <RichArticleBody blocks={richBlocks} />

              {research.methodology && (
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Methodology
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {research.methodology}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                {research.hasPdf && (
                  <div className="rounded-2xl border border-[#1877F2]/20 bg-[#f4f8ff] p-6 sm:p-8 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Download Report</h3>
                    <p className="text-xs text-slate-600 mb-4">
                      Get the full findings, methodology, and data in PDF format.
                    </p>
                    <button
                      type="button"
                      onClick={() => downloadResearchPdf(research)}
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-[#1877F2] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#010B19] transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                )}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <ShareButtons title={research.title} variant="editorial" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
