"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Loader2,
  Save,
  Upload,
  FileText,
  Tag,
  Clock,
  Pencil,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { getBlogBySlug, updateBlog } from "@/lib/apiActions/blogsApi";

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const blogSlug = resolvedParams.slug;

  const [blogId, setBlogId] = useState<string>("");
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [content, setContent] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch blog details using Slug
  useEffect(() => {
    let isMounted = true;

    const fetchBlogDetails = async () => {
      try {
        setFetching(true);
        const res = await getBlogBySlug(blogSlug);
        const blogData = res?.data || res;

        if (!isMounted) return;

        if (blogData) {
          setBlogId(blogData._id || blogData.id || "");
          setTitle(blogData.title || "");
          setCategory(blogData.category || "");
          setReadTime(blogData.readTime || "5 min read");
          setContent(blogData.content || "");

          if (blogData.bannerImage?.url) {
            setExistingImageUrl(blogData.bannerImage.url);
          } else if (typeof blogData.bannerImage === "string") {
            setExistingImageUrl(blogData.bannerImage);
          }
        }
      } catch (error) {
        if (!isMounted) return;
        const msg = error instanceof Error ? error.message : "Failed to load blog details";
        toast.error(msg);
      } finally {
        if (isMounted) setFetching(false);
      }
    };

    fetchBlogDetails();

    return () => {
      isMounted = false;
    };
  }, [blogSlug]);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      toast.error("Title, Content, and Category are required!");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("category", category.trim());
      formData.append("readTime", readTime.trim() || "5 min read");
      formData.append("content", content.trim());

      if (imageFile) {
        formData.append("bannerImage", imageFile);
      }

      await updateBlog(blogId, formData);
      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to update blog";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-100 text-slate-500 gap-2 font-lexend">
        <Loader2 className="size-6 animate-spin text-indigo-600" />
        <span className="text-sm font-medium">Loading blog details...</span>
      </div>
    );
  }

  return (
    <div className="font-lexend space-y-6 pb-12">
      {/* Top Banner Alert */}
      <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
            <Pencil className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-indigo-900">Editing Blog Mode</h4>
            <p className="text-[11px] text-indigo-500 font-mono">Slug: {blogSlug}</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button
              asChild
              type="button"
              variant="outline"
              size="icon"
              className="size-9 rounded-xl border-slate-200 bg-white shadow-2xs hover:bg-slate-50"
            >
              <Link href="/admin/blogs">
                <ArrowLeft className="size-4 text-slate-600" />
              </Link>
            </Button>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Update Blog Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">Modify article title, content, image, or categorization.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/blogs")}
              className="rounded-xl text-slate-600 hover:bg-slate-100 text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs px-5 h-10 text-xs font-medium"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="size-3.5 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <Card className="bg-white border-slate-200/80 shadow-2xs rounded-2xl p-6 h-full flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="size-3.5 text-indigo-600" /> Title <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title..."
                  className="rounded-xl border-slate-200/80 bg-slate-50/30 focus:bg-white text-sm h-11"
                  required
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="size-3.5 text-indigo-600" /> Content <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here..."
                  className="rounded-xl border-slate-200/80 bg-slate-50/30 focus:bg-white text-sm leading-relaxed p-4 flex-1 w-full min-h-55 resize-y"
                  required
                />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4">
            <Card className="bg-white border-slate-200/80 shadow-2xs rounded-2xl p-6 h-full space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="size-3.5 text-indigo-600" /> Banner Image
                </label>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-slate-50/50 transition-colors relative group cursor-pointer">
                  {imagePreview || existingImageUrl ? (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-100">
                      <Image
                        src={imagePreview || existingImageUrl}
                        alt="Banner Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium bg-slate-900/80 px-3 py-1 rounded-lg backdrop-blur-xs">
                          Change Image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 flex flex-col items-center justify-center text-slate-400">
                      <Upload className="size-8 text-slate-300 mb-2" />
                      <p className="text-xs font-medium text-slate-600">Upload Image</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG or WEBP</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Tag className="size-3.5 text-indigo-600" /> Category <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. React, Career, Dev Life"
                  className="rounded-xl border-slate-200/80 bg-slate-50/30 focus:bg-white text-sm h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-indigo-600" /> Read Time
                </label>
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="rounded-xl border-slate-200/80 bg-slate-50/30 focus:bg-white text-sm h-11"
                />
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}