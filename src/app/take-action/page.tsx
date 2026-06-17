"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Download, Target, Users, Megaphone, ArrowRight, ArrowLeft, BookOpen, Clock, Settings, SearchX, Shield, AlertTriangle, Heart, X, RotateCcw, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const BENEFITS = [
  {
    id: 1,
    title: "Direct Systemic Impact",
    description: "Your letters force MPs and Police Commissioners to acknowledge the realities of officer welfare and accountability.",
    value: 32450,
    icon: Target
  },
  {
    id: 2,
    title: "Growing Momentum",
    description: "Every action joins thousands of others, creating undeniable pressure on the IOPC for reform.",
    value: 412,
    icon: Users
  },
  {
    id: 3,
    title: "Active Legislative Change",
    description: "Focused campaigns are currently pushing for mandatory 12-month investigation limits in Parliament.",
    value: 3,
    icon: Shield
  }
];

const CAMPAIGNS = [
  { 
    id: 1, 
    title: "12-Month Time Limit", 
    description: "Enforce a strict 12-month limit on IOPC investigations. After 12 months, if no tribunal or criminal charge is brought, the case must be closed.",
    icon: AlertTriangle,
    templatesAvailable: 4,
    bgImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: 2, 
    title: "Mandatory Trauma Support", 
    description: "Guarantee independent psychological care post-incident for all officers involved in fatal or serious incidents.",
    icon: Heart,
    templatesAvailable: 2,
    bgImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: 3, 
    title: "Anonymity Until Conviction", 
    description: "Prevent trial by media for unproven allegations and protect the identities of officers during preliminary investigations.",
    icon: Shield,
    templatesAvailable: 3,
    bgImage: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?q=80&w=800&auto=format&fit=crop"
  },
];

const TEMPLATES = [
  { 
    id: 1, 
    title: "Demand 12-Month Limit on Investigations", 
    recipient: "Member of Parliament (MP)", 
    tone: "Formal", 
    readTime: "3 Min Read",
    content: "Dear [MP Name],\n\nI am writing to you today to urgently request your support for implementing a strict 12-month time limit on Independent Office for Police Conduct (IOPC) investigations.\n\nCurrently, police officers are subjected to investigations that can drag on for years without resolution. This causes severe, often irreversible damage to their mental health, their careers, and their families. It is fundamentally unjust to keep public servants in a state of suspended animation when no evidence of wrongdoing has been found after a year of scrutiny.\n\nI urge you to back legislative changes that mandate a conclusion to these investigations within 12 months. Our officers deserve timely justice and the ability to continue serving the public without the shadow of endless proceedings.\n\nSincerely,\n[Your Name]\n[Your Postcode]"
  },
  { 
    id: 2, 
    title: "Request for Immediate Trauma Support", 
    recipient: "Chief Constable", 
    tone: "Evidence-led", 
    readTime: "4 Min Read",
    content: "Dear Chief Constable,\n\nI am raising an urgent issue regarding the lack of mandatory, independent trauma support for officers following critical incidents.\n\nThe current provision is inadequate, leaving officers vulnerable to PTSD and other severe psychological impacts. Evidence shows that immediate intervention significantly reduces long-term harm. We must implement guaranteed independent psychological care within 48 hours for all officers involved in fatal or serious incidents.\n\nI look forward to your commitment to improving our welfare provisions.\n\nYours faithfully,\n[Your Name]"
  },
  { 
    id: 3, 
    title: "Family Impact Statement", 
    recipient: "Police and Crime Commissioner (PCC)", 
    tone: "Personal", 
    readTime: "2 Min Read",
    content: "Dear Police and Crime Commissioner,\n\nI am the family member of a serving police officer. I am writing to express my deep concern over the toll that the current system of protracted investigations and lack of support takes on our families.\n\nWe watch our loved ones suffer under the immense pressure of a system that often treats them with presumption of guilt. The uncertainty and stress do not stop at the station door; they permeate our homes and lives.\n\nPlease take immediate action to reform the investigation process and provide better welfare support for our officers.\n\nYours sincerely,\n[Your Name]"
  },
  { 
    id: 4, 
    title: "Protect Officer Anonymity", 
    recipient: "Member of Parliament (MP)", 
    tone: "Formal", 
    readTime: "3 Min Read",
    content: "Dear [MP Name],\n\nI am writing to urge you to support legislation that protects the anonymity of police officers facing preliminary investigations until a conviction is secured.\n\nThe current practice often leads to a 'trial by media,' destroying an officer's reputation and livelihood before they have had a fair hearing. This presumption of guilt is contrary to our justice system's foundational principles.\n\nWe need a system that balances accountability with fairness. Please advocate for the protection of officer identities during the investigative process.\n\nSincerely,\n[Your Name]\n[Your Postcode]"
  },
];

