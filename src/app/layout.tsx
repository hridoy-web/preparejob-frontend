import type { Metadata } from "next";
import { Lexend, Urbanist, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import ConditionalLayout from "@/components/shared/ConditionalLayout";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const lexendFont = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const headingUrbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PrepareJob — Master Your Web Dev Interviews with AI",
    template: "%s | PrepareJob",
  },
  description:
    "Master your web development interviews with top tech-stack questions, instant AI answer feedback, and personalized preparation for global remote jobs.",
  keywords: [
    "Web Development Interviews",
    "AI Interview Prep",
    "JavaScript Interview Questions",
    "React JS Questions",
    "Next.js Interview",
    "Remote Job Preparation",
  ],
  authors: [{ name: "PrepareJob Team" }],
  creator: "PrepareJob",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preparejob.com",
    title: "PrepareJob — Master Your Web Dev Interviews with AI",
    description:
      "Prepare smarter with top tech-stack questions, get instant AI answer feedback, and boost your confidence for global remote jobs.",
    siteName: "PrepareJob",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepareJob — Master Your Web Dev Interviews with AI",
    description:
      "Master your web development interviews with top tech-stack questions and instant AI answer feedback.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", lexendFont.variable, headingUrbanist.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-lexend bg-slate-50 text-slate-900">
        <TooltipProvider>
          <ConditionalLayout>
            <Navbar />
          </ConditionalLayout>

          <main className="grow">
            {children}
          </main>

          <ConditionalLayout>
            <Footer />
          </ConditionalLayout>
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}