import BlogCard from "@/components/blog/BlogCard";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogPagination from "@/components/blog/BlogPagination";
import { getAllBlogs } from "@/lib/apiActions/blogsApi";
import type { BlogPost } from "@/types/blog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Career & Interview Mastery Blog | Prepare Job",
  description:
    "Master developer interviews with practical coding guides, interview strategies, technical insights, and career advice designed to help you land your next job.",
};

const CATEGORIES = [
  "All",
  "Frontend & UI",
  "Backend & APIs",
  "Databases",
  "Behavioral",
  "Interview Prep",
] as const;

const LIMIT = 6;

interface BlogPageProps {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search = "", category = "", page: rawPage } = await searchParams;
  const parsedPage = Number(rawPage);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  let blogs: BlogPost[] = [];
  let totalPages = 0;

  try {
    const response = await getAllBlogs({
      page,
      limit: LIMIT,
      search,
      category: category === "All" ? "" : category,
      sort: "createdAt",
      order: "desc",
    });

    blogs = Array.isArray(response?.data?.blogs) ? response.data.blogs : [];
    const totalItems = response?.data?.pagination?.totalItems;

    totalPages =
      response?.data?.pagination?.totalPages ??
      (totalItems ? Math.ceil(totalItems / LIMIT) : 0);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogs = [];
  }

  const featuredBlog = page === 1 && blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = page === 1 ? blogs.slice(1) : blogs;

  return (
    <main className="min-h-screen bg-[var(--color-brand-surface)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader />

        <Suspense fallback={null}>
          <BlogFilterBar categories={CATEGORIES} />
        </Suspense>

        <section className="mt-12" aria-label="Blog Articles List">
          {blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-slate-500">
                No blog posts found. Please check back later or explore other
                categories.
              </p>
            </div>
          ) : (
            <>
              {featuredBlog && (
                <div className="mb-8">
                  <BlogCard blog={featuredBlog} isFeatured />
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {regularBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              <Suspense fallback={null}>
                <BlogPagination currentPage={page} totalPages={totalPages} />
              </Suspense>
            </>
          )}
        </section>
      </div>
    </main>
  );
}