"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, FileText, Download, Clock, SearchX, Shield, AlertTriangle, Heart, Eye, Copy, Building2, ChevronDown } from "lucide-react";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import TemplatePreviewModal, { type LetterTemplate } from "@/components/take-action/TemplatePreviewModal";
import LetterPersonalizationModal from "@/components/take-action/LetterPersonalizationModal";
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

function CampaignCard({
  campaign,
  onSelect,
}: {
  campaign: (typeof CAMPAIGNS)[number];
  onSelect: (title: string) => void;
}) {
  const CampaignIcon = campaign.icon;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(campaign.title)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(campaign.title);
        }
      }}
      className="group relative flex min-h-[260px] cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-xl transition-colors duration-500 hover:border-[#1877F2]/50 sm:min-h-[300px]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={campaign.bgImage}
          alt=""
          className="h-full w-full object-cover opacity-30 grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
          <CampaignIcon className="h-4 w-4 text-white" />
        </div>
        <div>
          <h4 className="mb-2 text-lg font-bold uppercase tracking-tight text-white sm:text-xl">{campaign.title}</h4>
          <p className="mb-4 text-sm leading-relaxed text-white/80">{campaign.description}</p>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
            <FileText className="h-3.5 w-3.5" /> {campaign.templatesAvailable} Templates
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  // Templates state
  const [searchQuery, setSearchQuery] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewTemplate, setPreviewTemplate] = useState<LetterTemplate | null>(null);
  const [personalizeTemplate, setPersonalizeTemplate] = useState<LetterTemplate | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, recipientFilter, toneFilter, sortBy]);

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
    <div className="flex min-h-screen flex-col font-sans bg-slate-50">
      <PageHero
        animate
        className="!min-h-0 pb-8 md:pb-12 lg:pb-16"
        backLink={
          <nav
            className="flex flex-nowrap items-center gap-x-2 overflow-x-auto text-xs font-bold tracking-wide text-slate-400 scrollbar-hide"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">
              Home
            </Link>
            <span className="shrink-0 text-slate-600" aria-hidden>
              &gt;
            </span>
            <Link href="/take-action" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">
              Take Action
            </Link>
            <span className="shrink-0 text-slate-600" aria-hidden>
              &gt;
            </span>
            <span className="shrink-0 whitespace-nowrap text-[#1877F2]">Templates</span>
          </nav>
        }
        eyebrow={
          <>
            <FileText className="h-5 w-5 shrink-0" /> LETTER TEMPLATES
          </>
        }
        title={
          <>
            <span className="text-white">BROWSE </span>
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#1877F2] to-blue-400 bg-clip-text pr-2 text-transparent">
              TEMPLATES.
            </span>
          </>
        }
        description="Browse our library of pre-written letter templates covering various campaigns. Download, personalise, and send to drive change."
        imageSrc="/images/take-action-hero.png"
        imageAlt="Person writing a formal letter"
        imageClassName="opacity-40 object-center scale-105"
      />

      <CampaignSection variant="deep">
        <div className={PAGE_CONTENT_CONTAINER}>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#1877F2] sm:mb-8">
            Targeted Campaigns
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} onSelect={handleCampaignClick} />
            ))}
          </div>
        </div>
      </CampaignSection>

      <EditorialSection id="letter-templates">
        <div className={PAGE_CONTENT_CONTAINER}>

          {/* Search & Filters Panel */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              {/* Search Bar */}
              <div className="relative flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:border-[#1877F2]/40 focus-within:shadow-md flex items-center">
                <Search className="w-5 h-5 ml-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search templates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-4 py-4 text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium" 
                />
              </div>

              {/* Filters Group */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
                {/* For: Recipient Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <button 
                    onClick={() => { setRecipientDropdownOpen(!recipientDropdownOpen); setToneDropdownOpen(false); setSortDropdownOpen(false); }}
                    className="w-full sm:w-[160px] h-[50px] bg-white rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2 shadow-sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">For:</span>
                      <span className="text-slate-800 font-bold">{recipientFilter}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${recipientDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {recipientDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setRecipientDropdownOpen(false)} />
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left">
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

                {/* Voice: Tone Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <button 
                    onClick={() => { setToneDropdownOpen(!toneDropdownOpen); setRecipientDropdownOpen(false); setSortDropdownOpen(false); }}
                    className="w-full sm:w-[150px] h-[50px] bg-white rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2 shadow-sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voice:</span>
                      <span className="text-slate-800 font-bold">{toneFilter}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${toneDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {toneDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setToneDropdownOpen(false)} />
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-44 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left">
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

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <button 
                    onClick={() => { setSortDropdownOpen(!sortDropdownOpen); setToneDropdownOpen(false); setRecipientDropdownOpen(false); }}
                    className="w-full sm:w-[130px] h-[50px] bg-white rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2 shadow-sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
                      <span className="text-slate-800 font-bold">{sortBy === "Recently Added" ? "Recent" : sortBy}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${sortDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSortDropdownOpen(false)} />
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-40 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-left">
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

          {/* Templates Display */}
          
          {/* Desktop Table View */}
          <div className="hidden sm:block bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Template</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Recipient</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Tone</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Read Time</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedTemplates.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-base font-bold text-slate-900 mb-1">No templates found</h3>
                        <p className="text-sm text-slate-500">Try adjusting your filters or search query.</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedTemplates.map(template => (
                      <tr key={template.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 flex items-center justify-center border border-[#1877F2]/10 group-hover:scale-105 group-hover:bg-[#1877F2]/15 transition-all duration-300">
                              <FileText className="w-5 h-5 text-[#1877F2]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-900 leading-none group-hover:text-[#1877F2] transition-colors">{template.title}</div>
                              <span className="text-xs text-slate-400 font-medium">ID: #{template.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                            <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                            {template.recipient}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-full">
                            {template.tone}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50/50 border border-slate-100/60 px-2.5 py-1 rounded-full">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            {template.readTime}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setPersonalizeTemplate(template)}
                              className="inline-flex items-center justify-center gap-1.5 text-white bg-[#1877F2] hover:bg-blue-600 rounded-xl py-2 px-3.5 transition-colors shadow-sm font-bold text-xs uppercase tracking-wider active:scale-95 duration-200"
                            >
                              Personalise
                            </button>
                            <button
                              onClick={() => { setPreviewTemplate(template); setEditableContent(template.content); }}
                              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 text-[#1877F2] flex items-center justify-center transition-all duration-200 active:scale-95"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => void handleDownloadTemplate(template, "pdf")}
                              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-500 border border-slate-200/60 text-slate-500 flex items-center justify-center transition-all duration-200 active:scale-95"
                              title="Download PDF"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => void handleDownloadTemplate(template, "docx")}
                              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-500 border border-slate-200/60 text-slate-500 flex items-center justify-center transition-all duration-200 active:scale-95"
                              title="Download Word (DOCX)"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { navigator.clipboard.writeText(template.content); alert("Template copied to clipboard!"); }}
                              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-green-50 hover:text-green-500 border border-slate-200/60 text-slate-500 flex items-center justify-center transition-all duration-200 active:scale-95"
                              title="Copy to Clipboard"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Grid View */}
          <div className="block sm:hidden grid grid-cols-1 gap-6">
            {paginatedTemplates.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-900 mb-1">No templates found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              paginatedTemplates.map(template => (
                <div
                  key={template.id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#1877F2]/10 bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5">
                        <FileText className="h-5 w-5 text-[#1877F2] stroke-[1.5]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-base font-bold leading-snug text-slate-900">
                          {template.title}
                        </h4>
                        <span className="text-xs font-medium text-slate-400">Template ID: #{template.id}</span>
                      </div>
                    </div>

                    <p className="mb-4 h-10 overflow-hidden text-sm leading-5 text-slate-500">
                      Ask your {template.recipient} to support better data collection, prevention and officer mental health support.
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-2">
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        <Building2 className="h-3 w-3 shrink-0 text-slate-500" />
                        <span className="truncate">{template.recipient}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center rounded-full border border-blue-100 bg-blue-50/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1877F2]">
                        {template.tone}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-100/60 bg-slate-50/50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                        <Clock className="h-3 w-3 shrink-0 text-slate-400" />
                        {template.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPersonalizeTemplate(template)}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1877F2] bg-[#1877F2] px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all active:scale-[0.98] hover:bg-blue-600"
                      >
                        Personalise
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewTemplate(template);
                          setEditableContent(template.content);
                        }}
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] transition-all active:scale-[0.98] hover:bg-blue-50/60"
                      >
                        <Eye className="h-4 w-4 shrink-0" strokeWidth={2} />
                        Preview
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => void handleDownloadTemplate(template, "pdf")}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 transition-all active:scale-[0.98] hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDownloadTemplate(template, "docx")}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 transition-all active:scale-[0.98] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-500"
                        title="Download Word (DOCX)"
                      >
                        <FileText className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(template.content);
                          alert("Template copied to clipboard!");
                        }}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 transition-all active:scale-[0.98] hover:border-green-200 hover:bg-green-50 hover:text-green-500"
                        title="Copy to Clipboard"
                      >
                        <Copy className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
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
                className="flex items-center justify-center w-full md:w-auto text-slate-700 font-bold uppercase tracking-widest text-xs bg-white rounded-full border border-slate-200 hover:border-[#1877F2] hover:text-[#1877F2] shadow-sm px-8 py-3.5 transition-all animate-bounce"
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
      
      <LetterPersonalizationModal
        isOpen={!!personalizeTemplate}
        onClose={() => setPersonalizeTemplate(null)}
        template={personalizeTemplate}
      />
    </div>
  );
}
