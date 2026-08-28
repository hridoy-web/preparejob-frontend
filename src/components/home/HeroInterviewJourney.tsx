"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Code2,
  MessageSquareText,
  TrendingUp,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

interface JourneyCardProps {
  icon: ReactNode;
  label: string;
  description: string;
  className?: string;
  delay?: number;
}

const EVALUATION_SCORE = 86;
const CIRCLE_CIRCUMFERENCE = 314;
const SCORE_OFFSET =
  CIRCLE_CIRCUMFERENCE -
  (CIRCLE_CIRCUMFERENCE * EVALUATION_SCORE) / 100;

export default function HeroInterviewJourney() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [3, -3]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    },
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <figure
        aria-labelledby="interview-journey-caption"
        className="relative mx-auto w-full max-w-[620px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-[90px] sm:size-[340px] lg:size-[380px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 rounded-[2rem] opacity-15 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)] sm:inset-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full flex-col gap-3 py-2 lg:block lg:min-h-[550px] lg:py-0 lg:[perspective:1400px]"
        >
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                  }
            }
            className="relative w-full flex-col gap-3 lg:block lg:min-h-[550px] lg:[transform-style:preserve-3d]"
          >
            <JourneyCard
              icon={<CircleHelp aria-hidden="true" className="size-4" />}
              label="Question"
              description="What are React Hooks?"
              delay={0.15}
              className="relative w-full lg:absolute lg:left-0 lg:top-0 lg:z-10 lg:w-[44%] lg:[transform:translateZ(12px)]"
            />

            <JourneyCard
              icon={<Code2 aria-hidden="true" className="size-4" />}
              label="Your Answer"
              description="Practice your response"
              delay={0.25}
              className="relative w-full lg:absolute lg:right-0 lg:top-0 lg:z-10 lg:w-[44%] lg:[transform:translateZ(4px)]"
            />

            <motion.article
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              className="relative z-30 w-full overflow-hidden rounded-[1.4rem] border border-brand-accent/30 bg-card p-4 shadow-[0_24px_70px_-28px_rgba(99,102,241,0.4)] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[60%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-5 lg:[transform:translate(-50%,-50%)_translateZ(40px)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 size-32 rounded-full bg-brand-accent/5 blur-3xl"
              />

              <header className="relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                      <BrainCircuit
                        aria-hidden="true"
                        className="size-4"
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-brand-accent sm:text-sm">
                        AI Evaluation
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                        Instant answer analysis
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 sm:px-2.5 sm:text-xs">
                    Strong
                  </span>
                </div>

                <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  Your answer is improving
                </h2>

                <p className="mt-1 text-[11px] leading-5 text-muted-foreground sm:text-xs">
                  Instant feedback based on clarity, accuracy, and technical
                  depth.
                </p>
              </header>

              <div className="relative mt-4 flex items-center gap-4 sm:gap-5">
                <ScoreCircle reducedMotion={prefersReducedMotion} />

                <div className="min-w-0 space-y-2">
                  <FeedbackItem text="Clear explanation" />
                  <FeedbackItem text="Good technical depth" />
                  <FeedbackItem
                    text="Add one practical example"
                    warning
                  />
                </div>
              </div>

              <footer className="relative mt-4 border-t border-border pt-3">
                <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs">
                  <span className="truncate text-muted-foreground">
                    React.js interview answer
                  </span>

                  <span className="shrink-0 font-semibold text-foreground">
                    {EVALUATION_SCORE}/100
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label="Answer quality score"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={EVALUATION_SCORE}
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                >
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{
                      width: `${EVALUATION_SCORE}%`,
                    }}
                    transition={{
                      delay: 1,
                      duration: prefersReducedMotion ? 0 : 0.9,
                      ease: "easeOut",
                    }}
                    className="block h-full rounded-full bg-brand-accent"
                  />
                </div>
              </footer>
            </motion.article>

            <JourneyCard
              icon={
                <MessageSquareText
                  aria-hidden="true"
                  className="size-4"
                />
              }
              label="Feedback"
              description="Actionable insights"
              delay={0.5}
              className="relative w-full lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[44%] lg:[transform:translateZ(8px)]"
            />

            <JourneyCard
              icon={
                <TrendingUp aria-hidden="true" className="size-4" />
              }
              label="Progress"
              description="Keep improving"
              delay={0.6}
              className="relative w-full lg:absolute lg:bottom-0 lg:right-0 lg:z-10 lg:w-[44%] lg:[transform:translateZ(2px)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_16px_rgba(99,102,241,0.45)] lg:block"
            />

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: [0, 0.45, 0] }
              }
              transition={{
                delay: 1.2,
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/25 lg:block"
            />
          </motion.div>
        </motion.div>

        <figcaption
          id="interview-journey-caption"
          className="sr-only"
        >
          PrepareJob guides developers from interview questions to personal
          answers, AI evaluation, actionable feedback, and progress tracking.
        </figcaption>
      </figure>
    </MotionConfig>
  );
}

function JourneyCard({
  icon,
  label,
  description,
  className = "",
  delay = 0,
}: JourneyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.2,
        },
      }}
      className={`rounded-2xl border border-border bg-card p-3 shadow-lg shadow-foreground/[0.04] sm:p-4 ${className}`}
    >
      <header className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
          {icon}
        </span>

        <h3 className="truncate text-xs font-semibold text-foreground sm:text-sm">
          {label}
        </h3>
      </header>

      <p className="mt-3 truncate text-[11px] text-muted-foreground sm:text-xs">
        {description}
      </p>

      <div
        aria-hidden="true"
        className="mt-4 flex items-center gap-1"
      >
        <span className="size-1.5 rounded-full bg-brand-accent" />
        <span className="h-px flex-1 bg-border" />
        <span className="size-1.5 rounded-full bg-muted-foreground/25" />
      </div>
    </motion.article>
  );
}

function ScoreCircle({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <div
      role="img"
      aria-label={`AI evaluation score: ${EVALUATION_SCORE} out of 100`}
      className="relative flex size-20 shrink-0 items-center justify-center sm:size-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-[5px] border-brand-accent/10"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="size-full -rotate-90"
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

        <motion.circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="text-brand-accent"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          initial={{
            strokeDashoffset: CIRCLE_CIRCUMFERENCE,
          }}
          animate={{
            strokeDashoffset: SCORE_OFFSET,
          }}
          transition={{
            delay: 0.85,
            duration: reducedMotion ? 0 : 1,
            ease: "easeOut",
          }}
        />
      </svg>

      <div className="absolute text-center">
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.05,
            duration: reducedMotion ? 0 : 0.4,
          }}
          className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          {EVALUATION_SCORE}
        </motion.p>

        <p className="mt-0.5 text-[7px] text-muted-foreground sm:text-[8px]">
          out of 100
        </p>
      </div>
    </div>
  );
}

function FeedbackItem({
  text,
  warning = false,
}: {
  text: string;
  warning?: boolean;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: warning ? 1.25 : 1.15,
        duration: 0.35,
      }}
      className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:gap-2 sm:text-xs"
    >
      <CheckCircle2
        aria-hidden="true"
        className={`size-3.5 shrink-0 sm:size-4 ${
          warning ? "text-brand-accent" : "text-emerald-500"
        }`}
      />

      <span className="truncate">{text}</span>
    </motion.p>
  );
}