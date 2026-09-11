import { Sparkles } from "lucide-react";
export default function BlogHeader() {
  return (
    <header className="mx-auto max-w-5xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-[var(--color-brand-accent)]">
        <Sparkles className="size-3.5" aria-hidden="true" />
        <span>Inside the Hiring Mind</span>
      </div>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Prepare Smarter. <span className="ai-gradient-text">Get Hired.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
        Understand what interviewers look for. Prepare smarter, answer with
        confidence, and stand out when it matters.
      </p>
    </header>
  );
}