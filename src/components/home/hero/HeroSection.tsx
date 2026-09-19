import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import HeroSlider from "./HeroSlider";
import { buttonVariants } from "@/components/ui/button";

export default function HeroSection(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-white text-slate-950 pt-12 pb-16 lg:pt-20 lg:pb-28 border-b border-slate-100">
      
      {/*  Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] bg-size-[24px_24px] opacity-75 pointer-events-none" />

      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-indigo-50/50 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs sm:text-sm font-semibold shadow-xs font-lexend">
              <Sparkles className="size-4 text-indigo-600" />
              <span>100% Recruiter & Industry Standard Questions</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-urbanist text-slate-950 leading-[1.15]">
              Prepare Tech Interviews. <br />
              <span className="text-indigo-600">Crack Your Dream Job.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-lexend max-w-2xl leading-relaxed">
              Got a recruiter response or interview call? Don&apos;t waste time searching random AI prompts or messy articles. Get straight to the point with our handpicked, high-impact technical questions designed specifically to help you clear interviews smoothly.
            </p>

            {/* Clean Highlight Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 text-xs sm:text-sm text-slate-700 font-lexend">
              <div className="flex items-center gap-2.5 bg-slate-50/90 backdrop-blur-xs border-2 border-slate-100 px-3.5 py-3 rounded-xl">
                <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                <span className="font-semibold text-slate-800 whitespace-nowrap">15+ Tech Stacks</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50/90 backdrop-blur-xs border-2 border-slate-100 px-3.5 py-3 rounded-xl shadow-xs">
                <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                <span className="font-semibold text-slate-800 whitespace-nowrap">Easy & Advance Answers</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50/90 backdrop-blur-xs border-2 border-slate-100 px-3.5 py-3 rounded-xl shadow-xs">
                <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                <span className="font-semibold text-slate-800 whitespace-nowrap">99% Interview Focus</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-start pt-2">
              <Link
                href="/explore"
                className={`${buttonVariants({ variant: "default", size: "lg" })} inline-flex items-center justify-center gap-2 px-9 h-12 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold shadow-xl transition-all duration-300 group font-lexend text-sm`}
              >
                <span>Start Practicing Now</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <HeroSlider />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}