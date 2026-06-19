"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Mail, User, MapPin, Building2, Send, Save, ArrowLeft, Loader2, FileText, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulateSubmit } from "@/lib/mock/utils";
import { motion } from "framer-motion";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";

const TEMPLATES = [
  { 
    id: 1, 
    title: "Demand 12-Month Limit on Investigations", 
    content: "Dear [MP_NAME],\n\nI am writing to you as a constituent residing at [POSTCODE] regarding a matter of urgent national importance affecting the welfare of our police officers.\n\nCurrently, police officers who are subjected to investigations by the IOPC face average delays of over 4 years. During this time, they are often suspended on restricted duties, isolated from their peers, and treated as guilty until proven innocent. The human cost is devastating, with a direct correlation between investigation delays and severe mental health crises.\n\nAs a [ROLE], I see this devastation firsthand. My name is [NAME] and I am asking you to intervene.\n\n[DETAILS]\n\nI urge you to support the 'It Stops Now' campaign's call for a strict 12-month time limit on all misconduct investigations. After 12 months, if no tribunal or criminal charge is brought, the case must be closed.\n\nPlease confirm that you will raise this issue with the Home Secretary.\n\nYours sincerely,\n[NAME]\n[POSTCODE]"
  },
  { 
    id: 2, 
    title: "Protect Officer Anonymity", 
    content: "Dear [MP_NAME],\n\nI am contacting you from [POSTCODE] to demand immediate action on the protection of police officer identities prior to conviction.\n\nIt is unacceptable that officers face trial by media for unproven allegations. This destroys careers and lives before any evidence is formally presented.\n\nAs a [ROLE], I am deeply concerned. [DETAILS]\n\nPlease support legislative changes to ensure anonymity for officers under investigation until formal charges are brought.\n\nSincerely,\n[NAME]"
  }
];

function PersonalizeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [mpFound, setMpFound] = useState<{name: string, party: string, constituency: string, email: string} | null>(null);
  
  // Form State
  const [postcode, setPostcode] = useState(searchParams.get("postcode") || "");
  const [name, setName] = useState(searchParams.get("name") || "");
  const [role, setRole] = useState(searchParams.get("force") || "Constituent");
  const [details, setDetails] = useState(searchParams.get("details") || "");
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [letterContent, setLetterContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  // Mock API Call to find MP
  useEffect(() => {
    if (postcode) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setMpFound({
          name: "Rt Hon Jane Smith MP",
          party: "Independent",
          constituency: "Local District",
          email: "jane.smith.mp@parliament.uk"
        });
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [postcode]);

  const updateLetterContent = () => {
    const template = TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      let content = template.content;
      content = content.replace(/\[MP_NAME\]/g, mpFound ? mpFound.name : "Member of Parliament");
      content = content.replace(/\[POSTCODE\]/g, postcode || "[Your Postcode]");
      content = content.replace(/\[NAME\]/g, name || "[Your Name]");
      content = content.replace(/\[ROLE\]/g, role || "concerned citizen");
      content = content.replace(/\[DETAILS\]/g, details ? `Additional context: ${details}` : "");
      setLetterContent(content);
    }
  };

  // Update Letter Content dynamically when fields change
  useEffect(() => {
    updateLetterContent();
  }, [selectedTemplate, name, postcode, role, details, mpFound]);

  const handleReset = () => {
    updateLetterContent();
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <PageHero
        variant="utility"
        backLink={
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Templates
          </button>
        }
        title={
          <>
            PERSONALIZE &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              SEND.
            </span>
          </>
        }
        description="Review your representative details and customize your letter before sending."
      />

      <EditorialSection className="pb-10 lg:pb-20 lg:pb-32">
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1400px]">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: MP Details & Settings */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* MP Finder Widget */}
            <div className={`${hybrid.editorialCard} p-8`}>
              <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${hybrid.editorialBorder}`}>
                <Building2 className="w-5 h-5 text-[#1877F2]" />
                <h2 className={`font-bold text-sm uppercase tracking-widest ${hybrid.editorialHeading}`}>Your Representative</h2>
              </div>
              
              <div className="mb-6">
                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${hybrid.editorialMuted}`}>Postcode Search</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter Postcode"
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${hybrid.editorialInput}`}
                  />
                  <Button variant="outline" className="w-12 h-12 border-slate-300 hover:bg-[#010B19] hover:text-white">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className={`py-8 flex flex-col items-center justify-center ${hybrid.editorialMuted}`}>
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#1877F2]" />
                  <p className="text-xs font-bold uppercase tracking-widest">Finding your MP...</p>
                </div>
              ) : mpFound ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${hybrid.editorialHeading}`}>{mpFound.name}</h3>
                      <p className={`text-sm ${hybrid.editorialBody}`}>{mpFound.party}</p>
                      <p className={`text-xs flex items-center gap-1 mt-1 ${hybrid.editorialMuted}`}><MapPin className="w-3 h-3" /> {mpFound.constituency}</p>
                    </div>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3 flex items-center justify-between">
                    <span className={`text-xs ${hybrid.editorialMuted}`}>{mpFound.email}</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                </motion.div>
              ) : (
                <div className={`py-8 text-center border border-dashed rounded-xl ${hybrid.editorialBorder}`}>
                  <p className={`text-sm ${hybrid.editorialMuted}`}>Enter a valid postcode to find your MP.</p>
                </div>
              )}
            </div>

            {/* Template Selection */}
            <div className={`${hybrid.editorialCard} p-8`}>
              <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${hybrid.editorialBorder}`}>
                <FileText className="w-5 h-5 text-[#1877F2]" />
                <h2 className={`font-bold text-sm uppercase tracking-widest ${hybrid.editorialHeading}`}>Choose Template</h2>
              </div>
              <select 
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(Number(e.target.value))}
                className={`w-full rounded-xl px-4 py-4 text-sm focus:outline-none transition-colors appearance-none ${hybrid.editorialInput}`}
              >
                {TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Column: Letter Editor */}
          <div className="lg:col-span-8">
            <div className={`${hybrid.editorialCard} overflow-hidden flex flex-col h-full`}>
              
              <div className={`border-b ${hybrid.editorialBorder} p-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
                <h2 className={`font-bold text-sm uppercase tracking-widest flex items-center gap-2 ${hybrid.editorialHeading}`}>
                  <Mail className="w-4 h-4 text-[#1877F2]" /> Edit Letter
                </h2>
                <div className={`text-xs ${hybrid.editorialMuted}`}>
                  <span className="text-emerald-500 font-bold">●</span> Ready to customize
                </div>
              </div>

              <div className="flex-grow p-6 md:p-10 bg-slate-50">
                <textarea 
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className={`w-full h-full min-h-[500px] bg-transparent text-[15px] leading-relaxed font-medium focus:outline-none resize-none ${hybrid.editorialBody}`}
                  placeholder="Your letter content will appear here..."
                />
              </div>

              <div className={`border-t ${hybrid.editorialBorder} p-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <Button onClick={handleReset} variant="outline" className={`w-full sm:w-auto border-slate-300 ${hybrid.editorialMuted} hover:bg-slate-100 font-bold uppercase tracking-widest text-xs py-6 px-6 rounded-xl transition-all`}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button variant="outline" className={`w-full sm:w-auto border-slate-300 ${hybrid.editorialHeading} hover:bg-[#010B19] hover:text-white font-bold uppercase tracking-widest text-xs py-6 px-8 rounded-xl transition-all`}>
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                  </Button>
                </div>
                <Button
                  type="button"
                  disabled={isSending || !mpFound}
                  onClick={async () => {
                    if (!mpFound) return;
                    setSendError("");
                    setIsSending(true);
                    await simulateSubmit(2000);
                    setIsSending(false);
                    setSendSuccess(true);
                  }}
                  className="w-full sm:w-auto bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs py-6 px-10 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all disabled:opacity-60"
                >
                  <Send className="w-4 h-4 mr-2" /> {isSending ? "Sending…" : sendSuccess ? "Sent!" : "Send to MP"}
                </Button>
              </div>

              {sendSuccess && (
                <div className="mx-6 mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm">
                  Your letter has been sent to {mpFound?.name ?? "your MP"} (prototype). A copy would be emailed to you when the backend is connected.
                </div>
              )}
              {sendError && (
                <p className="mx-6 mb-6 text-red-500 text-xs" role="alert">{sendError}</p>
              )}

            </div>
          </div>

        </div>
      </div>
      </EditorialSection>
    </div>
  );
}

export default function PersonalizeEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans"><Loader2 className="w-8 h-8 animate-spin text-[#1877F2]" /></div>}>
      <PersonalizeContent />
    </Suspense>
  );
}
