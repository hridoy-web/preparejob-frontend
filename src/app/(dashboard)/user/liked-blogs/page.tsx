"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, HeartOff, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const mockLikedBlogs = [
    {
        id: "1",
        title: "Top 15 React Interview Questions You Must Know in 2026",
        author: "Hridoy Chowdhury",
        readTime: "6 min read",
        likedAt: "1 week ago",
    },
    {
        id: "2",
        title: "Mastering System Design: Modern Scalable Architecture Patterns",
        author: "PrepareJob Team",
        readTime: "10 min read",
        likedAt: "2 weeks ago",
    },
];

export default function LikedBlogsPage() {
    const handleUnlike = (id: string) => {
        toast.success("Blog removed from liked list");
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
                {mockLikedBlogs.map((blog) => (
                    <Card key={blog.id} className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                    <span className="font-semibold text-slate-700">{blog.author}</span>
                                    <span>•</span>
                                    <span>{blog.readTime}</span>
                                    <span>•</span>
                                    <span>Liked {blog.likedAt}</span>
                                </div>
                                <h3 className="text-sm sm:text-base font-semibold text-slate-900 font-urbanist">
                                    {blog.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                                <Button asChild variant="outline" className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50">
                                    <Link href={`/blogs/${blog.id}`} className="flex items-center gap-1.5">
                                        <span>Read Article</span>
                                        <ExternalLink className="size-3.5" />
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => handleUnlike(blog.id)}
                                    variant="ghost"
                                    size="icon"
                                    className="size-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                    title="Unlike blog"
                                >
                                    <HeartOff className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}