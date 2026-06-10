"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FileText, Download, Copy, Share2, Target, Users, Megaphone, ArrowRight, Mail, ChevronRight, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CAMPAIGNS = [
  { id: 1, title: "12-Month Time Limit", impact: "15,420 Letters Sent", goal: "Enforce a strict 12-month limit on IOPC investigations. After 12 months, if no tribunal or criminal charge is brought, the case must be closed." },
  { id: 2, title: "Mandatory Trauma Support", impact: "8,100 Letters Sent", goal: "Guarantee independent psychological care post-incident for all officers involved in fatal or serious incidents." },
  { id: 3, title: "Anonymity Until Conviction", impact: "5,840 Letters Sent", goal: "Prevent trial by media for unproven allegations and protect the identities of officers during preliminary investigations." },
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
    <div className="flex flex-col min-h-screen bg-[#030712] text-white font-sans">
      
      {/* 1. HERO SECTION - Matching Home Page */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-48 lg:pt-40 lg:pb-56 border-b border-white/5">
        
        {/* Full-Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/bannerBg.png" 
            alt="UK Police" 
            className="w-full h-full object-cover object-[70%_center] opacity-90 mix-blend-luminosity"
          />
          {/* Dark gradient overlay to blend image into the background and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[30%] via-[#050A14]/40 via-[60%] to-transparent to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12 max-w-[1600px]">
          
          {/* Left Content */}
          <div className="w-full lg:w-full max-w-[1200px] pt-20 lg:pt-0">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Megaphone className="w-5 h-5" /> DRIVE THE CHANGE
            </h3>

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2">
              <span className="text-white">TAKE </span><br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 pr-2 lg:pr-4">ACTION.</span>
            </h1>
            
            <p className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-3xl drop-shadow">
              Our voice is our strongest weapon. Download templates, contact your representatives, and help us force the system to change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/take-action/contact-mp">
                <Button className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors">
                  CONTACT YOUR MP
                </Button>
              </Link>
              <Button className="border border-white w-full sm:w-auto bg-transparent text-white hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors backdrop-blur-sm" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>
                DOWNLOAD TEMPLATES
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS SECTION - Matching Home Page Brutalist Grid */}
      <section className="relative z-20 bg-[#02050A] border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x lg:divide-x divide-white/10">
          
          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              LETTERS SENT
            </div>
            <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1877F2] transition-all duration-500">
              32,450+
            </div>
          </div>

          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              MPS CONTACTED
            </div>
            <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1877F2] transition-all duration-500">
              412
            </div>
          </div>

          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              ACTIVE CAMPAIGNS
            </div>
            <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1877F2] transition-all duration-500">
              3
            </div>
          </div>

        </div>
      </section>

      {/* 3. DIRECT ACTION CTA - Matching "Why It Stops Now" Context style */}
      <section className="relative bg-[#02050A] py-32 lg:py-48 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Direct Action</h2>
              </div>
              <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
                CONTACT YOUR <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">REPRESENTATIVES.</span>
              </h3>
              <p className="text-slate-400 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-medium">
                Use our fast 2-minute wizard to find your MP and send a personalized letter demanding a 12-month limit on IOPC investigations. Don't let silence be an option.
              </p>
              <div>
                <Link href="/take-action/contact-mp">
                  <Button className="border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold px-10 py-7 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                    START EMAIL WIZARD
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative p-10 md:p-16 lg:p-20 border border-white/10 bg-[#0a1120]/50 backdrop-blur-2xl rounded-[3rem] group hover:bg-[#0a1120]/80 transition-colors duration-700 shadow-2xl">
              <Mail className="w-24 h-24 text-[#1877F2]/10 absolute top-8 left-8 group-hover:scale-110 group-hover:text-[#1877F2]/30 transition-all duration-700" />
              <div className="relative z-10">
                <p className="text-3xl md:text-5xl text-white font-medium leading-[1.2] tracking-tight mb-10">
                  "One voice can be ignored. <span className="text-[#1877F2]">Thousands cannot.</span> Demand change today."
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[2px] bg-white/20 group-hover:bg-[#1877F2]/50 transition-colors duration-700"></div>
                  <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">The Power of Action</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CAMPAIGNS GRID - Matching "Our Mission" Pillar style */}
      <section className="relative bg-[#02050A] py-32 border-b border-white/10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Targeted Action</h2>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                ACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">CAMPAIGNS.</span>
              </h3>
            </div>
            <p className="text-slate-400 text-lg max-w-lg font-medium leading-relaxed">
              Focus your efforts where they matter most. Join our active campaigns to force legislative and procedural change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAMPAIGNS.map((campaign, idx) => (
              <div key={campaign.id} className="group relative p-10 lg:p-14 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2 flex flex-col h-full min-h-[400px]">
                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.03] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">{idx + 1}</div>
                
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-10 self-start flex items-center gap-3 group-hover:text-white/80 transition-colors duration-500">
                    <div className="w-1.5 h-1.5 bg-[#1877F2] group-hover:bg-white rounded-full shadow-[0_0_10px_#1877F2] group-hover:shadow-none transition-colors duration-500" /> {campaign.impact}
                  </div>
                  
                  <h3 className="font-black text-3xl lg:text-4xl text-white mb-6 uppercase tracking-tighter leading-none group-hover:text-white transition-colors duration-500">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-slate-500 text-lg font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500 mb-12 flex-grow">
                    {campaign.goal}
                  </p>
                  
                  <Link href="/take-action/contact-mp" className="mt-auto self-start text-white font-bold text-[10px] uppercase tracking-widest flex items-center group-hover:text-white transition-colors">
                    SUPPORT CAMPAIGN <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TEMPLATE LIBRARY & PERSONALIZATION - Premium Redesign */}
      <section id="templates" className="relative bg-[#050A14] py-32 border-b border-white/10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Resources</h2>
              </div>
              <h3 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[1.1]">
                TEMPLATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">LIBRARY.</span>
              </h3>
            </div>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl pb-4 border-l-2 border-white/10 pl-6 font-medium">
              Download expertly drafted letters to send to MPs, Police and Crime Commissioners, or Chief Constables.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar: Filters & Search */}
            <div className="lg:w-1/3 flex flex-col gap-8">
              
              <div className="bg-[#02050A] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <div className="relative mb-8">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="SEARCH TEMPLATES..." className="w-full pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest bg-white/[0.02] border border-white/10 rounded-xl focus:outline-none focus:border-[#1877F2]/50 text-white placeholder-slate-600 transition-colors" />
                </div>
                
                <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center">
                  <Filter className="w-3 h-3 mr-3" /> Categories
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold bg-[#1877F2] text-white rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">All Templates</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-all">Parliament (MPs)</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-all">Leadership (PCCs)</button>
                  <button className="w-full text-left px-5 py-4 text-[11px] font-bold text-slate-400 bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white rounded-xl uppercase tracking-widest transition-all">Personal / Family</button>
                </div>
              </div>

              {/* Template List */}
              <div className="space-y-4">
                {TEMPLATES.map((template) => (
                  <div 
                    key={template.id} 
                    onClick={() => setActiveTemplate(template)}
                    className={`p-6 rounded-[1.5rem] cursor-pointer transition-all border ${activeTemplate.id === template.id ? 'bg-[#02050A] border-[#1877F2]/50 scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                  >
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${activeTemplate.id === template.id ? 'bg-[#1877F2]' : 'bg-slate-600'}`} />
                      {template.category}
                    </div>
                    <h5 className="font-bold text-sm text-white leading-tight uppercase tracking-wide">{template.title}</h5>
                  </div>
                ))}
              </div>

            </div>

            {/* Main Area: Preview & Personalization */}
            <div className="lg:w-2/3 flex flex-col xl:flex-row gap-8">
              
              {/* Preview Area */}
              <div className="flex-grow bg-[#02050A] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                
                <div className="bg-white/[0.02] border-b border-white/10 p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#1877F2]" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] block mb-1">Document Preview</span>
                      <span className="font-bold text-sm text-white uppercase tracking-widest">{activeTemplate.title}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 text-[10px] bg-transparent border-white/20 text-white hover:bg-white hover:text-black rounded-full font-bold tracking-widest uppercase transition-colors"><Download className="w-4 h-4 mr-2" /> PDF</Button>
                    <Button variant="outline" className="h-12 px-6 text-[10px] bg-transparent border-white/20 text-white hover:bg-white hover:text-black rounded-full font-bold tracking-widest uppercase transition-colors"><Download className="w-4 h-4 mr-2" /> DOCX</Button>
                  </div>
                </div>
                
                <div className="p-10 md:p-14 flex-grow bg-[#02050A] text-[15px] leading-loose text-slate-300 font-medium">
                  <p className="text-slate-500 mb-8 font-mono text-sm">[Date]</p>
                  <p className="text-white mb-6">Dear [MP Name],</p>
                  <p className="mb-6">
                    I am writing to you as a constituent residing at <span className="inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 px-3 py-1 rounded-md text-[#1877F2] font-mono text-sm mx-1 shadow-inner">[Your Postcode]</span> regarding a matter of urgent national importance affecting the welfare of our police officers.
                  </p>
                  <p className="mb-8">
                    Currently, police officers who are subjected to investigations by the IOPC face average delays of over 4 years. During this time, they are often suspended on restricted duties, isolated from their peers, and treated as guilty until proven innocent. The human cost is devastating, with a direct correlation between investigation delays and severe mental health crises, including suicide.
                  </p>
                  
                  <div className="border-l-4 border-[#1877F2] pl-6 bg-gradient-to-r from-[#1877F2]/10 to-transparent py-6 pr-6 rounded-r-2xl my-8">
                    <p className="text-white font-bold mb-0">
                      As a <span className="inline-block bg-[#1877F2] text-white px-3 py-1 rounded-md text-xs mx-1 uppercase tracking-wider">{personalization.role || "[Your Connection]"}</span>, I see this devastation firsthand. {personalization.name ? `My name is ${personalization.name} and I am asking you to intervene.` : ""}
                    </p>
                  </div>

                  <p className="mb-6">
                    I urge you to support the "It Stops Now" campaign's call for a strict 12-month time limit on all misconduct investigations. After 12 months, if no tribunal or criminal charge is brought, the case must be closed.
                  </p>
                  <p className="mb-12">Please confirm that you will raise this issue with the Home Secretary.</p>
                  <p className="text-white mb-2">Yours sincerely,</p>
                  <p className="text-slate-500 font-mono text-sm"><span className="text-[#1877F2] font-sans text-base font-bold">{personalization.name || "[Your Name]"}</span><br/>[Your Address]</p>
                </div>

                <div className="bg-white/[0.02] border-t border-white/10 p-8 flex flex-col sm:flex-row justify-end gap-4">
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black text-[10px] font-bold uppercase tracking-widest py-7 px-8 rounded-full transition-colors"><Copy className="w-4 h-4 mr-2" /> Copy text</Button>
                  <Link href="/take-action/contact-mp" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-blue-600 text-[10px] font-bold uppercase tracking-widest py-7 px-8 rounded-full shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-colors"><Mail className="w-4 h-4 mr-2" /> Send via Wizard</Button>
                  </Link>
                </div>
              </div>

              {/* Personalization Sidebar */}
              <div className="xl:w-80 shrink-0">
                <div className="bg-[#02050A] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden h-full">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                    <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                      <Filter className="w-4 h-4 text-[#1877F2]" />
                    </div>
                    <h4 className="font-bold text-[10px] text-white uppercase tracking-[0.2em]">Personalize</h4>
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. John Doe" 
                        value={personalization.name}
                        onChange={(e) => setPersonalization({...personalization, name: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-600 shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Your Connection</label>
                      <select 
                        value={personalization.role}
                        onChange={(e) => setPersonalization({...personalization, role: e.target.value})}
                        className="w-full bg-[#050A14] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors appearance-none shadow-inner"
                      >
                        <option value="">Select an option...</option>
                        <option value="Serving Officer">Serving Officer</option>
                        <option value="Former Officer">Former Officer</option>
                        <option value="Family Member">Family Member</option>
                        <option value="Concerned Citizen">Concerned Citizen</option>
                      </select>
                    </div>
                    <div className="pt-8 border-t border-white/10 mt-12">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5" />
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
        </div>
      </section>

    </div>
  );
}
