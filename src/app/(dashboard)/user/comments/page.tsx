"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUserCommentedBlogs } from "@/lib/apiActions/userApi";
import { deleteComment } from "@/lib/apiActions/blogsApi";

interface ICommentItem {
  _id: string;
  title: string;
  slug: string;
  comments: Array<{
    _id: string;
    userId: string | { _id: string; name?: string };
    commentText: string;
    createdAt?: string;
  }>;
}

export default function MyCommentsPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [commentedBlogs, setCommentedBlogs] = useState<ICommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getUserCommentedBlogs(userId);
        const data = res?.data || res?.commentedBlogs || res || [];
        setCommentedBlogs(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [userId]);

  const handleDeleteComment = async (blogId: string, commentId: string) => {
    if (!userId) return;

    try {
      setDeletingId(commentId);
      await deleteComment(blogId, commentId, userId);
      setCommentedBlogs((prev) =>
        prev
          .map((blog) => {
            if (blog._id === blogId) {
              return {
                ...blog,
                comments: blog.comments.filter((c) => c._id !== commentId),
              };
            }
            return blog;
          })
          .filter((blog) => blog.comments.length > 0)
      );
      toast.success("Comment deleted successfully");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete comment");
    } finally {
      setDeletingId(null);
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
              <MessageSquare className="size-5 text-emerald-600 fill-emerald-100" /> My Comments
            </h2>
            <p className="text-xs text-slate-500 font-lexend">
              Manage your comments and active community discussions
            </p>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-20 text-center flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="size-5 animate-spin text-indigo-600" />
            <span>Loading comments...</span>
          </div>
        ) : commentedBlogs.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl bg-white border-slate-200/80 shadow-xs">
            <p className="text-slate-500 text-sm">No comments found.</p>
          </Card>
        ) : (
          commentedBlogs.flatMap((blog) =>
            blog.comments
              .filter((c) => {
                const cUserId = typeof c.userId === "object" && c.userId !== null ? c.userId._id : c.userId;
                return cUserId?.toString() === userId?.toString();
              })
              .map((comment) => (
                <Card key={comment._id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                    <span className="font-medium text-slate-700 truncate max-w-md">
                      On: <span className="font-semibold">{blog.title}</span>
                    </span>
                    <span>Recently</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                      &ldquo;{comment.commentText}&rdquo;
                    </p>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                        <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1.5">
                          <span>View Comment</span>
                          <ExternalLink className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDeleteComment(blog._id, comment._id)}
                        disabled={deletingId === comment._id}
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        {deletingId === comment._id ? (
                          <Loader2 className="size-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
          )
        )}
      </div>
    </div>
  );
}