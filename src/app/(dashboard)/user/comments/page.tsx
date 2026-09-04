"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const mockComments = [
  {
    id: "1",
    targetTitle: "How to prepare for MERN Stack technical interviews?",
    commentText: "Great insights! Practicing state management scenarios with Context API really helped me.",
    createdAt: "3 days ago",
  },
  {
    id: "2",
    targetTitle: "Next.js Server Actions vs API Routes",
    commentText: "Could you explain when to prefer API routes over Server Actions for external webhooks?",
    createdAt: "1 week ago",
  },
];

export default function MyCommentsPage() {
  const handleDeleteComment = (id: string) => {
    toast.success("Comment deleted successfully");
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
        {mockComments.map((comment) => (
          <Card key={comment.id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
              <span className="font-medium text-slate-700 truncate max-w-md">
                On: <span className="font-semibold">{comment.targetTitle}</span>
              </span>
              <span>{comment.createdAt}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                &ldquo;{comment.commentText}&rdquo;
              </p>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                  <Link href={`/discussion/${comment.id}`} className="flex items-center gap-1.5">
                    <span>View Thread</span>
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>
                <Button
                  onClick={() => handleDeleteComment(comment.id)}
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