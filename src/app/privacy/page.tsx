"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pb-32">
      {/* HERO */}
      <section className="relative w-full min-h-[50vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920" 
            alt="Courthouse justice system" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5" /> DATA PROTECTION
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              PRIVACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">POLICY.</span>
            </h1>
            <p className="text-slate-400 text-sm tracking-widest uppercase drop-shadow">Last Updated: June 2026</p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-16 mx-auto max-w-4xl mt-16">
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">1. Introduction</h2>
          <p>
            At It Stops Now, we take your privacy and the security of your data extremely seriously, especially given the sensitive nature of the information we handle. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">2. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any sensitive data you choose to share when submitting a story or contacting our support team. Submissions can be made anonymously.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">3. How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide support, advocate for policy changes, and communicate with you. We will never sell, distribute, or expose your data to third parties without your explicit, informed consent.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">4. Data Security</h2>
          <p>
            We implement state-of-the-art encryption and security protocols to ensure that your submissions, especially those involving active or historical investigations, remain completely confidential and secure from unauthorized access.
          </p>

          <h2 className="text-white font-bold uppercase tracking-widest text-xl mb-4 mt-12">5. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our privacy practices, please reach out to our secure communications team via the <Link href="/support" className="text-[#1877F2] hover:underline">Support Page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