export default function TakeActionPage() {
  const router = useRouter();
  
  // Templates state
  const [searchQuery, setSearchQuery] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [editableContent, setEditableContent] = useState("");
  const itemsPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, recipientFilter, toneFilter, sortBy]);

  // Personalization state
  const [personalization, setPersonalization] = useState({
    name: "",
    policeForce: "",
    postcode: "",
    details: ""
  });

  // Filter logic
  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRecipient = recipientFilter === "All" || template.recipient.includes(recipientFilter);
    const matchesTone = toneFilter === "All" || template.tone === toneFilter;
    return matchesSearch && matchesRecipient && matchesTone;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "A-Z") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    // Recently Added (Default, by ID)
    return b.id - a.id;
  });

  const totalPages = Math.ceil(sortedTemplates.length / itemsPerPage);
  const paginatedTemplates = sortedTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePersonalize = () => {
    if (!personalization.postcode) {
      alert("Please enter a postcode to find your MP.");
      return;
    }
    
    // Pass personalization data via query params or state manager. For simplicity, using query params here.
    const queryParams = new URLSearchParams({
      name: personalization.name,
      force: personalization.policeForce,
      postcode: personalization.postcode,
      details: personalization.details
    });
    
    router.push(`/take-action/personalize?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-12 lg:pt-20 pb-12 lg:pt-32 lg:pb-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="/bannerBg.png" 
            alt="UK Police Background" 
            className="w-full h-full object-cover object-[70%_center] opacity-90 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[30%] via-[#050A14]/40 via-[60%] to-transparent to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12 max-w-[1600px]">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Megaphone className="w-5 h-5" /> DRIVE THE CHANGE
            </h3>
            <h1 className="text-4xl max-sm:text-4xl md:text-7xl xl:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2">
              <span className="text-white">TAKE </span><br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 pr-2">ACTION.</span>
            </h1>
            <p className="text-base md:text-lg xl:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl drop-shadow">
              Our voice is our strongest weapon. Use the tools below to contact your representatives and force the system to change.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACTION BENEFITS STATISTICS STRIP */}
      <section className="relative z-20 bg-[#02050A] border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x lg:divide-x divide-white/10 max-w-[1600px] mx-auto">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.id} className="p-6 lg:p-14 flex flex-col justify-start group hover:bg-white/[0.02] transition-colors duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center border border-[#1877F2]/20 group-hover:bg-[#1877F2] transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-bold text-lg text-white leading-tight">{benefit.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {benefit.description}
                </p>
                <div className="text-4xl max-sm:text-3xl lg:text-5xl font-black text-white tracking-tighter">
                  <AnimatedCounter from={0} to={benefit.value} duration={2} />+
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED CAMPAIGNS SECTION */}
      <section className="relative bg-[#020611] py-12 lg:py-32 border-b border-white/10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-20 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Targeted Action</h2>
              </div>
              <h3 className="text-3xl max-sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">CAMPAIGNS.</span>
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAMPAIGNS.map((campaign) => {
              const CampaignIcon = campaign.icon;
              return (
                <div key={campaign.id} className="group relative rounded-[2rem] border border-white/10 overflow-hidden min-h-[350px] sm:min-h-[400px] flex flex-col justify-end p-6 md:p-8 hover:border-[#1877F2]/50 transition-colors duration-500 shadow-xl">
                  {/* Background Image Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img src={campaign.bgImage} alt={campaign.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/80 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-2">
                      <CampaignIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-2xl text-white uppercase tracking-tight">{campaign.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{campaign.description}</p>
                    <div className="inline-flex items-center gap-2 bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg self-start">
                      <FileText className="w-3 h-3" /> {campaign.templatesAvailable} Templates Available
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LIST LETTER TEMPLATES & PERSONALIZATION SIDEBAR */}
      <section className="relative bg-[#050A14] py-12 lg:py-32 pb-10 lg:pb-20 lg:pb-48">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Resources</h2>
              </div>
              <h3 className="font-sans text-3xl max-sm:text-3xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1]">
                TEMPLATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">LIBRARY.</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl pb-4 font-medium">
              Find the right template, personalize it with your details, and take immediate action.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left: Templates List with Search & Sort */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              
              {/* Search & Filters */}
              <div className="bg-[#02050A] border border-white/10 rounded-[1.5rem] p-5 md:p-6 flex flex-col md:flex-row gap-4 shadow-xl">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search templates by keyword..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-500" 
                  />
                </div>
                <select 
                  value={recipientFilter}
                  onChange={(e) => setRecipientFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-xs font-bold px-4 py-3.5 rounded-xl focus:outline-none appearance-none min-w-[160px]"
                >
                  <option value="All">All Recipients</option>
                  <option value="MP">MP</option>
                  <option value="PCC">PCC</option>
                  <option value="Chief Constable">Chief Constable</option>
                </select>
                <select 
                  value={toneFilter}
                  onChange={(e) => setToneFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-xs font-bold px-4 py-3.5 rounded-xl focus:outline-none appearance-none min-w-[160px]"
                >
                  <option value="All">All Tones</option>
                  <option value="Formal">Formal</option>
                  <option value="Evidence-led">Evidence-led</option>
                  <option value="Personal">Personal</option>
                </select>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-xs font-bold px-4 py-3.5 rounded-xl focus:outline-none appearance-none min-w-[160px]"
                >
                  <option value="Recently Added">Recently Added</option>
                  <option value="A-Z">A to Z</option>
                  <option value="Z-A">Z to A</option>
                </select>
              </div>

              {/* Templates List */}
              <div className="flex flex-col gap-4">
                {paginatedTemplates.length === 0 ? (
                  <div className="p-12 text-center border border-white/10 border-dashed rounded-[1.5rem]">
                    <SearchX className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">No templates match your search criteria.</p>
                  </div>
                ) : (
                  paginatedTemplates.map(template => (
                    <div key={template.id} className="bg-[#02050A] border border-white/10 rounded-[1.5rem] p-5 md:p-6 lg:p-8 hover:border-[#1877F2]/50 transition-colors shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-white mb-4 leading-tight">{template.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#1877F2]" /> {template.recipient}</span>
                          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-amber-500" /> {template.tone}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {template.readTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap md:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
                        <Button onClick={() => { setPreviewTemplate(template); setEditableContent(template.content); }} variant="outline" className="w-full md:w-auto bg-transparent border-white/20 hover:bg-white hover:text-black text-white text-[10px] font-bold uppercase tracking-widest min-h-[48px] px-5 rounded-xl">
                          <Search className="w-3.5 h-3.5 mr-2" /> Preview
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto bg-transparent border-[#1877F2]/30 hover:bg-[#1877F2] text-[#1877F2] hover:text-white text-[10px] font-bold uppercase tracking-widest min-h-[48px] px-5 rounded-xl transition-all">
                          <Download className="w-3.5 h-3.5 mr-2" /> PDF
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto bg-transparent border-[#1877F2]/30 hover:bg-[#1877F2] text-[#1877F2] hover:text-white text-[10px] font-bold uppercase tracking-widest min-h-[48px] px-5 rounded-xl transition-all">
                          <Download className="w-3.5 h-3.5 mr-2" /> DOCX
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 pt-6">
                  <Button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    variant="outline" 
                    className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === 1 ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <Button 
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-12 h-12 p-0 rounded-full font-bold text-sm transition-colors ${
                        currentPage === idx + 1 
                          ? 'bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]' 
                          : 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {idx + 1}
                    </Button>
                  ))}

                  <Button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline" 
                    className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === totalPages ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Personalization Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gradient-to-b from-[#02050A] to-[#050A14] border border-[#1877F2]/20 rounded-[2rem] p-5 sm:p-8 shadow-2xl sticky top-32">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white uppercase tracking-widest">Personalize</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Setup Your Letter</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={personalization.name}
                      onChange={(e) => setPersonalization({...personalization, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Police Force</label>
                    <select 
                      value={personalization.policeForce}
                      onChange={(e) => setPersonalization({...personalization, policeForce: e.target.value})}
                      className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors appearance-none"
                    >
                      <option value="">Select Force (Optional)...</option>
                      <option value="Metropolitan Police">Metropolitan Police</option>
                      <option value="Greater Manchester Police">Greater Manchester Police</option>
                      <option value="West Midlands Police">West Midlands Police</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Postcode <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. SW1A 1AA"
                      value={personalization.postcode}
                      onChange={(e) => setPersonalization({...personalization, postcode: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-600"
                    />
                    <p className="text-[10px] text-slate-500 mt-2">Required to find your local MP.</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Additional Details</label>
                    <textarea 
                      placeholder="Add any personal context or specific demands..."
                      value={personalization.details}
                      onChange={(e) => setPersonalization({...personalization, details: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-600 h-24 resize-none"
                    />
                  </div>

                  <Button 
                    onClick={handlePersonalize}
                    className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold tracking-widest uppercase text-xs py-7 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all mt-4"
                  >
                    Personalize & Find MP <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEMPLATE PREVIEW MODAL */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setPreviewTemplate(null)} 
              className="absolute inset-0 bg-[#020611]/95 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-4xl h-[90vh] bg-[#051024] border border-white/10 rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#02050A]">
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm">Template Preview</h3>
                  <p className="text-slate-400 text-xs">{previewTemplate.title}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {editableContent !== previewTemplate.content && (
                    <Button onClick={() => setEditableContent(previewTemplate.content)} variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 max-sm:min-h-[48px] px-4 text-[10px] font-bold uppercase tracking-widest transition-all">
                      <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
                    </Button>
                  )}
                  <Button variant="outline" className="bg-transparent border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white max-sm:min-h-[48px] px-4 text-[10px] font-bold uppercase tracking-widest transition-all">
                    <Download className="w-3.5 h-3.5 mr-2" /> Download PDF
                  </Button>
                  <button onClick={() => setPreviewTemplate(null)} className="min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors ml-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer Area */}
              <div className="flex-1 overflow-y-auto bg-[#02050A] p-4 md:p-12 flex justify-center items-start border-t border-[#1877F2]/10 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="bg-white text-slate-900 w-full max-w-[700px] min-h-[900px] p-12 md:p-20 shadow-2xl rounded-sm flex flex-col relative group">
                  <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Edit3 className="w-3 h-3"/> Editable Template
                  </div>
                  <textarea 
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="font-serif text-sm md:text-base leading-relaxed whitespace-pre-wrap text-justify w-full flex-1 resize-none bg-transparent focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 rounded-md p-4 -m-4 transition-shadow"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
