"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useGetInvolvedForm } from "@/hooks/useGetInvolvedForm";
import { useModalA11y } from "@/hooks/useModalA11y";
import { modalBackdropMotion, modalPanelMotion } from "@/lib/theme/motion";

interface GetInvolvedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetInvolvedModal({ isOpen, onClose }: GetInvolvedModalProps) {
  const getInvolved = useGetInvolvedForm();
  const prefersReducedMotion = useReducedMotion();

  function handleClose() {
    onClose();
    getInvolved.reset();
  }

  const setDialogRef = useModalA11y(isOpen, handleClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center safe-area-modal">
          <motion.div
            {...modalBackdropMotion(prefersReducedMotion)}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            ref={setDialogRef}
            {...modalPanelMotion(prefersReducedMotion)}
            className="bg-[#050b18] border border-white/10 rounded-3xl w-full max-w-lg p-8 md:p-10 relative overflow-y-auto max-h-[min(90dvh,720px)] shadow-2xl z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-involved-title"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="get-involved-title" className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
              GET INVOLVED
            </h3>
            <p className="text-[#1877F2] font-bold text-xs uppercase tracking-widest mb-6">
              Stand with those who protect us
            </p>

            {getInvolved.isSuccess ? (
              <div className="space-y-4 py-2" role="status" aria-live="polite">
                <p className="text-white text-sm leading-relaxed">
                  Thank you! Your information has been registered. Together, we can make a difference.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] cursor-pointer min-h-[48px]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void getInvolved.submit();
                }}
                className="space-y-4"
                noValidate
              >
                {getInvolved.status === "error" && getInvolved.errorMessage && (
                  <p className="text-xs text-red-400 leading-relaxed" role="alert">
                    {getInvolved.errorMessage}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                  <input
                    required
                    type="text"
                    value={getInvolved.values.name}
                    onChange={(e) => getInvolved.setField("name", e.target.value)}
                    disabled={getInvolved.isLoading}
                    aria-invalid={Boolean(getInvolved.fieldErrors.name)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm min-h-[48px] disabled:opacity-60"
                    placeholder="Your Name"
                  />
                  {getInvolved.fieldErrors.name && (
                    <p className="text-xs text-red-400 mt-1.5">{getInvolved.fieldErrors.name}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Role / Force</label>
                    <input
                      type="text"
                      value={getInvolved.values.role}
                      onChange={(e) => getInvolved.setField("role", e.target.value)}
                      disabled={getInvolved.isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm min-h-[48px] disabled:opacity-60"
                      placeholder="e.g. PC / Supporter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Telephone</label>
                    <input
                      type="tel"
                      value={getInvolved.values.phone}
                      onChange={(e) => getInvolved.setField("phone", e.target.value)}
                      disabled={getInvolved.isLoading}
                      aria-invalid={Boolean(getInvolved.fieldErrors.phone)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm min-h-[48px] disabled:opacity-60"
                      placeholder="Phone Number"
                    />
                    {getInvolved.fieldErrors.phone && (
                      <p className="text-xs text-red-400 mt-1.5">{getInvolved.fieldErrors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={getInvolved.values.email}
                    onChange={(e) => getInvolved.setField("email", e.target.value)}
                    disabled={getInvolved.isLoading}
                    aria-invalid={Boolean(getInvolved.fieldErrors.email)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm min-h-[48px] disabled:opacity-60"
                    placeholder="email@example.com"
                  />
                  {getInvolved.fieldErrors.email && (
                    <p className="text-xs text-red-400 mt-1.5">{getInvolved.fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Message</label>
                  <textarea
                    rows={3}
                    value={getInvolved.values.message}
                    onChange={(e) => getInvolved.setField("message", e.target.value)}
                    disabled={getInvolved.isLoading}
                    aria-invalid={Boolean(getInvolved.fieldErrors.message)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm resize-none disabled:opacity-60"
                    placeholder="How would you like to support the movement?"
                  />
                  {getInvolved.fieldErrors.message && (
                    <p className="text-xs text-red-400 mt-1.5">{getInvolved.fieldErrors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={getInvolved.isLoading}
                  className="w-full bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] cursor-pointer min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {getInvolved.isLoading ? "Submitting…" : "Submit Details"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
