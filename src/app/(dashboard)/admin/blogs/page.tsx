"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, FileText, Eye, Edit, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { getAllBlogs, deleteBlog } from "@/lib/apiActions/blogsApi";

interface Blog {
  _id?: string;
  id?: string;
  title: string;
  status?: string;
  createdAt?: string;
  slug?: string;
  category?: string;
  readTime?: string;
  content?: string;
  bannerImage?: { url: string } | string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Selected blog states for delete and view modals
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [viewBlog, setViewBlog] = useState<Blog | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  // Fetch paginated blogs list
  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        const res = await getAllBlogs({ page: currentPage, limit: 10 });

        if (!isMounted) return;

        const responseData = res?.data || res;
        const blogList = responseData?.blogs || [];
        const paginationData = responseData?.pagination || {
          page: currentPage,
          limit: 10,
          totalItems: blogList.length,
          totalPages: 1,
        };

        setBlogs(blogList);
        setPagination(paginationData);
      } catch (error) {
        if (!isMounted) return;
        const msg = error instanceof Error ? error.message : "Failed to load blogs";
        toast.error(msg);
        setBlogs([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Confirm and execute single blog deletion
  const confirmDelete = async () => {
    if (!blogToDelete) return;

    const targetId = blogToDelete._id || blogToDelete.id;
    if (!targetId) return;

    try {
      setDeletingId(targetId);
      await deleteBlog(targetId);
      toast.success("Blog deleted successfully!");

      // Refresh current page after deletion
      const res = await getAllBlogs({ page: currentPage, limit: 10 });
      const responseData = res?.data || res;
      setBlogs(responseData?.blogs || []);
      if (responseData?.pagination) setPagination(responseData.pagination);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to delete blog";
      toast.error(msg);
    } finally {
      setDeletingId(null);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="font-lexend space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Blogs Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Publish and edit articles for job seekers.</p>
        </div>

        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs h-11 px-5 cursor-pointer">
          <Link href="/admin/blogs/create">
            <Plus className="size-4 mr-2" /> Write New Blog
          </Link>
        </Button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4 px-6">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <FileText className="size-4 text-emerald-600" /> Blog Articles ({pagination.totalItems})
          </CardTitle>
        </CardHeader>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="flex items-center justify-center p-8 text-slate-500 gap-2">
              <Loader2 className="size-5 animate-spin text-indigo-600" />
              <span className="text-sm">Loading blogs...</span>
            </div>
          ) : !Array.isArray(blogs) || blogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No blogs found. Click &quot;Write New Blog&quot; to create one.
            </div>
          ) : (
            blogs.map((blog) => {
              const blogId = blog._id || blog.id || "";
              const blogSlug = blog.slug || blogId; 
              const formattedDate = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                : "N/A";

              return (
                <div key={blogId} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{blog.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        (blog.status || "Published") === "Published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {blog.status || "Published"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* View Button: Opens Smooth Modal without page reload */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewBlog(blog)}
                      className="rounded-lg text-slate-600 cursor-pointer"
                    >
                      <Eye className="size-3.5 mr-1" /> View
                    </Button>

                    {/* Edit button */}
                    <Button asChild size="sm" variant="outline" className="rounded-lg text-slate-600 cursor-pointer">
                      <Link href={`/admin/blogs/edit/${blogSlug}`}>
                        <Edit className="size-3.5 mr-1" /> Edit
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={deletingId === blogId}
                      onClick={() => setBlogToDelete(blog)}
                      className="rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      {deletingId === blogId ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Numbered Pagination Control */}
        {!loading && pagination.totalPages > 1 && (
          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Page {pagination.page} of {pagination.totalPages} ({pagination.totalItems} total items)
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="h-8 px-2.5 rounded-lg text-xs cursor-pointer"
              >
                <ChevronLeft className="size-3.5 mr-1" /> Back
              </Button>

              {Array.from({ length: pagination.totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === currentPage;

                return (
                  <Button
                    key={pageNum}
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-8 w-8 p-0 rounded-lg text-xs font-semibold cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === pagination.totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="h-8 px-2.5 rounded-lg text-xs cursor-pointer"
              >
                Next <ChevronRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Blog Details View Modal */}
      <Dialog open={Boolean(viewBlog)} onOpenChange={() => setViewBlog(null)}>
        <DialogContent className="sm:max-w-xl rounded-2xl p-6 bg-white border border-slate-200 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 pr-6">
              {viewBlog?.title}
            </DialogTitle>
          </DialogHeader>

          {viewBlog && (
            <div className="space-y-4 my-2">
              <div className="flex flex-wrap items-center gap-2">
                {viewBlog.category && (
                  <span className="inline-flex items-center font-bold px-2.5 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                    {viewBlog.category}
                  </span>
                )}
                {viewBlog.readTime && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {viewBlog.readTime}
                  </span>
                )}
              </div>

              {viewBlog.bannerImage && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-100">
                  <Image
                    src={typeof viewBlog.bannerImage === "string" ? viewBlog.bannerImage : viewBlog.bannerImage.url}
                    alt={viewBlog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {viewBlog.content && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Article Content</span>
                  <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {viewBlog.content}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              onClick={() => setViewBlog(null)}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm h-10 px-4 cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
        <AlertDialogContent className="rounded-2xl bg-white p-6 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500 mt-2">
              This action cannot be undone. You are about to delete:
              <span className="block font-semibold text-slate-800 mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                &quot;{blogToDelete?.title}&quot;
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6 flex items-center justify-end gap-3">
            <AlertDialogCancel className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-600 font-medium cursor-pointer"
            >
              {deletingId ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Deleting...
                </span>
              ) : (
                "Delete Blog"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}