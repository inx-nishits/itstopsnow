"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Building2, Search, FileText, Mail, User, Phone, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UK_POLICE_FORCES } from "@/lib/data/policeForces";
import { simulateSubmit } from "@/lib/mock/utils";

interface FOIToolWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FOIToolWizard({ isOpen, onClose }: FOIToolWizardProps) {
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });
  const [requestText, setRequestText] = useState("");
  const [selectedForces, setSelectedForces] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPersonalDetails({ name: "", address: "", phone: "", email: "" });
      setRequestText("");
      setSelectedForces([]);
      setSearchQuery("");
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const filteredForces = UK_POLICE_FORCES.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleForce = (force: string) => {
    if (selectedForces.includes(force)) {
      setSelectedForces(prev => prev.filter(f => f !== force));
    } else {
      setSelectedForces(prev => [...prev, force]);
    }
  };

  const toggleAll = () => {
    if (selectedForces.length === filteredForces.length) {
      setSelectedForces([]);
    } else {
      setSelectedForces(filteredForces);
    }
  };

  const handleSend = async () => {
    setIsSubmitting(true);
    await simulateSubmit();
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const isStep1Valid = personalDetails.name && personalDetails.address && personalDetails.email;
  const isStep2Valid = requestText.trim().length > 10;
  const isStep3Valid = selectedForces.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">Freedom of Information Request</h2>
              <p className="text-sm text-slate-500 font-medium hidden sm:block">Legally demand information from UK Police Forces.</p>
            </div>
            <button 
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper */}
          {!isSuccess && (
            <div className="bg-white px-4 sm:px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border-2 z-10 bg-white",
                      step === s ? "border-[#1877F2] text-[#1877F2]" : 
                      step > s ? "border-[#1877F2] bg-[#1877F2] text-white" : 
                      "border-slate-200 text-slate-400"
                    )}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest hidden sm:block text-center",
                      step >= s ? "text-slate-900" : "text-slate-400"
                    )}>
                      {s === 1 ? "Details" : s === 2 ? "Request" : s === 3 ? "Forces" : "Review"}
                    </span>
                    {/* Connecting line */}
                    {s < 4 && (
                      <div className={cn(
                        "absolute top-4 left-1/2 w-full h-[2px] -z-10",
                        step > s ? "bg-[#1877F2]" : "bg-slate-100"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="max-w-2xl mx-auto h-full">
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">Requests Sent Successfully</h3>
                  <p className="text-slate-600 mb-8 max-w-md">
                    Your Freedom of Information requests have been submitted to {selectedForces.length} police force(s). 
                    By law, they have 20 working days to respond to your request.
                  </p>
                  <Button 
                    onClick={handleClose}
                    className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-6 rounded-full uppercase tracking-widest text-sm"
                  >
                    Close Tool
                  </Button>
                </div>
              ) : (
                <>
                  {/* Step 1: Details */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Your Details</h3>
                        <p className="text-sm text-slate-500">Public authorities require a real name and contact address to process an FOI request.</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5 block flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name *</label>
                          <input type="text" value={personalDetails.name} onChange={e => setPersonalDetails({...personalDetails, name: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]" placeholder="e.g. Jane Doe" />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5 block flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email Address *</label>
                          <input type="email" value={personalDetails.email} onChange={e => setPersonalDetails({...personalDetails, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]" placeholder="jane@example.com" />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5 block flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Postal Address *</label>
                          <textarea value={personalDetails.address} onChange={e => setPersonalDetails({...personalDetails, address: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] min-h-[80px]" placeholder="Full postal address including postcode..." />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5 block flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Telephone Number (Optional)</label>
                          <input type="tel" value={personalDetails.phone} onChange={e => setPersonalDetails({...personalDetails, phone: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]" placeholder="07123 456789" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Request */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Your Request</h3>
                        <p className="text-sm text-slate-500">Describe the recorded information you are asking for. Be specific to avoid refusal on cost/time grounds.</p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-sm text-slate-700">
                        <FileText className="w-5 h-5 text-[#1877F2] shrink-0" />
                        <div>
                          <strong>Tip:</strong> You don't need to explain <em>why</em> you want the info. Just state clearly what data you want (e.g. "I request the total amount spent on body-worn cameras in the financial year 2023-2024").
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5 block">FOI Request Details *</label>
                        <textarea 
                          value={requestText} 
                          onChange={e => setRequestText(e.target.value)} 
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] min-h-[200px]" 
                          placeholder="Under the Freedom of Information Act 2000, I would like to request the following information..." 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Forces */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 flex flex-col h-full">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Select Police Forces</h3>
                        <p className="text-sm text-slate-500">Choose which authorities you want to send this request to.</p>
                      </div>

                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="Search police forces..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1877F2]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">{selectedForces.length} Selected</span>
                        <button onClick={toggleAll} className="text-xs font-bold text-[#1877F2] hover:underline">
                          {selectedForces.length === filteredForces.length ? "Deselect All" : "Select All"}
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex-1 overflow-y-auto max-h-[300px]">
                        {filteredForces.length === 0 ? (
                          <div className="p-8 text-center text-slate-500 text-sm">No police forces found matching your search.</div>
                        ) : (
                          <div className="divide-y divide-slate-100">
                            {filteredForces.map(force => (
                              <label key={force} className="flex items-center gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                                <div className={cn(
                                  "w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                                  selectedForces.includes(force) ? "bg-[#1877F2] border-[#1877F2]" : "bg-white border-slate-300"
                                )}>
                                  {selectedForces.includes(force) && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="text-sm font-medium text-slate-700">{force}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Review & Send</h3>
                        <p className="text-sm text-slate-500">Please review your FOI request before sending it to the selected authorities.</p>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-2">Sender Details</h4>
                          <div className="text-sm text-slate-700">
                            <strong>{personalDetails.name}</strong><br/>
                            {personalDetails.email}<br/>
                            <span className="whitespace-pre-line">{personalDetails.address}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-2">FOI Request</h4>
                          <div className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
                            {requestText}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-2">Recipients ({selectedForces.length})</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedForces.map(force => (
                              <span key={force} className="text-xs bg-[#1877F2]/10 text-[#1877F2] font-semibold px-2.5 py-1 rounded-md border border-[#1877F2]/20">
                                {force}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          {!isSuccess && (
            <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-full text-xs font-bold uppercase tracking-widest px-6 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <div /> // Placeholder to keep spacing
              )}
              
              {step < 4 ? (
                <Button 
                  onClick={() => setStep(s => s + 1)} 
                  disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)}
                  className="bg-[#1877F2] hover:bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest px-8 h-12 transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSend}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold uppercase tracking-widest px-8 h-12 transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send FOI Requests"} <Mail className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
