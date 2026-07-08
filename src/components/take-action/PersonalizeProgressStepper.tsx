"use client";

import { cn } from "@/lib/utils";

type StepState = "complete" | "current" | "upcoming";

const STEPS: { id: number; label: string; shortLabel: string }[] = [
  { id: 1, label: "Find Your MP", shortLabel: "Find MP" },
  { id: 2, label: "Choose Campaign", shortLabel: "Campaign" },
  { id: 3, label: "Preview Letter", shortLabel: "Preview" },
  { id: 4, label: "Personalise", shortLabel: "Personalise" },
  { id: 5, label: "Send Letter", shortLabel: "Send" },
];

function stepCircleClass(state: StepState) {
  if (state === "complete") return "bg-[#1877F2] text-white";
  if (state === "current") return "border-2 border-[#1877F2] bg-[#1877F2]/15 text-white";
  return "bg-[#1A2332] text-slate-500";
}

function stepLabelClass(state: StepState) {
  if (state === "complete") return "text-white";
  if (state === "current") return "text-slate-300";
  return "text-slate-500";
}

interface PersonalizeProgressStepperProps {
  /** Currently active step (1-based). Steps before it render as complete. */
  currentStep: number;
}

export default function PersonalizeProgressStepper({ currentStep }: PersonalizeProgressStepperProps) {
  const clamped = Math.min(Math.max(currentStep, 1), STEPS.length);

  const stateFor = (id: number): StepState => {
    if (id < clamped) return "complete";
    if (id === clamped) return "current";
    return "upcoming";
  };

  const current = STEPS[clamped - 1];

  return (
    <nav aria-label="Letter progress" className="w-full xl:max-w-2xl">
      {/* Mobile: compact single-line progress */}
      <p className="text-center text-[11px] leading-snug text-slate-400 sm:hidden">
        Step {current.id} of {STEPS.length} ·{" "}
        <span className="font-semibold text-white">{current.label}</span>
      </p>

      {/* Tablet+ : numbered stepper */}
      <ol className="hidden w-full items-start justify-between sm:flex">
        {STEPS.map((step) => {
          const state = stateFor(step.id);
          return (
            <li
              key={step.id}
              className="relative z-10 flex flex-1 flex-col items-center gap-2"
              aria-current={state === "current" ? "step" : undefined}
            >
              <div
                className={cn(
                  "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300 sm:h-8 sm:w-8 sm:text-xs",
                  stepCircleClass(state)
                )}
              >
                {step.id}
              </div>

              <span
                className={cn(
                  "hidden max-w-[4.25rem] text-center text-[10px] font-bold leading-tight sm:block xl:hidden",
                  stepLabelClass(state)
                )}
              >
                {step.shortLabel}
              </span>

              <span
                className={cn(
                  "hidden whitespace-nowrap text-xs font-bold xl:block",
                  stepLabelClass(state)
                )}
              >
                {step.label}
              </span>

              {step.id < STEPS.length && (
                <div
                  className={cn(
                    "absolute top-3.5 left-1/2 -z-10 h-px w-full transition-colors duration-300 sm:top-4",
                    state === "complete" ? "bg-[#1877F2]/50" : "bg-white/15"
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
