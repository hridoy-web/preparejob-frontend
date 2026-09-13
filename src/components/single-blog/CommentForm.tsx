"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addCommentAction } from "@/lib/actions/blogActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface CommentFormProps {
  blogId: string;
  slug: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserImage?: string;
}

export default function CommentForm({
  blogId,
  slug,
  currentUserId,
  currentUserName,
  currentUserImage,
}: CommentFormProps) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    if (!currentUserId || !currentUserName) {
      toast.error("Authentication Required", {
        description: "Please log in to leave a comment!",
        action: { label: "Login", onClick: () => (window.location.href = "/login") },
      });
      return;
    }

    setText("");

    startTransition(async () => {
      try {
        await addCommentAction(blogId, slug, {
          userId: currentUserId,
          userName: currentUserName,
          commentText: trimmed,
          userImage: currentUserImage,
        });
        toast.success("Comment added!");
        router.refresh();
      } catch (error) {
        console.error("Add comment error:", error);
        setText(trimmed);
        toast.error("Failed to post comment.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex gap-3 rounded-xl border border-slate-200 p-3 shadow-sm bg-white">
      <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-600 shadow-inner">
        {currentUserImage ? (
          <Image src={currentUserImage} alt={currentUserName || "User"} fill className="object-cover" sizes="32px" />
        ) : (
          <span>{currentUserName?.[0]?.toUpperCase() || "U"}</span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={currentUserId ? "Write a comment..." : "Please login to write a comment"}
          maxLength={500}
          rows={2}
          disabled={isPending}
          className="resize-none !text-xs sm:!text-sm font-medium text-slate-800 placeholder:!text-xs sm:placeholder:!text-sm placeholder:font-normal placeholder:text-slate-400 focus-visible:ring-indigo-200 rounded-lg p-2.5"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">{text.length}/500</span>
          
          <Button
            type="submit"
            disabled={isPending || !text.trim()}
            className="!h-8 !px-4 !rounded-lg bg-slate-900 !text-xs !font-semibold text-white hover:bg-slate-800 gap-1.5 transition-all shadow-sm"
          >
            <span>{isPending ? "Posting..." : "Post Comment"}</span>
            <Send className="!size-3" />
          </Button>
        </div>
      </div>
    </form>
  );
}