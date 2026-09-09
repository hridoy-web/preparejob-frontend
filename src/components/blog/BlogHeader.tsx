import { Sparkles } from 'lucide-react';
export default function BlogHeader() {
    return(
        <header className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-[var(--color-brand-accent)]">
                <Sparkles className="size-3.5" />
                <span>Inside the Hiring Mind</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Master the Interview. <span className="ai-gradient-text">Secure Your Dream Job.</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
                Go beyond memorizing interview questions. Discover the strategies,
                insights, and real-world guidance that help you prepare smarter,
                communicate with confidence, and stand out when it matters.
            </p>
        </header>
    );
}