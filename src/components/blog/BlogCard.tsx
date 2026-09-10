import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    category: string;
    createdAt: string;
    readTime?: string;
    bannerImage?: string;
}

interface BlogCardProps {
    blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-brand-accent)] hover:shadow-xl hover:shadow-indigo-500/10">
            <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="rounded-md border border-indigo-100 bg-indigo-50/80 px-2.5 py-1 text-[11px] font-bold text-[var(--color-brand-accent)]">
                        {blog.category}
                    </span>
                    <time dateTime={blog.createdAt} className="inline-flex items-center gap-1 text-slate-400">
                        <Calendar className="size-3.5" aria-hidden="true" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </time>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-[var(--color-brand-primary)] transition-colors group-hover:text-[var(--color-brand-accent)]">
                    <Link href={`/blog/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
                        {blog.title}
                    </Link>
                </h2>

                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {blog.content}
                </p>
            </div>

            <footer className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {blog.readTime || "5 min read"}
                </span>

                <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--color-brand-accent)] transition-transform group-hover:translate-x-1"
                    aria-label={`Read full article about ${blog.title}`}
                >
                    <span>Read Article</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
            </footer>
        </article>
    )
}