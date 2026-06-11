"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, ShieldAlert, Lock, AlertCircle, ArrowRight, ArrowLeft, PenTool, User, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StorySubmission() {
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      
      {/* HEADER */}
      <section className="relative w-full min-h-[50vh] pt-32 pb-32 bg-[#050A14] flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1584859737119-9eb15b9c0378?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40" alt="Person in shadow" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>
        
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px]">
            <Link href="/stories" className="inline-flex items-center text-[#1877F2] hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
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
      <section className="w-full px-6 lg:px-16 mx-auto max-w-4xl -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Progress Strip */}
          <div className="flex">
            <div className={`h-2 flex-1 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
            <div className={`h-2 flex-1 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
            <div className={`h-2 flex-1 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
          </div>

          <div className="p-8 md:p-12">
            
            {/* Step 1: Your Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">YOUR DETAILS</h2>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 flex gap-4 items-start">
                  <Lock className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm mb-1 uppercase tracking-widest">STRICTLY CONFIDENTIAL</h4>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      We take your privacy seriously. If you choose to submit anonymously, your name and email will ONLY be seen by our moderation team for verification and will NEVER be published.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100" onClick={() => setIsAnonymous(!isAnonymous)}>
                    <div className="flex items-center gap-3">
                      {isAnonymous ? <EyeOff className="w-5 h-5 text-blue-600" /> : <User className="w-5 h-5 text-slate-400" />}
                      <div>
                        <div className="font-bold text-sm">Submit Anonymously</div>
                        <div className="text-xs text-slate-500">Your name will not be published</div>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isAnonymous ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isAnonymous ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Full Name</label>
                      <input type="text" placeholder="John Smith" className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Your Role / Connection</label>
                    <select className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option>Select...</option>
                      <option>Serving Police Officer</option>
                      <option>Former Police Officer</option>
                      <option>Family Member</option>
                      <option>Colleague / Friend</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs py-6 px-8">
                    Continue to Story <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: The Story */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">YOUR STORY</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Story Title</label>
                    <input type="text" placeholder="e.g. My investigation took 3 years..." className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700">The Story</label>
                    <textarea rows={10} placeholder="Tell us what happened. Take your time..." className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Upload Images/Documents (Optional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-colors relative">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept=".pdf,.jpg,.jpeg,.png" />
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-3 pointer-events-none" />
                      <div className="font-bold text-sm text-slate-700 mb-1 pointer-events-none">Click to upload or drag and drop</div>
                      <div className="text-xs text-slate-500 pointer-events-none">PDF, JPG, PNG (Max 10MB)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs py-6 px-8">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs py-6 px-8">
                    Review & Submit <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Consent & Submit */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">CONSENT & MODERATION</h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm mb-1 uppercase tracking-widest">MODERATION WORKFLOW</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Every submission is reviewed by our moderation team before publishing. We may edit your story slightly for clarity, to remove identifying details of active cases, or to comply with legal restrictions. 
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900">I consent to my story being published</div>
                      <div className="text-xs text-slate-500">I understand it will be shared on the It Stops Now platform.</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900">I confirm the details are true</div>
                      <div className="text-xs text-slate-500">To the best of my knowledge, the information provided is accurate.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900">Legal Disclaimer</div>
                      <div className="text-xs text-slate-500">I acknowledge that It Stops Now is not providing legal advice and cannot intervene in active investigations.</div>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-8">
                  <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                    Go Back
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs py-6 px-6">
                      Save as Draft
                    </Button>
                    <Button onClick={() => setStep(4)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs py-6 px-8 shadow-lg">
                      Submit Story
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-4">STORY SUBMITTED</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Thank you for your courage in sharing your experience. Our moderation team will review your submission and be in touch via email within 48 hours.
                </p>
                <Link href="/stories">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs py-6 px-8">
                    Return to Stories
                  </Button>
                </Link>
              </motion.div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
