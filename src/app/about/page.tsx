"use client";

import { motion } from "framer-motion";
import { Shield, ShieldAlert, Heart, Activity, ArrowRight, ExternalLink, Headphones, Download, Smartphone, CheckCircle, BarChart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-40 pb-32 bg-[#050B14] flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1877F2]/10 rounded-full blur-[120px] pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920" 
            alt="Police officer background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-10 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5" /> OUR SUPPORTER
            </h3>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 uppercase tracking-tight font-sans"
            >
              DRIVEN BY THOSE<br/>
              WHO <span className="text-[#1877F2]">KNOW THE JOB.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              It Stops Now is proudly funded and supported by Pocket Sergeant – the essential app created by police, for police. We believe that officer wellbeing and reform are not optional; they are critical.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. WHO IS POCKET SERGEANT */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">WHO IS POCKET SERGEANT?</h2>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                Pocket Sergeant is the UK's leading app for police officers and staff. Created by former police officer Paul Cooper, it was built to solve a simple problem: officers needed quick, reliable access to the law, operational guidance, and wellbeing resources while out on the street.
              </p>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                Today, it is used by thousands of officers every single day. But our mission goes beyond making the job easier. We want to make the job safer—mentally and emotionally. That's why we are funding the 'It Stops Now' campaign.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-8 mt-10 border-t border-white/10 pt-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                    <Users className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">TRUSTED BY</h4>
                    <p className="text-2xl font-bold text-[#1877F2] font-sans">50,000+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Active Officers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldAlert className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">CREATED BY</h4>
                    <p className="text-xl font-bold text-slate-200 mt-1 uppercase tracking-wide">Former Police</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">We lived the job.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3. APP SHOWCASE / SCREENSHOTS */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#1877F2]/10 rounded-[3rem] transform rotate-3 blur-2xl"></div>
              <div className="bg-[#050B14] rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative z-10 overflow-hidden flex flex-col items-center">
                <Smartphone className="w-12 h-12 text-[#1877F2] mb-6" />
                <h3 className="text-white font-sans font-bold text-2xl uppercase tracking-widest mb-3">THE ESSENTIAL APP</h3>
                <p className="text-slate-400 text-sm text-center mb-12 max-w-sm leading-relaxed">Law, procedures, and wellbeing support right in your pocket.</p>
                
                <div className="flex gap-4 w-full overflow-hidden justify-center items-end relative h-[300px]">
                  <div className="absolute w-32 h-64 bg-slate-900 rounded-2xl border-4 border-[#050B14] overflow-hidden shadow-2xl transform -rotate-12 -translate-x-20 translate-y-8 z-0">
                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover grayscale opacity-50" alt="App screenshot" />
                  </div>
                  <div className="absolute w-44 h-[340px] bg-slate-900 rounded-2xl border-4 border-[#1877F2]/50 overflow-hidden shadow-[0_0_50px_rgba(24,119,242,0.2)] z-10 -translate-y-4">
                    <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover opacity-90" alt="App screenshot main" />
                  </div>
                  <div className="absolute w-32 h-64 bg-slate-900 rounded-2xl border-4 border-[#050B14] overflow-hidden shadow-2xl transform rotate-12 translate-x-20 translate-y-8 z-0">
                    <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover grayscale opacity-50" alt="App screenshot" />
                  </div>
                </div>
                
                {/* Store Downloads */}
                <div className="flex flex-wrap justify-center gap-4 mt-16 w-full border-t border-white/10 pt-8">
                  <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5 text-[#1877F2]" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Download on the</div>
                      <div className="text-sm font-bold leading-none mt-1 tracking-wide">App Store</div>
                    </div>
                  </button>
                  <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5 text-[#1877F2]" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Get it on</div>
                      <div className="text-sm font-bold leading-none mt-1 tracking-wide">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY SUPPORTING THIS MOVEMENT */}
      <section className="py-32 bg-[#050B14] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Our Commitment</h2>
            <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">WHY WE SUPPORT THIS MOVEMENT</h2>
            <p className="text-slate-400 text-lg leading-relaxed">We see the reality of policing every day through our user base. We couldn't stand by and watch the system break our colleagues.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-[#1877F2]/50 transition-colors shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/5 rounded-bl-[100px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <Activity className="w-10 h-10 text-[#1877F2] mb-8 relative z-10" />
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 relative z-10">THE DATA IS CLEAR</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">Our internal wellbeing surveys showed a devastating trend of burnout, trauma, and lack of support from professional standards departments.</p>
            </div>
            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-[#1877F2]/50 transition-colors shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/5 rounded-bl-[100px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <Users className="w-10 h-10 text-[#1877F2] mb-8 relative z-10" />
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 relative z-10">WE LOST FRIENDS</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">Like many in the police family, our founding team has personally lost colleagues to suicide while under protracted investigation.</p>
            </div>
            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-[#1877F2]/50 transition-colors shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/5 rounded-bl-[100px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <Shield className="w-10 h-10 text-[#1877F2] mb-8 relative z-10" />
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 relative z-10">MORAL OBLIGATION</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">If you have the platform to demand change, you have the obligation to use it. We are using our voice to protect yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FUNDING TRANSPARENCY */}
      <section className="py-32 bg-[#020611] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
          <div className="bg-gradient-to-br from-[#050B14] to-[#020611] border border-white/10 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row gap-16 items-center relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1877F2]" />
            <div className="md:w-2/3 relative z-10">
              <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white mb-6">FUNDING & TRANSPARENCY</h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                'It Stops Now' is fully funded by Pocket Sergeant Ltd. We do not accept government funding, police federation grants, or corporate sponsorships that could compromise our independence. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-sm text-slate-300 font-medium tracking-wide">
                  <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0" /> 100% Independent & Unbiased
                </li>
                <li className="flex items-center gap-4 text-sm text-slate-300 font-medium tracking-wide">
                  <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0" /> No political or union affiliations
                </li>
                <li className="flex items-center gap-4 text-sm text-slate-300 font-medium tracking-wide">
                  <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0" /> All campaign costs covered by Pocket Sergeant profits
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center relative z-10">
              <div className="w-48 h-48 bg-[#050B14] rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(24,119,242,0.1)] relative">
                <div className="absolute inset-2 border-2 border-dashed border-[#1877F2]/30 rounded-full" />
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#1877F2] font-sans mb-2">100%</div>
                  <div className="text-[10px] font-bold uppercase text-white tracking-[0.3em]">Independent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PODCAST SECTION */}
      <section className="py-32 bg-[#050B14] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#1877F2]/20 rounded-full blur-[100px] pointer-events-none"></div>
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast recording" className="w-full h-auto rounded-3xl relative z-10 border border-white/10 shadow-2xl grayscale mix-blend-luminosity opacity-80" />
              <div className="absolute bottom-8 right-8 bg-[#1877F2] w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(24,119,242,0.5)] z-20 hover:scale-110 transition-transform cursor-pointer border-4 border-[#050B14]">
                <Headphones className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="lg:w-1/2 text-white relative z-10">
              <div className="text-[#1877F2] text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <Headphones className="w-4 h-4" /> OFFICIAL PODCAST
              </div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">THE POCKET SERGEANT PODCAST</h2>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                Join Paul Cooper and special guests as they discuss the real issues facing modern policing. From navigating the complexities of misconduct investigations to sharing survival strategies for mental health, we pull no punches.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-[#020611] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] tracking-widest text-[#1877F2] font-bold mb-2 uppercase">EPISODE 42</div>
                    <h4 className="font-bold text-base tracking-wide">When the system turns against you</h4>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">45 Min</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-[#020611] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] tracking-widest text-[#1877F2] font-bold mb-2 uppercase">EPISODE 41</div>
                    <h4 className="font-bold text-base tracking-wide">Surviving the IOPC: A former officer's story</h4>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">52 Min</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                  Listen on Spotify
                </Button>
                <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                  Apple Podcasts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEARN MORE / CTA */}
      <section className="py-32 bg-gradient-to-b from-[#020611] to-[#050B14] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-[800px] relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Join The Fight</h2>
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8 text-white">STAND WITH US</h2>
          <p className="text-slate-400 mb-12 text-xl leading-relaxed">Whether you are an officer, a family member, or a concerned citizen, your voice is needed to drive reform.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/take-action">
              <Button className="bg-[#1877F2] text-white hover:bg-blue-600 font-bold uppercase tracking-widest text-xs px-12 py-7 rounded-full shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all hover:scale-105">
                Take Action Today
              </Button>
            </Link>
            <Link href="https://pocketsergeant.co.uk" target="_blank">
              <Button variant="outline" className="border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs px-12 py-7 rounded-full transition-all">
                Visit Pocket Sergeant <ExternalLink className="w-4 h-4 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
