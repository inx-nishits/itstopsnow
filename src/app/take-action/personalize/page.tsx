"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Mail, User, MapPin, Building2, Send, Save, ArrowLeft, ArrowRight, Loader2, FileText, CheckCircle, RotateCcw, Shield, Check, Info, Users, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { simulateSubmit } from "@/lib/mock/utils";
import { lookupAddress, type AddressResult } from "@/lib/mock/addressLookup";
import { motion } from "framer-motion";

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
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [letterContent, setLetterContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [connectionDropdownOpen, setConnectionDropdownOpen] = useState(false);
  
  // Address Lookup State
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressResults, setAddressResults] = useState<AddressResult[]>([]);
  const [addressError, setAddressError] = useState("");

  // Initial load auto-fetch MP if postcode passed from previous page
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
      setLetterContent(content);
    }
  };

  useEffect(() => {
    updateLetterContent();
  }, [selectedTemplate, name, address, mpFound]);

  const handleReset = () => {
    updateLetterContent();
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-sans flex flex-col pt-20 md:pt-24">
      {/* Top Header */}
      <div className="w-full border-b border-white/10 relative z-10 bg-[#02050A]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold tracking-widest">
              <button onClick={() => router.back()} className="hover:text-white transition-colors">Home</button>
              <span>&gt;</span>
              <button onClick={() => router.back()} className="hover:text-white transition-colors">Take Action</button>
              <span>&gt;</span>
              <span className="text-[#1877F2]">Contact Your MP</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3 h-3" /> Your information is secure and will never be shared.
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-1">CONTACT YOUR MP</h1>
              <p className="text-slate-400 text-xs md:text-sm">Send a letter in minutes. Your voice can drive change.</p>
            </div>
            
            {/* Progress Bar */}
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-start gap-2 sm:gap-4 xl:gap-8 pb-4 mt-4 xl:mt-0 w-full xl:w-auto">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-xs font-bold text-white whitespace-nowrap">Find Your MP</span>
              </div>
              <div className="w-4 sm:w-8 xl:w-12 h-px bg-white/20 mt-3 shrink-0"></div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-xs font-bold text-white whitespace-nowrap">Personalise</span>
              </div>
              <div className="w-4 sm:w-8 xl:w-12 h-px bg-white/20 mt-3 shrink-0"></div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-xs font-bold text-slate-300 whitespace-nowrap">Preview</span>
              </div>
              <div className="w-4 sm:w-8 xl:w-12 h-px bg-white/20 mt-3 shrink-0"></div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1A2332] text-slate-500 flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Add Your Voice</span>
              </div>
              <div className="w-4 sm:w-8 xl:w-12 h-px bg-white/20 mt-3 shrink-0"></div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1A2332] text-slate-500 flex items-center justify-center text-xs font-bold">5</div>
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Send Letter</span>
              </div>
            </div>
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
                  <div className="flex items-start gap-4 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="MP" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{mpFound.name}</h3>
                      <p className="text-xs text-slate-500">{mpFound.constituency}</p>
                      <p className="text-xs text-slate-500 mb-2">{mpFound.party}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                        <Mail className="w-3 h-3" /> {mpFound.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                        <span className="w-3 text-center">☎</span> 020 7219 6491
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                        <MapPin className="w-3 h-3" /> House of Commons, London SW1A 0AA
                      </div>
                      <a href="#" className="text-[#1877F2] text-xs font-bold uppercase hover:underline">View on parliament.uk</a>
                    </div>
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
                  options={TEMPLATES.map((template) => ({
                    value: template.id,
                    label: template.title,
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
              
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button className="text-[#1877F2] text-xs font-bold hover:underline flex items-center gap-1 uppercase tracking-widest">
                  View all campaigns <ArrowRight className="w-3 h-3" />
                </button>
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
                <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                  <button onClick={handleReset} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap">
                    <RotateCcw className="w-3 h-3 shrink-0" /> Reset
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap">
                    <FileText className="w-3 h-3 shrink-0" /> Edit Template
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

                  <textarea 
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    className="w-full flex-grow min-h-[300px] bg-transparent text-sm md:text-[15px] text-slate-800 leading-[1.8] font-medium focus:outline-none resize-none"
                    placeholder="Your letter content will appear here..."
                  />

                  <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                    <p className="text-xs md:text-xs text-[#1877F2] font-medium leading-relaxed">This is a template letter. You can edit it and add your own personal message in the next step.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 border-t border-slate-100 flex items-center justify-between bg-white mt-auto">
                <Button variant="ghost" onClick={() => router.back()} className="text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-widest px-0">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button className="bg-[#1877F2] hover:bg-blue-600 text-white px-6 md:px-8 font-bold text-xs uppercase tracking-widest rounded-md">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 PERSONALISE & 5 SEND */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-6 max-lg:contents">
            <div className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-3 lg:order-none">
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
                    className={`w-full bg-white border ${!name && sendError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#1877F2]'} rounded-md px-3 py-2 text-[13px] focus:outline-none`}
                  />
                  {!name && sendError && <p className="text-xs text-red-500 mt-1">Name is required.</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1 block text-slate-400">Your Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmail(email.trim())}
                    placeholder="john.smith@email.com"
                    className={`w-full bg-white border ${(!email || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) && sendError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#1877F2]'} rounded-md px-3 py-2 text-[13px] focus:outline-none`}
                  />
                  {!email && sendError && <p className="text-xs text-red-500 mt-1">Email is required.</p>}
                  {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && sendError && <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1 block text-slate-400">Your Full Address <span className="text-red-500">*</span></label>
                  {!address ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Enter postcode"
                          className="w-full bg-white border border-slate-300 focus:border-[#1877F2] rounded-md px-3 h-10 text-[13px] focus:outline-none"
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = e.currentTarget.value;
                              if (!val) return;
                              setAddressLoading(true);
                              setAddressError("");
                              try {
                                const res = await lookupAddress(val);
                                setAddressResults(res);
                              } catch (err) {
                                setAddressError("Could not find addresses. Please try again.");
                              }
                              setAddressLoading(false);
                            }
                          }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Type your postcode and press enter to search</p>
                      {addressLoading && <div className="text-xs text-[#1877F2] flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin"/> Searching...</div>}
                      {addressError && <p className="text-xs text-red-500">{addressError}</p>}
                      {addressResults.length > 0 && (
                        <CustomSelect
                          value={address}
                          onChange={setAddress}
                          placeholder="Select your address..."
                          options={addressResults.map((result) => ({
                            value: result.formattedAddress,
                            label: result.formattedAddress,
                          }))}
                          ariaLabel="Select your address"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <textarea 
                        value={address}
                        readOnly
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none min-h-[80px] text-slate-700"
                      />
                      <button 
                        onClick={() => { setAddress(""); setAddressResults([]); }}
                        className="absolute top-2 right-2 text-xs text-[#1877F2] font-bold uppercase tracking-widest hover:underline bg-white px-2 py-1 rounded border border-blue-100"
                      >
                        Change
                      </button>
                    </div>
                  )}
                  {(!address) && sendError && <p className="text-xs text-red-500 mt-1">Full address is required.</p>}
                  <p className="text-xs text-slate-500 mt-1">MPs require a full address to confirm you are a constituent.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-slate-900 shadow-lg border border-slate-200 order-5 lg:order-none">
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
                disabled={isSending || !mpFound || !mpFound.email}
                onClick={async () => {
                  if (!mpFound || !mpFound.email) return;
                  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !address) {
                    setSendError("Please complete all required fields.");
                    return;
                  }
                  setSendError("");
                  setIsSending(true);
                  await simulateSubmit(2000);
                  setIsSending(false);
                  setSendSuccess(true);
                }}
                className={`w-full text-white font-bold uppercase tracking-widest text-xs py-5 rounded-md shadow-md transition-all h-auto ${
                  (!mpFound || !mpFound.email) 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-[#1877F2] hover:bg-blue-600'
                }`}
              >
                {isSending ? "SENDING..." : sendSuccess ? "SENT!" : "SEND MY LETTER"} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              {mpFound && !mpFound.email && (
                <p className="text-red-500 text-xs mt-3 text-center font-bold">This MP does not have an email address available on record. The letter cannot be sent.</p>
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

