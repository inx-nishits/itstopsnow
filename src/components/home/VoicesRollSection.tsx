"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/home/SectionReveal";
import RollHonourPreviewSection from "@/components/home/RollHonourPreview";
import type { HomepageVoice, RollHonourPreview } from "@/lib/homepage/types";

interface VoicesRollSectionProps {
  voices: HomepageVoice[];
  rollPreview: RollHonourPreview[];
}

function VoiceTabBar({
  voices,
  activeVoiceId,
  onSelect,
  className,
}: {
  voices: HomepageVoice[];
  activeVoiceId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={className}
      role="tablist"
      aria-label="Select a voice"
    >
      {voices.map((voice) => {
        const isActive = voice.id === activeVoiceId;
        return (
          <button
            key={voice.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(voice.id)}
            className={`shrink-0 text-left px-3 py-2.5 min-h-[44px] border-b-2 -mb-px transition-colors ${
              isActive
                ? "border-[#1877F2] text-[#1877F2]"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="block text-xs font-semibold whitespace-nowrap leading-snug">
              {voice.name}
            </span>
            <span className="block text-[9px] uppercase tracking-wider mt-0.5 opacity-75 max-w-[9rem] truncate">
              {voice.relationship}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function VoicePillSelectors({
  voices,
  activeVoiceId,
  onSelect,
}: {
  voices: HomepageVoice[];
  activeVoiceId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
      {voices.map((voice) => {
        const isActive = voice.id === activeVoiceId;
        return (
          <button
            key={voice.id}
            type="button"
            onClick={() => onSelect(voice.id)}
            aria-pressed={isActive}
            className={`text-left px-4 py-2.5 rounded-full border transition-all min-h-[44px] shrink-0 ${
              isActive
                ? "border-[#1877F2] bg-[#1877F2]/15 text-white"
                : "border-white/15 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white"
            }`}
          >
            <span
              className={`block text-xs font-bold truncate ${
                isActive ? "text-[#1877F2]" : "text-white"
              }`}
            >
              {voice.name}
            </span>
            <span className="block text-[10px] uppercase tracking-wider truncate mt-0.5 opacity-80">
              {voice.relationship}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function VoicesRollSection({ voices, rollPreview }: VoicesRollSectionProps) {
  const displayVoices = voices.slice(0, 3);
  const defaultId = voices.find((v) => v.featured)?.id ?? voices[0]?.id;
  const [activeVoiceId, setActiveVoiceId] = useState(defaultId);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeVoice =
    voices.find((v) => v.id === activeVoiceId) ?? displayVoices[0] ?? voices[0];

  const selectVoice = useCallback((id: string) => {
    setActiveVoiceId(id);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) {
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  }, []);

  if (!voices.length && !rollPreview.length) return null;

  return (
    <>
      {voices.length > 0 && activeVoice && (
        <section className="theme-editorial relative bg-[#030712] text-white overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 py-16 sm:py-20 lg:py-24">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-5 sm:mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]" />
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">
                  Voices from the Police Family
                </h2>
              </div>

              {displayVoices.length > 1 && (
                <VoiceTabBar
                  voices={displayVoices}
                  activeVoiceId={activeVoiceId}
                  onSelect={selectVoice}
                  className="flex gap-1 overflow-x-auto overflow-y-hidden mb-5 -mx-1 px-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:hidden"
                />
              )}

              <div
                ref={contentRef}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-start scroll-mt-24"
              >
                <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[320px] max-h-[320px] lg:max-h-none rounded-xl overflow-hidden border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVoice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeVoice.imageUrl}
                        alt={`Portrait of ${activeVoice.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/85 via-[#010B19]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                    <p className="text-white font-bold text-sm">{activeVoice.name}</p>
                    <p className="text-slate-300 text-[11px] uppercase tracking-widest mt-1">
                      {activeVoice.relationship}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
                  <Quote className="w-8 h-8 text-[#1877F2]/30 mb-3 shrink-0" />
                  <div className="min-h-[6.5rem] sm:min-h-[7.5rem]">
                    <AnimatePresence mode="wait">
                      <motion.blockquote
                        key={activeVoice.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-[1.4] tracking-tight mb-5 sm:mb-6"
                      >
                        &ldquo;{activeVoice.quote}&rdquo;
                      </motion.blockquote>
                    </AnimatePresence>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl lg:mb-6">
                    Real words from families, colleagues, and friends who live with the human cost of
                    prolonged investigations — and who believe change cannot wait.
                  </p>

                  {displayVoices.length > 1 && (
                    <div className="hidden sm:block mt-2">
                      <VoicePillSelectors
                        voices={displayVoices}
                        activeVoiceId={activeVoiceId}
                        onSelect={setActiveVoiceId}
                      />
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {rollPreview.length > 0 && <RollHonourPreviewSection officers={rollPreview} />}
    </>
  );
}
