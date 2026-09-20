"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ArrowLeft, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUserBookmarks, toggleBookmark } from "@/lib/apiActions/userApi";

interface IQuestion {
  _id: string;
  question?: string;
  title?: string;
  category?: string;
  difficulty?: string;
  slug?: string;
  createdAt?: string;
}

export default function BookmarksPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [bookmarks, setBookmarks] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookmarks() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getUserBookmarks(userId);
        const data = res?.data || res?.bookmarks || res || [];
        setBookmarks(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch bookmarks");
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [userId]);

  const handleRemove = async (questionId: string) => {
    if (!userId) return;

    try {
      setRemovingId(questionId);
      await toggleBookmark(questionId, userId);
      setBookmarks((prev) => prev.filter((item) => item._id !== questionId));
      toast.success("Bookmark removed successfully");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to remove bookmark");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="font-lexend max-w-5xl mx-auto space-y-6 pb-12 px-4 sm:px-6">
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
        {loading ? (
          <div className="py-20 text-center flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="size-5 animate-spin text-indigo-600" />
            <span>Loading bookmarks...</span>
          </div>
        ) : bookmarks.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl bg-white border-slate-200/80 shadow-xs">
            <p className="text-slate-500 text-sm">No bookmarked questions found.</p>
          </Card>
        ) : (
          bookmarks.map((item) => {
            const displayTitle = item.question || item.title || "Interview Question Details";
            const rawCategory = item.category || "";
            
            // Smart tech slug detection including all new tech stacks
            let techSlug = "javascript";
            const combinedText = `${rawCategory} ${displayTitle}`.toLowerCase();

            if (combinedText.includes("react")) {
              techSlug = "react";
            } else if (combinedText.includes("next")) {
              techSlug = "nextjs";
            } else if (combinedText.includes("node")) {
              techSlug = "nodejs";
            } else if (combinedText.includes("express")) {
              techSlug = "express";
            } else if (combinedText.includes("mongoose")) {
              techSlug = "mongoose";
            } else if (combinedText.includes("mongo")) {
              techSlug = "mongodb";
            } else if (combinedText.includes("prisma")) {
              techSlug = "prisma";
            } else if (combinedText.includes("postgres") || combinedText.includes("sql")) {
              techSlug = "postgresql";
            } else if (combinedText.includes("docker")) {
              techSlug = "docker";
            } else if (combinedText.includes("git") || combinedText.includes("github")) {
              techSlug = "git-github";
            } else if (combinedText.includes("tailwind")) {
              techSlug = "tailwind-css";
            } else if (combinedText.includes("html") || combinedText.includes("html5")) {
              techSlug = "html5";
            } else if (combinedText.includes("css") || combinedText.includes("css3")) {
              techSlug = "css3";
            } else if (combinedText.includes("typescript") || combinedText.includes("ts")) {
              techSlug = "typescript";
            } else if (combinedText.includes("javascript") || combinedText.includes("js")) {
              techSlug = "javascript";
            } else if (rawCategory && rawCategory.toUpperCase() !== "GENERAL") {
              techSlug = rawCategory.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            }

            const detailHref = `/explore/${techSlug}`;

            return (
              <Card key={item._id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold uppercase">
                        {rawCategory || "General"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                        {item.difficulty || "Medium"}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 font-urbanist">
                      {displayTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                      <Link href={detailHref}>
                        <span>View Details</span>
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleRemove(item._id)}
                      disabled={removingId === item._id}
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      {removingId === item._id ? (
                        <Loader2 className="size-4 animate-spin text-rose-600" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}