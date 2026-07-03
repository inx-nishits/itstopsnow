"use client";

import { cn } from "@/lib/utils";

type StepState = "complete" | "current" | "upcoming";

const STEPS: { id: number; label: string; shortLabel: string; state: StepState }[] = [
  { id: 1, label: "Find Your MP", shortLabel: "Find MP", state: "complete" },
  { id: 2, label: "Personalise", shortLabel: "Personalise", state: "complete" },
  { id: 3, label: "Preview", shortLabel: "Preview", state: "current" },
  { id: 4, label: "Add Your Voice", shortLabel: "Your Voice", state: "upcoming" },
  { id: 5, label: "Send Letter", shortLabel: "Send", state: "upcoming" },
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

export default function PersonalizeProgressStepper() {
  const current = STEPS.find((step) => step.state === "current") ?? STEPS[0];

  return (
    <nav aria-label="Letter progress" className="mt-4 w-full xl:mt-0 xl:max-w-2xl">
      <ol className="flex w-full items-start justify-between">
        {STEPS.map((step) => (
          <li
            key={step.id}
            className="relative z-10 flex flex-1 flex-col items-center gap-2"
            aria-current={step.state === "current" ? "step" : undefined}
          >
            <div
              className={cn(
                "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:h-8 sm:w-8 sm:text-xs",
                stepCircleClass(step.state)
              )}
            >
              {step.id}
            </div>

            <span
              className={cn(
                "hidden max-w-[4.25rem] text-center text-[10px] font-bold leading-tight sm:block xl:hidden",
                stepLabelClass(step.state)
              )}
            >
              {step.shortLabel}
            </span>

            <span
              className={cn(
                "hidden whitespace-nowrap text-xs font-bold xl:block",
                stepLabelClass(step.state)
              )}
            >
              {step.label}
            </span>

            {step.id < STEPS.length && (
              <div
                className={cn(
                  "absolute top-3.5 left-1/2 -z-10 h-px w-full sm:top-4",
                  step.state === "upcoming" ? "bg-white/15" : "bg-[#1877F2]/50"
                )}
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>

      <p className="mt-3 text-center text-[11px] leading-snug text-slate-400 sm:hidden">
        Step {current.id} of {STEPS.length} ·{" "}
        <span className="font-semibold text-white">{current.label}</span>
      </p>
    </nav>
  );
}
