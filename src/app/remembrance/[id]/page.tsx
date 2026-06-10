"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Flame, MessageCircle, Heart, Calendar, ArrowRight, Download, Camera, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMemorialPDF } from "@/lib/documentGenerator";

export default function MemorialDetailPage({ params }: { params: { id: string } }) {
  const [isLit, setIsLit] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [globalCandles, setGlobalCandles] = useState(85); // Starting with a low number to demo the effect

  // Mock data based on the design
  const officer = {
    name: "PC ANDREW HARPER",
    force: "Thames Valley Police",
    years: "1990 – 2019",
    quote: "\"A hero remembered.\nA life that mattered.\"",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    stats: {
      tributes: "1,927",
      remembered: "8,432",
      dateOfLoss: "24 MAY 2019"
    },
    about: "Andrew was a dedicated police officer who served with pride and compassion. He was known for his kindness, his sense of humor, and his unwavering commitment to protecting his community.\n\nHe is deeply missed by his family, friends, colleagues, and all whose lives he touched.",
    familyQuote: "He just loved helping people.\nThat was Andrew.\nHe would do anything for anyone.\nHe was our hero."
  };

  const tributes = [
    { name: "Sarah L.", type: "Family Member", time: "2 days ago", text: "Thinking of Andrew today and always. Thank you for your service and for being you." },
    { name: "James R.", type: "Serving Officer", time: "3 days ago", text: "We will never forget you, brother. Rest easy." },
    { name: "Emma T.", type: "Friend", time: "4 days ago", text: "Your smile and kindness will never be forgotten." }
  ];

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateMemorialPDF(officer, tributes);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Memorial_${officer.name.replace(/\s+/g, '_')}.pdf`;
      a.click();
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate grayscale based on global candle count
  // 0-100: 95% grayscale
  // 500: ~80% grayscale
  // 2000: 50% grayscale
  // 5000+: 0% grayscale
  const calculateGrayscale = (count: number) => {
    if (count <= 100) return 95;
    if (count >= 5000) return 0;
    // Logarithmic-like decay for smooth transition
    if (count <= 500) return 95 - ((count - 100) / 400) * 15; // 95 to 80
    if (count <= 2000) return 80 - ((count - 500) / 1500) * 30; // 80 to 50
    return 50 - ((count - 2000) / 3000) * 50; // 50 to 0
  };

  const grayscaleValue = calculateGrayscale(globalCandles);

  const handleLightCandle = () => {
    setIsLit(true);
    setGlobalCandles(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/remembrance" className="hover:text-white transition-colors">Wall of Remembrance</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{officer.name}</span>
        </div>

        {/* Top Hero Block */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 relative transition-all duration-1000 shadow-2xl">
              <img 
                src={officer.image} 
                alt={officer.name} 
                style={{ filter: `grayscale(${grayscaleValue}%)` }}
                className={`w-full h-full object-cover transition-all duration-3000 ease-in-out ${isLit ? 'scale-105' : ''}`}
              />
              <div className={`absolute inset-0 transition-opacity duration-3000 ${isLit ? 'opacity-0' : 'bg-gradient-to-t from-[#030712] to-transparent opacity-60'}`}></div>
              {isLit && <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>}
            </div>
          </div>
          
          <div className="w-full md:w-2/3 xl:w-3/4 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white mb-2">{officer.name}</h1>
            <p className="text-slate-400 text-sm tracking-widest mb-1">{officer.force}</p>
            <p className="text-slate-500 text-xs tracking-widest mb-10">{officer.years}</p>
            
            <p className="text-2xl italic font-serif text-white mb-10 whitespace-pre-line leading-relaxed">
              {officer.quote}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleLightCandle}
                disabled={isLit}
                className={`font-bold px-8 py-6 rounded-md text-[10px] tracking-widest uppercase transition-all duration-500 ${isLit ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : 'bg-[#1877F2] hover:bg-blue-600 text-white'}`}
              >
                {isLit ? <span className="flex items-center gap-2"><Flame className="w-4 h-4 animate-pulse" /> CANDLE LIT</span> : 'LIGHT A CANDLE'}
              </Button>
              <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 font-bold px-8 py-6 rounded-md text-[10px] tracking-widest uppercase transition-colors">
                LEAVE A TRIBUTE
              </Button>
              <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 p-6 rounded-md transition-colors aspect-square">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10 py-8 mb-16 gap-6">
          <div className="flex items-center gap-4 border-r border-white/5 last:border-0 px-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Flame className={`w-5 h-5 text-amber-500 ${isLit ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-white mb-1">{globalCandles.toLocaleString()}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">GLOBAL CANDLES LIT</div>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-white/5 last:border-0 px-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#1877F2]" />
            </div>
            <div>
              <div className="text-xl font-bold text-white mb-1">{officer.stats.tributes}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">TRIBUTES</div>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-white/5 last:border-0 px-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-white mb-1">{officer.stats.remembered}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">PEOPLE REMEMBERED</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white mb-1">{officer.stats.dateOfLoss}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">DATE OF LOSS</div>
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* ABOUT ANDREW */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">ABOUT ANDREW</h3>
              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line max-w-3xl">
                {officer.about}
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-2"><Clock className="w-4 h-4 text-[#1877F2]"/> SERVICE & CAREER TIMELINE</h3>
              <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Joined Thames Valley Police</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2010</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Completed initial training and was posted to response team, distinguishing himself early on for his commitment.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Commendation for Bravery</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2014</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Awarded Chief Constable's Commendation for off-duty intervention in an armed robbery.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1877F2]"></div>
                  <h4 className="text-white font-bold text-sm">Traffic Division</h4>
                  <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2">2018</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Moved to specialized roads policing unit, fulfilling a long-held career ambition.</p>
                </div>
              </div>
            </section>

            {/* PHOTO GALLERY */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2"><Camera className="w-4 h-4 text-[#1877F2]"/> PHOTO GALLERY</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" className="w-full h-40 object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt="Gallery 1" />
                <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=400" className="w-full h-40 object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt="Gallery 2" />
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" className="w-full h-40 object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt="Gallery 3" />
              </div>
            </section>

            {/* TRIBUTES */}
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">TRIBUTES</h3>
                <Link href="/remembrance" className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                  View all ({officer.stats.tributes})
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tributes.map((tribute, i) => (
                  <div key={i} className="bg-[#051024] border border-white/5 p-6 rounded-md flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {tribute.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{tribute.name}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-wider">{tribute.type}</div>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500">{tribute.time}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow">{tribute.text}</p>
                    <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-auto">
                      <button className="flex items-center gap-1 hover:text-white transition-colors"><Heart className="w-3 h-3" /> 12</button>
                      <button className="flex items-center gap-1 hover:text-white transition-colors"><MessageCircle className="w-3 h-3" /> Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* RECENT CANDLES */}
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">RECENT CANDLES</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { name: isLit ? "You" : "Mark D.", msg: "Lit a candle" },
                  { name: "Clare W.", msg: "Lit a candle" },
                  { name: "Anonymous", msg: "Lit a candle" },
                  { name: "Tom H.", msg: "Lit a candle" },
                  { name: "Rachel F.", msg: "Lit a candle" }
                ].map((candle, i) => (
                  <div key={i} className="bg-[#051024] border border-white/5 p-4 rounded-md flex flex-col items-center text-center">
                    <Flame className={`w-8 h-8 mb-3 ${isLit && i === 0 ? 'text-amber-500 animate-pulse' : 'text-amber-500/50'}`} />
                    <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">{candle.name}</div>
                    <div className="text-[9px] text-slate-500">{candle.msg}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* BOOK OF CONDOLENCE */}
            <section className="bg-[#051024] border border-white/5 rounded-md overflow-hidden relative">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">BOOK OF CONDOLENCE</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Download all tributes and messages to create a printed book for Andrew's family.
                  </p>
                  <div>
                    <Button 
                      onClick={handleDownloadPDF} 
                      disabled={isGenerating}
                      className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-5 rounded-md text-[10px] tracking-widest uppercase transition-colors"
                    >
                      {isGenerating ? "GENERATING..." : <span className="flex items-center gap-2"><Download className="w-4 h-4"/> DOWNLOAD PDF</span>}
                    </Button>
                  </div>
                </div>
                <div className="bg-[url('https://images.unsplash.com/photo-1544813545-482723290c48?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center min-h-[250px] opacity-80"></div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">IN THEIR OWN WORDS</h3>
              <div className="bg-[#051024] border border-white/5 p-10 rounded-md">
                <p className="text-xl font-serif text-white leading-relaxed italic mb-8 whitespace-pre-line">
                  {officer.familyQuote}
                </p>
                <p className="text-[#1877F2] text-sm font-bold uppercase tracking-widest">
                  – Family Tribute
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* PROTOTYPE CONTROL PANEL (Only visible during UI/UX validation) */}
      <div className="fixed bottom-6 right-6 z-50 bg-[#051024] border border-white/20 p-6 rounded-xl shadow-2xl w-80">
        <h4 className="text-xs font-bold text-[#1877F2] uppercase tracking-widest mb-4">Prototyping Controls</h4>
        <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
          Simulate global database candle counts to test dynamic grayscale logic (100% monochrome to full color).
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest">
              <span>Total Candles: {globalCandles.toLocaleString()}</span>
              <span className="text-amber-500">{Math.round(100 - grayscaleValue)}% Color</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              value={globalCandles} 
              onChange={(e) => setGlobalCandles(Number(e.target.value))}
              className="w-full accent-[#1877F2]"
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            <span>0</span>
            <span>500</span>
            <span>2K</span>
            <span>5K+</span>
          </div>
        </div>
      </div>

    </div>
  );
}
