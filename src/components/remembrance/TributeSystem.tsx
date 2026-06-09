"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tribute {
  id: string;
  authorName: string;
  relationship: string;
  message: string;
  createdAt: string;
}

interface TributeSystemProps {
  memorialId: string;
  existingTributes: Tribute[];
}

export default function TributeSystem({ memorialId, existingTributes }: TributeSystemProps) {
  const [formData, setFormData] = useState({ name: "", email: "", relationship: "Citizen", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch('/api/tribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memorialId,
          authorName: formData.name,
          authorEmail: formData.email,
          relationship: formData.relationship,
          message: formData.message
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus("success");
      setFormData({ name: "", email: "", relationship: "Citizen", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Tributes Listing */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" /> Tributes ({existingTributes.length})
        </h3>
        
        {existingTributes.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-center text-slate-400 italic">
            Be the first to leave a tribute.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {existingTributes.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                <p className="text-slate-300 italic leading-relaxed mb-4">"{t.message}"</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-widest text-white">{t.authorName} <span className="text-slate-500 mx-1">•</span> <span className="text-amber-500">{t.relationship}</span></span>
                  <span className="text-slate-500">{t.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leave Tribute Form */}
      <div className="bg-[#010B19] border border-white/10 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h3 className="text-xl font-serif text-white mb-6 relative z-10">Leave a Tribute</h3>
        
        {status === "success" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="text-green-500 font-bold mb-2">Tribute Submitted</h4>
            <p className="text-sm text-green-400/80">Thank you. Your tribute has been submitted and will appear on the wall shortly after moderation.</p>
            <Button variant="ghost" onClick={() => setStatus("idle")} className="mt-4 text-xs text-white hover:bg-white/10">Leave Another</Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email (Private)</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Relationship</label>
              <select value={formData.relationship} onChange={e => setFormData({...formData, relationship: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                <option value="Citizen">Citizen / Member of Public</option>
                <option value="Colleague">Colleague / Serving Officer</option>
                <option value="Family">Family Member</option>
                <option value="Friend">Friend</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Message</label>
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-y"></textarea>
            </div>

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
              </div>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-xs py-6 mt-2">
              {status === "submitting" ? "Submitting..." : "Submit Tribute"}
            </Button>
            <p className="text-[10px] text-slate-500 text-center mt-2">All tributes are moderated before appearing publicly to ensure a respectful environment.</p>
          </form>
        )}
      </div>

    </div>
  );
}
