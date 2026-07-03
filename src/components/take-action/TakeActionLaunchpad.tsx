"use client";

import { useRouter } from "next/navigation";
import { Mail, FileText, Search, ArrowUpRight, type LucideIcon } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import { cn } from "@/lib/utils";

interface TakeActionLaunchpadProps {
  onOpenFoi: () => void;
}

type ActionItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
};

const ACTIONS: ActionItem[] = [
  {
    id: "mp",
    title: "Write to your MP",
    description:
      "Find your MP and send a personalised letter demanding legislative change and better support.",
    cta: "Start writing",
    href: "/take-action/personalize",
    icon: Mail,
  },
  {
    id: "templates",
    title: "Browse templates",
    description:
      "Professionally written letter templates for specific campaigns and issues.",
    cta: "View templates",
    href: "/take-action/templates",
    icon: FileText,
  },
  {
    id: "foi",
    title: "Submit FOI request",
    description:
      "Send Freedom of Information requests to multiple UK police forces at once.",
    cta: "Launch FOI tool",
    icon: Search,
    badge: "New",
  },
];

function ActionCard({
  action,
  onActivate,
}: {
  action: ActionItem;
  onActivate: () => void;
}) {
  const Icon = action.icon;

  return (
    <button
      type="button"
      onClick={onActivate}
      className={cn(
        "group flex h-full w-full min-h-[200px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f4f5f7]/60 p-5 text-left transition-all duration-300",
        "hover:border-[#1877F2]/40 hover:bg-white hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2",
        "cursor-pointer sm:min-h-[220px] sm:p-6",
        action.badge && "ring-1 ring-[#1877F2]/20"
      )}
    >
      <div className="flex w-full min-w-0 flex-col items-start gap-4">
        <div className="flex w-full items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[#1877F2] shadow-sm transition-colors duration-300 group-hover:border-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white sm:h-12 sm:w-12">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
        </div>

        <div className="min-w-0 w-full">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <h3 className="font-black text-sm uppercase tracking-tight text-[#010B19] sm:text-base">
              {action.title}
            </h3>
            {action.badge ? (
              <span className="inline-flex items-center rounded-full bg-[#1877F2] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                {action.badge}
              </span>
            ) : null}
          </div>
          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
            {action.description}
          </p>
        </div>
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1877F2] sm:text-xs">
        {action.cta}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}

export default function TakeActionLaunchpad({ onOpenFoi }: TakeActionLaunchpadProps) {
  const router = useRouter();

  const handleActivate = (action: ActionItem) => {
    if (action.id === "foi") {
      onOpenFoi();
      return;
    }
    if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <section className="theme-editorial relative overflow-hidden border-t border-slate-100 bg-white py-12 text-[#010B19] sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-[min(600px,70vw)] w-[min(600px,70vw)] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#1877F2]/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionReveal className="flex flex-col justify-center lg:col-span-5">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className="h-[2px] w-12 bg-[#1877F2]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1877F2] sm:text-sm">
                Your toolkit
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-black uppercase leading-none tracking-tighter text-[#010B19] sm:mb-6 md:text-4xl lg:text-5xl">
              Choose your{" "}
              <span className="text-[#1877F2]">action.</span>
            </h2>

            <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base md:text-lg">
              Select a tool below to start making a difference. Demand answers from police forces,
              write to your MP, or use our ready-made letter templates.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7 xl:grid-cols-3">
            {ACTIONS.map((action, index) => (
              <SectionReveal key={action.id} delay={0.08 + index * 0.05}>
                <ActionCard action={action} onActivate={() => handleActivate(action)} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
