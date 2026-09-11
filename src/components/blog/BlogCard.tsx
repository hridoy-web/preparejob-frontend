import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogPost;
  isFeatured?: boolean;
}

const stripHtml = (html?: string) => (html ? html.replace(/<[^>]*>?/gm, "") : "");

export default function BlogCard({ blog, isFeatured = false }: BlogCardProps) {
  const imageUrl = typeof blog.bannerImage === "string" ? blog.bannerImage : blog.bannerImage?.secure_url || blog.bannerImage?.url || "";
  const likesCount = blog.likes?.length || 0;
  const commentsCount = blog.comments?.length || 0;
  const descriptionText = stripHtml(blog.content || (blog as any).description || (blog as any).excerpt || "");

  const metaInfo = (
    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 transition-colors hover:text-rose-500"><Heart className="size-3.5" /> {likesCount}</span>
        <span className="flex items-center gap-1 transition-colors hover:text-indigo-600"><MessageSquare className="size-3.5" /> {commentsCount}</span>
      </div>
      <time dateTime={blog.createdAt}>
        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </time>
    </div>
  );

  const readMoreBtn = (
    <Button variant="link" asChild className="h-auto p-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:no-underline">
      <Link href={`/blog/${blog.slug}`} className="inline-flex items-center">
        <span>Read full article</span>
        <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );

  if (isFeatured) {
    return (
      <Card className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 lg:col-span-6 lg:p-8">
            <div>
              <Badge variant="secondary" className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">{blog.category}</Badge>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 lg:text-3xl">
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{descriptionText || "No description available."}</p>
            </div>
            <div className="mt-6">
              {metaInfo}
              <div className="mt-4 border-t border-slate-100 pt-3">{readMoreBtn}</div>
            </div>
          </div>
          <div className="relative min-h-[260px] w-full overflow-hidden lg:col-span-6">
            {imageUrl ? (
              <Image src={imageUrl} alt={blog.title} fill priority className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
            )}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
              <Clock className="size-3.5 text-indigo-400" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          {imageUrl ? (
            <Image src={imageUrl} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
          )}
          <div className="absolute top-3 left-3">
            <Badge className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 backdrop-blur-md shadow-sm border-none hover:bg-white">{blog.category}</Badge>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <Clock className="size-3 text-indigo-400" />
            <span>{blog.readTime || "5 min read"}</span>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {descriptionText || "Click below to read full insights, strategies, and code snippets."}
          </p>
          <div className="mt-5 border-t border-slate-100 pt-3">{metaInfo}</div>
        </CardContent>
      </div>
      <CardFooter className="px-5 pb-5 pt-0">{readMoreBtn}</CardFooter>
    </Card>
  );
}