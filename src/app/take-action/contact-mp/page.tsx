"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, CheckCircle2, ChevronRight, ChevronLeft, Send, AlertCircle, Edit3, Eye, User, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import posthog from 'posthog-js';
import { generatePDF, generateDOCX } from "@/lib/documentGenerator";

export default function ContactMpWizard() {
  const [step, setStep] = useState(1);
  const [postcode, setPostcode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  
  // Real Data State
  const [mpDetails, setMpDetails] = useState({ name: "", constituency: "", party: "", email: "", image: "" });
  const [selectedCampaign, setSelectedCampaign] = useState("12-Month Limit");
  const [letterContent, setLetterContent] = useState("");
  const [senderDetails, setSenderDetails] = useState({ name: "", email: "", address: "" });
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);

  useEffect(() => {
    // Initialize PostHog (Replace with real project key in production env)
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_placeholder_key', { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com' });
    }
  }, []);

  const replaceTemplateVariables = (template: string) => {
    return template
      .replace(/\{\{MP_NAME\}\}/g, mpDetails.name || "[MP Name]")
      .replace(/\{\{USER_POSTCODE\}\}/g, postcode.toUpperCase())
      .replace(/\{\{CAMPAIGN_NAME\}\}/g, selectedCampaign);
  };

  // Step 1: Handle Postcode Search (Real API)
  const handlePostcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanPostcode = postcode.trim();
    if (!cleanPostcode || cleanPostcode.length < 5) {
      setError("Please enter a valid UK postcode.");
      return;
    }
    
    setIsSearching(true);
    posthog.capture('Letter Started', { postcode: cleanPostcode });
    
    try {
      const response = await fetch(`/api/mp-lookup?postcode=${encodeURIComponent(cleanPostcode)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to find MP');
      }

      setMpDetails({
        name: data.name,
        constituency: data.constituency,
        party: data.party,
        email: data.email,
        image: data.image
      });
      setStep(2);
    } catch (err: any) {
      setError(err.message || "We couldn't find an MP for that postcode. Please check it and try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Step 2: Confirm MP
  const handleConfirmMp = () => setStep(3);

  // Step 3: Choose Template
  const handleChooseTemplate = (campaign: string) => {
    setSelectedCampaign(campaign);
    // In a real app, this would fetch the template from Sanity CMS based on the campaign selection
    const rawTemplate = `I am writing to you as a constituent residing at {{USER_POSTCODE}} regarding the urgent need to enforce a 12-month time limit on police misconduct investigations.

The current system is failing. Officers are spending an average of 4 years under investigation, suspended and isolated. This is directly contributing to severe mental health crises and tragically, suicides within our forces.

I urge you to support the "It Stops Now" campaign and raise this with the Home Secretary.`;

    setLetterContent(replaceTemplateVariables(rawTemplate));
    setStep(4);
  };

  // Step 4: Preview
  const handlePreviewNext = () => setStep(5);

  // Step 5: Edit & Sender Details (Real API)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!senderDetails.name || !senderDetails.email || !senderDetails.address) {
      setError("Please complete all personal details so your MP can verify you as a constituent.");
      return;
    }
    
    setIsSending(true);
    posthog.capture('Letter Completed', { campaign: selectedCampaign });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mpName: mpDetails.name,
          mpEmail: mpDetails.email,
          constituency: mpDetails.constituency,
          senderName: senderDetails.name,
          senderEmail: senderDetails.email,
          senderAddress: senderDetails.address,
          letterContent: letterContent,
          campaignId: "campaign_12_month_limit", // Example hardcoded ref, would be dynamic
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      posthog.capture('Letter Sent', { campaign: selectedCampaign, mp: mpDetails.name });
      setStep(6);
    } catch (err: any) {
      setError(err.message || "Something went wrong while sending. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingDoc(true);
    try {
      const blob = await generatePDF({
        content: letterContent,
        mpName: mpDetails.name || "[MP Name]",
        senderName: senderDetails.name || "[Your Name]",
        senderAddress: senderDetails.address || "[Your Address]"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Letter_to_${mpDetails.name.replace(/\s+/g, '_')}.pdf`;
      a.click();
      posthog.capture('PDF Downloaded', { campaign: selectedCampaign });
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  const handleDownloadDOCX = async () => {
    setIsGeneratingDoc(true);
    try {
      const blob = await generateDOCX({
        content: letterContent,
        mpName: mpDetails.name || "[MP Name]",
        senderName: senderDetails.name || "[Your Name]",
        senderAddress: senderDetails.address || "[Your Address]"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Letter_to_${mpDetails.name.replace(/\s+/g, '_')}.docx`;
      a.click();
      posthog.capture('DOCX Downloaded', { campaign: selectedCampaign });
    } catch (err) {
      console.error("DOCX generation failed", err);
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* HEADER */}
      <section className="relative w-full pt-32 pb-24 bg-[#010B19] flex flex-col justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover mix-blend-luminosity opacity-20" alt="Parliament" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[800px] text-center">
          <Link href="/take-action" className="inline-flex items-center text-blue-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ChevronLeft className="w-3 h-3 mr-1" /> Back to Action Center
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight font-heading leading-[1.05]">
            CONTACT YOUR <span className="text-blue-500">MP.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            It takes 2 minutes to make your voice heard in Parliament. Follow the steps below to find your representative and send a targeted message.
          </p>
        </div>
      </section>

      {/* FORM WIZARD CONTAINER */}
      <section className="container mx-auto px-4 md:px-8 max-w-[800px] -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          <div className="flex h-2 bg-slate-100">
            <div className="bg-blue-600 transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }}></div>
          </div>

          <div className="p-8 md:p-12 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: POSTCODE */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">FIND YOUR MP</h2>
                  </div>

                  <form onSubmit={handlePostcodeSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-700">Enter Your Postcode</label>
                      <div className="relative">
                        <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="e.g. SW1A 0AA" 
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-md pl-12 pr-4 py-4 text-lg font-bold uppercase tracking-wider focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                          disabled={isSearching}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm flex items-center gap-2 border border-red-100">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                      </div>
                    )}

                    <div className="pt-4">
                      <Button type="submit" disabled={isSearching} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-sm py-6">
                        {isSearching ? "Searching Directory..." : "Find My Representative"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: CONFIRM MP */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">CONFIRM REPRESENTATIVE</h2>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center mb-8">
                    {mpDetails.image ? (
                      <img src={mpDetails.image} alt={mpDetails.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-sm border-2 border-white" />
                    ) : (
                      <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white">
                        <User className="w-10 h-10 text-slate-400" />
                      </div>
                    )}
                    <h3 className="font-heading text-2xl font-bold uppercase text-slate-900 mb-1">{mpDetails.name}</h3>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">{mpDetails.constituency} • {mpDetails.party}</p>
                    <div className="inline-flex items-center justify-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Ready to Receive
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)} className="border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs px-6">
                      Wrong MP?
                    </Button>
                    <Button onClick={handleConfirmMp} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs px-8 py-6">
                      Yes, Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CHOOSE TEMPLATE */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">CHOOSE CAMPAIGN</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div onClick={() => handleChooseTemplate("12-Month Limit")} className="p-6 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                      <h4 className="font-bold text-lg text-slate-900 uppercase tracking-tight mb-2 group-hover:text-blue-600">Enforce a 12-Month Time Limit</h4>
                      <p className="text-sm text-slate-600">The standard campaign letter demanding an end to multi-year investigations.</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs px-6">
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PREVIEW */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">4</div>
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">PREVIEW LETTER</h2>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-8">
                    <div className="bg-slate-100 border-b border-slate-200 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-slate-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Read-only Preview</span>
                      </div>
                      <div className="flex gap-2">
                         <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={handleDownloadPDF} disabled={isGeneratingDoc}>
                           <Download className="w-3 h-3 mr-1" /> PDF
                         </Button>
                         <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={handleDownloadDOCX} disabled={isGeneratingDoc}>
                           <Download className="w-3 h-3 mr-1" /> DOCX
                         </Button>
                      </div>
                    </div>
                    <div className="p-6 prose prose-sm prose-slate max-w-none whitespace-pre-wrap">
                      Dear {mpDetails.name},<br/><br/>
                      {letterContent}<br/><br/>
                      Yours sincerely,<br/>
                      [Your Name]<br/>
                      [Your Address]
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(3)} className="border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs px-6">
                      Change Template
                    </Button>
                    <Button onClick={handlePreviewNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs px-8 py-6">
                      Personalize & Send <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: EDIT & SENDER DETAILS */}
              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">5</div>
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">FINALIZE & SEND</h2>
                  </div>

                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Full Name</label>
                        <input type="text" required value={senderDetails.name} onChange={e => setSenderDetails({...senderDetails, name: e.target.value})} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Email Address</label>
                        <input type="email" required value={senderDetails.email} onChange={e => setSenderDetails({...senderDetails, email: e.target.value})} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Full Postal Address</label>
                      <input type="text" required value={senderDetails.address} onChange={e => setSenderDetails({...senderDetails, address: e.target.value})} placeholder={`Including ${postcode.toUpperCase()}`} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-700 flex items-center"><Edit3 className="w-3 h-3 mr-1" /> Edit Letter Content</label>
                      <textarea 
                        rows={8} 
                        value={letterContent}
                        onChange={e => setLetterContent(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-y"
                      ></textarea>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">{error}</div>}

                    <div className="flex justify-between pt-6 border-t border-slate-200 mt-8">
                      <Button type="button" variant="ghost" onClick={() => setStep(4)} disabled={isSending} className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                        Back
                      </Button>
                      <Button type="submit" disabled={isSending} className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs px-8 py-6 shadow-xl">
                        {isSending ? "Sending..." : <span className="flex items-center">Send to {mpDetails.name} <Send className="w-4 h-4 ml-2" /></span>}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 6: SUCCESS */}
              {step === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-4">EMAIL SENT SUCCESSFULLY</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Your letter has been securely routed to <strong>{mpDetails.name}</strong> at the House of Commons. A copy has been sent to your email address for your records.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/take-action">
                      <Button variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-xs py-6 px-8">
                        Return to Campaigns
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}
