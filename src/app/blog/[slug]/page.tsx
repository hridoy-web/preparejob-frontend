import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug } from "@/lib/apiActions/blogsApi";
import { BlogPost } from "@/types/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "./_components/CommentSection";
import BlogBottomActions from "./_components/BlogBottomActions";
import SmartContentRenderer from "./_components/SmartContentRenderer";

interface SingleBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = await params;

  const [session, blogResponse] = await Promise.all([
    auth.api.getSession({ headers: await headers() }).catch(() => null),
    getBlogBySlug(slug).catch(() => null),
  ]);

  const blog: BlogPost = blogResponse?.data || blogResponse;

  if (!blog?._id) notFound();

  const currentUserId = session?.user?.id;
  const { _id, title, category, content, bannerImage, readTime, createdAt, likes, comments } = blog;

  const imageUrl = typeof bannerImage === "string" ? bannerImage : bannerImage?.url || bannerImage?.secure_url || "";
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

  return (
    <article className="min-h-screen bg-slate-50/50 py-10 lg:py-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-indigo-600 text-sm font-medium">
            <Link href="/blog" prefetch={false} className="inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              <span>Back to Blogs</span>
            </Link>
          </Button>
        </div>

        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-indigo-100/80 px-3 py-1 text-xs sm:text-sm font-bold text-indigo-700 hover:bg-indigo-200">
              {category}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600">
              <Clock className="size-4 text-indigo-600" />
              {readTime || "5 min read"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900">
            {title}
          </h1>

          <div className="border-y border-slate-200/80 py-3.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
              <Calendar className="size-4 text-indigo-600" />
              <span>Published on {formattedDate}</span>
            </div>
          </div>
        </header>

        {/* Banner Image */}
        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-md">
          {imageUrl ? (
            <Image src={imageUrl} alt={title || "Blog banner"} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1024px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-lg font-bold text-white">
              No Image Available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="my-8">
          <SmartContentRenderer content={content || ""} />
        </div>

        {/* Bottom Actions Bar */}
        <div className="my-10">
          <BlogBottomActions
            blogId={_id}
            slug={slug}
            initialLikes={likes || []}
            commentsCount={comments?.length || 0}
            currentUserId={currentUserId}
            title={title}
          />
        </div>

        <Separator className="my-10 h-[1px] bg-slate-200" />

        {/* Comment Section Container */}
        <div className="my-10 rounded-3xl bg-white p-5 sm:p-8 border border-slate-200 shadow-sm">
          <CommentSection
            blogId={_id}
            slug={slug}
            comments={comments || []}
            currentUserId={currentUserId}
            currentUserName={session?.user?.name || undefined}
            currentUserImage={session?.user?.image || undefined}
          />
        </div>
      </div>
    </article>
  );
}