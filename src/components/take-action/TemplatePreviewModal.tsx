"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Download, RotateCcw, Edit3, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDF, generateDOCX } from "@/lib/documentGenerator";
import { downloadBlob } from "@/lib/downloadBlob";
import { useModalA11y } from "@/hooks/useModalA11y";
import { modalBackdropMotion, modalSheetMotion } from "@/lib/theme/motion";

export interface LetterTemplate {
  id: number;
  title: string;
  content: string;
}

interface TemplatePreviewModalProps {
  template: LetterTemplate | null;
  content: string;
  onContentChange: (value: string) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function TemplatePreviewModal({
  template,
  content,
  onContentChange,
  onClose,
  onReset,
}: TemplatePreviewModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const setDialogRef = useModalA11y(Boolean(template), onClose);
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState<"pdf" | "docx" | null>(null);

  const buildPdfPreview = useCallback(async () => {
    if (!template) return;
    setIsGenerating(true);
    try {
      const blob = await generatePDF({
        content,
        mpName: "[MP Name]",
        senderName: "[Your Name]",
        senderAddress: "[Your Postcode]",
      });
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("PDF preview failed", e);
    } finally {
      setIsGenerating(false);
    }
  }, [content, template]);

  useEffect(() => {
    if (!template) return;
    const timer = setTimeout(() => {
      void buildPdfPreview();
    }, 300);
    return () => clearTimeout(timer);
  }, [template, buildPdfPreview]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!template) return;
    setIsDownloading(format);
    try {
      const data = {
        content,
        mpName: "[MP Name]",
        senderName: "[Your Name]",
        senderAddress: "[Your Postcode]",
      };
      const blob =
        format === "pdf" ? await generatePDF(data) : await generateDOCX(data);
      const ext = format === "pdf" ? "pdf" : "docx";
      downloadBlob(blob, `${template.title.replace(/\s+/g, "_")}.${ext}`);
    } finally {
      setIsDownloading(null);
    }
  };

  const isDirty = template ? content !== template.content : false;

  return (
    <AnimatePresence>
      {template && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center safe-area-modal">
          <motion.div
            {...modalBackdropMotion(prefersReducedMotion)}
            onClick={onClose}
            className="absolute inset-0 bg-[#020611]/95 backdrop-blur-md"
          />
          <motion.div
            ref={setDialogRef}
            {...modalSheetMotion(prefersReducedMotion)}
            className="relative z-10 flex h-[min(92dvh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#051024] shadow-2xl sm:h-[min(90dvh,880px)] sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-preview-title"
          >
            <div className="flex flex-col gap-3 border-b border-white/10 bg-[#02050A] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="mx-auto h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" aria-hidden />
              <div className="min-w-0 sm:mx-0">
                <h3 id="template-preview-title" className="text-sm font-bold uppercase tracking-widest text-white">
                  Template Preview
                </h3>
                <p className="truncate text-xs text-slate-400">{template.title}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex rounded-lg border border-white/10 p-0.5">
                  <button
                    type="button"
                    onClick={() => setMode("preview")}
                    className={`min-h-[40px] rounded-md px-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      mode === "preview" ? "bg-[#1877F2] text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <FileText className="mr-1.5 inline w-3.5 h-3.5" />
                    PDF View
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("edit")}
                    className={`min-h-[40px] rounded-md px-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      mode === "edit" ? "bg-[#1877F2] text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Edit3 className="mr-1.5 inline w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>
                {isDirty && (
                  <Button
                    type="button"
                    onClick={onReset}
                    variant="outline"
                    className="min-h-[40px] border-white/20 bg-transparent px-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10"
                  >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Reset
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => handleDownload("pdf")}
                  disabled={isDownloading !== null}
                  variant="outline"
                  className="min-h-[40px] border-[#1877F2]/30 bg-transparent px-3 text-[10px] font-bold uppercase tracking-widest text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                >
                  {isDownloading === "pdf" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  PDF
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDownload("docx")}
                  disabled={isDownloading !== null}
                  variant="outline"
                  className="min-h-[40px] border-[#1877F2]/30 bg-transparent px-3 text-[10px] font-bold uppercase tracking-widest text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                >
                  {isDownloading === "docx" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  DOCX
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-1 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden border-t border-[#1877F2]/10 bg-[#02050A]">
              {mode === "preview" ? (
                <div className="relative flex flex-1 flex-col">
                  {isGenerating && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#02050A]/80">
                      <Loader2 className="h-8 w-8 animate-spin text-[#1877F2]" />
                    </div>
                  )}
                  {pdfUrl ? (
                    <iframe
                      title={`PDF preview: ${template.title}`}
                      src={pdfUrl}
                      className="h-full min-h-[420px] w-full flex-1 bg-slate-200"
                    />
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                      Generating preview…
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-1 justify-center overflow-y-auto p-4 md:p-10">
                  <div className="relative flex min-h-[600px] w-full max-w-[700px] flex-col rounded-sm bg-white p-8 shadow-2xl md:p-14">
                    <textarea
                      value={content}
                      onChange={(e) => onContentChange(e.target.value)}
                      className="min-h-[500px] w-full flex-1 resize-none rounded-md bg-transparent font-serif text-sm leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 md:text-base"
                      aria-label="Edit letter template"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
