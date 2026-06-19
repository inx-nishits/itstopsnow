"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen font-sans pb-16 lg:pb-32">
      <PageHero
        variant="utility"
        eyebrow={
          <>
            <Shield className="w-5 h-5 shrink-0" /> DATA PROTECTION
          </>
        }
        title={
          <>
            PRIVACY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              POLICY.
            </span>
          </>
        }
        meta={
          <p className="text-slate-400 text-sm tracking-widest uppercase">Last Updated: June 2026</p>
        }
        imageSrc="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Courthouse justice system"
      />

      <EditorialSection>
        <div className="w-full px-6 lg:px-16 mx-auto max-w-4xl">
        <div className="prose prose-lg prose-editorial max-w-none">
          <h2 className="font-bold uppercase tracking-widest text-xl mb-4 mt-12">1. Introduction</h2>
          <p>
            At It Stops Now, we take your privacy and the security of your data extremely seriously, especially given the sensitive nature of the information we handle. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-xl mb-4 mt-12">2. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any sensitive data you choose to share when submitting a story or contacting our support team. Submissions can be made anonymously.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-xl mb-4 mt-12">3. How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide support, advocate for policy changes, and communicate with you. We will never sell, distribute, or expose your data to third parties without your explicit, informed consent.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-xl mb-4 mt-12">4. Data Security</h2>
          <p>
            We implement state-of-the-art encryption and security protocols to ensure that your submissions, especially those involving active or historical investigations, remain completely confidential and secure from unauthorized access.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-xl mb-4 mt-12">5. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our privacy practices, please reach out to our secure communications team via the <Link href="/support" className="hover:underline">Support Page</Link>.
          </p>
        </div>
        </div>
      </EditorialSection>
    </div>
  );
}
