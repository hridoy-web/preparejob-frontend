import Link from "next/link";
import { ArrowUpRight, Flame, HelpCircle, ShieldCheck } from "lucide-react";
import { getTechStacks } from "@/lib/api/tech-stack";

export default async function TechStack() {
  const techStacks = await getTechStacks();

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
            Tech Stack Ecosystem
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Technologies You Can <span className="ai-gradient-text">Practice & Master</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Test your real-world architecture and engineering depth across the full JavaScript ecosystem with instant AI-driven evaluation.
          </p>
        </div>

        {/* Responsive Grid System */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techStacks.map((tech) => (
            <article key={tech.id} className="h-full">
              <Link
                href={`/interview/${tech.slug}`}
                aria-label={`Practice ${tech.name} interview questions`}
                className="group relative flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                {/* Active Top Accent Line */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-brand-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div>
                  {/* Top Header: Badge & Icon */}
                  <header className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-muted font-mono font-bold text-foreground transition-colors group-hover:bg-brand-accent group-hover:text-primary-foreground">
                      {tech.name.substring(0, 2).toUpperCase()}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-bold text-orange-500">
                      <Flame className="size-3 fill-orange-500" />
                      <span>{tech.badgeText}</span>
                    </span>
                  </header>

                  {/* Title & Qs Count */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-brand-accent">
                        {tech.name}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-muted-foreground">
                        {tech.questionCount} Qs
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground/80">
                      {tech.category} Category
                    </span>
                  </div>
                </div>

                {/* Real Challenge Teaser Box */}
                <div className="my-3 rounded-xl border border-border/60 bg-muted/40 p-3 transition-colors group-hover:border-brand-accent/20 group-hover:bg-muted/70">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-accent">
                    <HelpCircle className="size-3" />
                    <span>Real Challenge:</span>
                  </div>
                  <p className="mt-1 text-xs font-mono font-medium leading-normal text-foreground/90 line-clamp-2">
                    &quot;{tech.challengeQuestion}&quot;
                  </p>
                </div>

                {/* Footer Action Bar */}
                <footer className="flex items-center justify-between pt-2 border-t border-border/40">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                    <span>AI Feedback</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent">
                    <span>Test Skill</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </footer>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}