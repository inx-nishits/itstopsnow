"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, ShieldAlert, Lock, AlertCircle, ArrowRight, ArrowLeft, PenTool, User, EyeOff, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StorySubmission() {
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans pb-24">
      
      {/* HEADER */}
      <section className="relative w-full min-h-[50vh] pt-32 pb-32 bg-[#050A14] flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1584859737119-9eb15b9c0378?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover object-center mix-blend-luminosity opacity-20 grayscale" alt="Person in shadow" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>
        
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px]">
            <Link href="/stories" className="inline-flex items-center text-[#1877F2] hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 transition-colors">
              <ArrowLeft className="w-3 h-3 mr-1" /> Back to Stories
            </Link>
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <PenTool className="w-5 h-5" /> SUBMIT YOUR STORY
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl py-2 leading-none">
              SHARE YOUR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">EXPERIENCE.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl drop-shadow">
              Your story is powerful. It breaks the silence, proves the systemic failure, and provides comfort to others suffering in isolation. 
            </p>
          </div>
        </div>
      </section>

      {/* FORM CONTAINER */}
      <section className="w-full px-6 lg:px-16 mx-auto max-w-6xl -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-[#050A14] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Progress Strip */}
          <div className="flex bg-white/5">
            <div className={`h-2 flex-1 ${step >= 1 ? 'bg-[#1877F2]' : 'bg-white/5'}`}></div>
            <div className={`h-2 flex-1 ${step >= 2 ? 'bg-[#1877F2]' : 'bg-white/5'}`}></div>
            <div className={`h-2 flex-1 ${step >= 3 ? 'bg-[#1877F2]' : 'bg-white/5'}`}></div>
          </div>

          <div className="p-8 md:p-12">
            
            {/* Step 1: Your Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="font-sans text-2xl font-bold uppercase tracking-wide">YOUR DETAILS</h2>
                </div>

                <div className="bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-2xl p-6 mb-8 flex gap-4 items-start">
                  <Lock className="w-6 h-6 text-[#1877F2] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-widest">STRICTLY CONFIDENTIAL</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      We take your privacy seriously. If you choose to submit anonymously, your name and email will ONLY be seen by our moderation team for verification and will NEVER be published.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-white/10 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/[0.08]" onClick={() => setIsAnonymous(!isAnonymous)}>
                    <div className="flex items-center gap-3">
                      {isAnonymous ? <EyeOff className="w-5 h-5 text-[#1877F2]" /> : <User className="w-5 h-5 text-slate-400" />}
                      <div>
                        <div className="font-bold text-sm">Submit Anonymously</div>
                        <div className="text-xs text-slate-400">Your name will not be published</div>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isAnonymous ? 'bg-[#1877F2]' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isAnonymous ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <input type="text" placeholder="John Smith" className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1877F2]/50 focus:ring-1 focus:ring-[#1877F2]/50 text-white placeholder-slate-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1877F2]/50 focus:ring-1 focus:ring-[#1877F2]/50 text-white placeholder-slate-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Role / Connection</label>
                    <select className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1877F2]/50 focus:ring-1 focus:ring-[#1877F2]/50 text-slate-300">
                      <option className="bg-[#020611]">Select...</option>
                      <option className="bg-[#020611]">Serving Police Officer</option>
                      <option className="bg-[#020611]">Former Police Officer</option>
                      <option className="bg-[#020611]">Family Member</option>
                      <option className="bg-[#020611]">Colleague / Friend</option>
                      <option className="bg-[#020611]">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button onClick={() => setStep(2)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] py-6 px-8 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                    Continue to Story <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: The Story */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="font-sans text-2xl font-bold uppercase tracking-wide">YOUR STORY</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Story Title</label>
                    <input type="text" placeholder="e.g. My investigation took 3 years..." className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1877F2]/50 focus:ring-1 focus:ring-[#1877F2]/50 text-white placeholder-slate-500" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">The Story</label>
                    <textarea rows={10} placeholder="Tell us what happened. Take your time..." className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1877F2]/50 focus:ring-1 focus:ring-[#1877F2]/50 text-white placeholder-slate-500 resize-y"></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Upload Images/Documents (Optional)</label>
                    <div className="border-2 border-dashed border-white/10 rounded-2xl bg-white/5 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.08] hover:border-[#1877F2]/50 transition-colors relative">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept=".pdf,.jpg,.jpeg,.png" />
                      <UploadCloud className="w-10 h-10 text-[#1877F2] mb-3 pointer-events-none" />
                      <div className="font-bold text-sm text-white mb-1 pointer-events-none">Click to upload or drag and drop</div>
                      <div className="text-xs text-slate-400 pointer-events-none">PDF, JPG, PNG (Max 10MB)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-white/10 text-white bg-white/5 hover:bg-white/10 font-bold uppercase tracking-wider text-[10px] py-6 px-8 rounded-xl transition-colors">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] py-6 px-8 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                    Review & Submit <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Consent & Submit */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="font-sans text-2xl font-bold uppercase tracking-wide">CONSENT & MODERATION</h2>
                </div>

                <div className="bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-2xl p-6 mb-8 flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-[#1877F2] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-widest">MODERATION WORKFLOW</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every submission is reviewed by our moderation team before publishing. We may edit your story slightly for clarity, to remove identifying details of active cases, or to comply with legal restrictions. 
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <label className="flex items-start gap-3 p-4 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/5">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#1877F2] rounded border-white/10 bg-white/5 focus:ring-[#1877F2]/50 focus:ring-offset-0" />
                    <div>
                      <div className="font-bold text-sm text-white">I consent to my story being published</div>
                      <div className="text-xs text-slate-400">I understand it will be shared on the It Stops Now platform.</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/5">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#1877F2] rounded border-white/10 bg-white/5 focus:ring-[#1877F2]/50 focus:ring-offset-0" />
                    <div>
                      <div className="font-bold text-sm text-white">I confirm the details are true</div>
                      <div className="text-xs text-slate-400">To the best of my knowledge, the information provided is accurate.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/5">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#1877F2] rounded border-white/10 bg-white/5 focus:ring-[#1877F2]/50 focus:ring-offset-0" />
                    <div>
                      <div className="font-bold text-sm text-white">Legal Disclaimer</div>
                      <div className="text-xs text-slate-400">I acknowledge that It Stops Now is not providing legal advice and cannot intervene in active investigations.</div>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-8">
                  <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400 hover:text-white font-bold uppercase tracking-wider text-[10px]">
                    Go Back
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 font-bold uppercase tracking-wider text-[10px] py-6 px-6 rounded-xl transition-colors">
                      Save as Draft
                    </Button>
                    <Button onClick={() => setStep(4)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] py-6 px-8 rounded-xl shadow-lg transition-all">
                      Submit Story
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/10">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="font-sans text-3xl font-bold uppercase tracking-tight mb-4">STORY SUBMITTED</h2>
                <p className="text-slate-300 mb-8 max-w-md mx-auto">
                  Thank you for your courage in sharing your experience. Our moderation team will review your submission and be in touch via email within 48 hours.
                </p>
                <Link href="/stories">
                  <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] py-6 px-8 rounded-xl shadow-lg transition-all">
                    Return to Stories
                  </Button>
                </Link>
              </motion.div>
            )}

          </div>
          </div>

          {/* Supportive Quote Banner */}
          <div className="lg:col-span-1 bg-[#050A14] border border-white/10 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-bl-full pointer-events-none group-hover:bg-[#1877F2]/20 transition-colors" />
            <Quote className="w-12 h-12 text-[#1877F2] opacity-30 mb-6" />
            <p className="font-serif italic text-slate-300 leading-relaxed text-sm mb-6">
              "My partner was completely cleared of all charges, but the 3-year wait took a toll we can never repair. Sharing our experience was the first step toward healing."
            </p>
            <div className="border-t border-white/10 pt-4">
              <p className="text-white text-xs font-bold uppercase tracking-wider">Spouse of Officer</p>
              <p className="text-[#1877F2] text-[10px] uppercase tracking-widest">Family Member</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
