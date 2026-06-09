"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

interface CandleCardProps {
  name: string;
  force: string;
  dates: string;
  imageUrl: string;
  initialCandles: number;
}

export function CandleCard({ name, force, dates, imageUrl, initialCandles }: CandleCardProps) {
  const [lit, setLit] = useState(false);
  const [candles, setCandles] = useState(initialCandles);

  const handleLightCandle = () => {
    if (!lit) {
      setLit(true);
      setCandles(candles + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#050A15] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col group relative"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
        {/* Officer Image */}
        <motion.img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full"
          initial={{ filter: "grayscale(100%) contrast(1.1) brightness(0.7)" }}
          animate={{
            filter: lit ? "grayscale(30%) contrast(1.1) brightness(0.9)" : "grayscale(100%) contrast(1.1) brightness(0.7)",
            scale: lit ? 1.05 : 1,
          }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Amber Light Overlay when lit */}
        <AnimatePresence>
          {lit && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute inset-0 bg-orange-500/20 mix-blend-overlay"
            />
          )}
        </AnimatePresence>

        {/* Text Details */}
        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
          <h3 className="font-heading font-bold text-2xl mb-1 drop-shadow-md">{name}</h3>
          <p className="text-sm text-slate-300 font-medium mb-1 drop-shadow-md">{force}</p>
          <p className="text-xs text-slate-400 tracking-wider drop-shadow-md">{dates}</p>
        </div>
      </div>
      
      <div className="p-6 flex flex-col gap-4 bg-[#050A15]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Attractive Interactive Candle */}
            <div className="relative w-8 h-10 flex items-end justify-center">
              {/* Unlit state / base */}
              <div className={`w-3 h-6 rounded-sm rounded-t-md transition-colors duration-1000 ${lit ? 'bg-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-slate-700'}`}>
                {/* Wick */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-900 rounded-full" />
              </div>
              
              {/* Flame */}
              <AnimatePresence>
                {lit && (
                  <motion.div
                    className="absolute -top-4 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,1)]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1, 1.05, 0.95, 1], 
                      opacity: [0, 1, 0.9, 1, 0.8, 1],
                      rotate: [0, -2, 2, -1, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.5,
                      scale: { repeat: Infinity, duration: 2, repeatType: "mirror" },
                      opacity: { repeat: Infinity, duration: 0.5, repeatType: "mirror" },
                      rotate: { repeat: Infinity, duration: 1.5, repeatType: "mirror" }
                    }}
                  >
                    <Flame className="w-6 h-6 fill-orange-500 stroke-orange-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div>
              <motion.p 
                key={candles}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-xl font-bold text-white font-heading"
              >
                {candles.toLocaleString()}
              </motion.p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Candles Lit</p>
            </div>
          </div>
          
          <Button 
            onClick={handleLightCandle}
            disabled={lit}
            className={`transition-all duration-500 ${
              !lit 
                ? "bg-white text-black hover:bg-slate-200 shadow-lg font-bold px-6" 
                : "border border-slate-800 text-slate-500 bg-transparent opacity-50 px-6 cursor-default"
            }`}
          >
            {lit ? "Honoured" : "Light Candle"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
