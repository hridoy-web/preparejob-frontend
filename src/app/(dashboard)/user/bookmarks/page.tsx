"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ArrowLeft, Trash2, Loader2, ChevronLeft, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUserBookmarks, toggleBookmark } from "@/lib/apiActions/userApi";

interface IAnswerDetail {
  explanation?: string;
  keyPoints?: string[];
}

interface IQuestion {
  _id: string;
  question?: string;
  title?: string;
  category?: string;
  difficulty?: string;
  serial?: number;
  easyAnswer?: IAnswerDetail;
  advancedAnswer?: IAnswerDetail;
}

export default function BookmarksPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const userId = session?.user?.id || (session?.user as { _id?: string })?._id;

  const [bookmarks, setBookmarks] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  useEffect(() => {
    // Session load na howa porjonto wait korbo
    if (sessionPending) return;

    let isMounted = true;

    async function fetchBookmarks() {
      if (!userId) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getUserBookmarks(userId);
        const fetchedData = res?.data?.data || res?.data || res;
        
        if (isMounted) {
          const dataArray = Array.isArray(fetchedData) ? fetchedData : [];
          setBookmarks(dataArray.slice().reverse());
        }
      } catch (error: unknown) {
        if (isMounted) {
          toast.error(error instanceof Error ? error.message : "Failed to fetch bookmarks");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBookmarks();

    return () => {
      isMounted = false;
    };
  }, [userId, sessionPending]);

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

  // Pagination Logic
  const totalPages = Math.ceil(bookmarks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookmarks = bookmarks.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="font-lexend max-w-7xl mx-auto space-y-6 pb-16 px-4 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="size-10 rounded-2xl border-slate-200 hover:bg-slate-100 cursor-pointer">
            <Link href="/user">
              <ArrowLeft className="size-5 text-slate-700" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-urbanist text-slate-900 flex items-center gap-2">
              <Bookmark className="size-6 text-indigo-600 fill-indigo-100" /> Bookmarked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-lexend">
              Review and study your saved interview questions directly from dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-5">
        {sessionPending || loading ? (
          <div className="py-20 text-center flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="size-6 animate-spin text-indigo-600" />
            <span className="text-sm font-medium">Loading bookmarks...</span>
          </div>
        ) : bookmarks.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl bg-white border-slate-200/80 shadow-xs">
            <p className="text-slate-500 text-sm">No bookmarked questions found.</p>
          </Card>
        ) : (
          currentBookmarks.map((item) => {
            const displayTitle = item.title || item.question || "Interview Question Details";
            const difficulty = item.difficulty || "Medium";

            return (
              <Card key={item._id} className="p-5 sm:p-8 rounded-3xl bg-white border-slate-200/90 shadow-sm space-y-6 hover:border-slate-300 transition-all">
                {/* Top Row: Title & Remove Button */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                        Difficulty: {difficulty}
                      </span>
                      {item.serial && (
                        <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold">
                          #{item.serial}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-urbanist tracking-tight leading-snug">
                      {displayTitle}
                    </h3>
                  </div>

                  <Button
                    onClick={() => handleRemove(item._id)}
                    disabled={removingId === item._id}
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer shrink-0"
                    title="Remove Bookmark"
                  >
                    {removingId === item._id ? (
                      <Loader2 className="size-5 animate-spin text-rose-600" />
                    ) : (
                      <Trash2 className="size-5" />
                    )}
                  </Button>
                </div>

                {/* Answers Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                  {/* Easy Answer */}
                  {item.easyAnswer && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                        <BookOpen className="size-4 text-emerald-700" /> Easy Answer
                      </div>
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                        {item.easyAnswer.explanation}
                      </p>
                      {item.easyAnswer.keyPoints && item.easyAnswer.keyPoints.length > 0 && (
                        <div className="pt-2 border-t border-emerald-200/60">
                          <p className="text-xs font-bold text-emerald-900 mb-2">Key Points:</p>
                          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5">
                            {item.easyAnswer.keyPoints.map((pt, idx) => (
                              <li key={idx} className="leading-relaxed">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Advanced Answer */}
                  {item.advancedAnswer && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/[0.03] border border-slate-200/90 space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                        <Sparkles className="size-4 text-indigo-700" /> Advanced Answer
                      </div>
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                        {item.advancedAnswer.explanation}
                      </p>
                      {item.advancedAnswer.keyPoints && item.advancedAnswer.keyPoints.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/80">
                          <p className="text-xs font-bold text-indigo-900 mb-2">Key Points:</p>
                          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5">
                            {item.advancedAnswer.keyPoints.map((pt, idx) => (
                              <li key={idx} className="leading-relaxed">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 px-2">
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Showing page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="rounded-xl h-10 px-5 border-slate-200 text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft className="size-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-xl h-10 px-5 border-slate-200 text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-slate-50"
              >
                Next <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}