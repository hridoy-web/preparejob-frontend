"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileSearch, Loader2, RotateCcw } from "lucide-react";

interface BlogEmptyStateProps {
  category?: string;
  search?: string;
}

export default function BlogEmptyState({ category, search }: BlogEmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasFilter = (category && category !== "All") || Boolean(search);

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-8 ring-indigo-50/50">
        <FileSearch className="size-8" />
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
        {search
          ? `No results for "${search}"`
          : category && category !== "All"
          ? `No articles found in "${category}"`
          : "No blog posts found"}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        We couldn't find any articles matching your request. Try adjusting your search term or clear the active filters to see all topics.
      </p>

      {hasFilter && (
        <Button
          onClick={handleReset}
          disabled={isPending}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Resetting...</span>
            </>
          ) : (
            <>
              <RotateCcw className="size-4" />
              <span>Reset All Filters</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}