"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, Share2, FileDown, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_REPORT = {
  title: "The Silent Crisis: Mental Health Impact of Long-Term Investigations",
  author: "Dr. Sarah Jenkins",
  institution: "University of Policing Studies",
  date: "March 2025",
  category: "Mental Health",
  pdfUrl: "/mock-report.pdf", // In real app, from Sanity
  coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
  summary: "This report examines the psychological toll of protracted IOPC investigations on serving police officers. Based on qualitative interviews with 5,000 officers who have been under investigation for more than 12 months, the data reveals a catastrophic failure in duty of care.",
  keyFindings: [
    "78% of officers reported severe clinical anxiety during investigations lasting over a year.",
    "The suicide rate among officers under investigation is 3x higher than the national average.",
    "Only 12% of cases taking longer than 12 months resulted in a finding of gross misconduct.",
    "Forces spend an estimated £120m annually on suspended pay for officers awaiting trial."
  ],
  methodology: "Data was collected via anonymized surveys across 43 territorial police forces in England and Wales between Jan 2023 and Dec 2024. Statistical analysis was performed using SPSS, with qualitative interviews coded via NVivo."
};

export default function ResearchDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* HERO */}
      <section className="relative w-full min-h-[50vh] pt-32 pb-20 bg-[#010B19] flex flex-col justify-end overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src={MOCK_REPORT.coverImage} className="w-full h-full object-cover mix-blend-luminosity opacity-30 lg:opacity-40" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/80 to-transparent lg:bg-gradient-to-r lg:from-[#010B19] lg:via-[#010B19]/90 lg:to-transparent" />
        </div>

        <div className="container relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
          <Link href="/research" className="inline-flex items-center text-blue-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Evidence Base
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
                {MOCK_REPORT.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-heading mb-6 leading-[1.1]">
                {MOCK_REPORT.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-bold uppercase tracking-widest">
                <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-blue-500" /> {MOCK_REPORT.author}</span>
                <span className="text-slate-500">•</span>
                <span>{MOCK_REPORT.institution}</span>
                <span className="text-slate-500">•</span>
                <span>{MOCK_REPORT.date}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest py-7 shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-1">
                <Download className="w-4 h-4 mr-2" /> Download Full PDF
              </Button>
              <Button variant="outline" className="w-full border-slate-600 bg-[#010B19]/50 hover:bg-white hover:text-[#010B19] text-white font-bold uppercase tracking-widest py-7 transition-all backdrop-blur-sm">
                <Share2 className="w-4 h-4 mr-2" /> Share Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-16 max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COL: Content */}
        <div className="lg:col-span-8 space-y-16">
          
          <section>
            <h2 className="text-2xl font-bold uppercase font-heading text-slate-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" /> Executive Summary
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {MOCK_REPORT.summary}
            </p>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase font-heading text-slate-900 mb-6">Key Findings</h2>
            <ul className="space-y-4">
              {MOCK_REPORT.keyFindings.map((finding, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 mt-1">{i + 1}</div>
                  <p className="text-slate-800 leading-relaxed font-medium">{finding}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase font-heading text-slate-900 mb-6">Methodology</h2>
            <p className="text-slate-700 leading-relaxed">
              {MOCK_REPORT.methodology}
            </p>
          </section>

          {/* EMBEDDED PDF VIEWER (Mock implementation) */}
          <section className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-100">
            <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
              <span className="font-bold uppercase tracking-widest text-xs">Document Viewer</span>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 text-[10px] uppercase tracking-widest">
                <FileDown className="w-3 h-3 mr-2" /> Download
              </Button>
            </div>
            <div className="aspect-[1/1.4] w-full flex items-center justify-center bg-slate-200">
              <div className="text-center">
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">PDF Embedded Viewer</p>
                <p className="text-slate-400 text-[10px] mt-2">(Requires actual PDF URL to render iframe)</p>
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COL: Metadata & Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 uppercase font-heading border-b border-slate-100 pb-4 mb-4">Metadata</h3>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Published</dt>
                <dd className="font-medium text-slate-900">{MOCK_REPORT.date}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Institution</dt>
                <dd className="font-medium text-slate-900">{MOCK_REPORT.institution}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Author</dt>
                <dd className="font-medium text-slate-900">{MOCK_REPORT.author}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Format</dt>
                <dd className="font-medium text-slate-900 flex items-center"><FileText className="w-3 h-3 mr-1 text-red-500" /> PDF Document</dd>
              </div>
            </dl>
          </div>

          <div className="bg-[#010B19] text-white rounded-3xl p-8 shadow-xl text-center border border-slate-800">
            <h3 className="text-xl font-bold uppercase font-heading mb-4 text-white">Take Action</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Use this evidence to demand a 12-month limit from your Member of Parliament.</p>
            <Link href="/take-action">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest py-7 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1">
                Contact Your MP
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
