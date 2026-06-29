"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import type { HomepageEventPreview } from "@/lib/homepage/types";

interface HomeEventsPreviewProps {
  events: HomepageEventPreview[];
}

export default function HomeEventsPreview({ events }: HomeEventsPreviewProps) {
  if (!events.length) return null;

  return (
    <section className="theme-editorial relative bg-[#f4f5f7] text-[#010B19] py-10 sm:py-20 lg:py-24 overflow-hidden border-t border-slate-200/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/15 to-transparent pointer-events-none" />

      <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-12 h-[2px] bg-[#1877F2]" />
                <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
                  Upcoming Events
                </h2>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] text-balance">
                Stand With Us <span className="text-slate-400">In Person</span>
              </h3>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 shrink-0 text-[#1877F2] hover:text-[#010B19] text-xs font-bold uppercase tracking-widest transition-colors group"
            >
              View all events
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
            {events.map((event) => (
              <Link
                key={event.id}
                href={event.href}
                className="group flex flex-col md:h-full bg-white border border-slate-200/90 rounded-xl md:rounded-2xl p-4 sm:p-5 hover:border-[#1877F2]/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-[#1877F2] text-[10px] font-bold uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {event.date}
                  </div>
                  {event.badge && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/15">
                      {event.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#010B19] mb-2 leading-snug group-hover:text-[#1877F2] transition-colors line-clamp-2">
                  {event.title}
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed mb-3 flex-grow line-clamp-2 md:line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-1 text-slate-500 text-xs mt-auto pt-3 border-t border-slate-200/80">
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mt-3 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

