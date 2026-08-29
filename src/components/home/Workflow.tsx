import React from "react";
import { 
  Target, 
  MessageSquareCode, 
  Bot, 
  Trophy, 
  ChevronRight 
} from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tagline: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Select Tech Stack",
    description: "Choose your focus area from Frontend, Backend, or Full-Stack topics like React, Node.js, and JavaScript fundamentals.",
    icon: Target,
    tagline: "Customized Track"
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Browse Real Questions",
    description: "Access curated technical interview questions complete with explanations and practical scenarios.",
    icon: MessageSquareCode,
    tagline: "Practice Mode"
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Chat with AI Assistant",
    description: "Ask questions, clear your doubts, and request simplified code explanations directly using our basic AI chat tool.",
    icon: Bot,
    tagline: "Q&A Support"
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Master & Prepare",
    description: "Review standard model answers, refine your technical concepts, and gain confidence for your real interview.",
    icon: Trophy,
    tagline: "Job Ready"
  }
];

export default function Workflow(): React.JSX.Element {
  return (
    <section 
      aria-labelledby="workflow-heading" 
      className="py-16 md:py-24 bg-white text-[var(--color-brand-primary)] border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[var(--color-brand-accent)] text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <span>Simple 4-Step Process</span>
          </div>
          
          <h2 
            id="workflow-heading" 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-950"
          >
            How <span className="ai-gradient-text">PrepareJob</span> Works
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A straightforward process to explore interview questions, clarify concepts via AI chat, and build your confidence step by step.
          </p>
        </header>

        {/* 4 Steps Grid Layout */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 list-none p-0 m-0">
          {WORKFLOW_STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <li key={step.id} className="relative flex">
                <article className="w-full bg-[var(--color-brand-surface)] p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Top Bar: Step Counter & Tagline */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black text-slate-300 group-hover:text-[var(--color-brand-accent)] transition-colors">
                        {step.stepNumber}
                      </span>
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-indigo-50 text-[var(--color-brand-accent)] border border-indigo-100">
                        {step.tagline}
                      </span>
                    </div>

                    {/* Step Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[var(--color-brand-accent)] shadow-xs mb-5 group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Flow Arrow Indicator (Desktop) */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300" aria-hidden="true">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}