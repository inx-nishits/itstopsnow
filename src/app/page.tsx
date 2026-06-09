"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-48 lg:pt-40 lg:pb-56 border-b border-white/5">
        
        {/* Full-Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/bannerBg.png" 
            alt="UK Female Police Officer" 
            className="w-full h-full object-cover object-[70%_center] opacity-90 mix-blend-luminosity"
          />
          {/* Dark gradient overlay to blend image into the background and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[30%] via-[#050A14]/40 via-[60%] to-transparent to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 max-w-[800px] pt-20 lg:pt-0">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] mb-6 tracking-tighter uppercase drop-shadow-xl">
              A SYSTEM<br/>IN CRISIS
            </h1>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-white mb-8 leading-tight tracking-tight drop-shadow-md">
              Supporting the Men and<br />Women who Protect Us.
            </h2>

            <p className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-xl drop-shadow">
              We champion the mental health, legal rights, and wellbeing of officers nationwide. Your dedicated ally against the pressures of duty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support">
                <Button className="w-full sm:w-auto bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors">
                  GET SUPPORT NOW
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors backdrop-blur-sm">
                  LEARN OUR IMPACT
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* OVERLAPPING STATS STRIP */}
        <div className="absolute bottom-0 translate-y-1/2 left-0 w-full z-20 px-6 lg:px-16">
          <div className="w-full mx-auto">
            <div className="bg-[#0b1221] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                
                {/* Stat 1 */}
                <div className="flex items-center gap-5 pt-4 md:pt-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1877F2] mb-1">42,850+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OFFICERS SUPPORTED</div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-5 pt-4 md:pt-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">1,215</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COUNSELING SESSIONS<br/>(Monthly)</div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-5 pt-4 md:pt-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1877F2] mb-1">38</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LEGAL VICTORIES</div>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-center gap-5 pt-4 md:pt-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1877F2] mb-1">£14.2M</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FUNDS SECURED</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT STOPS NOW */}
      <section className="bg-[#030712] pt-48 pb-24 border-b border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            <div className="flex flex-col justify-center bg-[#070e1b] rounded-lg p-12 lg:p-16 border border-white/5">
              <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">WHY IT STOPS NOW</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                Every number represents a parent, a child, a partner and a friend left behind. Every story reminds us that officers' lives matter too.
              </p>
              <div>
                <Link href="/the-issue">
                  <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-5 rounded-md text-[10px] tracking-widest uppercase transition-colors">
                    LEARN THE FACTS
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#051024] rounded-lg p-12 lg:p-16 flex flex-col justify-center relative border border-blue-900/30">
              <Quote className="w-16 h-16 text-[#1877F2] opacity-30 absolute top-10 left-10" />
              <div className="relative z-10 pl-8">
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed italic">
                  To protect and serve others, they gave everything. Now, it's our turn to protect them.
                </p>
                <div className="flex justify-end mt-4">
                  <Quote className="w-12 h-12 text-[#1877F2] opacity-30 rotate-180" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="bg-[#030712] py-24 border-b border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 text-white">OUR MISSION</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">A future where every officer is supported, valued, and never faces their struggles alone.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 text-white border border-white/20 rounded-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-white mb-4">RAISE AWARENESS</h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">Start conversations that create change.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 text-white border border-white/20 rounded-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-white mb-4">SUPPORT FAMILIES</h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">Stand beside families in their darkest times.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 text-white border border-white/20 rounded-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-white mb-4">DRIVE CHANGE</h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">Push for systemic change that saves lives.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 text-white border border-white/20 rounded-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-white mb-4">BUILD COMMUNITY</h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">No one in blue stands alone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VOICES OF COURAGE */}
      <section className="bg-[#030712] py-24 border-b border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-white/5 pb-6 gap-6">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">VOICES OF COURAGE</h2>
              <p className="text-slate-400 text-sm">Real stories from real people.</p>
            </div>
            <Link href="/stories">
              <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest rounded-md py-5 px-6">
                VIEW ALL STORIES
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer border border-white/10">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" alt="PC James Holloway" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white font-bold text-sm mb-1">After the Call</h4>
                <p className="text-slate-400 text-xs">PC James Holloway</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer border border-white/10">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="PCSO Sarah Mitchell" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white font-bold text-sm mb-1">Finding Light Again</h4>
                <p className="text-slate-400 text-xs">PCSO Sarah Mitchell</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer border border-white/10">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400" alt="The Thompson Family" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white font-bold text-sm mb-1">A Family's Strength</h4>
                <p className="text-slate-400 text-xs">The Thompson Family</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer border border-white/10">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="DC Michael Roberts" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white font-bold text-sm mb-1">Not Alone</h4>
                <p className="text-slate-400 text-xs">DC Michael Roberts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC QUOTE SECTION */}
      <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden">
        {/* Deep Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#010b19] via-[#050A14] to-[#0a1224]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1877F2]/10 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <Quote className="w-16 h-16 md:w-24 md:h-24 text-[#1877F2] opacity-30 mx-auto mb-10 transform -scale-x-100" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-12 drop-shadow-2xl">
            "We are fighting for the day when the uniform is a symbol of pride, not a target for endless scrutiny."
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1877F2]" />
            <p className="text-[#1877F2] font-bold tracking-[0.2em] text-sm md:text-base uppercase">The It Stops Now Movement</p>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>
        </div>
      </section>

      {/* MISSION PILLARS (Formerly Quote Cards) */}
      <section className="bg-[#010b19] pb-24 border-b border-white/5 relative z-10">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto -mt-12">
            
            {/* Pillar 1 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Systemic Failures</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The current investigative bodies act without accountability, leaving officers suspended in limbo for years for simply doing their duty.</p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Mental Health Toll</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Prolonged investigations are destroying families and lives. We demand a 12-month time limit to prevent further psychological damage.</p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Legal Protection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Officers deserve immediate, robust legal support after critical incidents, untainted by political pressures or media narratives.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER SHOWCASE (3D Flip Cards) */}
      <section className="bg-[#030712] py-24 border-b border-white/5 overflow-hidden">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 text-white">FOUNDING MEMBERS</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">The team behind the movement. Hover or tap to view biographies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="group h-[450px] perspective-[1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" alt="Paul Cooper" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Paul Cooper</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Founder & Ex-Officer</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    Paul served for 15 years as a frontline officer before being subjected to a grueling 3-year IOPC investigation following a high-pressure incident. Although completely cleared of any wrongdoing, the systemic lack of support and the psychological toll inspired him to found It Stops Now. His mission is to ensure no other officer faces the isolation and career-destroying limbo that he endured.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group h-[450px] perspective-[1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" alt="Sarah Jenkins" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Sarah Jenkins</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Legal Director</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    Sarah is a leading human rights and defense attorney who specializes in representing public servants. Over the past decade, she has witnessed the erosion of due process for police officers in the face of public pressure. She leads the legal advocacy arm of It Stops Now, fighting for fair representation and pushing for legislative changes to protect officers' rights.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group h-[450px] perspective-[1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" alt="Michael Davis" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Michael Davis</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Head of Welfare</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD and anxiety induced not just by the job, but by the adversarial nature of misconduct inquiries. He directs our support networks, providing confidential counseling, peer-to-peer support, and urgent crisis intervention for officers pushed to the brink.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAKE A DIFFERENCE TODAY */}
      <section className="bg-[#030712] py-24">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="bg-[#051024] border border-blue-900/30 rounded-lg p-16 md:p-24 relative overflow-hidden flex flex-col justify-center text-center items-center">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-luminosity"></div>
            <div className="relative z-10 w-full max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white">MAKE A DIFFERENCE TODAY</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">Your action today can save a life tomorrow. Demand accountability from the authorities and demand a 12-month limit on investigations.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Link href="/take-action/contact-mp" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-12 py-7 rounded-md text-[10px] tracking-widest uppercase transition-colors shadow-xl shadow-blue-900/20">
                    CONTACT YOUR MP
                  </Button>
                </Link>
                <Link href="/stories/submit" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-black font-bold px-12 py-7 rounded-md text-[10px] tracking-widest uppercase transition-colors backdrop-blur-sm">
                    SHARE YOUR STORY
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
