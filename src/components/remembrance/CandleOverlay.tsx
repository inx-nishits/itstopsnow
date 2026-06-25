"use client";

import { motion } from "framer-motion";

interface CandleOverlayProps {
  isLit: boolean;
  isLoading?: boolean;
  onLight: () => void;
  disabled?: boolean;
  className?: string;
  showGlow?: boolean;
  interactive?: boolean;
}

/** Compact vigil candle — secondary to the portrait, bottom-centre overlay */
export default function CandleOverlay({ 
  isLit, 
  isLoading, 
  onLight, 
  disabled,
  className = "",
  showGlow = true,
  interactive = true 
}: CandleOverlayProps) {
  const canInteract = interactive && !disabled && !isLoading;
  const Component = interactive ? "button" : "div";

  return (
    <Component
      type={interactive ? "button" : undefined}
      onClick={canInteract ? onLight : undefined}
      disabled={interactive ? (!canInteract || isLit) : undefined}
      aria-label={interactive ? (isLit ? "Candle lit" : "Light a candle") : undefined}
      className={`relative flex flex-col items-center justify-end w-11 h-[4.5rem] sm:w-12 sm:h-20 transition-opacity ${
        isLit ? "cursor-default" : canInteract ? "cursor-pointer hover:scale-105 active:scale-95" : (interactive ? "cursor-not-allowed opacity-60" : "")
      } ${className}`}
    >
      {/* Flame */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-10 sm:h-12 flex items-end justify-center pointer-events-none">
        {isLit ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.08, 0.96, 1.04, 1],
              opacity: [0.85, 1, 0.9, 1, 0.85],
              y: [0, -1, 0.5, -0.5, 0],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-white/90 rounded-[50%_50%_20%_20%] blur-[0.5px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-7 bg-amber-300/90 rounded-[50%_50%_20%_20%] blur-[2px]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-10 bg-orange-500/50 rounded-full blur-md" />
          </motion.div>
        ) : (
          <div className="w-0.5 h-2.5 bg-zinc-600 rounded-t-full" aria-hidden />
        )}
      </div>

      {/* Wax */}
      <div
        className={`relative w-7 sm:w-8 h-12 sm:h-14 rounded-t-sm rounded-b-md shadow-lg border transition-colors duration-700 ${
          isLit
            ? "bg-gradient-to-b from-amber-50 to-slate-200 border-amber-200/40"
            : "bg-gradient-to-b from-slate-300 to-slate-400 border-white/20"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 rounded-[50%] bg-black/10" />
        <div className="absolute inset-y-0 left-1.5 w-px bg-white/30" />
      </div>

      {/* Soft pool of light on portrait when lit */}
      {isLit && showGlow && (
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-12 bg-amber-400/25 rounded-full blur-xl pointer-events-none"
          aria-hidden
        />
      )}
    </Component>
  );
}
