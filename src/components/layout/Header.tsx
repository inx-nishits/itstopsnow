"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Users,
  CircleAlert,
  Newspaper,
  MessageSquareText,
  FileSearch,
  HeartHandshake,
  ChevronRight,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useModalA11y } from "@/hooks/useModalA11y";
import { modalBackdropMotion, MOTION_TRANSITION } from "@/lib/theme/motion";

/** Outline candle for Wall of Remembrance */
function CandleNavIcon({ className = "", strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c1.4 1.8 1.8 3.2 0 5-1.8-1.8-1.4-3.2 0-5Z" />
      <path d="M12 8v2" />
      <path d="M9.5 10h5v9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-9Z" />
      <path d="M7.5 21h9" />
    </svg>
  );
}

const NAV_LINKS: { label: string; href: string; icon: LucideIcon | typeof CandleNavIcon }[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Users },
  { label: "The Issue", href: "/the-issue", icon: CircleAlert },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Stories", href: "/stories", icon: MessageSquareText },
  { label: "Wall of Remembrance", href: "/wall-of-remembrance", icon: CandleNavIcon },
  { label: "Research and Evidence", href: "/research", icon: FileSearch },
  { label: "Recover and Support", href: "/support", icon: HeartHandshake },
];

function sidebarPanelMotion(reduced: boolean | null) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: MOTION_TRANSITION.spring,
  };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const setMobileMenuRef = useModalA11y(mobileMenuOpen, () => setMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ top: isScrolled ? "0px" : "var(--alert-height, 0px)" }}
      >
        <div
          className={`w-full px-4 sm:px-6 lg:px-12 mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-2 md:py-3" : "py-3 md:py-5"
          }`}
        >
          <Link href="/" className="flex items-center shrink-0">
            <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-10 md:h-12 w-auto" />
          </Link>

          <nav
            className="hidden xl:flex flex-1 justify-center items-center gap-2 2xl:gap-4 px-2 lg:px-4"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap text-[14px] 2xl:text-base font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                    isActive
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#1877F2] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <Link
              href="/take-action"
              className="bg-[#1877F2] text-white hover:bg-white hover:text-black text-xs xl:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              Take Action
            </Link>
          </div>

          <button
            type="button"
            className="xl:hidden text-white p-2 -mr-2 relative z-[60] min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2] transition-colors hover:text-slate-300"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" aria-hidden />
          </button>
        </div>
      </header>

      {/* MOBILE MENU — right sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              {...modalBackdropMotion(prefersReducedMotion)}
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] xl:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              ref={setMobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              {...sidebarPanelMotion(prefersReducedMotion)}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,28rem)] flex-col bg-[#050A14] shadow-[-12px_0_40px_rgba(0,0,0,0.45)] xl:hidden safe-area-modal"
            >
              {/* Header — same height as site header */}
              <div className="border-b border-white/10 pt-[env(safe-area-inset-top)]">
                <div className="flex h-[64px] items-center justify-between gap-3 px-4">
                  <Link href="/" className="flex min-w-0 items-center" onClick={() => setMobileMenuOpen(false)}>
                    <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-10 w-auto max-w-[11.5rem]" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center text-white transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
                    aria-label="Close menu"
                  >
                    <X className="h-7 w-7" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {/* Take Action — top, always visible */}
                <div className="px-4 pt-4">
                  <Link
                    href="/take-action"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl p-3.5 shadow-[0_10px_28px_rgba(24,119,242,0.4)] transition-transform active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(105deg, #4BA3FF 0%, #1877F2 48%, #1565D8 100%)",
                    }}
                  >
                    <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#030712] shadow-[0_0_20px_rgba(94,179,255,0.45)] ring-1 ring-[#5EB3FF]/40">
                      <Image
                        src="/images/neon-fist-icon.png"
                        alt=""
                        fill
                        className="object-cover object-center scale-110"
                        sizes="56px"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-black uppercase tracking-wider text-white">
                        Take Action
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-white/95">
                        Write to your MP, send FOIs & use templates.
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/20">
                      <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                    </span>
                  </Link>
                </div>

                {/* Nav links */}
                <nav className="mt-3 flex-1 px-2 pb-2" aria-label="Mobile navigation links">
                  <ul className="divide-y divide-white/10">
                    {NAV_LINKS.filter((link) => link.href !== "/support").map((link) => {
                      const Icon = link.icon;
                      const isActive =
                        pathname === link.href ||
                        (pathname.startsWith(link.href) && link.href !== "/");
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-3.5 transition-colors ${
                              isActive ? "text-white" : "text-slate-300 hover:text-white"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 shrink-0 ${isActive ? "text-[#1877F2]" : "text-slate-400"}`}
                              strokeWidth={1.75}
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 text-[15px] font-medium tracking-wide">
                              {link.label}
                            </span>
                            <ChevronRight
                              className="h-5 w-5 shrink-0 text-slate-500"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Bottom support CTA */}
                <div className="mt-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[12px] font-black uppercase tracking-[0.18em] text-[#1877F2]">
                      You Are Not Alone
                    </p>
                    <p className="mt-1.5 text-[13px] leading-snug text-slate-300">
                      Need help now? Find support and speak to someone.
                    </p>
                    <Link
                      href="/support"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1877F2]/70 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#1877F2] transition-colors hover:bg-[#1877F2]/10"
                    >
                      Get Support
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
