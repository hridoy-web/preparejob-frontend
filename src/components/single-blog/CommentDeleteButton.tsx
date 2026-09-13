"use client";

import { useTransition } from "react";
import { deleteCommentAction } from "@/lib/actions/blogActions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CommentDeleteButtonProps {
  blogId: string;
  commentId: string;
  userId: string;
  slug: string;
}

export default function CommentDeleteButton({
  blogId,
  commentId,
  userId,
  slug,
}: CommentDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteCommentAction(blogId, commentId, userId, slug);
        toast.success("Comment deleted!");
        router.refresh();
      } catch (error) {
        console.error("Delete comment error:", error);
        toast.error("Failed to delete comment.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all disabled:opacity-50"
      title="Delete comment"
    >
      <Trash2 className="size-4" />
    </button>
  );
}