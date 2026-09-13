import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug } from "@/lib/apiActions/blogsApi";
import { BlogPost } from "@/types/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SingleBlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetaData({ params }: SingleBlogPageProps) {
    const { slug } = await params;
    try{
        const response = await getBlogBySlug(slug);
        const blog: BlogPost = response?.data || response;
        if (!blog) return { title: "Blog Not Found" };

        return {
            title: `${blog.title} | Technical Blog`,
            description: blog.content ? blog.content.replace(/<[^>]*>/g, "").substring(0, 160) : "Read article",
        };
    } catch {
        return { title: "Blog Not Found"};
    }
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
    const { slug } = await params;

    let blog: BlogPost;
    try {
        const response = await getBlogBySlug(slug);
        blog = response?.data || response;
    } catch {
        notFound();
    }

    if (!blog || !blog._id) notFound();

    const { _id, title, category, content, bannerImage, readTime, createdAt, likes, comments } = blog;

    const imageUrl = typeof bannerImage === "string"
        ? bannerImage
        : bannerImage?.url || bannerImage?.secure_url || "";

        return (
            <article className="min-h-screen bg-slate-50/50 py-10 lg:py-16">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                    {/* Back button */}
                    <div className="mb-8">
                        <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-indigo-600">
                            <Link href="/blog" className="inline-flex items-center gap-2">
                                <ArrowLeft className="size-4"/>
                                <span>Back to Blogs</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Header */}
                    <header className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="secondary" className="bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100">
                                {category}
                            </Badge>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                <Clock className="size-3.5 text-indigo-500"/>
                                {readTime || "5 min read"}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>

                        <div className="flex flex-col gap-4 border-y border-slate-200/80 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <Calendar className="size-3.5 text-slate-500" />
                                <span>{new Date(createdAt).toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" })}</span>
                            </div>

                            {/* Like & Comment */}
                        </div>
                    </header>

                    {/* Banner Image */}
                    <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1200px) 100vw, 896px"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-medium">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed sm:prose-lg prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 prose-img:rounded-xl">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>

                    <Separator className="my-10"/>
                </div>
            </article>
        )
}