"use client";

import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, ChevronRight, Share2, Eye, PenTool, User, Calendar, Clock, Quote, ArrowRight, PlayCircle, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StoryDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 z-50">
        <div className="h-full bg-blue-600 w-[45%]"></div>
      </div>

      {/* 2. HERO BANNER */}
      <section className="relative w-full pt-32 pb-20 bg-[#010B19] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1920" 
            alt="Story background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-30 lg:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/80 to-transparent lg:bg-gradient-to-r lg:from-[#010B19] lg:via-[#010B19]/90 lg:to-transparent" />
        </div>

        <div className="container relative z-10 max-w-[1000px] mx-auto px-4 md:px-8">
          <Link href="/stories" className="inline-flex items-center text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ChevronRight className="w-3 h-3 mr-2 rotate-180" /> Back to Stories
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Former Officer</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3 h-3" /> OCT 12, 2024</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3" /> 8 MIN READ</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 uppercase tracking-tight font-heading">
            I survived the job, but the investigation almost broke me.
          </h1>

          <div className="flex items-center justify-between border-t border-slate-800 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700">
                <User className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm uppercase tracking-wider">Anonymous Submission</div>
                <div className="text-slate-500 text-xs">Served 12 Years • Response Team</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800 h-10 w-10 p-0 rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800 h-10 w-10 p-0 rounded-full">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT & SIDEBAR */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="lead text-xl text-slate-600 font-medium leading-relaxed mb-8">
                I joined the police because I wanted to help people. It sounds cliché, but it’s the truth. For 12 years, I put on the uniform, kissed my kids goodbye, and went out into the unknown. I dealt with things most people never see.
              </p>

              <p>
                Two years ago, I responded to a violent domestic incident. The suspect was armed and aggressive. I used force to detain him. It was textbook, by the book, exactly how we are trained. The suspect made a complaint claiming excessive force.
              </p>

              {/* Pull Quote */}
              <div className="my-12 p-8 bg-slate-100 border-l-4 border-blue-600 rounded-r-xl">
                <Quote className="w-8 h-8 text-blue-500 mb-4 opacity-50" />
                <h3 className="text-2xl font-bold font-heading text-slate-900 leading-snug mb-4">
                  "I was treated like a criminal by the very organization I bled for."
                </h3>
              </div>

              <p>
                Within 24 hours, my warrant card was taken. I was placed on restricted duties, forbidden from contacting my team, and told the IOPC would be investigating. They told me it would take a few months.
              </p>

              {/* Embedded Video/Media */}
              <div className="my-12 relative rounded-xl overflow-hidden bg-slate-900 group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" alt="Video placeholder" className="w-full h-auto opacity-70 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 text-xs font-bold rounded-sm">VIDEO: The Reality of Restricted Duties</div>
              </div>

              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-slate-900 mt-12 mb-6">The Waiting Game</h2>

              <p>
                Those months turned into two years. Two years of silence. Two years of waking up in a cold sweat. I couldn't sleep. My marriage fell apart because I couldn't talk about the case, and I was entirely consumed by the stress of potentially losing my liberty and my pension.
              </p>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 my-12">
                <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=400" alt="Gallery 1" className="rounded-lg object-cover h-48 w-full" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Gallery 2" className="rounded-lg object-cover h-48 w-full grayscale" />
              </div>

              <p>
                When the letter finally arrived, it was a single paragraph stating there was 'no case to answer'. No apology. No support offered for my return to work. Just a bureaucratic sign-off.
              </p>
              <p>
                I resigned the next day. The job didn't break me; the way I was treated when I needed protection broke me. It has to stop.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-200">#IOPC</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-200">#MentalHealth</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-200">#Resignation</span>
            </div>

            {/* Next/Prev Navigation */}
            <div className="grid grid-cols-2 gap-4 mt-16 border-t border-slate-200 pt-8">
              <Link href="/stories" className="flex flex-col group p-4 border border-transparent hover:border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center"><ChevronRight className="w-3 h-3 mr-1 rotate-180" /> Previous Story</span>
                <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2">"My husband came home a different person after the incident."</span>
              </Link>
              <Link href="/stories" className="flex flex-col items-end text-right group p-4 border border-transparent hover:border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">Next Story <ChevronRight className="w-3 h-3 ml-1" /></span>
                <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2">"We wait years for answers while our lives are on hold."</span>
              </Link>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Share */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">SHARE THIS STORY</h4>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-slate-50 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-[10px] px-2">Facebook</Button>
                  <Button variant="outline" className="flex-1 bg-slate-50 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-[10px] px-2">X / Twitter</Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" className="flex-1 bg-slate-50 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-[10px] px-2">LinkedIn</Button>
                  <Button variant="outline" className="flex-1 bg-slate-50 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-[10px] px-2">Email</Button>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-blue-600 rounded-xl p-8 text-white shadow-xl">
                <h4 className="font-heading text-2xl font-bold uppercase tracking-tight mb-4">YOUR STORY CAN SAVE A LIFE</h4>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  Every shared experience breaks the stigma and forces the system to acknowledge the human cost of their failures.
                </p>
                <Link href="/stories/submit" className="block w-full">
                  <Button className="w-full bg-white text-blue-900 hover:bg-slate-100 font-bold uppercase tracking-wider text-xs py-6">
                    Share Your Experience
                  </Button>
                </Link>
              </div>

              {/* Related Stories */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6 flex items-center"><Eye className="w-4 h-4 mr-2" /> SIMILAR STORIES</h4>
                <div className="space-y-4">
                  <Link href="/stories" className="group flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">FAMILY MEMBER</span>
                    <h5 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">"The investigation took longer than his entire career."</h5>
                  </Link>
                  <div className="w-full h-px bg-slate-200"></div>
                  <Link href="/stories" className="group flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">SERVING OFFICER</span>
                    <h5 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">"I was told to stay quiet and trust the process."</h5>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
