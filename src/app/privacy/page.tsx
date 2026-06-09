"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans pb-32">
      <section className="relative w-full pt-40 pb-20 bg-[#050A14] flex flex-col justify-center border-b border-white/5">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto border border-white/20 rounded-md flex items-center justify-center relative mb-8">
            <Shield className="w-8 h-8 text-[#1877F2]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Last Updated: June 2026</p>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-16 max-w-4xl mt-16">
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
