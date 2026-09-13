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

const stripHtml = (html?: string) => (html ? html.replace(/<[^>]*>/g, "").trim() : "");

export default function BlogCard({ blog, isFeatured = false }: BlogCardProps) {
  const { title, slug, category, readTime, createdAt, likes, comments } = blog;
  const imageUrl = typeof blog.bannerImage === "string" ? blog.bannerImage : blog.bannerImage?.secure_url || blog.bannerImage?.url || "";
  const descriptionText = stripHtml(blog.content || (blog as any).description || (blog as any).excerpt || "");

  const BannerImage = ({ isFeaturedCard = false }) => (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-slate-100 ${isFeaturedCard ? "lg:min-h-[380px] lg:col-span-6 lg:h-full" : ""}`}>
      {imageUrl ? (
        <Image src={imageUrl} alt={title || "Blog cover"} fill priority={isFeaturedCard} className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={isFeaturedCard ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"} />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
      )}
      <div className="absolute left-3 top-3 z-10">
        <Badge className="border-none bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-md hover:bg-white">{category}</Badge>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
        <Clock className={isFeaturedCard ? "size-3.5 text-indigo-400" : "size-3 text-indigo-400"} />
        <span>{readTime || "5 min read"}</span>
      </div>
    </div>
  );

  const MetaInfo = () => (
    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 transition-colors hover:text-rose-500"><Heart className="size-3.5" /> {likes?.length || 0}</span>
        <span className="flex items-center gap-1 transition-colors hover:text-indigo-600"><MessageSquare className="size-3.5" /> {comments?.length || 0}</span>
      </div>
      <time dateTime={createdAt}>{new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
    </div>
  );

  const ReadMoreBtn = () => (
    <Button variant="link" asChild className="h-auto p-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:no-underline">
      <Link href={`/blog/${slug}`} className="inline-flex items-center">
        <span>Read full article</span>
        <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );

  // --- Featured Card Layout ---
  if (isFeatured) {
    return (
      <Card className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 lg:col-span-6 lg:p-8">
            <div>
              <h2 className="mt-2.5 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-xl lg:mt-3 lg:text-3xl"><Link href={`/blog/${slug}`}>{title}</Link></h2>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm lg:mt-3 lg:line-clamp-3 lg:text-slate-600">{descriptionText || "No description available."}</p>
            </div>
            <div className="mt-6">
              <MetaInfo />
              <div className="mt-4 border-t border-slate-100 pt-3"><ReadMoreBtn /></div>
            </div>
          </div>
          <BannerImage isFeaturedCard />
        </div>
      </Card>
    );
  }

  // --- Regular Card Layout ---
  return (
    <Card className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
      <div>
        <BannerImage />
        <CardContent className="p-5">
          <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-lg"><Link href={`/blog/${slug}`}>{title}</Link></h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{descriptionText || "Click below to read full insights, strategies, and code snippets."}</p>
          <div className="mt-5 border-t border-slate-100 pt-3"><MetaInfo /></div>
        </CardContent>
      </div>
      <CardFooter className="px-5 pb-5 pt-0"><ReadMoreBtn /></CardFooter>
    </Card>
  );
}