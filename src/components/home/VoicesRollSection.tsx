"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function VoicesRollSection({ voices, rollPreview }: VoicesRollSectionProps) {
  const displayVoices = voices.slice(0, 3);
  const defaultId = voices.find((v) => v.featured)?.id ?? voices[0]?.id;
  const [activeVoiceId, setActiveVoiceId] = useState(defaultId);
  const activeVoice =
    voices.find((v) => v.id === activeVoiceId) ?? displayVoices[0] ?? voices[0];

  if (!voices.length && !rollPreview.length) return null;

  return (
    <>
      {voices.length > 0 && activeVoice && (
        <section className="theme-editorial relative bg-[#f4f5f7] text-[#010B19] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent pointer-events-none" />

          <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 py-16 sm:py-20 lg:py-28">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]" />
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">
                  Voices from the Police Family
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/80 via-[#010B19]/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
                    <p className="text-white font-bold text-sm sm:text-base">{activeVoice.name}</p>
                    <p className="text-slate-300 text-[11px] sm:text-xs uppercase tracking-widest mt-1">
                      {activeVoice.relationship}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center">
                  <Quote className="w-10 h-10 text-[#1877F2]/25 mb-4 shrink-0" />
                  <div className="min-h-[8rem] sm:min-h-[9rem]">
                    <AnimatePresence mode="wait">
                      <motion.blockquote
                        key={activeVoice.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="text-xl sm:text-2xl md:text-3xl text-[#010B19] font-medium leading-[1.35] tracking-tight mb-6 sm:mb-8"
                      >
                        &ldquo;{activeVoice.quote}&rdquo;
                      </motion.blockquote>
                    </AnimatePresence>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                    Real words from families, colleagues, and friends who live with the human cost of
                    prolonged investigations — and who believe change cannot wait.
                  </p>

                  {displayVoices.length > 1 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {displayVoices.map((voice) => {
                        const isActive = voice.id === activeVoiceId;
                        return (
                          <button
                            key={voice.id}
                            type="button"
                            onClick={() => setActiveVoiceId(voice.id)}
                            aria-pressed={isActive}
                            className={`text-left px-4 py-3 rounded-xl border-2 transition-all min-h-[48px] flex-1 sm:flex-initial ${
                              isActive
                                ? "border-[#1877F2] bg-white text-[#010B19] shadow-md ring-2 ring-[#1877F2]/15"
                                : "border-slate-200 bg-white text-slate-600 hover:border-[#1877F2]/50 hover:text-[#010B19]"
                            }`}
                          >
                            <span
                              className={`block text-xs font-bold truncate ${
                                isActive ? "text-[#1877F2]" : "text-[#010B19]"
                              }`}
                            >
                              {voice.name}
                            </span>
                            <span
                              className={`block text-[10px] uppercase tracking-wider truncate mt-0.5 ${
                                isActive ? "text-slate-600" : "text-slate-500"
                              }`}
                            >
                              {voice.relationship}
                            </span>
                          </button>
                        );
                      })}
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
