import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, Send, User, MessageSquareText, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AIFeatureHighlight(): React.JSX.Element {
  return (
    <section 
      aria-labelledby="ai-chat-heading" 
      className="py-16 md:py-24 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[var(--color-brand-accent)] text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Interactive Tech Mentor</span>
          </div>
          
          <h2 
            id="ai-chat-heading" 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-950"
          >
            Ask Anything to Our <span className="ai-gradient-text">AI Interview Assistant</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stuck on a complex technical concept? Chat directly with our AI assistant to get instant answers, code breakdowns, and real-world interview solutions.
          </p>
        </header>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Key Features */}
          <article className="lg:col-span-5 space-y-6">
            <header className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)]">
                24/7 AI Interview Partner
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Instant Answers to Complex Tech Questions
              </h3>
            </header>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              No more searching through multiple docs. Have a natural conversation with our AI mentor to clear your doubts before heading into your technical interview.
            </p>

            <ul className="space-y-4 pt-2" role="list">
              <li className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-indigo-50 text-[var(--color-brand-accent)] shrink-0 mt-0.5 border border-indigo-100">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Real-Time Conceptual Q&A</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal mt-0.5">Ask questions about React, Node.js, System Design, or algorithms and get immediate explanations.</p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-indigo-50 text-[var(--color-brand-accent)] shrink-0 mt-0.5 border border-indigo-100">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Code Snippets & Examples</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal mt-0.5">Receive clear, clean, standard code examples tailored to modern development standards.</p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-indigo-50 text-[var(--color-brand-accent)] shrink-0 mt-0.5 border border-indigo-100">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Follow-up Clarifications</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal mt-0.5">Dig deeper into any response until you fully master the topic.</p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <Button 
                asChild 
                size="lg"
                className="bg-[var(--color-brand-accent)] text-white hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-100 active:scale-[0.98] cursor-pointer text-base px-6 py-6 h-auto"
              >
                <Link href="/explore" aria-label="Start chatting with AI Interview Assistant">
                  <span>Start AI Chat Now</span>
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </article>

          {/* Right Column: Chat Interface Mockup */}
          <figure className="lg:col-span-7 m-0" aria-label="AI Chat Assistant Demonstration">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
              
              {/* Chat Window Header */}
              <div className="bg-[var(--color-brand-primary)] px-5 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Bot className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">PrepareJob Assistant</span>
                    <figcaption className="text-xs sm:text-sm font-medium text-white">Live AI Chat Session</figcaption>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Online
                </span>
              </div>

              {/* Chat Window Body */}
              <div className="p-5 sm:p-6 space-y-4 bg-slate-50/50 min-h-[340px] flex flex-col justify-between">
                
                <div className="space-y-4">
                  {/* User Question Bubble */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="max-w-[85%] sm:max-w-[80%] p-3.5 rounded-2xl rounded-tr-xs bg-[var(--color-brand-accent)] text-white text-xs sm:text-sm shadow-xs">
                      <p className="font-medium">What is the difference between SQL and NoSQL databases in system design interviews?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-700">
                      <User className="w-4 h-4" />
                    </div>
                  </div>

                  {/* AI Response Bubble */}
                  <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-white shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="max-w-[85%] sm:max-w-[85%] p-4 rounded-2xl rounded-tl-xs bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-800 space-y-2 shadow-xs">
                      <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <MessageSquareText className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" /> 
                        Key differences to explain in interviews:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                        <li><strong>SQL (Relational):</strong> Structured schema, ACID compliant, scales vertically (e.g., PostgreSQL).</li>
                        <li><strong>NoSQL (Non-Relational):</strong> Dynamic schema, JSON document/KV store, scales horizontally (e.g., MongoDB).</li>
                      </ul>
                      <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-slate-400" />
                        <span>// Tip: Mention CAP theorem for bonus points!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </figure>

        </div>

      </div>
    </section>
  );
}