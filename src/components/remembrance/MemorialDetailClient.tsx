"use client";

import { useState, useCallback, useEffect, useRef, useMemo, type ReactNode, type Dispatch, type SetStateAction } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  X,
  Info,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import MemorialProfileHeader from "@/components/remembrance/MemorialProfileHeader";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import {
  MemorialActionBar,
  MemorialSectionTabs,
  type MemorialSectionId,
} from "@/components/remembrance/MemorialSectionNav";
import MemorialModal from "@/components/remembrance/MemorialModal";
import { MemorialShareActions } from "@/components/remembrance/MemorialShareActions";
import { useCandleRitual } from "@/components/remembrance/useCandleRitual";
import { generateBookOfCondolencePDF } from "@/components/remembrance/BookOfCondolencePDF";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import { validateEmail, simulateSubmit } from "@/lib/mock/utils";
import type { Memorial } from "@/lib/memorial/types";

interface MemorialDetailClientProps {
  memorial: Memorial;
}


export default function MemorialDetailClient({ memorial }: MemorialDetailClientProps) {
  const {
    candleCount,
    isLit,
    portraitGrayscale,
    portraitScale,
    warmGlowOpacity,
    cumulativeGray,
    loading: candleLoading,
    message: candleMessage,
    lightCandle,
  } = useCandleRitual({
    memorialId: memorial.sanityId ?? `isn-memorial-${memorial.id}`,
    storageKey: memorial.id,
    initialCount: memorial.candleCount,
  });

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [isTributeFormOpen, setIsTributeFormOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [tributeForm, setTributeForm] = useState({ name: "", email: "", title: "", content: "" });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmittingTribute, setIsSubmittingTribute] = useState(false);
  const [tributeSuccess, setTributeSuccess] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<MemorialSectionId>("story");

  const sectionRefs = useRef<Record<MemorialSectionId, HTMLElement | null>>({
    story: null,
    gallery: null,
    timeline: null,
    tributes: null,
  });
  const isNavigatingRef = useRef(false);
  const navigateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const galleryPhotos = memorial.gallery.length ? memorial.gallery : [memorial.portraitImageUrl];
  const timeline = memorial.timeline;
  const tributes = memorial.tributes;

  const visibleSectionIds = useMemo((): MemorialSectionId[] => {
    const ids: MemorialSectionId[] = ["story", "gallery"];
    if (timeline.length > 0) ids.push("timeline");
    ids.push("tributes");
    return ids;
  }, [timeline.length]);
  const visibleTimeline = isTimelineExpanded ? timeline : timeline.slice(0, 4);

  const officer = {
    name: memorial.name,
    role: memorial.rank,
    force: memorial.force,
    years: memorial.yearsServed,
    age: memorial.age,
    image: memorial.portraitImageUrl,
    stats: { dateOfLoss: memorial.dateOfLoss },
  };

  const scrollToSection = useCallback((id: MemorialSectionId) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    setActiveSection(id);
    isNavigatingRef.current = true;
    if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
    navigateTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);

    const offset = 200;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const syncActiveFromScroll = () => {
      if (isNavigatingRef.current) return;

      const offset = 220;
      let current: MemorialSectionId = visibleSectionIds[0];

      for (const id of visibleSectionIds) {
        const el = sectionRefs.current[id];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    syncActiveFromScroll();
    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
      if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
    };
  }, [visibleSectionIds]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPdf = useCallback(async () => {
    setPdfLoading(true);
    try {
      const pdfTributes = tributes.map((t) => ({
        message: t.text,
        authorName: t.name,
        relationship: t.relationship,
      }));
      const blob = await generateBookOfCondolencePDF(
        {
          name: memorial.name,
          rank: memorial.rank,
          force: memorial.force,
          yearsServed: memorial.yearsServed,
          biography: memorial.biography,
          quote: memorial.quote,
          candleCount,
        },
        pdfTributes
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `book-of-condolence-${memorial.name.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setPdfLoading(false);
    }
  }, [memorial, tributes, candleCount]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f4f5f7]">
      <MemorialProfileHeader
        officer={officer}
        candleCount={candleCount}
        tributeCount={memorial.tributeCount}
        isLit={isLit}
        loading={candleLoading}
        message={candleMessage}
        portraitGrayscale={portraitGrayscale}
        portraitScale={portraitScale}
        warmGlowOpacity={warmGlowOpacity}
        onLightCandle={lightCandle}
      />

      <MemorialActionBar
        onLightCandle={lightCandle}
        onLeaveTribute={() => setIsTributeFormOpen(true)}
        onShare={() => setIsShareOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        pdfLoading={pdfLoading}
        isLit={isLit}
        candleLoading={candleLoading}
      />

      <main className={`${PAGE_CONTENT_CONTAINER} pb-16 pt-6 sm:pt-8`}>
        <div className="sticky top-[9.25rem] md:top-[10.25rem] z-30 -mx-6 px-6 lg:-mx-16 lg:px-16 py-3 mb-8 sm:mb-10 bg-[#f4f5f7]/95 backdrop-blur-xl border-b border-slate-200">
          <MemorialSectionTabs
            activeSection={activeSection}
            onNavigate={scrollToSection}
            hasTimeline={timeline.length > 0}
          />
        </div>

        <div className="space-y-12 sm:space-y-14">
        {/* Story */}
        <section
          id="story"
          ref={(el) => {
            sectionRefs.current.story = el;
          }}
          className="scroll-mt-36"
        >
          <SectionLabel>Their story</SectionLabel>
          {memorial.quote && (
            <blockquote className="text-base sm:text-lg italic text-slate-600 leading-relaxed mb-5 pl-4 border-l-[3px] border-[#1877F2]">
              &ldquo;{memorial.quote}&rdquo;
            </blockquote>
          )}
          <div className="text-[15px] leading-[1.8] whitespace-pre-line text-slate-600">
            {memorial.biography}
          </div>
          {memorial.familyQuote && (
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#f4f5f7] border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] mb-2">From the family</p>
              <p className="text-slate-600 italic text-[15px] leading-relaxed whitespace-pre-line">{memorial.familyQuote}</p>
            </div>
          )}
        </section>

        <section
          id="gallery"
          ref={(el) => {
            sectionRefs.current.gallery = el;
          }}
          className="scroll-mt-36"
        >
          <SectionLabel>Photos</SectionLabel>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {galleryPhotos.slice(0, 5).map((photo, index) => (
              <button
                key={photo + index}
                type="button"
                onClick={() => setActivePhotoIndex(index)}
                className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#1877F2] active:scale-[0.98] transition-transform"
              >
                <img
                  src={photo}
                  alt={`${memorial.name} — photo ${index + 1}`}
                  className="w-full h-full object-cover object-[center_15%] transition-[filter] duration-700"
                  style={{ filter: `grayscale(${cumulativeGray}%)` }}
                />
              </button>
            ))}
            {galleryPhotos.length > 5 && (
              <button
                type="button"
                onClick={() => setActivePhotoIndex(0)}
                className="relative aspect-[3/4] flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors active:scale-[0.98]"
              >
                <span className="text-xl sm:text-2xl font-bold">+{galleryPhotos.length - 5}</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">View All Photos</span>
              </button>
            )}
          </div>
        </section>

        {/* Timeline */}
        {timeline.length > 0 && (
          <section
            id="timeline"
            ref={(el) => {
              sectionRefs.current.timeline = el;
            }}
            className="scroll-mt-36"
          >
            <SectionLabel icon={<Clock className="w-3.5 h-3.5" />}>Timeline</SectionLabel>
            <ol className="space-y-0 border-l-2 border-slate-200 ml-2">
              {visibleTimeline.map((event, index) => (
                <li key={`${event.date}-${event.title}-${index}`} className="relative pl-5 pb-6 last:pb-0">
                  <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#1877F2]" aria-hidden />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#1877F2] mb-0.5">{event.date}</p>
                  <h3 className="text-sm font-semibold text-[#010B19] mb-1">{event.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{event.description}</p>
                </li>
              ))}
            </ol>
            {timeline.length > 4 && (
              <button
                type="button"
                onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                className="mt-4 text-xs font-semibold text-[#1877F2] hover:underline min-h-[40px]"
              >
                {isTimelineExpanded ? "Show less" : "View Full Timeline"}
              </button>
            )}
          </section>
        )}

        {/* Remembered By */}
        <section
          id="tributes"
          ref={(el) => {
            sectionRefs.current.tributes = el;
          }}
          className="scroll-mt-36"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <SectionLabel className="mb-0">Remembered By</SectionLabel>
            <button
              type="button"
              onClick={() => setIsTributeFormOpen(true)}
              className="shrink-0 min-h-[36px] px-3.5 rounded-lg bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-[11px] font-semibold transition-colors"
            >
              + Add Tribute
            </button>
          </div>

          {tributes.length > 0 ? (
            <div className="relative -mx-6 px-6 lg:mx-0 lg:px-0">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {tributes.map((tribute, i) => (
                  <div key={`${tribute.name}-${i}`} className="snap-start shrink-0 w-[85vw] sm:w-[340px]">
                    <article className="p-5 h-full flex flex-col rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[15px] text-slate-600 leading-relaxed mb-6 flex-1">&ldquo;{tribute.text}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-sm font-bold text-[#1877F2]">
                          {tribute.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#010B19] truncate">{tribute.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {tribute.relationship ? `${tribute.relationship} · ` : ""}{tribute.timeAgo}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 px-4 rounded-xl bg-[#f4f5f7] border border-dashed border-slate-200">
              <p className="text-sm text-slate-500 mb-4">No tributes yet.</p>
              <Button
                onClick={() => setIsTributeFormOpen(true)}
                className="min-h-[44px] bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-xs"
              >
                Write the first tribute
              </Button>
            </div>
          )}
        </section>
        </div>
      </main>

      <MemorialModal
        open={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Share memorial"
        size="md"
      >
        <MemorialShareActions
          memorialName={memorial.name}
          isCopied={isCopied}
          onCopy={handleCopyLink}
          onDownloadPdf={() => {
            handleDownloadPdf();
            setIsShareOpen(false);
          }}
          pdfLoading={pdfLoading}
        />
      </MemorialModal>

      <PhotoLightbox
        galleryPhotos={galleryPhotos}
        memorialName={memorial.name}
        activePhotoIndex={activePhotoIndex}
        portraitGrayscale={cumulativeGray}
        onClose={() => setActivePhotoIndex(null)}
        onChange={setActivePhotoIndex}
      />

      <TributeModal
        open={isTributeFormOpen}
        memorialName={memorial.name}
        tributeForm={tributeForm}
        setTributeForm={setTributeForm}
        isSubmitting={isSubmittingTribute}
        tributeSuccess={tributeSuccess}
        onClose={() => {
          setIsTributeFormOpen(false);
          setTimeout(() => setTributeSuccess(false), 300);
        }}
        onSubmit={() => {
          if (!tributeForm.name.trim() || !validateEmail(tributeForm.email) || tributeForm.content.trim().length < 10) {
            return;
          }
          setIsSubmittingTribute(true);
          simulateSubmit().then(() => {
            setIsSubmittingTribute(false);
            setTributeSuccess(true);
          });
        }}
      />
    </div>
  );
}

function SectionLabel({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2", className)}>
      {icon}
      {children}
    </h2>
  );
}

function TributeModal({
  open,
  memorialName,
  tributeForm,
  setTributeForm,
  isSubmitting,
  tributeSuccess,
  onClose,
  onSubmit,
}: {
  open: boolean;
  memorialName: string;
  tributeForm: { name: string; email: string; title: string; content: string };
  setTributeForm: Dispatch<SetStateAction<{ name: string; email: string; title: string; content: string }>>;
  isSubmitting: boolean;
  tributeSuccess: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const inputClass = cn(
    "w-full min-h-[48px] px-4 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30",
    hybrid.editorialInput
  );

  return (
    <MemorialModal
      open={open}
      onClose={onClose}
      title={tributeSuccess ? "Tribute submitted" : "Leave a tribute"}
      size="lg"
      ariaLabel="Leave a tribute"
    >
      {tributeSuccess ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7" />
          </div>
          <p className={cn("text-sm leading-relaxed max-w-sm mx-auto mb-6", hybrid.editorialMuted)}>
            Thank you. Your tribute has been submitted and will be reviewed before publishing.
          </p>
          <Button onClick={onClose} className="min-h-[48px] bg-[#1877F2] hover:bg-[#1877F2]/90 text-white">
            Close
          </Button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <FormField label="Your name">
            <input
              type="text"
              value={tributeForm.name}
              onChange={(e) => setTributeForm({ ...tributeForm, name: e.target.value })}
              placeholder="John Smith"
              className={inputClass}
            />
          </FormField>
          <FormField label="Email">
            <input
              type="email"
              value={tributeForm.email}
              onChange={(e) => setTributeForm({ ...tributeForm, email: e.target.value })}
              placeholder="john@example.com"
              className={inputClass}
            />
          </FormField>
          <FormField label="Tribute to">
            <input type="text" value={memorialName} readOnly className={cn(inputClass, "opacity-60 cursor-not-allowed")} />
          </FormField>
          <FormField label="Title">
            <input
              type="text"
              value={tributeForm.title}
              onChange={(e) => setTributeForm({ ...tributeForm, title: e.target.value })}
              placeholder="A true friend"
              className={inputClass}
            />
          </FormField>
          <FormField label="Your message">
            <textarea
              rows={4}
              value={tributeForm.content}
              onChange={(e) => setTributeForm({ ...tributeForm, content: e.target.value })}
              placeholder="Write your tribute…"
              className={cn(inputClass, "resize-none py-3")}
            />
          </FormField>
          <Button
            type="submit"
            disabled={isSubmitting || !tributeForm.name.trim() || !validateEmail(tributeForm.email) || tributeForm.content.trim().length < 10}
            className="w-full min-h-[52px] bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold uppercase tracking-wider text-xs disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit tribute"}
          </Button>
          <p className={cn("text-center text-xs flex items-center justify-center gap-1.5", hybrid.editorialMuted)}>
            <Info className="w-3.5 h-3.5" aria-hidden />
            All tributes are moderated before publishing.
          </p>
        </form>
      )}
    </MemorialModal>
  );
}

function PhotoLightbox({
  galleryPhotos,
  memorialName,
  activePhotoIndex,
  portraitGrayscale,
  onClose,
  onChange,
}: {
  galleryPhotos: string[];
  memorialName: string;
  activePhotoIndex: number | null;
  portraitGrayscale: number;
  onClose: () => void;
  onChange: (i: number | null) => void;
}) {
  return (
    <AnimatePresence>
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative max-w-5xl w-full max-h-[90dvh] flex items-center justify-center z-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-0 right-0 min-h-[48px] min-w-[48px] flex items-center justify-center text-slate-400 hover:text-white rounded-full z-20"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(activePhotoIndex > 0 ? activePhotoIndex - 1 : galleryPhotos.length - 1);
              }}
              className="absolute left-0 min-h-[48px] min-w-[48px] rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 z-20"
              aria-label="Previous photo"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={galleryPhotos[activePhotoIndex]}
              alt={`${memorialName} — memorial photo`}
              className="max-w-full max-h-[85dvh] object-contain rounded-xl transition-[filter] duration-700"
              style={{ filter: `grayscale(${portraitGrayscale}%)` }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(activePhotoIndex < galleryPhotos.length - 1 ? activePhotoIndex + 1 : 0);
              }}
              className="absolute right-0 min-h-[48px] min-w-[48px] rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 z-20"
              aria-label="Next photo"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80 tabular-nums">
              {activePhotoIndex + 1} / {galleryPhotos.length}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={cn("text-[10px] font-semibold uppercase tracking-widest", hybrid.editorialMuted)}>{label}</span>
      {children}
    </label>
  );
}
