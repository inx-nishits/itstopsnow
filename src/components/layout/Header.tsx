"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Issue", href: "/the-issue" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Wall of Remembrance", href: "/remembrance" },
  { label: "Research and Evidence", href: "/research" },
  { label: "Recover and Support", href: "/support" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12 mx-auto flex items-center justify-between h-20 md:h-24 transition-all duration-300">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <img 
              src="/ISN-Logo.svg" 
              alt="It Stops Now Logo" 
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"}`} 
            />
          </Link>

          {/* DESKTOP NAV (Centered) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`relative whitespace-nowrap text-sm xl:text-base font-medium transition-all duration-200 hover:-translate-y-0.5 ${
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

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link 
              href="/take-action" 
              className="bg-[#1877F2] text-white hover:bg-white hover:text-black text-xs xl:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              Take Action
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#030712]/95 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 md:h-24 border-b border-white/10">
              <Link href="/" className="flex items-center">
                <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-8 w-auto" />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-2 -mr-2"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-2xl font-medium tracking-tight ${
                    pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
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
                  className="flex justify-center bg-[#1877F2] text-white hover:bg-white hover:text-black text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)]"
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
