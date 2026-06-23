import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "It Stops Now - Police Wellbeing & Advocacy",
  description: "A system in crisis. Lives are being lost.",
};

export const viewport: Viewport = {
  themeColor: "#010b19",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#010b19] text-white overflow-x-hidden" suppressHydrationWarning>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full overflow-x-hidden outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
