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
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "item-1",
    question: "Why should I use PrepareJob instead of searching everywhere or using AI repeatedly?",
    answer: "Searching randomly or asking AI repeatedly wastes valuable time. PrepareJob provides a structured roadmap with curated, high-impact interview questions across all major web dev stacks, saving you time so you can prepare efficiently and crack interviews quickly.",
    category: "Platform"
  },
  {
    id: "item-2",
    question: "How are the interview questions distributed across different tech stacks?",
    answer: "We cover all essential modern technologies—including HTML, CSS, Tailwind, JavaScript, TypeScript, React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, Prisma, Mongoose, Git/GitHub, and Docker. Questions are distributed based on real-world recruiter demand; high-demand core technologies feature comprehensive question sets (like 50-60 curated items), while specialized tools have concise, high-yield sets (like 15-30 items) so you don't waste time memorizing unnecessary details.",
    category: "Tech Stacks"
  },
  {
    id: "item-3",
    question: "Do you provide multiple types of answers for a single question?",
    answer: "Yes! Every question comes with two types of answers: an Easy Answer (simple sentence making for beginners or those uncomfortable with complex English) and an Advanced Answer (for experienced learners or those wanting deep technical insights). You can even compare both to master the concept fully.",
    category: "Learning"
  },
  {
    id: "item-4",
    question: "Is it possible for a fresher or weak student to remember hundreds of questions?",
    answer: "No, memorizing hundreds of questions is impossible and unnecessary for freshers. That is why our research team filters out the fluff. We provide an optimized, research-backed list using very easy English, making it stress-free to learn, remember, and apply.",
    category: "Roadmap"
  },
  {
    id: "item-5",
    question: "Will these interview questions help me crack my first frontend, backend, full-stack, or MERN stack job?",
    answer: "Absolutely. Our questions are curated based on what real recruiters actually ask in technical rounds. By focusing on core concepts with clear, simple English explanations, junior and fresh developers can build strong confidence and clear interviews swiftly.",
    category: "Career"
  }
];

export default function FaqSection(): React.JSX.Element {
  return (
    <section 
      aria-labelledby="faq-heading" 
      className="py-16 md:py-24 bg-slate-50 text-slate-900 border-t border-slate-200/60"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center mb-12 md:mb-16 space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold uppercase tracking-widest text-indigo-600 font-lexend">
            Smart Preparation Guide
          </span>
          <h2 
            id="faq-heading" 
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-lexend"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-lexend">
            Everything you need to know about our smart question distribution, easy-to-advanced answers, and fast interview track.
          </p>
        </header>

        {/* Accordion Component using Shadcn */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQ_DATA.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id} 
                className="border-b border-slate-100 last:border-0 py-2 px-2 rounded-xl transition-colors hover:bg-slate-50/50"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 text-base sm:text-lg hover:text-indigo-600 hover:no-underline transition-colors font-urbanist">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 pb-4 overflow-hidden font-lexend">
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