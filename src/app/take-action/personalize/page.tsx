"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, MapPin, ArrowLeft, ArrowRight, Loader2, Edit3, CheckCircle, RotateCcw, Shield, Check, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { simulateSubmit } from "@/lib/mock/utils";
import { lookupAddress, type AddressResult } from "@/lib/mock/addressLookup";
import { motion } from "framer-motion";
import PersonalizeProgressStepper from "@/components/take-action/PersonalizeProgressStepper";
import LetterRichTextEditor, { type LetterRichTextEditorHandle } from "@/components/take-action/LetterRichTextEditor";

const TEMPLATES = [
  { 
    id: 1, 
    title: "Police Suicide Awareness", 
    description: "Improve data transparency, prevention strategies and officer support.",
    content: "Dear [MP_NAME],\n\nRe: Police Suicide Awareness - Improving Support and Transparency\n\nI am writing to you as your constituent to raise an issue of urgent concern: the continued loss of police officers to suicide and the need for greater transparency, prevention and support.\n\nPolice officers protect our communities every day, often facing traumatic, high-pressure and emotionally demanding situations. Yet too many are left without the support they need, and too many lives are lost.\n\nI am asking you to support calls for the government to improve data transparency, invest in early intervention and ensure that every officer has access to the mental health and welfare support they deserve.\n\nThis is not just about statistics – it is about real people, real families and a service that our communities rely on.\n\nI would be grateful if you could please let me know what steps you are taking to support police officer wellbeing and suicide prevention.\n\nThank you for your time and for representing our community.\n\nYours sincerely,\n[NAME]\n[ADDRESS]"
  },
  { 
    id: 2, 
    title: "Misconduct Reform", 
    description: "Ensure fair investigations and protect officer welfare.",
    content: "Dear [MP_NAME],\n\nRe: Misconduct Reform\n\nI am contacting you as your constituent to demand immediate action on reforming the misconduct investigation process...\n\nSincerely,\n[NAME]\n[ADDRESS]"
  },
  { 
    id: 3, 
    title: "Better Welfare Support", 
    description: "Improve access to mental health and occupational support.",
    content: "Dear [MP_NAME],\n\nRe: Better Welfare Support\n\nI am writing to you as your constituent to urge you to support improved welfare funding...\n\nSincerely,\n[NAME]\n[ADDRESS]"
  },
  { 
    id: 4, 
    title: "Mandatory Reporting", 
    description: "Support mandatory reporting of police officer suicides.",
    content: "Dear [MP_NAME],\n\nRe: Mandatory Reporting\n\nI am writing to you as your constituent to urge you to support mandatory reporting...\n\nSincerely,\n[NAME]\n[ADDRESS]"
  }
];

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Converts plain-text template content into simple paragraph HTML for the editor. */
const plainTextToHtml = (text: string) =>
  text
    .split("\n\n")
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br/>")}</p>`)
    .join("");

function PersonalizeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mpFound, setMpFound] = useState<{name: string, party: string, constituency: string, email: string} | null>(null);
  
  // Form State
  const [postcode, setPostcode] = useState(searchParams.get("postcode") || "");
  const [name, setName] = useState(searchParams.get("name") || "");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressPostcode, setAddressPostcode] = useState("");
  const [detailsAttempted, setDetailsAttempted] = useState(false);
  const initialTemplateId = Number(searchParams.get("templateId"));
  const [selectedTemplate, setSelectedTemplate] = useState(
    TEMPLATES.some(t => t.id === initialTemplateId) ? initialTemplateId : TEMPLATES[0].id
  );
  const [letterContent, setLetterContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  // Letter editor state
  const editorRef = useRef<LetterRichTextEditorHandle>(null);
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  
  // Address Lookup State
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressResults, setAddressResults] = useState<AddressResult[]>([]);
  const [addressError, setAddressError] = useState("");

  // Pre-fill address postcode from MP lookup when available
  useEffect(() => {
    if (postcode && mpFound && !addressPostcode && !address) {
      setAddressPostcode(postcode);
    }
  }, [postcode, mpFound, addressPostcode, address]);

  const handleAddressLookup = async (postcodeValue?: string) => {
    const val = (postcodeValue ?? addressPostcode).trim();
    if (!val) return;

    setAddressLoading(true);
    setAddressError("");
    setAddressResults([]);
    setAddress("");

    try {
      const res = await lookupAddress(val);
      setAddressResults(res);
      if (res.length === 0) {
        setAddressError("No addresses found for this postcode. Please check and try again.");
      }
    } catch {
      setAddressError("Could not find addresses for this postcode. Please check and try again.");
    } finally {
      setAddressLoading(false);
    }
  };
  useEffect(() => {
    if (searchParams.get("postcode")) {
      handleFindMp();
    }
  }, []);

  const handleFindMp = () => {
    if (!postcode) return;
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setMpFound({
        name: "Jane Smith MP",
        party: "Labour Party",
        constituency: "Darlington",
        email: "jane.smith.mp@parliament.uk"
      });
      setLoading(false);
    }, 1500);
  };

  const updateLetterContent = () => {
    const template = TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      let content = template.content;
      content = content.replace(/\[MP_NAME\]/g, mpFound ? mpFound.name : "Member of Parliament");
      content = content.replace(/\[NAME\]/g, name || "(Your Name)");
      content = content.replace(/\[ADDRESS\]/g, address || "(Your Full Address)");
      setLetterContent(plainTextToHtml(content));
    }
  };

  useEffect(() => {
    updateLetterContent();
  }, [selectedTemplate, name, address, mpFound]);

  const handleReset = () => {
    updateLetterContent();
    setIsEditingLetter(false);
  };

  const handleEditLetter = () => {
    setIsEditingLetter(true);
    editorRef.current?.focus();
  };

  // Derived personalisation completeness for stepper + continue behavior
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const detailsComplete = Boolean(name.trim() && email && emailValid && address);
  const showFieldErrors = detailsAttempted || Boolean(sendError);

  // Steps: 1 Find MP · 2 Choose Campaign · 3 Preview · 4 Personalise · 5 Send
  const currentStep = !mpFound ? 1 : !detailsComplete ? 4 : 5;

  const handleContinue = () => {
    if (!detailsComplete) {
      setDetailsAttempted(true);
      document.getElementById("personalise-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    document.getElementById("send-letter-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-sans flex flex-col pt-16 sm:pt-20 md:pt-24">
      {/* Top Header */}
      <div className="w-full border-b border-white/10 relative z-10 bg-[#02050A]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-2.5 sm:py-4 flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center justify-between gap-2 min-h-0">
            <nav
              aria-label="Breadcrumb"
              className="min-w-0 flex-1 overflow-x-auto scrollbar-hide [-webkit-overflow-scrolling:touch]"
            >
              <ol className="flex w-max min-w-full flex-nowrap items-center gap-x-1.5 text-[10px] font-bold tracking-wide text-slate-400 sm:text-xs sm:gap-x-2">
                <li className="flex shrink-0 items-center gap-x-1.5 sm:gap-x-2">
                  <Link href="/" className="whitespace-nowrap transition-colors hover:text-white">
                    Home
                  </Link>
                  <span className="text-slate-600" aria-hidden>&gt;</span>
                </li>
                <li className="flex shrink-0 items-center gap-x-1.5 sm:gap-x-2">
                  <Link href="/take-action" className="whitespace-nowrap transition-colors hover:text-white">
                    Take Action
                  </Link>
                  <span className="text-slate-600" aria-hidden>&gt;</span>
                </li>
                <li className="shrink-0 whitespace-nowrap text-[#1877F2]" aria-current="page">
                  Contact Your MP
                </li>
              </ol>
            </nav>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <Shield className="w-3 h-3" /> Your information is secure and will never be shared.
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-2 sm:gap-4 xl:gap-6">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">CONTACT YOUR MP</h1>
              <p className="hidden sm:block text-slate-400 text-xs md:text-sm mt-0.5">Send a letter in minutes. Your voice can drive change.</p>
            </div>
            
            <PersonalizeProgressStepper currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* Main Content 3 Columns */}
      <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 1 FIND YOUR MP & 2 CHOOSE A CAMPAIGN */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-6 max-lg:contents">
            <div className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-1 lg:order-none">
              <h2 className="flex items-center gap-2 md:gap-3 font-black text-base md:text-lg uppercase tracking-tight mb-2">
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs md:text-xs shrink-0">1</span>
                FIND YOUR MP
              </h2>
              <p className="text-xs md:text-xs text-slate-500 mb-4">Enter your postcode to find your Member of Parliament</p>
              
              <div className="flex gap-2 mb-4 items-stretch">
                <input 
                  type="text" 
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="DL1 1AA"
                  className="w-full bg-white border border-slate-300 rounded-md px-3 h-10 text-sm focus:outline-none focus:border-[#1877F2]"
                />
                <Button onClick={handleFindMp} className="bg-[#1877F2] hover:bg-blue-600 text-white rounded-md px-4 h-10">
                  Find MP
                </Button>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-[#1877F2]" />
                </div>
              )}

              {mpFound && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-2 rounded-md mb-4 border border-emerald-100">
                    <Check className="w-4 h-4" /> Your MP has been found
                  </div>
                  <div className="mb-4 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-200">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900">{mpFound.name}</h3>
                        <p className="text-xs text-slate-500">{mpFound.constituency}</p>
                        <p className="text-xs text-slate-500">{mpFound.party}</p>
                      </div>
                    </div>

                    <ul className="w-full space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <Mail className="h-3.5 w-3.5 text-slate-500" />
                        </span>
                        <span className="min-w-0 flex-1 break-words text-xs leading-relaxed text-slate-600">
                          {mpFound.email}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <Phone className="h-3.5 w-3.5 text-slate-500" />
                        </span>
                        <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-600">
                          020 7219 6491
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                        </span>
                        <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-600">
                          House of Commons, London SW1A 0AA
                        </span>
                      </li>
                    </ul>

                    <a
                      href="#"
                      className="inline-flex text-xs font-bold uppercase tracking-wider text-[#1877F2] hover:underline"
                    >
                      View on parliament.uk
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-2 lg:order-none">
              <h2 className="flex items-center gap-2 md:gap-3 font-black text-base md:text-lg uppercase tracking-tight mb-2">
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs md:text-xs shrink-0">2</span>
                CHOOSE A CAMPAIGN
              </h2>
              <p className="text-xs md:text-xs text-slate-500 mb-5">Select the issue you want to raise</p>
              
              <div className="flex flex-col gap-4">
                <CustomSelect
                  value={selectedTemplate}
                  onChange={setSelectedTemplate}
                  searchable
                  searchPlaceholder="Search campaigns..."
                  options={TEMPLATES.map((template) => ({
                    value: template.id,
                    label: template.title,
                    description: template.description,
                  }))}
                  ariaLabel="Choose a campaign"
                />
                
                {TEMPLATES.find(t => t.id === selectedTemplate) && (
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-100 mt-2">
                    <p className="text-xs md:text-xs text-slate-600 leading-snug">
                      {TEMPLATES.find(t => t.id === selectedTemplate)?.description}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Link hidden per request — route to /take-action/templates retained */}
              <div className="hidden mt-5 border-t border-slate-100 pt-4">
                <Link
                  href="/take-action/templates"
                  className="inline-flex items-center gap-1.5 py-1 text-xs font-bold uppercase tracking-widest text-[#1877F2] transition-colors hover:text-blue-600 hover:underline"
                >
                  View all campaigns
                  <ArrowRight className="h-3 w-3 shrink-0" />
                </Link>
              </div>
            </div>
          </div>

          {/* Center Column: 3 PREVIEW YOUR LETTER */}
          <div className="lg:col-span-6 lg:self-stretch max-lg:contents">
            <div className="bg-white rounded-xl text-slate-900 shadow-lg flex flex-col h-[500px] lg:h-full border border-slate-200 overflow-hidden order-4 lg:order-none">
              <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                <h2 className="flex items-center gap-2 md:gap-3 font-black text-base md:text-lg uppercase tracking-tight">
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs md:text-xs shrink-0">3</span>
                  PREVIEW YOUR LETTER
                </h2>
                {/* CTAs hidden per request — feature logic retained (handleReset / handleEditLetter) */}
                <div className="hidden items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                  <button onClick={handleReset} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap">
                    <RotateCcw className="w-3 h-3 shrink-0" /> Reset
                  </button>
                  <button
                    onClick={handleEditLetter}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors border px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap ${
                      isEditingLetter
                        ? "bg-[#1877F2] border-[#1877F2] text-white"
                        : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <Edit3 className="w-3 h-3 shrink-0" /> {isEditingLetter ? "Editing" : "Edit Letter"}
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
                <div className="max-w-2xl mx-auto h-full flex flex-col">
                  <div className="flex justify-between items-start mb-10">
                    <div className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                      {mpFound ? (
                        <>
                          {mpFound.name}<br/>
                          House of Commons<br/>
                          London<br/>
                          SW1A 0AA
                        </>
                      ) : (
                        <>
                          [MP Name]<br/>
                          House of Commons<br/>
                          London<br/>
                          SW1A 0AA
                        </>
                      )}
                    </div>
                    <div className="text-xs md:text-sm text-slate-700 font-medium">
                      20 May 2024
                    </div>
                  </div>

                  <LetterRichTextEditor
                    ref={editorRef}
                    value={letterContent}
                    onChange={setLetterContent}
                    highlighted={isEditingLetter}
                    className="flex-grow"
                  />

                  {/* Info banner hidden per request — Edit Letter / Reset features retained */}
                  <div className="hidden mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-lg items-start gap-3">
                    <Info className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                    <p className="text-xs md:text-xs text-[#1877F2] font-medium leading-relaxed">This is a template letter. Use Edit Letter to format it and add your own personal message, or Reset to restore the original.</p>
                  </div>
                </div>
              </div>

              <div className={`p-4 md:p-5 border-t border-slate-100 flex items-center bg-white mt-auto ${currentStep === 1 ? "justify-end" : "justify-between"}`}>
                {currentStep !== 1 && (
                  <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="h-auto rounded-md bg-transparent px-2 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:!bg-transparent hover:text-[#1877F2] focus-visible:!bg-transparent active:!bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                )}
                <Button
                  onClick={handleContinue}
                  className="min-h-12 shrink rounded-xl bg-[#1877F2] px-6 md:px-8 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-600 h-auto sm:rounded-full"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 PERSONALISE & 5 SEND */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-6 max-lg:contents">
            <div id="personalise-section" className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-3 lg:order-none scroll-mt-28">
              <h2 className="flex items-center gap-2 md:gap-3 font-black text-base md:text-lg uppercase tracking-tight mb-4">
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs md:text-xs shrink-0">4</span>
                PERSONALISE YOUR LETTER
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1 block text-slate-400">Your Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setName(name.trim())}
                    placeholder="John Smith"
                    className={`w-full bg-white border ${!name.trim() && showFieldErrors ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#1877F2]'} rounded-md px-3 py-2 text-[14px] focus:outline-none`}
                  />
                  {!name.trim() && showFieldErrors && <p className="text-xs text-red-500 mt-1">Name is required.</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1 block text-slate-400">Your Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmail(email.trim())}
                    placeholder="john.smith@email.com"
                    className={`w-full bg-white border ${(!email || (email && !emailValid)) && showFieldErrors ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#1877F2]'} rounded-md px-3 py-2 text-[14px] focus:outline-none`}
                  />
                  <p className="text-xs text-slate-500 mt-1">We need your email to send a confirmation when your letter is delivered.</p>
                  {!email && showFieldErrors && <p className="text-xs text-red-500 mt-1">Email is required.</p>}
                  {email && !emailValid && showFieldErrors && <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1 block text-slate-400">Your Full Address <span className="text-red-500">*</span></label>
                  {!address ? (
                    <div className="space-y-3">
                      <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1 · Enter postcode</p>
                        <div className="flex gap-2 items-stretch">
                          <input 
                            type="text"
                            value={addressPostcode}
                            onChange={(e) => setAddressPostcode(e.target.value)}
                            placeholder="e.g. DL1 1AA"
                            className={`w-full bg-white border ${showFieldErrors && !addressResults.length ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#1877F2]'} rounded-md px-3 h-10 text-[14px] focus:outline-none`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                void handleAddressLookup();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => void handleAddressLookup()}
                            disabled={!addressPostcode.trim() || addressLoading}
                            className="bg-[#1877F2] hover:bg-blue-600 text-white rounded-md px-4 h-10 shrink-0"
                          >
                            {addressLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Find"}
                          </Button>
                        </div>
                      </div>

                      {addressLoading && (
                        <div className="text-xs text-[#1877F2] flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" /> Finding addresses for your postcode...
                        </div>
                      )}
                      {addressError && <p className="text-xs text-red-500">{addressError}</p>}

                      {addressResults.length > 0 && (
                        <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-3 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 2 · Pick your address</p>
                            <span className="text-[11px] font-semibold text-[#1877F2] shrink-0">
                              {addressResults.length} found
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">Choose the address that matches where you live. This goes on your letter so your MP knows you are a constituent.</p>
                          <CustomSelect
                            value={address}
                            onChange={setAddress}
                            placeholder="Choose your address from the list..."
                            searchable
                            searchPlaceholder="Filter addresses..."
                            autoOpen
                            multilineOptions
                            options={addressResults.map((result) => ({
                              value: result.formattedAddress,
                              label: result.formattedAddress,
                            }))}
                            ariaLabel="Select your full address"
                          />
                        </div>
                      )}

                      {!addressResults.length && !addressLoading && (
                        <p className="text-xs text-slate-500">Start with your postcode — we will show matching addresses for you to pick from.</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="rounded-md border border-emerald-200 bg-slate-50 px-3 py-2.5">
                        <p className="whitespace-pre-line text-[14px] leading-relaxed text-slate-700">{address}</p>
                        <div className="mt-2 flex items-center justify-between gap-2 border-t border-emerald-100 pt-2">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <Check className="w-3.5 h-3.5 shrink-0" /> Full address selected
                          </span>
                          <button 
                            type="button"
                            onClick={() => { setAddress(""); setAddressResults([]); setAddressError(""); }}
                            className="shrink-0 text-xs text-[#1877F2] font-bold uppercase tracking-widest hover:underline bg-white px-2 py-1 rounded border border-blue-100"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {!address && showFieldErrors && <p className="text-xs text-red-500 mt-1">Please search by postcode and select your full address.</p>}
                </div>
              </div>
            </div>

            <div id="send-letter-section" className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-5 lg:order-none scroll-mt-28">
              <h2 className="flex items-center gap-2 md:gap-3 font-black text-base md:text-lg uppercase tracking-tight mb-4">
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs md:text-xs shrink-0">5</span>
                SEND YOUR LETTER
              </h2>
              
              <div className="space-y-3 mb-5">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100">
                    <Mail className="w-3 h-3 text-[#1877F2]" />
                  </div>
                  <p className="text-xs md:text-xs text-slate-600 leading-snug mt-0.5">We will send your letter directly to your MP via email.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100">
                    <Shield className="w-3 h-3 text-[#1877F2]" />
                  </div>
                  <p className="text-xs md:text-xs text-slate-600 leading-snug mt-0.5">Your details will not be shared with anyone.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100">
                    <CheckCircle className="w-3 h-3 text-[#1877F2]" />
                  </div>
                  <p className="text-xs md:text-xs text-slate-600 leading-snug mt-0.5">You'll receive a confirmation when your letter has been sent.</p>
                </div>
              </div>

              <Button
                disabled={isSending || !mpFound || !mpFound.email || !detailsComplete}
                onClick={async () => {
                  if (!mpFound || !mpFound.email) return;
                  setDetailsAttempted(true);
                  if (!detailsComplete) {
                    setSendError("Please complete all required fields — name, email, and full address.");
                    document.getElementById("personalise-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    return;
                  }
                  setSendError("");
                  setIsSending(true);
                  await simulateSubmit(2000);
                  setIsSending(false);
                  setSendSuccess(true);
                }}
                className={`w-full text-white font-bold uppercase tracking-widest text-xs py-5 rounded-md shadow-md transition-all h-auto ${
                  (!mpFound || !mpFound.email || !detailsComplete) 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-[#1877F2] hover:bg-blue-600'
                }`}
              >
                {isSending ? "SENDING..." : sendSuccess ? "SENT!" : "SEND MY LETTER"} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              {mpFound && !mpFound.email && (
                <p className="text-red-500 text-xs mt-3 text-center font-bold">This MP does not have an email address available on record. The letter cannot be sent.</p>
              )}
              {mpFound && mpFound.email && !detailsComplete && (
                <p className="text-slate-500 text-xs mt-3 text-center">Complete your name, email, and full address above to send your letter.</p>
              )}
              {sendError && <p className="text-red-500 text-xs mt-2 text-center">{sendError}</p>}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function PersonalizeEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans bg-[#050A14]"><Loader2 className="w-8 h-8 animate-spin text-[#1877F2]" /></div>}>
      <PersonalizeContent />
    </Suspense>
  );
}

