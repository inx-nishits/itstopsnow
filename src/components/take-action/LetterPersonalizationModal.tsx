"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin, Building2, AlignLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { useRouter } from "next/navigation";
import { UK_POLICE_FORCES } from "@/lib/data/policeForces";
import type { LetterTemplate } from "@/components/take-action/TemplatePreviewModal";

interface LetterPersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: LetterTemplate | null;
}

export default function LetterPersonalizationModal({ isOpen, onClose, template }: LetterPersonalizationModalProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    policeForce: "",
    postcode: "",
    additionalDetails: ""
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        policeForce: "",
        postcode: "",
        additionalDetails: ""
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!template) return;
    if (!formData.name || !formData.postcode || !formData.policeForce) return;
    
    // Convert state to URLSearchParams
    const params = new URLSearchParams();
    params.set("templateId", template.id.toString());
    if (formData.name) params.set("name", formData.name);
    if (formData.postcode) params.set("postcode", formData.postcode);
    if (formData.policeForce) params.set("policeForce", formData.policeForce);
    if (formData.additionalDetails) params.set("details", formData.additionalDetails);

    router.push(`/take-action/personalize?${params.toString()}`);
  };

  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden overscroll-none">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Personalise Letter</h2>
              <p className="text-sm text-slate-500 font-medium mt-1 line-clamp-1">{template.title}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <form id="personalization-form" onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Your Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1877F2] focus:outline-none focus:ring-1 focus:ring-[#1877F2]" 
                  placeholder="Enter your full name" 
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Postcode
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.postcode} 
                  onChange={e => setFormData({...formData, postcode: e.target.value})} 
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1877F2] focus:outline-none focus:ring-1 focus:ring-[#1877F2]" 
                  placeholder="Enter postcode, e.g. DL1 1AA" 
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> Police Force Selection
                </label>
                <CustomSelect
                  value={formData.policeForce}
                  onChange={(policeForce) => setFormData({ ...formData, policeForce })}
                  placeholder="Select a police force"
                  options={UK_POLICE_FORCES.map((force) => ({
                    value: force,
                    label: force,
                  }))}
                  ariaLabel="Police force selection"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <AlignLeft className="w-3.5 h-3.5" /> Additional Details (Optional)
                </label>
                <textarea 
                  value={formData.additionalDetails} 
                  onChange={e => setFormData({...formData, additionalDetails: e.target.value})} 
                  className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1877F2] focus:outline-none focus:ring-1 focus:ring-[#1877F2]" 
                  placeholder="Add any personal notes or specific details you want included..." 
                />
              </div>

            </form>
          </div>

          {/* Footer Action */}
          <div className="shrink-0 border-t border-slate-100 bg-white p-6">
            <Button 
              type="submit"
              form="personalization-form"
              className="w-full bg-[#1877F2] hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest py-4 h-auto transition-all"
            >
              Continue to Personalise <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
