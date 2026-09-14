import Image from "next/image";
import { BlogComment } from "@/types/blog";
import CommentForm from "./CommentForm";
import CommentDeleteButton from "./CommentDeleteButton";
import { MessageSquare } from "lucide-react";

interface CommentSectionProps {
  blogId: string;
  slug: string;
  comments?: BlogComment[];
  currentUserId?: string;
  currentUserName?: string;
  currentUserImage?: string;
}

export default function CommentSection({
  blogId,
  slug,
  comments = [],
  currentUserId,
  currentUserName,
  currentUserImage,
}: CommentSectionProps) {
  return (
    <div id="comment-section" className="scroll-mt-24 space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
        Comments ({comments.length})
      </h3>

      <CommentForm
        blogId={blogId}
        slug={slug}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserImage={currentUserImage}
      />

      <div className="flex flex-col gap-2.5 pt-1">
        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-5 text-center">
            <div className="flex size-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-2 shadow-sm">
              <MessageSquare className="size-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">No comments yet</h4>
            <p className="mt-0.5 text-[11px] text-slate-500 max-w-sm">
              Be the first to share your thoughts on this article!
            </p>
          </div>
        )}

        {comments.map((c) => (
          <div
            key={c._id}
            className="flex gap-3 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm transition-all hover:border-indigo-200"
          >
            <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-600 shadow-inner">
              {c.userImage ? (
                <Image src={c.userImage} alt={c.userName || "User"} fill className="object-cover" sizes="32px" />
              ) : (
                <span>{c.userName?.[0]?.toUpperCase() || "U"}</span>
              )}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">{c.userName}</span>

                {currentUserId === c.userId && c._id && (
                  <CommentDeleteButton
                    blogId={blogId}
                    commentId={c._id}
                    userId={currentUserId}
                    slug={slug}
                  />
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {c.commentText}
              </p>

              {c.createdAt && (
                <span className="pt-0.5 block text-[10px] font-medium text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}