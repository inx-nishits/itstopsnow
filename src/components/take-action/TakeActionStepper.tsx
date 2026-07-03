"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type TakeActionStep = 1 | 2 | 3;

const STEPS: { step: TakeActionStep; label: string; description: string }[] = [
  { step: 1, label: "Choose template", description: "Browse the library" },
  { step: 2, label: "Find your MP", description: "Enter your postcode" },
  { step: 3, label: "Edit & send", description: "Personalise your letter" },
];

interface TakeActionStepperProps {
  currentStep: TakeActionStep;
  className?: string;
}

export default function TakeActionStepper({ currentStep, className }: TakeActionStepperProps) {
  return (
    <nav
      aria-label="Take Action progress"
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 sm:p-5 shadow-sm",
        className
      )}
    >
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
        {STEPS.map(({ step, label, description }) => {
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <li key={step} className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors",
                  isComplete && "bg-[#1877F2] border-[#1877F2] text-white",
                  isCurrent && "border-[#1877F2] text-[#1877F2] bg-[#1877F2]/10",
                  !isComplete && !isCurrent && "border-slate-200 text-slate-400 bg-slate-50"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? <Check className="w-4 h-4" /> : step}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isCurrent ? "text-[#1877F2]" : isComplete ? "text-[#010B19]" : "text-slate-400"
                  )}
                >
                  {label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
