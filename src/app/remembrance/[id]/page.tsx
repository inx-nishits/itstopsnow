"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Flame, MessageCircle, Heart, Calendar, ArrowRight, ArrowLeft, Download, Camera, Clock, X, Info, Mail, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
];

const RealisticCandle = ({ isLit }: { isLit: boolean }) => (
  <div className="relative flex flex-col items-center justify-end h-40 w-16 group">
    {/* Flame and Glow */}
    <div className={`absolute top-0 transition-all duration-1000 flex flex-col items-center ${isLit ? 'opacity-100' : 'opacity-0 scale-50 translate-y-4'}`}>
      {/* Deep Outer Glow */}
      <div className="absolute top-2 w-32 h-32 bg-amber-600/20 rounded-full blur-2xl animate-pulse"></div>
      {/* Inner Glow */}
      <div className="absolute top-4 w-16 h-16 bg-yellow-400/40 rounded-full blur-xl animate-pulse" style={{ animationDuration: '2s' }}></div>
      
      {/* Flame Body */}
      <div className="relative w-5 h-12 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-[50%_50%_20%_20%] shadow-[0_0_20px_rgba(251,191,36,1)] origin-bottom animate-[flicker_3s_infinite]" style={{ filter: 'blur(0.5px)' }}>
        {/* Inner bright core */}
        <div className="absolute bottom-1.5 left-[4px] w-3 h-6 bg-white rounded-full blur-[1px]"></div>
      </div>
    </div>
    
    {/* Wick */}
    <div className="w-1 h-3 bg-zinc-900 rounded-t-sm z-10 relative">
      {isLit && <div className="absolute -top-1 left-0 right-0 h-2 bg-orange-600 blur-[1px] rounded-full"></div>}
    </div>
    
    {/* Wax Body */}
    <div className={`w-10 h-24 rounded-t-sm rounded-b-md shadow-inner relative overflow-hidden transition-colors duration-1000 ${isLit ? 'bg-gradient-to-b from-amber-100 via-slate-100 to-slate-200 border-amber-200' : 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 border-slate-300'}`}>
      {/* Melted top pool */}
      <div className={`absolute top-0 left-0 right-0 h-3 rounded-[50%] transition-colors duration-1000 ${isLit ? 'bg-amber-200/60 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]' : 'bg-slate-300/50'}`}></div>
      
      {/* Dynamic Wax drips if lit */}
      <div className={`absolute top-2 left-1.5 w-1 bg-amber-50 rounded-b-full transition-all duration-[5000ms] shadow-sm ${isLit ? 'h-10 opacity-90' : 'h-0 opacity-0'}`}></div>
      <div className={`absolute top-1 right-2 w-1.5 bg-amber-50/80 rounded-b-full transition-all duration-[8000ms] shadow-sm ${isLit ? 'h-14 opacity-80' : 'h-0 opacity-0'}`}></div>
      
      {/* Subtle texture/gradient line */}
      <div className="absolute inset-y-0 left-2 w-px bg-white/40"></div>
    </div>
  </div>
);

