"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";

interface CampaignEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "upcoming" | "past";
  description: string;
  attendees?: number;
  badge?: string;
}

const EVENTS: CampaignEvent[] = [
  {
    id: "e1",
    title: "National Lobby Day at Westminster",
    date: "July 15, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Houses of Parliament, London",
    type: "upcoming",
    description: "Join us in person to speak directly with MPs. We will be sharing our research findings and urging parliamentarians to support the statutory 12-month misconduct investigation limit.",
    attendees: 150,
    badge: "Key Action"
  },
  {
    id: "e2",
    title: "Online Campaign Briefing & Strategy",
    date: "June 28, 2026",
    time: "7:00 PM - 8:30 PM",
    location: "Zoom Virtual Meeting",
    type: "upcoming",
    description: "An interactive strategy briefing detailing the next phase of our campaign, including updates from the legal reform team and Pocket Sergeant founders.",
    attendees: 320,
    badge: "Public Webinar"
  },
  {
    id: "e3",
    title: "Officer Wellbeing & Advocacy Memorial",
    date: "September 10, 2026",
    time: "2:00 PM - 3:30 PM",
    location: "National Memorial Arboretum, Staffordshire",
    type: "upcoming",
    description: "A private remembrance service for families, friends, and colleagues of officers lost during lengthy investigation proceedings.",
    attendees: 80,
    badge: "Memorial"
  },
  {
    id: "e4",
    title: "Campaign Inception & SOW Release Press Event",
    date: "April 12, 2026",
    time: "9:30 AM",
    location: "National Press Club, London",
    type: "past",
    description: "Official launch event of the It Stops Now campaign. Attended by major press outlets, legal representatives, and Police Federation delegates."
  },
  {
    id: "e5",
    title: "Parliament Misconduct Procedures Roundtable",
    date: "May 20, 2026",
    time: "1:00 PM",
    location: "Committee Room 6, House of Commons",
    type: "past",
    description: "A cross-party panel discussing research evidence and clinical studies demonstrating the mental health impact of multi-year suspensions."
  }
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "upcoming" | "past">("all");
  const [selectedEvent, setSelectedEvent] = useState<CampaignEvent | null>(null);
  
  // Registration Form States
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerForce, setRegisterForce] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredEvents = EVENTS.filter(event => {
    if (activeFilter === "all") return true;
    return event.type === activeFilter;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegisterSuccess(true);
    }, 1200);
  };

  const closeRegisterModal = () => {
    setSelectedEvent(null);
    setRegisterName("");
    setRegisterEmail("");
    setRegisterForce("");
    setRegisterSuccess(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans pb-16 lg:pb-32">
      
      <PageHero
        variant="utility"
        eyebrow={
          <>
            <Calendar className="w-5 h-5 shrink-0 animate-pulse" /> Campaign Calendar
          </>
        }
        title={
          <>
            CAMPAIGN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              EVENTS.
            </span>
          </>
        }
        description="Attend briefings, local mobilisations, and Parliamentary lobby days. Meet the advocates, connect with peers, and help drive systemic change in officer welfare procedures."
        imageSrc="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Campaign event gathering"
      >
        <div className="flex flex-wrap gap-3">
          {(["all", "upcoming", "past"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-[48px] px-6 text-[10px] font-bold tracking-widest uppercase transition-all rounded-full ${
                activeFilter === filter
                  ? "bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.3)]"
                  : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
              }`}
            >
              {filter === "all" ? "All Events" : `${filter} Events`}
            </button>
          ))}
        </div>
      </PageHero>

      {/* EVENTS GRID */}
      <EditorialSection variant="white">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`group flex flex-col h-full ${hybrid.editorialCard} ${hybrid.editorialCardHover} overflow-hidden ${
                  event.type === "past" ? "opacity-80 hover:opacity-100" : ""
                } hover:-translate-y-1`}
              >
                <div className="p-6 md:p-8 flex flex-col h-full justify-between">
                  <div>
                    {/* Header Strip */}
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${hybrid.editorialMuted}`}>
                        {event.date}
                      </span>
                      {event.badge ? (
                        <span className="bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 px-3 py-1 text-[8px] font-bold uppercase tracking-wider rounded-full">
                          {event.badge}
                        </span>
                      ) : (
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          event.type === "upcoming" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}>
                          {event.type}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold uppercase ${hybrid.editorialHeading} mb-4 group-hover:text-[#1877F2] transition-colors leading-snug`}>
                      {event.title}
                    </h3>

                    {/* Location / Time */}
                    <div className={`space-y-2 mb-6 text-xs ${hybrid.editorialMuted}`}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>{event.attendees} Registered</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-8`}>
                      {event.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={`border-t ${hybrid.editorialBorder} pt-6 mt-auto flex items-center justify-between`}>
                    {event.type === "upcoming" ? (
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1877F2] hover:text-blue-600 min-h-[48px] transition-colors cursor-pointer"
                      >
                        <span>Register Interest</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${hybrid.editorialMuted}`}>
                        Event Concluded
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        </div>
      </EditorialSection>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#050A14] border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeRegisterModal}
                className="absolute top-4 right-4 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!registerSuccess ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1877F2] mb-1">
                      Event Registration
                    </h3>
                    <h2 className="text-lg font-bold uppercase tracking-tight text-white">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-slate-400 text-xs mt-2">
                      Submit details below to confirm attendance and receive joining instructions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#020611] border border-white/10 px-4 min-h-[48px] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#1877F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="john.doe@met.police.uk"
                        className="w-full bg-[#020611] border border-white/10 px-4 min-h-[48px] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#1877F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Police Force / Organisation (Optional)
                      </label>
                      <input
                        type="text"
                        value={registerForce}
                        onChange={(e) => setRegisterForce(e.target.value)}
                        placeholder="Metropolitan Police"
                        className="w-full bg-[#020611] border border-white/10 px-4 min-h-[48px] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#1877F2]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] min-h-[48px] disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing Registration..." : "Confirm Attendance"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                      Registration Complete
                    </h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{registerName}</strong>. A calendar invite and venue directions have been dispatched to <strong className="text-white">{registerEmail}</strong>.
                    </p>
                  </div>
                  <Button
                    onClick={closeRegisterModal}
                    className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] px-8 min-h-[48px] mt-4"
                  >
                    Close Panel
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
