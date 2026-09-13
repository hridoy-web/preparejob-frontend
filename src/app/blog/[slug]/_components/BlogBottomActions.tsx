"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { toggleLikeAction } from "@/lib/actions/blogActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BlogBottomActionsProps {
  blogId: string;
  slug: string;
  initialLikes?: string[];
  commentsCount?: number;
  currentUserId?: string;
  title?: string;
}

export default function BlogBottomActions({
  blogId,
  slug,
  initialLikes = [],
  commentsCount = 0,
  currentUserId,
  title,
}: BlogBottomActionsProps) {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isLiked = Boolean(currentUserId && likes.includes(currentUserId));

  const handleLike = () => {
    if (isPending) return;

    if (!currentUserId) {
      toast.error("Please log in to like this post!");
      return;
    }

    const updatedLikes = isLiked
      ? likes.filter((id) => id !== currentUserId)
      : [...likes, currentUserId];

    setLikes(updatedLikes);

    startTransition(async () => {
      try {
        await toggleLikeAction(blogId, currentUserId, slug);
        router.refresh();
      } catch (error) {
        setLikes(initialLikes);
        toast.error("Failed to update like.");
      }
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const scrollToComments = () => {
    document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          disabled={isPending}
          onClick={handleLike}
          className={`!h-9 !px-3.5 !rounded-lg border !text-xs !font-semibold transition-all gap-1.5 ${
            isLiked
              ? "border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100"
              : "border-slate-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-600"
          }`}
        >
          <Heart
            className={`!size-3.5 transition-transform active:scale-125 ${
              isLiked ? "fill-rose-500 text-rose-500" : "text-rose-500"
            }`}
          />
          <span>
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </Button>

        <Button
          variant="outline"
          onClick={scrollToComments}
          className="!h-9 !px-3.5 !rounded-lg border border-slate-200 !text-xs !font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 gap-1.5 transition-all"
        >
          <MessageSquare className="!size-3.5 text-indigo-600" />
          <span>{commentsCount} Comments</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={handleShare}
        className="!h-9 !px-3 !rounded-lg !text-xs !font-semibold text-slate-700 hover:bg-slate-100 gap-1.5"
      >
        <Share2 className="!size-3.5 text-slate-600" />
        <span>Share</span>
      </Button>
    </div>
  );
}