export default function MemorialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [isLit, setIsLit] = useState(false);
  const [globalCandles, setGlobalCandles] = useState(85);
  const [localGrayscaleOverride, setLocalGrayscaleOverride] = useState<number | null>(null);
  
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isAllPhotosModalOpen, setIsAllPhotosModalOpen] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [currentTributeIndex, setCurrentTributeIndex] = useState(0);
  
  const [isTributeFormOpen, setIsTributeFormOpen] = useState(false);
  const [tributeForm, setTributeForm] = useState({ name: "", email: "", title: "", content: "" });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmittingTribute, setIsSubmittingTribute] = useState(false);
  const [tributeSuccess, setTributeSuccess] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const litState = localStorage.getItem(`isn_lit_candle_${id}`);
    if (litState) {
      setIsLit(true);
    }
  }, [id]);

  const officer = {
    name: "PC ANDREW HARPER",
    role: "Police Constable (PC)",
    force: "Thames Valley Police",
    years: "1990 – 2019",
    age: 28,
    quote: "\"A hero remembered.\nA life that mattered.\"",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
    stats: {
      tributes: "1,927",
      remembered: "8,432",
      dateOfLoss: "24 MAY 2019"
    },
    about: "Andrew was a dedicated police officer who served with pride and compassion. He was known for his kindness, his sense of humour, and his unwavering commitment to protecting his community.\n\nHe is deeply missed by his family, friends, colleagues, and all whose lives he touched.",
    familyQuote: "He just loved helping people.\nThat was Andrew.\nHe would do anything for anyone.\nHe was our hero."
  };

  const tributes = [
    { name: "Sarah L.", type: "Family Member", time: "2 days ago", text: "Thinking of Andrew today and always. Thank you for your service and for being you." },
    { name: "James R.", type: "Serving Officer", time: "3 days ago", text: "We will never forget you, brother. Rest easy." },
    { name: "Emma T.", type: "Friend", time: "4 days ago", text: "Your smile and kindness will never be forgotten." },
    { name: "Michael K.", type: "Colleague", time: "1 week ago", text: "An absolute honour to have served alongside you." }
  ];

  const calculateGrayscale = (count: number) => {
    if (count <= 100) return 95;
    if (count >= 5000) return 0;
    if (count <= 500) return 95 - ((count - 100) / 400) * 15;
    if (count <= 2000) return 80 - ((count - 500) / 1500) * 30;
    return 50 - ((count - 2000) / 3000) * 50;
  };

  const grayscaleValue = calculateGrayscale(globalCandles);
  const currentGrayscale = localGrayscaleOverride !== null ? localGrayscaleOverride : grayscaleValue;

  const handleLightCandle = () => {
    if (isLit) return;
    setIsLit(true);
    localStorage.setItem(`isn_lit_candle_${id}`, 'true');
    setGlobalCandles(prev => prev + 1);
    setLocalGrayscaleOverride(0);
    setTimeout(() => {
      setLocalGrayscaleOverride(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pt-24 pb-24 selection:bg-[#1877F2] selection:text-white">
      
      {/* Custom keyframes for candle flicker */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); opacity: 1; }
          25% { transform: scale(1.05) rotate(1deg); opacity: 0.95; }
          50% { transform: scale(0.98) rotate(-0.5deg); opacity: 0.9; }
          75% { transform: scale(1.02) rotate(0.5deg); opacity: 0.95; }
        }
      `}} />

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 mb-8 pt-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/remembrance" className="hover:text-white transition-colors">Wall of Remembrance</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{officer.name}</span>
        </div>

        {/* 1. REVAMPED HERO BANNER: Split Layout */}
        <section className="bg-[#050A14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-16 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544813545-482723290c48?auto=format&fit=crop&q=80')] bg-cover opacity-5 mix-blend-screen pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            
            {/* Left: Officer Portrait */}
            <div className="relative h-[60vh] lg:h-auto min-h-[650px]">
              <img 
                src={officer.image} 
                alt={officer.name} 
                style={{ filter: `grayscale(${currentGrayscale}%)` }}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[5000ms] ease-in-out ${isLit ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#050A14]" />
              {isLit && <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay transition-opacity duration-1000" />}
            </div>

            {/* Right: Officer Details & Actions */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-6">
                <div className="inline-flex">
                  <span className="text-[#1877F2] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#1877F2]/10 px-4 py-2 rounded-full border border-[#1877F2]/20 whitespace-nowrap">
                    {officer.role}
                  </span>
                </div>
                <div className="inline-flex">
                  <span className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest border-l-0 sm:border-l sm:border-white/20 sm:pl-4 whitespace-nowrap">
                    {officer.force}
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-tight">
                {officer.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-medium tracking-widest uppercase mb-10">
                <span>{officer.years}</span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <span>Age {officer.age}</span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <span>{officer.stats.dateOfLoss}</span>
              </div>

              {/* Action Box */}
              <div className="bg-[#020611]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 md:gap-8">
                
                {/* Candle Interact */}
                <div className="flex flex-col items-center justify-center min-w-[120px]">
                  <RealisticCandle isLit={isLit} />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{globalCandles.toLocaleString()}</div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500">Candles Lit</div>
                  </div>
                </div>

                {/* Primary Buttons */}
                <div className="flex flex-col justify-center gap-4 flex-grow w-full">
                  <Button 
                    onClick={handleLightCandle}
                    disabled={isLit}
                    className={`w-full py-7 font-bold text-xs tracking-widest uppercase transition-all duration-500 ${
                      isLit 
                      ? 'bg-white/5 text-white/50 border border-white/5 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:-translate-y-1'
                    }`}
                  >
                    {isLit ? <span className="flex items-center gap-2">CANDLE LIT <Flame className="w-4 h-4 text-amber-500"/></span> : 'LIGHT A CANDLE'}
                  </Button>
                  
                  <div className="flex flex-wrap gap-4 w-full">
                    <Button 
                      onClick={() => setIsTributeFormOpen(true)}
                      className="flex-1 min-w-[150px] bg-white hover:bg-slate-200 text-[#050A14] font-bold text-[10px] md:text-xs tracking-widest uppercase h-12 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all border-none px-4"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" /> 
                      <span className="whitespace-nowrap">LEAVE TRIBUTE</span>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. STREAMLINED CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Main Story Column */}
          <div className="lg:col-span-8 space-y-16">
            
            <section className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-4">
                THEIR STORY
              </h2>
              <p className="text-xl italic font-serif text-[#1877F2] leading-relaxed mb-8 border-l-4 border-[#1877F2] pl-6">
                {officer.quote}
              </p>
              <div className="text-slate-300 leading-loose whitespace-pre-line">
                {officer.about}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                <Camera className="w-6 h-6 text-slate-500"/> PHOTO GALLERY
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <img onClick={() => setActivePhotoIndex(0)} src={GALLERY_PHOTOS[0]} className="w-full aspect-square object-cover rounded-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer border border-white/5 hover:border-white/20" alt="Gallery 1" />
                <img onClick={() => setActivePhotoIndex(1)} src={GALLERY_PHOTOS[1]} className="w-full aspect-square object-cover rounded-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer border border-white/5 hover:border-white/20" alt="Gallery 2" />
                <img onClick={() => setActivePhotoIndex(2)} src={GALLERY_PHOTOS[2]} className="w-full aspect-square object-cover rounded-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer border border-white/5 hover:border-white/20" alt="Gallery 3" />
              </div>
              <Button onClick={() => setIsAllPhotosModalOpen(true)} variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 text-[10px] tracking-widest uppercase">
                View All Photos <ArrowRight className="w-3 h-3 ml-2"/>
              </Button>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-12">
            
            <section className="bg-[#051024] p-8 rounded-3xl border border-white/5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#1877F2]"/> CAREER TIMELINE
              </h2>
              <div className="relative border-l border-white/10 ml-2 space-y-8 pb-4">
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Response Officer</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2010</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Completed initial training and was posted to response team.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Bravery Commendation</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2014</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Awarded Chief Constable's Commendation.</p>
                </div>
                {isTimelineExpanded && (
                  <div className="relative pl-8">
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                    <h4 className="text-white font-bold text-sm">Advanced Driver</h4>
                    <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2016</p>
                    <p className="text-slate-400 text-xs leading-relaxed">Completed advanced driver training.</p>
                  </div>
                )}
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Roads Policing Officer</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2018</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Moved to specialized roads policing unit.</p>
                </div>
              </div>
              <Button onClick={() => setIsTimelineExpanded(!isTimelineExpanded)} variant="ghost" className="w-full mt-4 text-[#1877F2] hover:text-blue-400 hover:bg-[#1877F2]/10 text-[10px] tracking-widest uppercase">
                {isTimelineExpanded ? "COLLAPSE" : "EXPAND TIMELINE"}
              </Button>
            </section>

            <section className="bg-gradient-to-br from-[#1877F2]/10 to-transparent p-8 rounded-3xl border border-[#1877F2]/20">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] mb-4">FAMILY TRIBUTE</h3>
              <p className="text-white font-serif italic leading-relaxed text-lg whitespace-pre-line">
                {officer.familyQuote}
              </p>
            </section>

            {/* SOCIAL SHARING SECTION */}
            <div className="bg-[#050A14] border border-white/5 rounded-3xl p-8 shadow-xl">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Share2 className="w-3 h-3"/> SHARE MEMORIAL
              </h3>
              <div className="flex flex-col gap-3">
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/20 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  Share on Facebook
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Honouring ${officer.name}`)}`, '_blank')} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  Share on X / Twitter
                </button>
                <button onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(`Honouring ${officer.name}`)}&body=${encodeURIComponent(`I would like to share this memorial with you:\n\n`)}` + encodeURIComponent(window.location.href)} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  <Mail className="w-4 h-4"/> Share via Email
                </button>
                <button onClick={handleCopyLink} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  {isCopied ? <Check className="w-4 h-4 text-green-400"/> : <LinkIcon className="w-4 h-4"/>} 
                  {isCopied ? <span className="text-green-400">Link Copied!</span> : "Copy Share Link"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DEDICATED TRIBUTES SECTION (FULL WIDTH) */}
      <section className="border-t border-white/10 bg-[#050A14] py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-2">REMEMBERED BY</h2>
              <p className="text-slate-400">Read tributes left by friends, family, and colleagues.</p>
            </div>
            <Button onClick={() => setIsTributeFormOpen(true)} className="bg-[#1877F2] hover:bg-blue-600 text-white px-8 py-6 rounded-md text-xs font-bold uppercase tracking-widest transition-colors">
              LEAVE A TRIBUTE
            </Button>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTributeIndex * (100/3)}%)` }}>
                {tributes.map((tribute, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3">
                    <div className="bg-[#030712] border border-white/5 p-8 rounded-2xl flex flex-col h-full hover:border-white/10 transition-colors">
                      <p className="text-slate-300 text-base leading-relaxed mb-8 flex-grow italic">"{tribute.text}"</p>
                      <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                        <div className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-lg font-bold text-[#1877F2] border border-[#1877F2]/20">
                          {tribute.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white mb-1">{tribute.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{tribute.type}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: Math.ceil(tributes.length / 3) }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentTributeIndex(i * 3)}
                  className={`h-2 rounded-full transition-all ${i * 3 === currentTributeIndex ? 'bg-[#1877F2] w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALL PHOTOS MODAL */}
      <AnimatePresence>
        {isAllPhotosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAllPhotosModalOpen(false)}
              className="absolute inset-0 bg-[#020611]/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative bg-[#051024] border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 z-10"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#051024] py-4 z-20 border-b border-white/5">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-white">ALL PHOTOS</h2>
                <button onClick={() => setIsAllPhotosModalOpen(false)} className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {GALLERY_PHOTOS.map((imgUrl, i) => (
                  <img key={i} onClick={() => setActivePhotoIndex(i)} src={imgUrl} className="w-full aspect-square object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer border border-white/5" alt={`Gallery item ${i}`} />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRIBUTE SUBMISSION MODAL */}
      <AnimatePresence>
        {isTributeFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTributeFormOpen(false)}
              className="absolute inset-0 bg-[#020611]/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative bg-[#051024] border border-white/10 max-w-2xl w-full rounded-3xl p-8 md:p-12 z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
                  {tributeSuccess ? "TRIBUTE SUBMITTED" : "LEAVE A TRIBUTE"}
                </h2>
                <button onClick={() => { setIsTributeFormOpen(false); setTimeout(() => setTributeSuccess(false), 300); }} className="text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {tributeSuccess ? (
                <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold uppercase tracking-tight text-white mb-4">Thank You</h4>
                  <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                    Your tribute has been securely submitted. All tributes are moderated before being published to ensure a respectful environment.
                  </p>
                  <Button onClick={() => { setIsTributeFormOpen(false); setTimeout(() => setTributeSuccess(false), 300); }} className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full">
                    Close Window
                  </Button>
                </div>
              ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your Name</label>
                    <input type="text" value={tributeForm.name} onChange={(e) => setTributeForm({...tributeForm, name: e.target.value})} placeholder="e.g. John Smith" className="bg-[#030712] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#1877F2]"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tribute To</label>
                    <input type="text" value={officer.name} readOnly className="bg-[#030712]/50 border border-white/5 text-slate-400 text-sm px-4 py-3 rounded-xl cursor-not-allowed"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your Email Address</label>
                    <input type="email" value={tributeForm.email} onChange={(e) => setTributeForm({...tributeForm, email: e.target.value})} placeholder="john@example.com" className="bg-[#030712] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#1877F2]"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tribute Title</label>
                    <input type="text" value={tributeForm.title} onChange={(e) => setTributeForm({...tributeForm, title: e.target.value})} placeholder="e.g. A True Friend" className="bg-[#030712] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#1877F2]"/>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tribute Content</label>
                  <textarea rows={5} value={tributeForm.content} onChange={(e) => setTributeForm({...tributeForm, content: e.target.value})} placeholder="Write your message here..." className="bg-[#030712] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#1877F2] resize-none"></textarea>
                </div>
                
                <Button 
                  onClick={() => {
                    setIsSubmittingTribute(true);
                    setTimeout(() => {
                      setIsSubmittingTribute(false);
                      setTributeSuccess(true);
                    }, 1500);
                  }} 
                  disabled={isSubmittingTribute}
                  className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-6 rounded-xl text-[10px] tracking-widest uppercase transition-colors"
                >
                  {isSubmittingTribute ? "SUBMITTING..." : "SUBMIT TRIBUTE"}
                </Button>
                <p className="text-center text-[10px] text-slate-500 mt-4 flex items-center justify-center gap-1.5"><Info className="w-3 h-3"/> All tributes are moderated before being published.</p>
              </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhotoIndex(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center z-10 group">
              <button onClick={() => setActivePhotoIndex(null)} className="absolute -top-12 right-0 text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-20">
                <X className="w-6 h-6" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : GALLERY_PHOTOS.length - 1)); }}
                className="absolute -left-4 md:-left-16 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#1877F2] transition-colors border border-white/10 z-20 hidden md:flex"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <img src={GALLERY_PHOTOS[activePhotoIndex]} alt="Memorial Lightbox" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
              
              <button 
                onClick={(e) => { e.stopPropagation(); setActivePhotoIndex((prev) => (prev! < GALLERY_PHOTOS.length - 1 ? prev! + 1 : 0)); }}
                className="absolute -right-4 md:-right-16 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#1877F2] transition-colors border border-white/10 z-20 hidden md:flex"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white tracking-widest border border-white/10 z-20">
                {activePhotoIndex + 1} / {GALLERY_PHOTOS.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
