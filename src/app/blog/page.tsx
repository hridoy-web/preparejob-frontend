import BlogHeader from "@/components/blog/BlogHeader";
import { Metadata } from "next";
import { getAllBlogs } from "@/lib/apiActions/blogsApi";
import BlogCard, { BlogPost } from "@/components/blog/BlogCard";


export const metadata: Metadata = {
    title: "Career & Interview Mastery Blog | Prepare Job",
    description: "Master developer interviews with practical coding guides, interview strategies, technical insights, and career advice designed to help you land your next job.",
};

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
    const category = resolvedParams.category || "";
    const page = Number(resolvedParams.page) || 1;

    let blogs: BlogPost[] = [];
    let totalPages = 1;

    try {
        const response = await getAllBlogs({
            page,
            limit: 6,
            search,
            category: category === "All" ? "" : category,
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
        totalPages = response.totalPages || Math.ceil((response.total || 1) / 6);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }

    return(
        <main className="min-h-screen bg-[var(--color-brand-surface)] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <BlogHeader />

                <section className="mt-12" aria-label="Blog Articles List">
                    {blogs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                            <p className="text-sm font-semibold text-slate-500">
                                No blog posts found. Please check back later or explore other categories.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>

    );
}