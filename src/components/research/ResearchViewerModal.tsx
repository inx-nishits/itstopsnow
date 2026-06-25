"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchPdf } from "@/lib/research/utils";

interface ResearchViewerModalProps {
  report: ResearchItem | null;
  onClose: () => void;
}

type ViewerMode = "pdf" | "article";

export default function ResearchViewerModal({ report, onClose }: ResearchViewerModalProps) {
  const [mode, setMode] = useState<ViewerMode>("pdf");

  useEffect(() => {
    if (report) {
      setMode(report.hasPdf ? "pdf" : "article");
    }
  }, [report]);

  const activeMode: ViewerMode = report?.hasPdf ? mode : "article";

  return (
    <AnimatePresence>
      {report && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Research viewer"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full sm:max-w-5xl h-[92dvh] sm:h-[85vh] bg-[#f8f9fb] sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-[#1877F2] shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#010B19] line-clamp-1">{report.title}</h3>
                  <p className="text-xs text-slate-500 truncate">
                    {report.author} · {report.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {report.hasPdf ? (
                  <div className="hidden sm:flex items-center rounded-lg border border-slate-200 p-0.5">
                    <button
                      type="button"
                      onClick={() => setMode("pdf")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        activeMode === "pdf"
                          ? "bg-[#010B19] text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("article")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        activeMode === "article"
                          ? "bg-[#010B19] text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Article
                    </button>
                  </div>
                ) : null}

                {report.hasPdf ? (
                  <button
                    type="button"
                    onClick={() => downloadResearchPdf(report)}
                    className="hidden sm:inline-flex items-center gap-2 border border-slate-200 hover:border-[#1877F2]/40 text-slate-700 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-hidden bg-slate-100/80">
              {activeMode === "pdf" && report.pdfUrl ? (
                <iframe
                  title={`PDF preview: ${report.title}`}
                  src={report.pdfUrl}
                  className="w-full h-full border-0 bg-white"
                />
              ) : (
                <div className="h-full overflow-y-auto p-4 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
                  <ReportCover report={report} />
                  <ReportSummary report={report} />
                  <ReportFindings report={report} />
                  
                </div>
              )}
            </div>

            {report.hasPdf ? (
              <div className="bg-white border-t border-slate-200 px-4 py-3 sm:hidden shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={() => downloadResearchPdf(report)}
                  className="flex items-center justify-center gap-2 bg-[#010B19] text-white w-full min-h-[48px] rounded-lg text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReportCover({ report }: { report: ResearchItem }) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 flex flex-col justify-between min-h-[420px] border-t-[6px] border-t-[#1877F2]">
      <div>
        <p className="text-[#1877F2] font-semibold text-xs mb-4">Research & Policy Paper</p>
        <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[#010B19] mb-6">
          {report.title}
        </h4>
        <div className="w-12 h-0.5 bg-[#1877F2] mb-6" />
        <p className="text-slate-600 text-sm leading-relaxed max-w-md">{report.summary}</p>
      </div>
      <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-sm gap-4">
        <div>
          <p className="font-semibold text-slate-900">{report.author}</p>
          <p className="text-xs text-slate-500">{report.institution}</p>
        </div>
        <p className="text-xs text-slate-500 shrink-0">{report.date}</p>
      </div>
    </div>
  );
}

function ReportSummary({ report }: { report: ResearchItem }) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[320px] flex flex-col">
      <h4 className="text-lg font-bold text-[#010B19] mb-4 pb-2 border-b border-slate-200">
        Executive summary
      </h4>
      <p className="text-sm text-slate-700 leading-relaxed mb-6 whitespace-pre-line">
        {report.articleContent ?? report.summary}
      </p>
      
    </div>
  );
}

function ReportFindings({ report }: { report: ResearchItem }) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[280px]">
      <h4 className="text-lg font-bold text-[#010B19] mb-6 pb-2 border-b border-slate-200">
        Primary findings
      </h4>
      <div className="space-y-4">
        {report.keyFindings.map((finding, index) => (
          <div key={finding} className="flex gap-3">
            <span className="text-xs font-bold text-[#1877F2] tabular-nums shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{finding}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportRecommendations({ report }: { report: ResearchItem }) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[240px]">
      <h4 className="text-lg font-bold text-[#010B19] mb-6 pb-2 border-b border-slate-200">
        Recommendations
      </h4>
      <ul className="space-y-4 text-sm text-slate-700 leading-relaxed list-decimal list-inside">
        {report.recommendations?.map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
