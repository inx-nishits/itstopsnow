"use client";

import { Clock, LucideIcon, Scale, ShieldCheck, Users } from "lucide-react";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionReveal from "@/components/home/SectionReveal";
import type { HomepageStat } from "@/lib/homepage/types";

const STAT_ICONS: Record<string, LucideIcon> = {
  officers: Users,
  forces: Clock,
  victories: Scale,
  funds: ShieldCheck,
};

function StatCounter({
  end,
  suffix = "",
  prefix = "",
  isPulsing = false,
  decimals,
  duration = 2.5,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  isPulsing?: boolean;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const resolvedDecimals = decimals ?? (end % 1 !== 0 ? 1 : 0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setCount(value);
      },
    });

    return () => controls.stop();
  }, [end, isInView, duration]);

  return (
    <div
      ref={ref}
      className="text-xl sm:text-2xl lg:text-[1.65rem] font-black tracking-tight transition-all duration-500 flex items-center gap-1.5 text-[#010B19] group-hover:text-[#1877F2]"
    >
      {prefix}
      <span className={isPulsing ? "animate-[pulse_3s_infinite] text-[#1877F2]" : ""}>
        {count.toLocaleString(undefined, {
          minimumFractionDigits: resolvedDecimals,
          maximumFractionDigits: resolvedDecimals,
        })}
      </span>
      {suffix}
    </div>
  );
}

function statIcon(stat: HomepageStat): LucideIcon {
  return STAT_ICONS[stat.id] ?? Users;
}

interface AwarenessStatisticsSectionProps {
  stats: HomepageStat[];
  footnote?: string;
}

export default function AwarenessStatisticsSection({
  stats,
  footnote,
}: AwarenessStatisticsSectionProps) {
  return (
    <>
      <section
        className="theme-editorial relative z-20 bg-[#f4f5f7] text-[#010B19] py-4 sm:py-20 lg:py-24"
        aria-labelledby="awareness-statistics-heading"
      >
        <h2 id="awareness-statistics-heading" className="sr-only">
          Awareness statistics
        </h2>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/20 to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <SectionReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
              {stats.map((stat) => {
                const IconComponent = statIcon(stat);
                return (
                  <div
                    key={stat.id}
                    className="group relative bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 lg:p-4 transition-all duration-300 hover:border-[#1877F2]/25 hover:shadow-sm flex flex-col h-full"
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0">
                        <IconComponent
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.isPulsing ? "animate-[pulse_1.5s_infinite]" : ""}`}
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-[0.12em] leading-tight line-clamp-2">
                        {stat.label}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-1.5 sm:mb-2">
                      <StatCounter
                        end={stat.endValue}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={stat.duration ?? 2.5}
                        isPulsing={stat.isPulsing}
                      />
                      {stat.suffixText ? (
                        <span className="text-sm sm:text-base font-black text-slate-400 tracking-tight">
                          {stat.suffixText}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-slate-600 text-[11px] sm:text-xs leading-snug font-normal group-hover:text-slate-800 transition-colors line-clamp-3">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          {footnote ? (
            <p className="mt-5 sm:mt-6 text-center text-slate-500 text-xs italic max-w-xl mx-auto leading-relaxed">
              {footnote}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

