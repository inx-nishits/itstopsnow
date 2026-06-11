"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Shield, Download, ExternalLink } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#050b18] border border-white/10 rounded-3xl w-full max-w-lg p-8 md:p-10 relative overflow-hidden shadow-2xl z-10"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon Header */}
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Shield className="w-6 h-6 text-[#1877F2]" />
            </div>

            {/* Title */}
            <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
              SUPPORT THE MOVEMENT
            </h3>
            <p className="text-[#1877F2] font-bold text-xs uppercase tracking-widest mb-6">
              Fully Funded & Independent
            </p>

            {/* Message block */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-8">
              <p>
                To maintain absolute independence and advocate fiercely for our officers, <strong>It Stops Now does not accept public donations, government grants, or corporate sponsorships.</strong>
              </p>
              <p>
                Our campaign operations, legal support network, and advocacy initiatives are fully funded and sustained by **Pocket Sergeant Ltd.**
              </p>
              <p className="text-slate-400">
                The most impactful way to support our mission is to subscribe to the Pocket Sergeant app—the essential toolkit built for UK police officers.
              </p>
            </div>

            {/* Download/App Promo Box */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8 flex flex-col items-center">
              <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" /> STAND WITH US
              </h4>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href="https://apps.apple.com/gb/app/pocket-sergeant/id931215423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl border border-white/10 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#1877F2]" /> App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.pocketsergeant.police"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl border border-white/10 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#1877F2]" /> Google Play
                </a>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-between items-center border-t border-white/5 pt-6">
              <a
                href="https://pocketsergeant.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                Pocket Sergeant Site <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
              <button
                onClick={onClose}
                className="text-[#1877F2] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
