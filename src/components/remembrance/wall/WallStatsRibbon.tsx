"use client";

import { Flame, Shield, Users, Heart } from "lucide-react";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";

interface WallStatsRibbonProps {
  officersRemembered: number;
  totalCandles: number;
  forcesRepresented: number;
  monthlyRemembranceAvg?: number;
  notForgottenPercent?: number;
  onWallCount?: number;
}

const statsConfig = [
  { key: "officers", label: "Officers remembered", icon: Users, accent: false },
  { key: "monthly", label: "Monthly remembrance avg", icon: Heart, accent: false },
  { key: "forces", label: "Forces represented", icon: Shield, accent: false },
  { key: "candles", label: "Candles lit", icon: Flame, accent: true },
  { key: "notForgotten", label: "Not forgotten", icon: Heart, accent: false },
] as const;

/** Full-width memorial stats — bridges hero and roll of honour. */
export default function WallStatsRibbon({
  officersRemembered,
  totalCandles,
  forcesRepresented,
  monthlyRemembranceAvg = 0,
  notForgottenPercent = 98,
}: WallStatsRibbonProps) {
  const values: Record<(typeof statsConfig)[number]["key"], string> = {
    officers: officersRemembered.toLocaleString(),
    monthly: monthlyRemembranceAvg.toLocaleString(),
    forces: String(forcesRepresented),
    candles: totalCandles.toLocaleString(),
    notForgotten: `${notForgottenPercent}%`,
  };

  return (
    <section
      className="relative w-full bg-[#050A14] border-y border-white/10 -mt-px"
      aria-label="Memorial statistics"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(24,119,242,0.14),transparent_55%)] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/40 to-transparent pointer-events-none"
        aria-hidden
      />

      <div className={`${PAGE_CONTENT_CONTAINER} py-6 sm:py-8 lg:py-10`}>
        <p className="text-center lg:text-left text-xs sm:text-xs font-bold uppercase tracking-[0.28em] text-slate-500 mb-4 sm:mb-6">
          A living record of remembrance
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4">
          {statsConfig.map(({ key, label, icon: Icon, accent }) => (
            <article
              key={key}
              className={cn(
                "relative overflow-hidden rounded-xl sm:rounded-2xl border p-4 sm:p-5 lg:p-6 transition-colors duration-300",
                accent
                  ? "border-[#1877F2]/35 bg-[#1877F2]/10 shadow-[0_8px_32px_rgba(24,119,242,0.12)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
              )}
            >
              {accent && (
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 bg-[#1877F2]/20 rounded-full blur-2xl pointer-events-none"
                  aria-hidden
                />
              )}

              <div className="relative z-10 flex flex-col h-full min-h-[88px] sm:min-h-[100px]">
                <div
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shrink-0",
                    accent
                      ? "bg-[#1877F2]/20 border border-[#1877F2]/30"
                      : "bg-white/5 border border-white/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 sm:w-[18px] sm:h-[18px]",
                      accent ? "text-amber-400" : "text-[#1877F2]"
                    )}
                    aria-hidden
                  />
                </div>

                <p
                  className={cn(
                    "text-2xl sm:text-3xl lg:text-4xl font-black tabular-nums tracking-tight leading-none",
                    accent ? "text-[#1877F2]" : "text-white"
                  )}
                >
                  {values[key]}
                </p>

                <p className="mt-2 sm:mt-2.5 text-xs sm:text-xs lg:text-xs font-semibold uppercase tracking-wider text-slate-500 leading-snug">
                  {label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
