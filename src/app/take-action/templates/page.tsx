"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Download, Target, Users, Megaphone, ArrowRight, ArrowLeft, BookOpen, Clock, Settings, SearchX, Shield, AlertTriangle, Heart, MapPin, Edit3, Eye, Copy, Lock, Navigation, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import TemplatePreviewModal, { type LetterTemplate } from "@/components/take-action/TemplatePreviewModal";
import { generatePDF, generateDOCX } from "@/lib/documentGenerator";
import { downloadBlob } from "@/lib/downloadBlob";

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

export default function TemplatesPage() {
  const router = useRouter();
  
  // Templates state
  const [searchQuery, setSearchQuery] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewTemplate, setPreviewTemplate] = useState<LetterTemplate | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, recipientFilter, toneFilter, sortBy]);

  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);

  const [recipientDropdownOpen, setRecipientDropdownOpen] = useState(false);
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

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
  const paginatedTemplates = sortedTemplates.slice(0, currentPage * itemsPerPage);

  const handleCampaignClick = (campaignTitle: string) => {
    let keyword = "";
    if (campaignTitle.includes("12-Month")) keyword = "12-Month";
    if (campaignTitle.includes("Trauma")) keyword = "Trauma";
    if (campaignTitle.includes("Anonymity")) keyword = "Anonymity";
    
    setSearchQuery(keyword);
    setRecipientFilter("All");
    setToneFilter("All");
    setSortBy("Recently Added");
    setCurrentPage(1);
    
    const templatesSection = document.getElementById("letter-templates");
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadTemplate = async (template: LetterTemplate, format: "pdf" | "docx") => {
    const data = {
      content: template.content,
      mpName: "[MP Name]",
      senderName: "[Your Name]",
      senderAddress: "[Your Postcode]",
    };
    const blob = format === "pdf" ? await generatePDF(data) : await generateDOCX(data);
    const ext = format === "pdf" ? "pdf" : "docx";
    downloadBlob(blob, `${template.title.replace(/\s+/g, "_")}.${ext}`);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 pt-20">
      
      {/* Top Header */}
      <div className="w-full border-b border-white/10 relative z-10 bg-[#050A14]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold tracking-widest">
            <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
            <span>&gt;</span>
            <button onClick={() => router.push('/take-action')} className="hover:text-white transition-colors">Take Action</button>
            <span>&gt;</span>
            <span className="text-[#1877F2]">Templates</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">LETTER TEMPLATES</h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl">Browse our library of pre-written letter templates covering various campaigns. Download, personalise, and send to drive change.</p>
        </div>
      </div>

      {/* FEATURED CAMPAIGNS SECTION */}
      <div className="w-full bg-[#02050A] py-16">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase mb-8">Targeted Campaigns</h2>
          
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {CAMPAIGNS.map((campaign) => {
              const CampaignIcon = campaign.icon;
              return (
                <div 
                  key={campaign.id} 
                  onClick={() => handleCampaignClick(campaign.title)}
                  className="group relative rounded-[2rem] border border-white/10 overflow-hidden min-h-[300px] flex flex-col justify-end p-6 hover:border-[#1877F2]/50 transition-colors duration-500 shadow-xl cursor-pointer"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={campaign.bgImage} alt={campaign.title} className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/80 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-2">
                      <CampaignIcon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-white uppercase tracking-tight">{campaign.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIST LETTER TEMPLATES */}
      <EditorialSection id="letter-templates" className="py-12 md:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1000px]">

          {/* Search & Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center p-2 mb-8 shadow-sm gap-3 md:gap-0">
            <div className="relative w-full md:flex-1 p-1 md:p-0 z-20">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium" 
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-0">
              <div className="h-8 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 flex-grow sm:flex-grow-0 relative group z-30">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">For:</span>
                <div className="relative flex-1 md:flex-none">
                  <button 
                    onClick={() => { setRecipientDropdownOpen(!recipientDropdownOpen); setToneDropdownOpen(false); setSortDropdownOpen(false); }}
                    className="w-full md:w-auto text-sm font-bold text-slate-900 bg-transparent focus:outline-none flex items-center justify-between gap-1 md:min-w-[120px] py-1"
                  >
                    {recipientFilter === "All" ? "All" : recipientFilter}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${recipientDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {recipientDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setRecipientDropdownOpen(false)} />
                      <div className="absolute top-full left-0 md:right-0 md:left-auto mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left md:origin-top-right">
                        {["All", "MP", "PCC", "Chief Constable"].map(val => (
                          <button
                            key={val}
                            onClick={() => { setRecipientFilter(val); setRecipientDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors ${recipientFilter === val ? "text-[#1877F2] bg-blue-50/50" : "text-slate-600"}`}
                          >
                            {val === "All" ? "All Recipients" : val}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="h-8 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 flex-grow sm:flex-grow-0 relative group z-20">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Voice:</span>
                <div className="relative flex-1 md:flex-none">
                  <button 
                    onClick={() => { setToneDropdownOpen(!toneDropdownOpen); setRecipientDropdownOpen(false); setSortDropdownOpen(false); }}
                    className="w-full md:w-auto text-sm font-bold text-slate-900 bg-transparent focus:outline-none flex items-center justify-between gap-1 md:min-w-[100px] py-1"
                  >
                    {toneFilter === "All" ? "All" : toneFilter}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${toneDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {toneDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setToneDropdownOpen(false)} />
                      <div className="absolute top-full left-0 md:right-0 md:left-auto mt-3 w-40 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left md:origin-top-right">
                        {["All", "Formal", "Evidence-led", "Personal"].map(val => (
                          <button
                            key={val}
                            onClick={() => { setToneFilter(val); setToneDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors ${toneFilter === val ? "text-[#1877F2] bg-blue-50/50" : "text-slate-600"}`}
                          >
                            {val === "All" ? "All Tones" : val}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 flex-grow sm:flex-grow-0 relative group z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort:</span>
                <div className="relative flex-1 md:flex-none">
                  <button 
                    onClick={() => { setSortDropdownOpen(!sortDropdownOpen); setToneDropdownOpen(false); setRecipientDropdownOpen(false); }}
                    className="w-full md:w-auto text-sm font-bold text-slate-900 bg-transparent focus:outline-none flex items-center justify-between gap-1 md:min-w-[70px] py-1"
                  >
                    {sortBy === "Recently Added" ? "Recent" : sortBy}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSortDropdownOpen(false)} />
                      <div className="absolute top-full left-0 md:right-0 md:left-auto mt-3 w-40 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left md:origin-top-right">
                        {["A-Z", "Z-A", "Recently Added"].map(val => (
                          <button
                            key={val}
                            onClick={() => { setSortBy(val as any); setSortDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors ${sortBy === val ? "text-[#1877F2] bg-blue-50/50" : "text-slate-600"}`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Templates List */}
          <div className="flex flex-col gap-4">
            {paginatedTemplates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-900 mb-1">No templates found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              paginatedTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-lg transition-all duration-300 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center group">
                  <div className="flex items-start gap-3 md:gap-5 flex-1 w-full">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#1877F2]/5 flex items-center justify-center shrink-0 border border-[#1877F2]/20 group-hover:scale-110 group-hover:bg-[#1877F2]/10 transition-transform duration-300">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#1877F2] stroke-[1.5]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-900 mb-1.5">{template.title}</h4>
                      <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-1 mb-3">Ask your {template.recipient} to support better data collection, prevention and officer mental health support.</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" /> {template.recipient}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                          {template.tone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 md:flex divide-x divide-slate-200 md:divide-x-0 items-center md:gap-4 shrink-0 w-full md:w-auto border-t border-slate-200 md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
                    <button onClick={() => { setPreviewTemplate(template); setEditableContent(template.content); }} className="flex flex-col md:flex-row items-center justify-center gap-1.5 text-[#1877F2] hover:bg-blue-50 py-2 md:py-2.5 md:px-5 transition-colors">
                      <Eye className="w-5 h-5" strokeWidth={1.5} /> <span className="text-[10px] md:text-xs font-semibold">Preview</span>
                    </button>
                    <button onClick={() => void handleDownloadTemplate(template, "pdf")} className="flex flex-col md:flex-row items-center justify-center gap-1.5 text-[#1877F2] hover:bg-blue-50 py-2 md:py-2.5 md:px-5 transition-colors">
                      <Download className="w-5 h-5" strokeWidth={1.5} /> <span className="text-[10px] md:text-xs font-semibold">PDF</span>
                    </button>
                    <button onClick={() => void handleDownloadTemplate(template, "docx")} className="flex flex-col md:flex-row items-center justify-center gap-1.5 text-[#1877F2] hover:bg-blue-50 py-2 md:py-2.5 md:px-5 transition-colors">
                      <FileText className="w-5 h-5" strokeWidth={1.5} /> <span className="text-[10px] md:text-xs font-semibold">Word</span>
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(template.content); alert("Template copied to clipboard!"); }} className="flex flex-col md:flex-row items-center justify-center gap-1.5 text-[#1877F2] hover:bg-blue-50 py-2 md:py-2.5 md:px-5 transition-colors">
                      <Copy className="w-5 h-5" strokeWidth={1.5} /> <span className="text-[10px] md:text-xs font-semibold">Copy</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PAGINATION */}
          {currentPage < totalPages && (
            <div className="flex justify-center pt-6 md:pt-10">
              <button 
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex items-center justify-center w-full md:w-auto text-slate-700 font-bold uppercase tracking-widest text-[11px] bg-white rounded-full border border-slate-200 hover:border-[#1877F2] hover:text-[#1877F2] shadow-sm px-8 py-3.5 transition-all"
              >
                LOAD MORE TEMPLATES <ChevronDown className="hidden md:block w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </EditorialSection>

      <TemplatePreviewModal
        template={previewTemplate}
        content={editableContent}
        onContentChange={setEditableContent}
        onClose={() => setPreviewTemplate(null)}
        onReset={() => setEditableContent(previewTemplate?.content || "")}
      />
    </div>
  );
}
