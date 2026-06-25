"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGE_HERO_CONTAINER, PAGE_HERO_SECTION_PT, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import ResearchViewerModal from "@/components/research/ResearchViewerModal";
import { getResearchBySlug } from "@/lib/research/data";
import { downloadResearchPdf } from "@/lib/research/utils";
import { notFound } from "next/navigation";

export default function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const report = getResearchBySlug(slug);
  const [viewerOpen, setViewerOpen] = useState(false);

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section
        className={`relative bg-[#050A14] text-white border-b border-white/5 ${PAGE_HERO_SECTION_PT} pb-8 sm:pb-10 overflow-hidden`}
      >
        <div className="absolute inset-0 z-0" aria-hidden>
          <img src={report.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/90 to-[#050A14]/75" />
        </div>

        <div className={`${PAGE_HERO_CONTAINER} relative z-10`}>
          <Link
            href="/research"
            className="inline-flex items-center text-slate-400 hover:text-white text-xs font-medium mb-6 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to evidence base
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {report.featured ? (
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-white bg-[#1877F2] px-2.5 py-1 rounded">
                Featured
              </span>
            ) : null}
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#1877F2] bg-[#1877F2]/15 px-2.5 py-1 rounded">
              {report.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-4xl drop-shadow-2xl">
            {report.title}
          </h1>

          <p className="text-sm text-slate-400 mb-4">
            {report.author} · {report.institution} · {report.date}
          </p>

          {report.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {report.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium uppercase tracking-wider text-slate-300 bg-white/10 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <article className="flex-1 bg-[#f4f5f7] text-[#010B19]">
        <div className={`${PAGE_CONTENT_CONTAINER} py-8 sm:py-12`}>
          <div className="max-w-[760px]">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 pb-8 border-b border-slate-200">
            {report.hasPdf ? (
              <>
                <Button
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  className="min-h-[48px] bg-[#010B19] hover:bg-[#1877F2] text-white font-semibold"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View PDF
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => downloadResearchPdf(report)}
                  className="min-h-[48px] border-slate-300 text-slate-700 hover:bg-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setViewerOpen(true)}
                className="min-h-[48px] bg-[#010B19] hover:bg-[#1877F2] text-white font-semibold"
              >
                <FileText className="w-4 h-4 mr-2" />
                Read Research Story
              </Button>
            )}
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-[#010B19] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1877F2]" />
              Executive summary
            </h2>
            <p className="text-sm sm:text-base sm:text-lg text-slate-700 leading-[1.75]">{report.summary}</p>
          </section>

          {report.articleContent ? (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[#010B19] mb-4">Full article</h2>
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
                <p className="text-sm sm:text-base text-slate-700 leading-[1.8] whitespace-pre-line">
                  {report.articleContent}
                </p>
              </div>
            </section>
          ) : null}

          <section className="mb-10">
            <h2 className="text-lg font-bold text-[#010B19] mb-5">Key findings</h2>
            <ol className="space-y-4">
              {report.keyFindings.map((finding, index) => (
                <li
                  key={finding}
                  className="flex gap-4 bg-white border border-slate-200 border-l-[3px] border-l-[#1877F2] px-4 py-4 rounded-r-lg"
                >
                  <span className="text-sm font-bold text-[#1877F2] tabular-nums shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{finding}</p>
                </li>
              ))}
            </ol>
          </section>

          {report.methodology ? (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[#010B19] mb-4">Methodology</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-[1.75]">{report.methodology}</p>
            </section>
          ) : null}

          {report.recommendations?.length ? (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[#010B19] mb-4">Recommendations</h2>
              <ul className="space-y-3 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 list-decimal list-inside text-slate-700 leading-relaxed">
                {report.recommendations.map((item) => (
                  <li key={item.text} className="text-sm sm:text-base">
                    {item.text}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="bg-[#010B19] text-white rounded-xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Use this evidence</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-md mx-auto">
              Share these findings with your Member of Parliament and demand a 12-month investigation
              limit.
            </p>
            <Link href="/take-action">
              <Button className="min-h-[48px] bg-[#1877F2] hover:bg-blue-500 text-white font-semibold px-8">
                Contact your MP
              </Button>
            </Link>
          </section>
          </div>
        </div>
      </article>

      <ResearchViewerModal
        report={viewerOpen ? report : null}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
