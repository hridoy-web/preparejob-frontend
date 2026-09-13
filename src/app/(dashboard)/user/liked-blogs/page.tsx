"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, HeartOff, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUserLikedBlogs } from "@/lib/apiActions/userApi";
import { toggleLikeBlog } from "@/lib/apiActions/blogsApi";

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  author?: string;
  readTime?: string;
  createdAt?: string;
}

export default function LikedBlogsPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [likedBlogs, setLikedBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unlikingId, setUnlikingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLikedBlogs() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getUserLikedBlogs(userId);
        const data = res?.data || res?.likedBlogs || res || [];
        setLikedBlogs(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch liked blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchLikedBlogs();
  }, [userId]);

  const handleUnlike = async (blogId: string) => {
    if (!userId) return;

    try {
      setUnlikingId(blogId);
      await toggleLikeBlog(blogId, userId);
      setLikedBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Blog removed from liked list");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to unlike blog");
    } finally {
      setUnlikingId(null);
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
              <Heart className="size-5 text-rose-500 fill-rose-100" /> Liked Blogs
            </h2>
            <p className="text-xs text-slate-500 font-lexend">
              Articles and interview guides you found helpful
            </p>
          </div>
        </div>
      </div>

      {/* Liked Blogs List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-20 text-center flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="size-5 animate-spin text-indigo-600" />
            <span>Loading liked blogs...</span>
          </div>
        ) : likedBlogs.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl bg-white border-slate-200/80 shadow-xs">
            <p className="text-slate-500 text-sm">No liked blogs found.</p>
          </Card>
        ) : (
          likedBlogs.map((blog) => (
            <Card key={blog._id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{blog.author || "PrepareJob Team"}</span>
                    <span>•</span>
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 font-urbanist">
                    {blog.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                    <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1.5">
                      <span>Read Article</span>
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleUnlike(blog._id)}
                    disabled={unlikingId === blog._id}
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Unlike blog"
                  >
                    {unlikingId === blog._id ? (
                      <Loader2 className="size-4 animate-spin text-rose-600" />
                    ) : (
                      <HeartOff className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}