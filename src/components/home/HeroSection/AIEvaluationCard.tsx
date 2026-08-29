import {
  BrainCircuit,
  CheckCircle2,
  CircleCheck,
  CirclePlus,
} from "lucide-react";

const EVALUATION_SCORE = 86;

const FEEDBACK = [
  {
    text: "Clear explanation",
    type: "positive",
  },
  {
    text: "Good technical depth",
    type: "positive",
  },
  {
    text: "Add one practical example",
    type: "improvement",
  },
];

export default function AIEvaluationCard() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_70px_-35px_rgba(99,102,241,0.45)]">
      {/* Subtle AI accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent"
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
              <BrainCircuit aria-hidden="true" className="size-5" />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                AI Evaluation
              </p>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                React.js technical interview
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 sm:text-xs">
            Strong
          </span>
        </header>

        {/* Score + AI Feedback */}
        <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 sm:gap-7">
          {/* Score Circle */}
          <div
            role="img"
            aria-label="AI evaluation score: 86 out of 100"
            className="relative flex size-24 shrink-0 items-center justify-center sm:size-28"
          >
            {/* Outer ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-[5px] border-brand-accent/10"
            />

            {/* Progress ring */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="absolute inset-0 size-full -rotate-90"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-brand-accent/10"
              />

              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="44"
                className="text-brand-accent"
              />
            </svg>

            {/* Score */}
            <div className="relative text-center">
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {EVALUATION_SCORE}
              </p>

              <p className="mt-0.5 text-[8px] text-muted-foreground sm:text-[9px]">
                out of 100
              </p>
            </div>
          </div>

          {/* Feedback */}
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Good job! You&apos;re on the right track.
            </h2>

            <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              Your answer shows strong understanding with good technical depth.
            </p>

            <div className="mt-4 space-y-2.5">
              {FEEDBACK.map((item) => (
                <div
                  key={item.text}
                  className="flex min-w-0 items-center gap-2"
                >
                  {item.type === "positive" ? (
                    <CircleCheck
                      aria-hidden="true"
                      className="size-4 shrink-0 text-emerald-500"
                    />
                  ) : (
                    <CirclePlus
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brand-accent"
                    />
                  )}

                  <span className="truncate text-xs text-muted-foreground sm:text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="mt-6 border-t border-border pt-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 shrink-0 text-emerald-500"
              />

              <span className="truncate text-xs text-muted-foreground sm:text-sm">
                React.js interview answer
              </span>
            </div>

            <span className="shrink-0 text-xs font-semibold text-foreground sm:text-sm">
              {EVALUATION_SCORE}/100
            </span>
          </div>

          <div
            aria-hidden="true"
            className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <span
              style={{ width: `${EVALUATION_SCORE}%` }}
              className="block h-full rounded-full bg-brand-accent"
            />
          </div>
        </div>
      </div>
    </article>
  );
}