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
    <section className="theme-editorial relative bg-white text-[#010B19] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-slate-200">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/15 to-transparent pointer-events-none" />

      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-[2px] bg-[#1877F2]" />
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">
                  Upcoming Events
                </h2>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#010B19] uppercase tracking-tighter">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={event.href}
                className="group flex flex-col bg-[#f4f5f7] border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-[#1877F2]/35 hover:bg-white transition-colors duration-300 min-h-[220px]"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-[#1877F2] text-[10px] font-bold uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {event.date}
                  </div>
                  {event.badge && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/15">
                      {event.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#010B19] mb-3 leading-snug group-hover:text-[#1877F2] transition-colors">
                  {event.title}
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-slate-500 text-xs mt-auto pt-4 border-t border-slate-200">
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

                <span className="inline-flex items-center gap-1.5 text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mt-4 group-hover:gap-2.5 transition-all">
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
