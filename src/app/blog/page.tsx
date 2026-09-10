import BlogHeader from "@/components/blog/BlogHeader";
import { Metadata } from "next";
import { getAllBlogs } from "@/lib/apiActions/blogsApi";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogPagination from "@/components/blog/BlogPagination";


export const metadata: Metadata = {
    title: "Career & Interview Mastery Blog | Prepare Job",
    description: "Master developer interviews with practical coding guides, interview strategies, technical insights, and career advice designed to help you land your next job.",
};

const CATEGORIES = [
    "All",
    "Frontend & UI",
    "Backend & APIs",
    "Databases",
    "Behavioral",
    "Interview Prep",
];

const LIMIT = 6;

interface BlogPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        page?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedParams = await searchParams;
    const search = resolvedParams.search || "";
    const selectedCategory = resolvedParams.category || "";
    const page = Number(resolvedParams.page) || 1;

    let blogs: BlogPost[] = [];
    let totalPages = 0;

    try {
        const response = await getAllBlogs({
            page,
            limit: 6,
            search,
            category: selectedCategory === "All" ? "" : selectedCategory,
            sort: "createdAt",
            order: "desc",
        });

        if (Array.isArray(response?.data)) {
            blogs = response;
        } else if (Array.isArray(response?.data)) {
            blogs = response.data;
        } else if (Array.isArray(response?.data)) {
            blogs = response.blogs;
        } else if (Array.isArray(response?.data?.blogs)) {
            blogs = response.data.blogs;
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }

    return(
        <main className="min-h-screen bg-[var(--color-brand-surface)] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <BlogHeader />

                <BlogFilterBar categories={CATEGORIES} />

                <section className="mt-12" aria-label="Blog Articles List">
                    {blogs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                            <p className="text-sm font-semibold text-slate-500">
                                No blog posts found. Please check back later or explore other categories.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            <BlogPagination currentPage={page} totalPages={totalPages} />
                        </>
                    )}
                </section>
            </div>
        </main>

    );
}