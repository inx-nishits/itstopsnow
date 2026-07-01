"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useModalA11y } from "@/hooks/useModalA11y";
import { modalBackdropMotion, modalPanelMotion } from "@/lib/theme/motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "The Issue", href: "/the-issue" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Wall of Remembrance", href: "/wall-of-remembrance" },
  { label: "Research and Evidence", href: "/research" },
  { label: "Recover and Support", href: "/support" },
];

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${isScrolled
            ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent border-b border-transparent"
          }`}
        style={{ top: isScrolled ? '0px' : 'var(--alert-height, 0px)' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto flex items-center justify-between h-16 md:h-24 transition-all duration-300">

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/ISN-Logo.svg"
              alt="It Stops Now Logo"
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"}`}
            />
          </Link>

          {/* DESKTOP NAV (Centered) */}
          <nav className="hidden xl:flex flex-1 justify-center items-center gap-2 2xl:gap-4 px-2 lg:px-4" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap text-[13px] 2xl:text-base font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${isActive
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

          {/* DESKTOP ACTIONS */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <Link
              href="/take-action"
              className="bg-[#1877F2] text-white hover:bg-white hover:text-black text-xs xl:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              Take Action
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={setMobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            {...modalPanelMotion(prefersReducedMotion)}
            className="fixed inset-0 z-[60] bg-[#030712]/95 backdrop-blur-3xl flex flex-col safe-area-modal"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 md:h-24 border-b border-white/10">
              <Link href="/" className="flex items-center">
                <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-2 -mr-2 min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2 sm:gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg sm:text-xl font-medium tracking-wide py-1.5 cursor-pointer ${pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                <Link
                  href="/take-action"
                  className="flex justify-center bg-[#1877F2] text-white hover:bg-white hover:text-black text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)] cursor-pointer"
                >
                  Take Action
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

