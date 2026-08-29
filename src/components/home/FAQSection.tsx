import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "item-1",
    question: "What technology stacks are covered in PrepareJob?",
    answer: "We cover popular modern web development stacks including React, Next.js, Node.js, Express, MongoDB, JavaScript fundamentals, and TypeScript."
  },
  {
    id: "item-2",
    question: "How does the AI Assistant help during interview practice?",
    answer: "Our basic AI chat tool allows you to ask technical questions, request simple code explanations, and clear your doubts interactively while practicing."
  },
  {
    id: "item-3",
    question: "Are the interview questions verified by real recruiters?",
    answer: "Yes, our question database is curated from real-world frontend, backend, and full-stack interview experiences shared by modern developers and hiring teams."
  },
  {
    id: "item-4",
    question: "Is PrepareJob free to practice with?",
    answer: "Yes, you can explore questions, access standard model answers, and interact with the AI assistant for core practice tracks."
  }
];

export default function FaqSection(): React.JSX.Element {
  return (
    <section 
      aria-labelledby="faq-heading" 
      className="py-16 md:py-24 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] block mb-3">
            Got Questions?
          </span>
          <h2 
            id="faq-heading" 
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-4"
          >
            Frequently Asked <span className="ai-gradient-text">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to know about the PrepareJob platform and AI mentor.
          </p>
        </header>

        {/* Accordion Component */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQ_DATA.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-slate-100 last:border-0 py-1">
                <AccordionTrigger className="text-left font-semibold text-slate-900 text-base sm:text-lg hover:text-[var(--color-brand-accent)] hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pt-1 pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}