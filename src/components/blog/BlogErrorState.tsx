"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

export default function BlogErrorState() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center rounded-3xl border border-rose-100 bg-rose-50/50 px-6 py-14 text-center shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 ring-8 ring-rose-50">
        <AlertTriangle className="size-7" />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
        Failed to load blog posts
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
        We encountered an issue while connecting to the server. Please check your internet connection or try again.
      </p>

      <Button
        onClick={handleRetry}
        disabled={isPending}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Retrying...</span>
          </>
        ) : (
          <>
            <RefreshCw className="size-4" />
            <span>Try Again</span>
          </>
        )}
      </Button>
    </div>
  );
}