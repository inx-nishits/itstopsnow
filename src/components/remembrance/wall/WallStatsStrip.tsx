import { Flame } from "lucide-react";
import type { ReactNode } from "react";

interface WallStatsStripProps {
  officersRemembered: number;
  totalCandles: number;
  forcesRepresented: number;
}

/** Minimal plaque-style stats — warm memorial tones. */
export default function WallStatsStrip({
  officersRemembered,
  totalCandles,
  forcesRepresented,
}: WallStatsStripProps) {
  return (
    <div
      className="py-4 sm:py-5 border-t border-amber-900/20 bg-[#0a0806]"
      aria-label="Memorial statistics"
    >
      <div className="flex items-center justify-center gap-6 sm:gap-10 px-5 text-center flex-wrap">
        <Stat value={officersRemembered.toLocaleString()} label="Officers remembered" />
        <span className="w-px h-6 bg-amber-900/25 hidden sm:block" aria-hidden />
        <Stat
          value={totalCandles.toLocaleString()}
          label="Candles lit"
          icon={<Flame className="w-3 h-3 text-amber-500/80 inline mr-1 -mt-0.5" />}
        />
        <span className="w-px h-6 bg-amber-900/25 hidden sm:block" aria-hidden />
        <Stat value={String(forcesRepresented)} label="Forces represented" />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm sm:text-base font-medium text-stone-400 tabular-nums tracking-tight">
        {icon}
        {value}
      </p>
      <p className="text-[10px] text-stone-600 mt-0.5 tracking-wide">{label}</p>
    </div>
  );
}
