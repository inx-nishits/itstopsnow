"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Download, Copy, Share2, Target, Users, Megaphone, ArrowRight, CheckCircle2, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CAMPAIGNS = [
  { id: 1, title: "12-Month Time Limit", impact: "15,420 Letters Sent", goal: "Enforce a strict 12-month limit on IOPC investigations." },
  { id: 2, title: "Mandatory Trauma Support", impact: "8,100 Letters Sent", goal: "Guarantee independent psychological care post-incident." },
  { id: 3, title: "Anonymity Until Conviction", impact: "5,840 Letters Sent", goal: "Prevent trial by media for unproven allegations." },
];

const TEMPLATES = [
  { id: 1, title: "Standard MP Letter - Time Limits", category: "Parliament", format: "PDF & DOCX", reads: "12.4k" },
  { id: 2, title: "Family Member Perspective", category: "Personal", format: "PDF & DOCX", reads: "8.1k" },
  { id: 3, title: "Chief Constable Appeal", category: "Leadership", format: "PDF & DOCX", reads: "4.2k" },
  { id: 4, title: "PCC Accountability Request", category: "Parliament", format: "PDF & DOCX", reads: "3.5k" },
];

export default function TakeActionPage() {
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);
  const [personalization, setPersonalization] = useState({ name: "", role: "" });

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO & STATISTICS */}
      <section className="relative w-full min-h-[60vh] pt-40 pb-0 bg-[#050B14] flex flex-col justify-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-[150px] pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920" 
            alt="Parliament" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-10 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-left mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-[#1877F2]" />
              <span className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-xs">Drive The Change</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 uppercase tracking-tight font-sans"
            >
              TAKE <br/><span className="text-[#1877F2]">ACTION.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium"
            >
              Our voice is our strongest weapon. Download templates, contact your representatives, and help us force the system to change.
            </motion.p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="bg-[#020611]/80 backdrop-blur-xl border-t border-white/10 relative z-20 w-full py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex flex-col items-center md:items-start py-4 md:py-0 md:px-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div className="text-4xl font-bold text-white font-sans">32k+</div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-14">Letters Sent</div>
              </div>
              <div className="flex flex-col items-center md:items-start py-4 md:py-0 md:px-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div className="text-4xl font-bold text-white font-sans">412</div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-14">MPs Contacted</div>
              </div>
              <div className="flex flex-col items-center md:items-start py-4 md:py-0 md:px-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Megaphone className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div className="text-4xl font-bold text-white font-sans">3</div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-14">Active Campaigns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECT ACTION CTA */}
      <section className="bg-gradient-to-r from-[#1877F2]/20 to-[#050B14] border-y border-[#1877F2]/30 py-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=600')] bg-cover opacity-10 mask-image-to-r pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(24,119,242,0.4)] border border-white/20">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-2xl uppercase tracking-tight mb-2">CONTACT YOUR MP DIRECTLY</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg">Use our fast 2-minute wizard to find your MP and send a personalized letter demanding a 12-month limit on IOPC investigations.</p>
            </div>
          </div>
          <Link href="/take-action/contact-mp" className="w-full lg:w-auto">
            <Button className="w-full lg:w-auto bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest py-7 px-10 rounded-full shadow-2xl whitespace-nowrap transition-all hover:scale-105 text-xs">
              Start Email Wizard <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. CAMPAIGNS GRID */}
      <section className="py-32 bg-[#020611] border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-16 text-center">ACTIVE CAMPAIGNS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAMPAIGNS.map((campaign) => (
              <div key={campaign.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:border-[#1877F2]/50 transition-all duration-300 group hover:-translate-y-2 shadow-xl flex flex-col">
                <div className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 border border-[#1877F2]/20 px-4 py-2 rounded-full inline-block mb-8 self-start">
                  {campaign.impact}
                </div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4 uppercase tracking-tight group-hover:text-[#1877F2] transition-colors leading-tight">{campaign.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-10 flex-grow text-sm">{campaign.goal}</p>
                <Link href="/take-action/contact-mp" className="text-white font-bold text-[10px] uppercase tracking-widest flex items-center group-hover:text-[#1877F2] transition-colors">
                  Support Campaign <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEMPLATE LIBRARY & PERSONALIZATION */}
      <section className="py-32 bg-[#050B14]">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Resources</h2>
            <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-6">TEMPLATE LIBRARY</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Download expertly drafted letters to send to MPs, Police and Crime Commissioners, or Chief Constables.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar: Filters & Search */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-[#020611] border border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="relative mb-8">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="SEARCH TEMPLATES..." className="w-full pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest bg-[#050B14] border border-white/10 rounded-full focus:outline-none focus:border-[#1877F2]/50 text-white placeholder-slate-600 transition-colors" />
                </div>
                
                <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#1877F2] mb-6 flex items-center"><Filter className="w-4 h-4 mr-3" /> Categories</h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-white rounded-xl uppercase tracking-widest transition-colors">All Templates</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-colors">Parliament (MPs)</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-colors">Leadership (PCCs)</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-colors">Personal / Family</button>
                </div>
              </div>

              {/* Template List */}
              <div className="space-y-4">
                {TEMPLATES.map((template) => (
                  <div 
                    key={template.id} 
                    onClick={() => setActiveTemplate(template)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeTemplate.id === template.id ? 'bg-[#020611] border-[#1877F2]/50 shadow-[0_0_20px_rgba(24,119,242,0.15)] scale-105 relative z-10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{template.category}</div>
                    <h5 className="font-bold text-sm text-white leading-tight uppercase tracking-wide">{template.title}</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Area: Preview & Personalization */}
            <div className="lg:w-2/3 flex flex-col xl:flex-row gap-8">
              
              {/* Preview Area */}
              <div className="flex-grow bg-[#020611] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div className="bg-[#050B14] border-b border-white/10 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#1877F2]" />
                    <span className="font-bold text-xs text-white uppercase tracking-widest">{activeTemplate.title}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-4 text-[10px] bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full font-bold tracking-widest uppercase transition-colors"><Download className="w-3 h-3 mr-2" /> PDF</Button>
                    <Button variant="outline" className="h-10 px-4 text-[10px] bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full font-bold tracking-widest uppercase transition-colors"><Download className="w-3 h-3 mr-2" /> DOCX</Button>
                  </div>
                </div>
                
                <div className="p-10 md:p-12 prose prose-invert prose-slate max-w-none flex-grow bg-[#020611] text-sm leading-loose">
                  <p className="text-slate-400">[Date]</p>
                  <p className="text-white">Dear [MP Name],</p>
                  <p className="text-slate-300">
                    I am writing to you as a constituent residing at <span className="bg-white/10 px-2 py-1 rounded text-[#1877F2] font-mono text-xs">[Your Postcode]</span> regarding a matter of urgent national importance affecting the welfare of our police officers.
                  </p>
                  <p className="text-slate-300">
                    Currently, police officers who are subjected to investigations by the IOPC face average delays of over 4 years. During this time, they are often suspended on restricted duties, isolated from their peers, and treated as guilty until proven innocent. The human cost is devastating, with a direct correlation between investigation delays and severe mental health crises, including suicide.
                  </p>
                  <p className="text-white font-bold border-l-2 border-[#1877F2] pl-4 bg-white/5 py-3 pr-4 rounded-r-lg my-6">
                    As a <span className="bg-[#1877F2]/20 text-[#1877F2] px-2 py-1 rounded text-xs ml-1">{personalization.role || "[Your Connection]"}</span>, I see this devastation firsthand. {personalization.name ? `My name is ${personalization.name} and I am asking you to intervene.` : ""}
                  </p>
                  <p className="text-slate-300">
                    I urge you to support the "It Stops Now" campaign's call for a strict 12-month time limit on all misconduct investigations. After 12 months, if no tribunal or criminal charge is brought, the case must be closed.
                  </p>
                  <p className="text-slate-300">Please confirm that you will raise this issue with the Home Secretary.</p>
                  <p className="text-white mt-8">Yours sincerely,</p>
                  <p className="text-slate-400"><span className="text-white">{personalization.name || "[Your Name]"}</span><br/>[Your Address]</p>
                </div>

                <div className="bg-[#050B14] border-t border-white/10 p-6 flex justify-end gap-4">
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest py-6 px-6 rounded-full transition-colors"><Copy className="w-4 h-4 mr-2" /> Copy text</Button>
                  <Link href="/take-action/contact-mp">
                    <Button className="bg-[#1877F2] text-white hover:bg-blue-600 text-[10px] font-bold uppercase tracking-widest py-6 px-6 rounded-full shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-colors"><Mail className="w-4 h-4 mr-2" /> Send via Wizard</Button>
                  </Link>
                </div>
              </div>

              {/* Personalization Sidebar */}
              <div className="xl:w-80 shrink-0 space-y-6">
                <div className="bg-[#020611] border border-white/10 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-bl-full pointer-events-none" />
                  <h4 className="font-bold text-[10px] text-[#1877F2] uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">Personalize Preview</h4>
                  
                  <div className="space-y-6 relative z-10">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. John Doe" 
                        value={personalization.name}
                        onChange={(e) => setPersonalization({...personalization, name: e.target.value})}
                        className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors placeholder-slate-600" 
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Your Connection</label>
                      <select 
                        value={personalization.role}
                        onChange={(e) => setPersonalization({...personalization, role: e.target.value})}
                        className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors appearance-none"
                      >
                        <option value="">Select an option...</option>
                        <option value="Serving Officer">Serving Officer</option>
                        <option value="Former Officer">Former Officer</option>
                        <option value="Family Member">Family Member</option>
                        <option value="Concerned Citizen">Concerned Citizen</option>
                      </select>
                    </div>
                    <div className="pt-6 border-t border-white/10 mt-8">
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        Customize the preview here to see how your letter will look, or download the DOCX to edit locally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
