"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const mockBookmarks = [
  {
    id: "1",
    question: "What is the difference between SQL and NoSQL databases?",
    category: "Database",
    difficulty: "Medium",
    savedAt: "2 days ago",
  },
  {
    id: "2",
    question: "Explain the concept of Closures in JavaScript with an example.",
    category: "JavaScript",
    difficulty: "Easy",
    savedAt: "5 days ago",
  },
];

export default function BookmarksPage() {
  const handleRemove = (id: string) => {
    toast.success("Bookmark removed successfully");
  };

  return (
    <div className="font-lexend max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="size-9 rounded-xl border-slate-200 hover:bg-slate-100">
            <Link href="/user">
              <ArrowLeft className="size-4 text-slate-700" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-urbanist text-slate-900 flex items-center gap-2">
              <Bookmark className="size-5 text-indigo-600 fill-indigo-100" /> Bookmarked Questions
            </h2>
            <p className="text-xs text-slate-500 font-lexend">
              Review your saved interview questions for preparation
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {mockBookmarks.map((item) => (
          <Card key={item.id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                    {item.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400">• Saved {item.savedAt}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 font-urbanist">
                  {item.question}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                  <Link href={`/questions/${item.id}`} className="flex items-center gap-1.5">
                    <span>View Details</span>
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>
                <Button
                  onClick={() => handleRemove(item.id)}
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}