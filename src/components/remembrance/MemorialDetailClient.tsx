"use client";

import { useState, useCallback, useEffect, useRef, useMemo, type ReactNode, type Dispatch, type SetStateAction } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  X,
  Info,
  Check,
  Flame,
  MessageCircle,
  Download,
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
import MemorialMobileDock from "@/components/remembrance/MemorialMobileDock";
import TributeCarousel from "@/components/remembrance/TributeCarousel";
import { MemorialShareActions } from "@/components/remembrance/MemorialShareActions";
import TogetherWeRemember from "@/components/remembrance/wall/TogetherWeRemember";
import { useCandleRitual } from "@/components/remembrance/useCandleRitual";
import { generateMemorialPDF } from "@/lib/documentGenerator";
import { downloadBlob } from "@/lib/downloadBlob";
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
    resetCandle,
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
  const [activeSection, setActiveSection] = useState<MemorialSectionId>("story");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isNavigatingRef = useRef(false);
  const navigateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const galleryPhotos = memorial.gallery.length ? memorial.gallery : [memorial.portraitImageUrl];
  const timeline = memorial.timeline;
  const tributes = memorial.tributes;

  const visibleSectionIds = useMemo((): MemorialSectionId[] => {
    const ids: MemorialSectionId[] = ["story"];
    if (memorial.familyQuote) ids.push("family");
    if (galleryPhotos.length > 0) ids.push("gallery");
    ids.push("tributes");
    if (timeline.length > 0) ids.push("timeline");
    return ids;
  }, [memorial.familyQuote, galleryPhotos.length, timeline.length]);
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

  const scrollToSection = useCallback((id: string) => {
    if (id === "candle" && !sectionRefs.current.candle) {
      // On mobile, the candle widget is hidden, so we scroll to top where the header candle button is
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("candle");
      return;
    }

    const el = sectionRefs.current[id];
    if (!el) return;

    setActiveSection(id as MemorialSectionId);
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

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const blob = await generateMemorialPDF(
        {
          name: memorial.name,
          role: memorial.rank,
          force: memorial.force,
          years: memorial.yearsServed,
          age: memorial.age,
          quote: memorial.familyQuote || "In loving memory.",
        },
        memorial.tributes.slice(0, 5) // Limit tributes to fit on one page
      );
      downloadBlob(blob, `${memorial.name.replace(/\s+/g, "_")}_Memorial.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

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
        onLeaveTribute={() => setIsTributeFormOpen(true)}
        onShare={() => setIsShareOpen(true)}
      />

      <main className={`${PAGE_CONTENT_CONTAINER} pb-16 pt-2 sm:pt-8`}>
        <div className="sticky top-16 md:top-24 z-30 -mx-4 sm:-mx-6 lg:-mx-16 pt-2 pb-3 sm:py-3 mb-6 sm:mb-10 bg-white border-b border-slate-200">
          <MemorialSectionTabs
            activeSection={activeSection}
            onNavigate={scrollToSection}
            visibleSectionIds={visibleSectionIds}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-10 lg:items-start">
          
          {/* LEFT COLUMN: Story, Photos, Tributes (6 columns) */}
          <div className="lg:col-span-6 space-y-12 sm:space-y-14">
            
            {/* Story & Gallery Side-by-side on very large screens, otherwise stacked */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-6">
              {/* Story */}
              <section
                id="story"
                ref={(el) => {
                  sectionRefs.current.story = el;
                }}
                className="scroll-mt-36"
              >
                <h2 className="text-sm font-bold text-[#010B19] uppercase tracking-widest mb-6 pb-2 border-b-2 border-[#1877F2] inline-block">
                  Their Story
                </h2>
                <div className="text-[14px] leading-[1.8] whitespace-pre-line text-slate-600 mb-6">
                  {memorial.biography}
                </div>
                {memorial.familyQuote && (
                  <div 
                    id="family"
                    ref={(el) => { sectionRefs.current.family = el; }}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm scroll-mt-36"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1877F2] mb-2">From the family</p>
                    <p className="text-slate-600 italic text-sm leading-relaxed whitespace-pre-line">{memorial.familyQuote}</p>
                  </div>
                )}
              </section>

              {/* Gallery */}
              <section
                id="gallery"
                ref={(el) => { sectionRefs.current.gallery = el; }}
                className="scroll-mt-36"
              >
                <div className="grid grid-cols-2 gap-2 h-[240px] sm:h-[320px]">
                  <div className="col-span-1 min-h-0 h-full">
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex(0)}
                      className="relative w-full h-full min-h-0 overflow-hidden rounded-lg bg-slate-100 hover:opacity-90 transition-opacity block"
                    >
                      <img
                        src={galleryPhotos[0]}
                        alt={`${memorial.name} — photo 1`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2 h-full min-h-0">
                    {galleryPhotos.slice(1, 3).map((photo, index) => (
                      <button
                        key={photo + index}
                        type="button"
                        onClick={() => setActivePhotoIndex(index + 1)}
                        className="relative flex-1 min-h-0 w-full overflow-hidden rounded-lg bg-slate-100 hover:opacity-90 transition-opacity block"
                      >
                        <img
                          src={photo}
                          alt={`${memorial.name} — photo ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(0)}
                  className="w-full mt-4 flex items-center justify-center font-bold uppercase tracking-[0.14em] text-[#1877F2] text-xs sm:text-xs hover:text-[#1565d8] transition-colors"
                >
                  View all photos
                </button>
              </section>
            </div>

            {/* Remembered By */}
            <section
              id="tributes"
              ref={(el) => {
                sectionRefs.current.tributes = el;
              }}
              className="scroll-mt-36"
            >
              {tributes.length > 0 ? (
                <TributeCarousel 
                  tributes={tributes} 
                  onSeeAll={() => console.log('See all tributes clicked')} 
                  onLeaveTribute={() => setIsTributeFormOpen(true)}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <h2 className="text-sm font-bold text-[#010B19] uppercase tracking-widest pb-2 border-b-2 border-[#1877F2] inline-block mb-0">
                      Remembered By
                    </h2>
                  </div>
                  <div className="text-center py-10 px-4 rounded-xl bg-white border border-dashed border-slate-300">
                    <p className="text-sm text-slate-500 mb-4">No tributes yet.</p>
                    <Button
                      onClick={() => setIsTributeFormOpen(true)}
                      className="min-h-[44px] bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-xs"
                    >
                      Write the first tribute
                    </Button>
                  </div>
                </>
              )}
            </section>
          </div>

          {/* CENTER COLUMN: Timeline, Support (3 columns) */}
          <div className="lg:col-span-3 space-y-12 sm:space-y-14">
            
            {/* Timeline */}
            {timeline.length > 0 && (
              <section
                id="timeline"
                ref={(el) => {
                  sectionRefs.current.timeline = el;
                }}
                className="scroll-mt-36"
              >
                <h2 className="text-sm font-bold text-[#010B19] uppercase tracking-widest mb-6 pb-2 border-b-2 border-[#1877F2] inline-block">
                  Service & Career
                </h2>
                <ol className="space-y-0 border-l-2 border-[#1877F2]/20 ml-2">
                  {visibleTimeline.map((event, index) => (
                    <li key={`${event.date}-${event.title}-${index}`} className="relative pl-6 pb-6 last:pb-0">
                      <span className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2] ring-[3px] ring-white" aria-hidden />
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2] mb-0.5">{event.date}</p>
                      <h3 className="text-sm font-bold text-[#010B19] mb-1">{event.title}</h3>
                      <p className="text-[14px] text-slate-500 leading-relaxed">{event.description}</p>
                    </li>
                  ))}
                </ol>
                {timeline.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                    className="mt-4 w-full py-2.5 text-xs font-bold text-[#1877F2] uppercase tracking-wider border border-[#1877F2]/20 rounded-lg hover:bg-[#1877F2]/5 transition-colors"
                  >
                    {isTimelineExpanded ? "Show less" : "View Full Timeline"}
                  </button>
                )}
              </section>
            )}

            {/* Support */}
            <section 
              id="support" 
              ref={(el) => {
                sectionRefs.current.support = el;
              }}
              className="scroll-mt-36"
            >
              <h2 className="text-sm font-bold text-[#010B19] uppercase tracking-widest mb-4 pb-2 border-b-2 border-[#1877F2] inline-block">
                Support If You Need It
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                 <p className="text-xs text-slate-500 mb-4 leading-relaxed">If this story affects you, please know that help is available. You are not alone.</p>
                 <div className="space-y-2">
                    <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-[#1877F2]/40 transition-colors shadow-sm">
                      <div><p className="text-xs font-semibold text-[#010B19]">Samaritans</p><p className="text-xs text-slate-500 mt-0.5">Call 116 123</p></div>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-[#1877F2]/40 transition-colors shadow-sm">
                      <div><p className="text-xs font-semibold text-[#010B19]">Police Treatment Centres</p><p className="text-xs text-slate-500 mt-0.5">enquiries@ptc.org.uk</p></div>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-[#1877F2]/40 transition-colors shadow-sm">
                      <div><p className="text-xs font-semibold text-[#010B19]">Mind</p><p className="text-xs text-slate-500 mt-0.5">0300 123 3393</p></div>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </a>
                 </div>
                 <button className="w-full mt-3 py-2.5 text-xs font-bold text-[#1877F2] uppercase tracking-wider border border-[#1877F2]/20 rounded-lg hover:bg-[#1877F2]/5 transition-colors">
                   View more support services
                 </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Light a Candle (3 columns) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-40">
            <div 
              id="candle" 
              ref={(el) => {
                sectionRefs.current.candle = el;
              }}
              className="bg-[#0B1221] text-white rounded-2xl p-6 xl:p-8 shadow-xl border border-white/10 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-[#1e293b]/50 rounded-full flex items-center justify-center mb-4 border border-white/5">
                <Flame className={cn("w-5 h-5", isLit ? "text-amber-400" : "text-slate-400")} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Light a candle</h3>
              <p className="text-xs text-slate-400 mb-6">Keep {memorial.name.split(' ')[0]}'s memory alive.</p>
              
              <div className="text-3xl xl:text-4xl font-black mb-1 tabular-nums">{candleCount.toLocaleString()}</div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Candles lit</p>
              
              <Button 
                onClick={lightCandle} 
                disabled={isLit || candleLoading} 
                className={cn(
                  "w-full min-h-[48px] font-bold uppercase tracking-wider text-xs transition-all",
                  isLit 
                    ? "bg-[#0c4a6e]/40 text-[#38bdf8] border border-[#0ea5e9]/20 shadow-none opacity-100" 
                    : "bg-[#1877F2] hover:bg-[#1565d8] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]"
                )}
              >
                 {isLit ? "Candle lit" : candleLoading ? "Lighting..." : "Light a candle"}
              </Button>
              {candleMessage && <p className="text-xs text-[#1877F2] font-semibold mt-3 leading-relaxed">{candleMessage}</p>}

              <div className="w-full mt-6 pt-6 border-t border-white/10">
                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Share tribute</p>
                 <div className="flex items-center justify-center gap-3">
                   <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
                     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                   </button>
                   <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
                     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                   </button>
                   <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-300" onClick={handleCopyLink}>
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                   </button>
                 </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-white/10">
                 <Button
                   variant="outline"
                   onClick={handleDownloadPDF}
                   disabled={isGeneratingPDF}
                   className="w-full min-h-[48px] bg-transparent border-white/20 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
                 >
                   {isGeneratingPDF ? "Generating PDF..." : (
                     <>
                       <Download className="w-4 h-4 mr-2" />
                       Save Memorial PDF
                     </>
                   )}
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <TogetherWeRemember />

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
        onSubmit={async () => {
          if (!tributeForm.name.trim() || !validateEmail(tributeForm.email) || tributeForm.content.trim().length < 10) {
            return;
          }
          setIsSubmittingTribute(true);
          try {
            const response = await fetch('/api/tribute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                memorialId: memorial.id,
                authorName: tributeForm.name,
                authorEmail: tributeForm.email,
                relationship: tributeForm.title || "Friend",
                message: tributeForm.content
              }),
            });
            if (!response.ok) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data.error || 'Submission failed');
            }
            setTributeSuccess(true);
          } catch (error) {
            console.error('Failed to submit tribute:', error);
            alert(error instanceof Error ? error.message : "Failed to submit tribute. Please try again.");
          } finally {
            setIsSubmittingTribute(false);
          }
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
    <h2 className={cn("text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2", className)}>
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
      <span className={cn("text-xs font-semibold uppercase tracking-widest", hybrid.editorialMuted)}>{label}</span>
      {children}
    </label>
  );
}

