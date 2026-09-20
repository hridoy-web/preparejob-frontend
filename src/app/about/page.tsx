import { Sparkles, Target, Layers, CheckCircle2, ArrowRight, Code2, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Header Section */}
        <header className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
            <Sparkles className="size-3.5 sm:size-4" aria-hidden="true" />
            <span>Who We Are & What We Do</span>
          </div>

          <h1 className="mt-4 sm:mt-5 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            About <span className="text-indigo-600">PrepareJob</span> & Our Mission
          </h1>

          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 px-2 sm:px-0">
            We help junior, frontend, backend, and full-stack MERN developers prepare for tech interviews. We provide hand-picked, high-impact interview questions so you can crack your next interview with full confidence.
          </p>
        </header>

        {/* Mission & Problem Solving Context Section */}
        <section aria-labelledby="our-mission" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <Card className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-50 text-indigo-600">
                  <Target className="size-5 sm:size-6" />
                </div>
                <h2 id="our-mission" className="text-lg sm:text-xl font-bold text-slate-900">Why We Built This Platform</h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                When developers apply for jobs and get a sudden interview call, finding the right preparation guide is hard. People often waste time searching through massive lists of 200+ random questions. We solve this problem by offering crisp, carefully researched question sets that recruiters actually ask.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-50 text-indigo-600">
                  <Cpu className="size-5 sm:size-6" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Smart & Filtered Questions</h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                We cover over 15 essential tech stacks. Our questions are neatly divided into Easy, Medium, and Hard levels. This allows you to practice efficiently, save valuable time, and focus on problem-solving at your own pace.
              </p>
            </div>
          </Card>
        </section>

        {/* Why Choose Us / Features Section */}
        <section aria-labelledby="why-choose-us" className="mb-10 sm:mb-16">
          <div className="text-center mb-8 sm:mb-10">
            <h2 id="why-choose-us" className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">What Makes Us Different?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2">Designed specifically for smart, targeted, and stress-free interview prep.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                  <Layers className="size-4 sm:size-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">15+ Tech Stacks Covered</h3>
                <p className="text-xs leading-relaxed text-slate-600 mt-2">
                  Complete coverage for frontend, backend, database, and essential tools tailored for modern web developers.
                </p>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                  <CheckCircle2 className="size-4 sm:size-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Quality Over Quantity</h3>
                <p className="text-xs leading-relaxed text-slate-600 mt-2">
                  No need to memorize hundreds of questions. We give you concise blocks of 30-60 high-yield questions for fast learning.
                </p>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                  <Code2 className="size-4 sm:size-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Easy to Hard Tiers</h3>
                <p className="text-xs leading-relaxed text-slate-600 mt-2">
                  Flexible difficulty levels help both junior and advanced developers brush up on core concepts quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & CTA Banner with Explore Link */}
        <section aria-labelledby="our-vision" className="rounded-2xl sm:rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-900 to-slate-900 p-6 sm:p-10 lg:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-300">
              <Sparkles className="size-3.5 sm:size-4" />
              <span>Built for Developers</span>
            </div>
            
            <h2 id="our-vision" className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
              Ace Your Next Interview with Confidence
            </h2>
            
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed px-2 sm:px-0">
              Save hours of random searching and AI prompting. Dive straight into structured, industry-standard technical questions and land your dream developer role.
            </p>

            {/* CTA Button to Explore Questions */}
            <div className="pt-2">
              <Button asChild className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer w-full sm:w-auto justify-center">
                <Link href="/explore">
                  <span>Explore Questions Now</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}