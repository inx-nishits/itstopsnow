"use client";

import { ArrowLeft, Star, ExternalLink, ShieldAlert, Heart, Info, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_DETAIL = {
  type: "org",
  title: "Police Firearms Officers Association (PFOA)",
  author: "National Support Network",
  rating: 5.0,
  reviews: 95,
  category: "Legal & Support",
  image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop",
  description: "The PFOA was created to support all those involved in firearms operations, and their families. They provide comprehensive welfare packages, counseling services, and immediate support following a critical incident. Their team understands the unique pressures placed on Authorised Firearms Officers (AFOs) during lengthy IOPC investigations.",
  keyFeatures: [
    "24/7 welfare support helpline",
    "NLP coaching and trauma counseling",
    "Legal and disciplinary procedure guidance",
    "Support for officer families"
  ],
  link: "https://pfoa.co.uk"
};

export default function SupportDetail({ params }: { params: { type: string, slug: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* HERO */}
      <section className="relative w-full min-h-[50vh] pt-32 pb-20 bg-[#010B19] flex flex-col justify-end overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src={MOCK_DETAIL.image} className="w-full h-full object-cover mix-blend-luminosity opacity-30 lg:opacity-40" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/80 to-transparent lg:bg-gradient-to-r lg:from-[#010B19] lg:via-[#010B19]/90 lg:to-transparent" />
        </div>

        <div className="container relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-left">
          <Link href="/support" className="inline-flex items-center text-blue-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Directory
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
              <ShieldAlert className="w-3 h-3 mr-2" /> {MOCK_DETAIL.category}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-heading mb-6 leading-[1.1]">
              {MOCK_DETAIL.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-300">
              <span>{MOCK_DETAIL.author}</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center text-blue-400"><Star className="w-4 h-4 fill-current mr-1" /> {MOCK_DETAIL.rating}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-4 md:px-8 mt-16 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-2xl font-bold uppercase font-heading text-slate-900 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-blue-600" /> About This Resource
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {MOCK_DETAIL.description}
              </p>
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">What it provides</h2>
              <ul className="space-y-4">
                {MOCK_DETAIL.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Heart className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-6" />
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-2">Access Resource</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">This will take you to an external website or application store.</p>
              
              <a href={MOCK_DETAIL.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest py-7 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1">
                  Open Link <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 border-b border-slate-100 pb-4">Community Reviews</h3>
              <div className="text-5xl font-heading font-bold text-blue-600 mb-2">{MOCK_DETAIL.rating}</div>
              <div className="flex justify-center gap-1.5 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-blue-500 fill-current" />)}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Based on {MOCK_DETAIL.reviews} ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
