"use client";

import Link from "next/link";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

const cardBase =
  "relative overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-[#1877F2]/30 shadow-[0_10px_40px_rgba(24,119,242,0.12)] flex flex-col h-full p-5 sm:p-8 lg:p-10";

export default function Footer() {
  const newsletter = useNewsletterSubscribe();

  return (
    <footer className="relative bg-[#02050A] pt-12 sm:pt-16 md:pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-white font-sans overflow-hidden border-t border-white/5">
      
      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.04] translate-y-[18%]">
        <h1 className="text-[15vw] font-black text-white whitespace-nowrap leading-[0.8] tracking-tighter">
          IT STOPS NOW
        </h1>
      </div>

      <div className="w-full px-4 sm:px-4 sm:px-4 sm:px-6 lg:px-12 mx-auto relative z-10 max-w-[1600px]">

        {/* Pocket Sergeant + Newsletter — side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-20">
          {/* POCKET SERGEANT CTA */}
          <div
            className={cn(
              cardBase,
              "bg-gradient-to-br from-[#050b14] to-[#0a1526] group"
            )}
          >
            <div className="absolute top-0 right-0 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-[#1877F2]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#1877F2]/20 transition-colors duration-700 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-6 sm:w-8 h-[2px] bg-[#1877F2]" />
                <span className="text-[#1877F2] font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                  Empowering Officers
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black uppercase tracking-tight text-white mb-3 sm:mb-4 leading-[1.1]">
                Pocket{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-cyan-400">
                  Sergeant
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed flex-1 mb-5 sm:mb-6 lg:mb-8">
                Equipping our officers with the ultimate digital companion. From quick reference guides to
                essential support resources, Pocket Sergeant is revolutionizing how we serve on the frontline.
              </p>

              <Link href="/about" className="mt-auto w-full sm:w-auto">
                <Button className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold sm:font-black uppercase tracking-wide sm:tracking-[0.12em] text-[11px] sm:text-xs rounded-xl sm:rounded-full px-4 sm:px-8 lg:px-10 py-4 sm:py-6 shadow-[0_0_20px_rgba(24,119,242,0.35)] hover:shadow-[0_0_32px_rgba(24,119,242,0.5)] transition-all duration-300 hover:-translate-y-0.5 whitespace-normal h-auto text-center leading-snug">
                  Learn More About Pocket Sergeant
                </Button>
              </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div
            className={cn(
              cardBase,
              "bg-gradient-to-br from-[#1877F2]/20 to-[#050A14] group"
            )}
          >
            <div className="absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 bg-[#1877F2]/30 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#1877F2]/45 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#1877F2]" aria-hidden />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                    Stay Informed
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2 sm:mt-3">
                    Join our newsletter for campaign updates and urgent calls to action. We never spam.
                  </p>
                </div>
              </div>

              {newsletter.isSubscribed ? (
                <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 flex flex-col items-center text-center py-4" role="status" aria-live="polite">
                  <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-white text-sm font-bold mb-1">You&apos;re subscribed!</p>
                  <p className="text-slate-400 text-xs">Campaign updates will arrive in your inbox.</p>
                </div>
              ) : (
              <form
                className="mt-auto flex flex-col gap-3 sm:gap-3.5 pt-4 sm:pt-5 border-t border-white/10"
                onSubmit={newsletter.subscribe}
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={newsletter.email}
                  onChange={(e) => newsletter.setEmail(e.target.value)}
                  disabled={newsletter.isSubscribing}
                  aria-invalid={newsletter.error ? true : undefined}
                  aria-describedby={newsletter.error ? "footer-newsletter-error" : undefined}
                  placeholder="Enter your email address"
                  className={cn(
                    "w-full min-h-[48px] bg-[#02050A]/80 border rounded-xl px-4 sm:px-5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all",
                    newsletter.error
                      ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
                      : "border-white/10 focus:border-[#1877F2] focus:ring-[#1877F2]/30"
                  )}
                />
                {newsletter.error && (
                  <p id="footer-newsletter-error" className="text-red-400 text-xs" role="alert">{newsletter.error}</p>
                )}
                <Button
                  type="submit"
                  disabled={newsletter.isSubscribing}
                  className="w-full min-h-[48px] sm:min-h-[52px] bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold uppercase tracking-[0.15em] text-xs rounded-xl px-6 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all disabled:opacity-60"
                >
                  {newsletter.isSubscribing ? "Joining…" : "Join Now"}
                </Button>
              </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-16 lg:gap-8 mb-12 md:mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-8">
            <Link href="/" className="mb-8 block">
              <img src="/ISN-Logo.svg" alt="It Stops Now Logo" className="h-14 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <div className="w-12 h-[2px] bg-[#1877F2] mb-6"></div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium mb-10 max-w-sm">
              We are building a future where every officer is supported, valued, and never faces their struggles alone. Together, we can end police suicide.
            </p>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Explore
            </h4>
            <ul className="space-y-5 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-white lg:hover:translate-x-2 inline-block transition-all duration-300">About the Mission</Link></li>
              <li><Link href="/the-issue" className="hover:text-white lg:hover:translate-x-2 inline-block transition-all duration-300">The Issue</Link></li>
              <li><Link href="/events" className="hover:text-white lg:hover:translate-x-2 inline-block transition-all duration-300">Campaign Events</Link></li>
              <li><Link href="/stories" className="hover:text-white lg:hover:translate-x-2 inline-block transition-all duration-300">Voices of Courage</Link></li>
              <li><Link href="/news" className="hover:text-white lg:hover:translate-x-2 inline-block transition-all duration-300">News & Updates</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Action
            </h4>
            <ul className="space-y-5 text-sm font-medium text-slate-400">
              <li><Link href="/take-action" className="hover:text-[#1877F2] lg:hover:translate-x-2 inline-block transition-all duration-300">How to Help</Link></li>
              <li><Link href="/take-action/personalize" className="hover:text-[#1877F2] lg:hover:translate-x-2 inline-block transition-all duration-300">Personalise Your Letter</Link></li>
              <li><Link href="/stories?submit=1" className="hover:text-[#1877F2] lg:hover:translate-x-2 inline-block transition-all duration-300">Share Your Story</Link></li>
              <li><Link href="/support" className="hover:text-[#1877F2] lg:hover:translate-x-2 inline-block transition-all duration-300">Get Support Now</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="font-bold text-white uppercase tracking-[0.2em] text-xs mb-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]"></div> Connect
            </h4>
            <div className="flex justify-center lg:justify-start flex-nowrap gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.97H5.078z"></path></g></svg>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
              </Link>
              <Link href="mailto:campaigns@itstopsnow.org" aria-label="Email" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Mail className="w-5 h-5" aria-hidden />
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Legal */}
        <div className="relative z-10 pt-10 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-5 sm:gap-6 text-xs text-white font-medium">
          <p className="text-slate-300 md:text-white">
            © {new Date().getFullYear()} It Stops Now. All rights reserved.
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3 sm:gap-8">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

