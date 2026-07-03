import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "white" | "muted";
  id?: string;
  noPadding?: boolean;
};

/** Light editorial surface — reading, stats, listings */
export function EditorialSection({
  children,
  className,
  variant = "default",
  id,
  noPadding,
}: PageSectionProps) {
  const bg =
    variant === "white"
      ? "bg-white"
      : variant === "muted"
        ? "bg-[#f4f5f7]"
        : "bg-[#f4f5f7]";

  return (
    <section
      id={id}
      className={cn(
        "theme-editorial relative text-[#010B19] overflow-clip",
        bg,
        !noPadding && "py-10 sm:py-20 lg:py-24",
        className
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/20 to-transparent pointer-events-none"
        aria-hidden
      />
      {children}
    </section>
  );
}

/** Dark campaign surface — heroes, pillars, CTAs */
export function CampaignSection({
  children,
  className,
  id,
  noPadding,
  variant = "default",
}: Omit<PageSectionProps, "variant"> & { variant?: "default" | "deep" }) {
  const bg = variant === "deep" ? "bg-[#050A14]" : "bg-[#030712]";

  return (
    <section
      id={id}
      className={cn(
        "relative text-white overflow-clip",
        bg,
        !noPadding && "py-10 sm:py-20 lg:py-24",
        className
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        aria-hidden
      />
      {children}
    </section>
  );
}

/** Sticky filter/toolbar on editorial pages */
export function EditorialStickyBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "theme-editorial sticky top-16 md:top-24 z-40 w-full bg-white border-b border-slate-200 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
