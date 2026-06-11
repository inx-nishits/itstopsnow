"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const OFFICERS = [
  { id: 1, name: "PC Andrew Harper", role: "Police Constable (PC)", force: "Thames Valley Police", region: "London", years: "1990 – 2019", tributes: "2,845", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "PCSO Julie James", role: "PCSO", force: "West Midlands Police", region: "Midlands", years: "1992 – 2020", tributes: "1,927", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "PC Liam O'Brien", role: "Police Constable (PC)", force: "Greater Manchester Police", region: "North", years: "1985 – 2020", tributes: "1,521", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "DC Matthew Boyd", role: "Detective Constable (DC)", force: "Metropolitan Police", region: "London", years: "1979 – 2021", tributes: "2,112", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "PC Sarah Evans", role: "Police Constable (PC)", force: "Kent Police", region: "London", years: "1993 – 2021", tributes: "1,298", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "PC David Whyte", role: "Police Constable (PC)", force: "Police Scotland", region: "Scotland", years: "1987 – 2021", tributes: "1,744", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "PCSO Morgan Smith", role: "PCSO", force: "Hampshire Police", region: "London", years: "1994 – 2022", tributes: "1,105", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "DC Chloe Lewis", role: "Detective Constable (DC)", force: "West Yorkshire Police", region: "North", years: "1988 – 2022", tributes: "943", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "PC John Atkinson", role: "Police Constable (PC)", force: "Northumbria Police", region: "North", years: "1970 – 2022", tributes: "856", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "PCSO Kevin Jones", role: "PCSO", force: "Essex Police", region: "London", years: "1986 – 2023", tributes: "1,202", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400" },
  { id: 11, name: "PC Mark Collins", role: "Police Constable (PC)", force: "South Yorkshire Police", region: "North", years: "1985 – 2023", tributes: "1,412", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  { id: 12, name: "DC Richard Hayes", role: "Detective Constable (DC)", force: "Avon & Somerset Police", region: "London", years: "1976 – 2023", tributes: "702", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { id: 13, name: "PC Emily Davies", role: "Police Constable (PC)", force: "Thames Valley Police", region: "London", years: "1995 – 2023", tributes: "1,145", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { id: 14, name: "PCSO Mark Thomas", role: "PCSO", force: "West Midlands Police", region: "Midlands", years: "1980 – 2023", tributes: "827", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 15, name: "PC Sara Connor", role: "Police Constable (PC)", force: "Greater Manchester Police", region: "North", years: "1991 – 2022", tributes: "2,521", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: 16, name: "DC John Smith", role: "Detective Constable (DC)", force: "Metropolitan Police", region: "London", years: "1982 – 2021", tributes: "1,112", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" }
];

export default function RemembrancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForce, setSelectedForce] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState("All"); // All, Recently, MostTributed
  const [visibleCount, setVisibleCount] = useState(16);

  const filteredOfficers = OFFICERS.filter((officer) => {
    const matchesSearch = officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          officer.force.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesForce = selectedForce === "All" || officer.force === selectedForce;
    
    const matchesRole = selectedRole === "All" || 
      (selectedRole === "PC" && officer.role.includes("(PC)")) ||
      (selectedRole === "PCSO" && officer.role === "PCSO") ||
      (selectedRole === "DC" && officer.role.includes("(DC)"));
      
    const matchesRegion = selectedRegion === "All" || officer.region === selectedRegion;
      
    const yearsText = officer.years; // e.g. "1990 – 2019"
    const endYear = yearsText.split("–")[1]?.trim() || "";
    const matchesYear = selectedYear === "All" || endYear === selectedYear;
    
    return matchesSearch && matchesForce && matchesRole && matchesRegion && matchesYear;
  });

  const sortedOfficers = [...filteredOfficers].sort((a, b) => {
    if (sortBy === "MostTributed") {
      const aVal = parseInt(a.tributes.replace(/,/g, ''));
      const bVal = parseInt(b.tributes.replace(/,/g, ''));
      return bVal - aVal;
    }
    if (sortBy === "Recently") {
      return b.id - a.id;
    }
    return 0; // Default
  });

  const visibleOfficers = sortedOfficers.slice(0, visibleCount);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans pb-24">
      
      {/* HERO */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/uk_police_memorial_bg.png" 
            alt="UK Police Remembrance memorial" 
            className="w-full h-full object-cover object-center opacity-30 grayscale"
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

        {/* Memorial Statistics - Premium Bento Box UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10 -mt-24">
          
          {/* Main Hero Stat - Candles */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-[#051024]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-blue-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1877F2]/20 to-transparent flex items-center justify-center mb-6 border border-[#1877F2]/20 shadow-[0_0_30px_rgba(24,119,242,0.2)]">
              <Flame className="w-10 h-10 animate-pulse text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-md mb-2">142,850</h2>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#1877F2]/50"></div>
              <span className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.3em]">Total Candles Lit</span>
              <div className="h-[1px] w-8 bg-[#1877F2]/50"></div>
            </div>
          </div>

          {/* Stat 1: Officers Remembered */}
          <div className="bg-[#051024]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#1877F2]/30 transition-colors shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 relative z-10">Officers Remembered</span>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-4xl font-black text-white tracking-tight">1,482</span>
            </div>
          </div>

          {/* Stat 2: Forces Represented */}
          <div className="bg-[#051024]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#1877F2]/30 transition-colors shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 relative z-10">Forces Represented</span>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-4xl font-black text-white tracking-tight">43</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">UK Forces</span>
            </div>
          </div>

          {/* Stat 3: Monthly Average */}
          <div className="bg-[#051024]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#1877F2]/30 transition-colors shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 relative z-10">Monthly Average</span>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-4xl font-black text-white tracking-tight">3.2</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Officers</span>
            </div>
          </div>

          {/* Stat 4: Not Forgotten */}
          <div className="bg-[#051024]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#1877F2]/30 transition-colors shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-3 relative z-10">Not Forgotten</span>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-4xl font-black text-white tracking-tight">100%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden relative z-10">
              <div className="h-full bg-[#1877F2] w-full shadow-[0_0_10px_rgba(24,119,242,0.8)]"></div>
            </div>
          </div>

        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <span 
              onClick={() => setSortBy("All")}
              className={`pb-2 cursor-pointer transition-colors ${sortBy === "All" ? "text-[#1877F2] border-b-2 border-[#1877F2]" : "text-slate-500 hover:text-white"}`}
            >
              All Officers
            </span>
            <span 
              onClick={() => setSortBy("Recently")}
              className={`pb-2 cursor-pointer transition-colors ${sortBy === "Recently" ? "text-[#1877F2] border-b-2 border-[#1877F2]" : "text-slate-500 hover:text-white"}`}
            >
              Recently Added
            </span>
            <span 
              onClick={() => setSortBy("MostTributed")}
              className={`pb-2 cursor-pointer transition-colors ${sortBy === "MostTributed" ? "text-[#1877F2] border-b-2 border-[#1877F2]" : "text-slate-500 hover:text-white"}`}
            >
              Most Tributed
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by name or force..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#051024] border border-white/10 text-white text-xs px-10 py-3 rounded-md focus:outline-none focus:border-[#1877F2]/50 placeholder-slate-600 transition-colors"
              />
            </div>
            <Button 
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              variant="outline" 
              className="border-white/20 text-white bg-transparent hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest py-5 rounded-md flex items-center gap-2 cursor-pointer animate-none"
            >
              FILTERS <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {isFilterPanelOpen && (
          <div className="bg-[#051024] border border-white/10 rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
            {/* Force Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter by Force</label>
              <select 
                value={selectedForce}
                onChange={(e) => setSelectedForce(e.target.value)}
                className="bg-[#030712] border border-white/10 text-slate-300 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#1877F2]"
              >
                <option value="All">All Forces</option>
                <option value="Thames Valley Police">Thames Valley Police</option>
                <option value="West Midlands Police">West Midlands Police</option>
                <option value="Greater Manchester Police">Greater Manchester Police</option>
                <option value="Metropolitan Police">Metropolitan Police</option>
                <option value="Kent Police">Kent Police</option>
                <option value="Police Scotland">Police Scotland</option>
                <option value="Hampshire Police">Hampshire Police</option>
                <option value="West Yorkshire Police">West Yorkshire Police</option>
                <option value="Northumbria Police">Northumbria Police</option>
                <option value="Essex Police">Essex Police</option>
                <option value="South Yorkshire Police">South Yorkshire Police</option>
                <option value="Avon & Somerset Police">Avon & Somerset Police</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter by Role</label>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-[#030712] border border-white/10 text-slate-300 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#1877F2]"
              >
                <option value="All">All Roles</option>
                <option value="PC">Police Constable (PC)</option>
                <option value="PCSO">PCSO</option>
                <option value="DC">Detective Constable (DC)</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter by Region</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-[#030712] border border-white/10 text-slate-300 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#1877F2]"
              >
                <option value="All">All Regions</option>
                <option value="London">London & South</option>
                <option value="Midlands">Midlands</option>
                <option value="North">North England</option>
                <option value="Scotland">Scotland</option>
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter by Year</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#030712] border border-white/10 text-slate-300 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#1877F2]"
              >
                <option value="All">All Years</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 mb-8 pt-8">
          <p className="text-slate-400 text-xs italic">Every name here mattered. Every life here is remembered.</p>
        </div>

        {/* Grid - Mosaic Wall Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-16">
          {visibleOfficers.map((officer) => (
            <Link href={`/remembrance/${officer.id}`} key={officer.id} className="relative group rounded-xl overflow-hidden aspect-[3/4] block shadow-lg border border-white/5 bg-[#020611]">
              {/* Image */}
              <img 
                src={officer.image} 
                alt={officer.name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010308] via-[#010308]/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end transition-transform duration-500">
                <div className="mb-auto flex justify-end transition-opacity duration-500 delay-100">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[9px] text-amber-500 font-bold tracking-widest border border-amber-500/20 shadow-xl">
                    <Flame className="w-3 h-3" /> {officer.tributes}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-white text-[13px] leading-tight mb-1">{officer.name}</h3>
                  <p className="text-slate-300 text-[8px] uppercase tracking-widest leading-tight mb-3 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">{officer.role} • {officer.force}</p>
                  
                  <div className="h-8 opacity-100 transition-all duration-500 overflow-hidden">
                    <span className="flex items-center justify-center w-full bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/50 text-[9px] font-bold uppercase tracking-widest py-2 rounded transition-colors shadow-[0_0_15px_rgba(24,119,242,0.3)]">
                      View Tribute
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < sortedOfficers.length && (
          <div className="text-center mb-24">
            <Button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              variant="outline" 
              className="border-white/20 text-white bg-transparent hover:bg-white/10 font-bold px-10 py-6 rounded-md text-[10px] tracking-widest uppercase transition-colors"
            >
              LOAD MORE OFFICERS
            </Button>
          </div>
        )}

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
