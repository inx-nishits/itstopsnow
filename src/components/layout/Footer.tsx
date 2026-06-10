"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="relative bg-[#02050A] pt-32 pb-12 text-white font-sans overflow-hidden border-t border-white/5">
      
      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.06] translate-y-[10%]">
        <h1 className="text-[15vw] font-black text-white whitespace-nowrap leading-[0.8] tracking-tighter">
          IT STOPS NOW
        </h1>
      </div>

      <div className="w-full px-6 lg:px-12 mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-32">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col items-start pr-8">
            <Link href="/" className="mb-8 block">
              <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-14 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <div className="w-12 h-[2px] bg-[#1877F2] mb-6"></div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mb-10 max-w-sm">
              We are building a future where every officer is supported, valued, and never faces their struggles alone. Together, we can end police suicide.
            </p>
            <Button className="bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white font-bold px-10 py-7 rounded-full text-xs tracking-widest uppercase transition-all duration-500 hover:shadow-[0_10px_30px_rgba(24,119,242,0.3)] hover:-translate-y-1">
              SUPPORT THE MISSION
            </Button>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links 1 */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Explore
            </h4>
            <ul className="space-y-5 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">About the Mission</Link></li>
              <li><Link href="/the-issue" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">The Issue</Link></li>
              <li><Link href="/stories" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Voices of Courage</Link></li>
              <li><Link href="/news" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">News & Updates</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Action
            </h4>
            <ul className="space-y-5 text-sm font-medium text-slate-400">
              <li><Link href="/take-action" className="hover:text-[#1877F2] hover:translate-x-2 inline-block transition-all duration-300">How to Help</Link></li>
              <li><Link href="/take-action/contact-mp" className="hover:text-[#1877F2] hover:translate-x-2 inline-block transition-all duration-300">Contact Your MP</Link></li>
              <li><Link href="/stories/submit" className="hover:text-[#1877F2] hover:translate-x-2 inline-block transition-all duration-300">Share Your Story</Link></li>
              <li><Link href="/support" className="hover:text-[#1877F2] hover:translate-x-2 inline-block transition-all duration-300">Get Support Now</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Connect
            </h4>
            <div className="flex flex-wrap gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.97H5.078z"></path></g></svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Legal */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} It Stops Now. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
