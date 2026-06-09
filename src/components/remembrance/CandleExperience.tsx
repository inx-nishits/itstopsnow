"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, CheckCircle2 } from "lucide-react";

interface CandleExperienceProps {
  memorialId: string;
  initialCount: number;
  onLit: () => void;
}

export default function CandleExperience({ memorialId, initialCount, onLit }: CandleExperienceProps) {
  const [isLit, setIsLit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLightCandle = async () => {
    if (isLit || loading) return;
    setLoading(true);

    try {
      // In a real app we'd fetch user session or ask for an email, 
      // here we simulate a device ID for the one-candle rule demo.
      let deviceId = localStorage.getItem('device_id');
      if (!deviceId) {
        deviceId = Math.random().toString(36).substring(2);
        localStorage.setItem('device_id', deviceId);
      }

      // Check local storage specific rule first
      if (localStorage.getItem(`lit_candle_${memorialId}`)) {
        setMessage("You have already lit a candle here.");
        setLoading(false);
        setIsLit(true); // show as lit visually
        return;
      }

      const res = await fetch('/api/candle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memorialId, userIdentifier: deviceId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      localStorage.setItem(`lit_candle_${memorialId}`, 'true');
      setIsLit(true);
      setCount(c => c + 1);
      setMessage("Thank you for remembering. Your candle joins thousands of others in honouring this officer.");
      onLit(); // Triggers the portrait color restoration logic in parent

    } catch (error: any) {
      setMessage(error.message || "Failed to light candle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 rounded-2xl bg-[#010B19] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Illumination Gradient (activates when lit) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-3000 ease-in-out pointer-events-none ${isLit ? 'opacity-100' : isHovered ? 'opacity-20' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at center 60%, rgba(251, 191, 36, 0.15) 0%, rgba(1, 11, 25, 0) 70%)'
        }}
      ></div>

      <div className="text-center mb-8 relative z-10">
        <h3 className="font-serif text-2xl text-white mb-2">Light a Candle</h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">Take a moment to pause and remember their service.</p>
      </div>

      {/* The Candle Graphic & Interaction Area */}
      <div 
        className="relative w-32 h-48 cursor-pointer flex flex-col items-center justify-end z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLightCandle}
      >
        {/* Flame Animation Container */}
        <div className="absolute top-0 w-full h-24 flex justify-center items-end pb-2">
          {isLit ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [0.8, 1, 0.9, 1, 0.8],
                y: [0, -2, 1, -1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Inner core */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 bg-white rounded-[50%_50%_20%_20%] blur-[1px]"></div>
              {/* Middle flame */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-10 bg-yellow-300 rounded-[50%_50%_20%_20%] blur-[3px] mix-blend-screen opacity-90"></div>
              {/* Outer glow */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-16 bg-orange-500 rounded-full blur-[10px] mix-blend-screen opacity-60"></div>
            </motion.div>
          ) : (
            <div className={`w-1 h-3 rounded-t-full transition-colors duration-300 ${isHovered ? 'bg-amber-500/50' : 'bg-slate-700'}`}></div>
          )}
        </div>

        {/* Wax Body */}
        <div className={`w-12 h-24 rounded-t-sm rounded-b-md relative transition-colors duration-1000 ${isLit ? 'bg-[#fff5e6]' : 'bg-[#e2e8f0]'}`}>
          {/* Subtle shading */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 rounded-t-sm rounded-b-md"></div>
          {/* Top melt pool indent */}
          <div className="absolute top-0 left-0 right-0 h-2 rounded-[50%] bg-black/10 border-b border-white/20"></div>
        </div>
      </div>

      <div className="mt-8 text-center relative z-10 h-20">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Flame className={`w-4 h-4 ${isLit ? 'text-amber-500' : 'text-slate-500'}`} />
          <span className="text-xl font-serif text-white">{count.toLocaleString()}</span>
        </div>
        
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-amber-500/90 font-medium max-w-xs mx-auto"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
