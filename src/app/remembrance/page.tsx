"use client";

import Link from "next/link";
import { Search, ChevronDown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const OFFICERS = [
  { id: 1, name: "PC Andrew Harper", force: "Thames Valley Police", years: "1990 – 2019", tributes: "2,845", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "PCSO Julie James", force: "West Midlands Police", years: "1992 – 2020", tributes: "1,927", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "PC Liam O'Brien", force: "Greater Manchester Police", years: "1985 – 2020", tributes: "1,521", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "DC Matthew Boyd", force: "Metropolitan Police", years: "1979 – 2021", tributes: "2,112", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "PC Sarah Evans", force: "Kent Police", years: "1993 – 2021", tributes: "1,298", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "PC David Whyte", force: "Police Scotland", years: "1987 – 2021", tributes: "1,744", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "PCSO Morgan Smith", force: "Hampshire Police", years: "1994 – 2022", tributes: "1,105", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "DC Chloe Lewis", force: "West Yorkshire Police", years: "1988 – 2022", tributes: "943", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "PC John Atkinson", force: "Northumbria Police", years: "1970 – 2022", tributes: "856", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "PCSO Kevin Jones", force: "Essex Police", years: "1986 – 2023", tributes: "1,202", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400" },
  { id: 11, name: "PC Mark Collins", force: "South Yorkshire Police", years: "1985 – 2023", tributes: "1,412", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  { id: 12, name: "DC Richard Hayes", force: "Avon & Somerset Police", years: "1976 – 2023", tributes: "702", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" }
];

export default function RemembrancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans pb-24">
      
      {/* HERO */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1616859752817-09434863076a?auto=format&fit=crop&q=80&w=1920" 
            alt="Remembrance memorial" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Flame className="w-5 h-5" /> HONOR & RESPECT
            </h3>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2">
              WALL OF <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">REMEMBRANCE.</span>
            </h1>
            
            <p className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow">
              Remembering our fallen heroes. Every name here mattered. Every life here is remembered.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] pt-16">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <span className="text-[#1877F2] border-b-2 border-[#1877F2] pb-2 cursor-pointer">All Officers</span>
            <span className="text-slate-500 hover:text-white transition-colors pb-2 cursor-pointer">Recently Added</span>
            <span className="text-slate-500 hover:text-white transition-colors pb-2 cursor-pointer">Most Tributed</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by name, force or location..." 
                className="w-full bg-[#051024] border border-white/10 text-white text-xs px-10 py-3 rounded-md focus:outline-none focus:border-[#1877F2]/50 placeholder-slate-600 transition-colors"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest py-5 rounded-md flex items-center gap-2">
              FILTERS <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 mb-8 pt-8">
          <p className="text-slate-400 text-xs italic">Every name here mattered. Every life here is remembered.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {OFFICERS.map((officer) => (
            <Link href={`/remembrance/${officer.id}`} key={officer.id}>
              <div className="bg-[#051024] border border-white/5 rounded-md overflow-hidden group hover:border-[#1877F2]/50 transition-colors h-full flex flex-col">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src={officer.image} 
                    alt={officer.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-white text-sm mb-1">{officer.name}</h3>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">{officer.force}</p>
                  <p className="text-slate-500 text-[10px] mb-4">{officer.years}</p>
                  
                  <div className="mt-auto flex items-center gap-2 text-xs">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-400 font-medium">{officer.tributes} Tributes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-24">
          <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 font-bold px-10 py-6 rounded-md text-[10px] tracking-widest uppercase transition-colors">
            LOAD MORE OFFICERS
          </Button>
        </div>

        {/* Bottom Banner */}
        <div className="relative rounded-lg overflow-hidden p-12 text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616859752817-09434863076a?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">LIGHT A CANDLE. LEAVE A TRIBUTE.</h2>
            <p className="text-slate-400 text-sm mb-8">Honor their memory. Support their families.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-8 py-6 rounded-md text-[10px] tracking-widest uppercase transition-colors">
                LIGHT A CANDLE
              </Button>
              <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 font-bold px-8 py-6 rounded-md text-[10px] tracking-widest uppercase transition-colors">
                LEAVE A TRIBUTE
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
