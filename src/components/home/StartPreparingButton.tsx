"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function StartPreparingButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const prefersReducedMotion = useReducedMotion();

  const handleNavigate = () => {
    if (isPending) {
      return;
    }

    startTransition(() => {
      router.push("/explore", {
        scroll: true,
      });
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Button
        type="button"
        variant="ghost"
        onClick={handleNavigate}
        disabled={isPending}
        aria-busy={isPending}
        aria-label={
          isPending
            ? "Opening explore page"
            : "Start preparing for web development interviews"
        }
        className="relative h-14 w-full min-w-55 max-w-60 overflow-hidden rounded-full border-0 bg-brand-accent px-6 text-white shadow-md transition-[background-color,box-shadow] duration-300 hover:bg-indigo-500 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-100 sm:w-auto"
      >
        <span className="pointer-events-none absolute inset-1">
          <motion.span
            initial={false}
            animate={{
              x: isPending ? "100%" : "0%",
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-white text-brand-accent shadow-sm"
          >
            {isPending ? (
              <motion.span
                animate={
                  prefersReducedMotion
                    ? { rotate: 0 }
                    : { rotate: 360 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                className="flex items-center justify-center"
              >
                <LoaderCircle className="size-5" />
              </motion.span>
            ) : (
              <ArrowRight className="size-5" />
            )}
          </motion.span>
        </span>

        <span className="relative z-10 flex min-w-36 items-center justify-center pl-8 text-sm font-semibold tracking-wide">
          {isPending ? "Opening Explore..." : "Start Preparing"}
        </span>
      </Button>
    </MotionConfig>
  );
}