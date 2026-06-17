"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Mail, User, MapPin, Building2, Send, Save, ArrowLeft, Loader2, FileText, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-[#030712] text-white font-sans pt-12 lg:pt-24 lg:pt-40 pb-10 lg:pb-20 lg:pb-32">
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1400px]">
        
        {/* Header */}
        <div className="mb-12">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Templates
          </button>
          <h1 className="text-3xl max-sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            PERSONALIZE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">SEND.</span>
          </h1>
          <p className="text-slate-400 text-lg">Review your representative details and customize your letter before sending.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: MP Details & Settings */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* MP Finder Widget */}
            <div className="bg-[#050A14] border border-white/10 rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <Building2 className="w-5 h-5 text-[#1877F2]" />
                <h2 className="font-bold text-sm uppercase tracking-widest text-white">Your Representative</h2>
              </div>
              
              <div className="mb-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Postcode Search</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter Postcode"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors"
                  />
                  <Button variant="outline" className="w-12 h-12 bg-transparent border-white/20 hover:bg-white hover:text-black">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="py-8 flex flex-col items-center justify-center text-slate-400">
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
                      <h3 className="font-bold text-white text-lg">{mpFound.name}</h3>
                      <p className="text-sm text-slate-300">{mpFound.party}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {mpFound.constituency}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{mpFound.email}</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                </motion.div>
              ) : (
                <div className="py-8 text-center border border-white/10 border-dashed rounded-xl">
                  <p className="text-slate-500 text-sm">Enter a valid postcode to find your MP.</p>
                </div>
              )}
            </div>

            {/* Template Selection */}
            <div className="bg-[#050A14] border border-white/10 rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <FileText className="w-5 h-5 text-[#1877F2]" />
                <h2 className="font-bold text-sm uppercase tracking-widest text-white">Choose Template</h2>
              </div>
              <select 
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#1877F2] transition-colors appearance-none"
              >
                {TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Column: Letter Editor */}
          <div className="lg:col-span-8">
            <div className="bg-[#050A14] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-2xl">
              
              <div className="bg-white/[0.02] border-b border-white/10 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="font-bold text-sm uppercase tracking-widest text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1877F2]" /> Edit Letter
                </h2>
                <div className="text-xs text-slate-400">
                  <span className="text-emerald-500 font-bold">●</span> Ready to customize
                </div>
              </div>

              <div className="flex-grow p-6 md:p-10 bg-black/20">
                <textarea 
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full h-full min-h-[500px] bg-transparent text-slate-300 text-[15px] leading-relaxed font-medium focus:outline-none resize-none"
                  placeholder="Your letter content will appear here..."
                />
              </div>

              <div className="bg-white/[0.02] border-t border-white/10 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto bg-transparent border-white/10 text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/20 font-bold uppercase tracking-widest text-xs py-6 px-6 rounded-xl transition-all">
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-bold uppercase tracking-widest text-xs py-6 px-8 rounded-xl transition-all">
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                  </Button>
                </div>
                <Button className="w-full sm:w-auto bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs py-6 px-10 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                  <Send className="w-4 h-4 mr-2" /> Send to MP
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PersonalizeEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#030712] text-white"><Loader2 className="w-8 h-8 animate-spin text-[#1877F2]" /></div>}>
      <PersonalizeContent />
    </Suspense>
  );
}
