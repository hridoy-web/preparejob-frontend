"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Upload, Loader2, X, FileText, Tag, Clock } from "lucide-react";
import { toast } from "sonner";
import { createBlogApi } from "@/lib/apiActions/blogService";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    readTime: "5 min read",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) return toast.error("Please select a banner image!");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("readTime", formData.readTime);
      data.append("bannerImage", imageFile);

      const res = await createBlogApi(data);
      toast.success(res.message || "Blog created successfully!");

      setFormData({ title: "", content: "", category: "", readTime: "5 min read" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-lexend max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="size-10 rounded-xl border-slate-200">
            <Link href="/admin/blogs"><ArrowLeft className="size-5" /></Link>
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create New Blog</h2>
            <p className="text-xs text-slate-500">Publish new articles to your site</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-xl text-slate-600">
            <Link href="/admin/blogs">Cancel</Link>
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 px-5 font-medium shadow-sm"
          >
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
            Publish Post
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Title & Content Area (2 Cols) */}
        <div className="md:col-span-2">
          <Card className="p-6 rounded-2xl space-y-5 bg-white border-slate-200/80 shadow-xs">
            <div>
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <FileText className="size-3.5 text-indigo-600" /> Title *
              </Label>
              <Input
                required
                placeholder="Blog Title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="rounded-xl h-11 text-sm border-slate-200 focus-visible:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <FileText className="size-3.5 text-indigo-600" /> Content *
              </Label>
              <Textarea
                required
                placeholder="Write your article content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="rounded-xl min-h-46 resize-y text-sm leading-relaxed border-slate-200 focus-visible:ring-indigo-500 p-4"
              />
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Banner, Category & Read Time (1 Col) */}
        <div className="space-y-4">
          <Card className="p-5 rounded-2xl space-y-5 bg-white border-slate-200/80 shadow-xs">
            
            {/* Banner Image */}
            <div>
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Upload className="size-3.5 text-indigo-600" /> Banner Image *
              </Label>

              {imagePreview ? (
                <div className="relative mt-1.5 rounded-xl overflow-hidden aspect-video border border-slate-200 bg-slate-50">
                  <Image 
                    src={imagePreview} 
                    alt="Banner Preview" 
                    fill 
                    unoptimized 
                    className="object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute top-2 right-2 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors z-10"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/20 cursor-pointer mt-1.5 transition-colors">
                  <Upload className="size-6 text-slate-400 mb-1" />
                  <span className="text-xs font-medium text-slate-600">Upload Image</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG or WEBP</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>

            {/* Category */}
            <div>
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Tag className="size-3.5 text-indigo-600" /> Category *
              </Label>
              <Input
                required
                placeholder="e.g. React, Career, Dev Life"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-xl border-slate-200 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Read Time */}
            <div>
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Clock className="size-3.5 text-indigo-600" /> Read Time
              </Label>
              <Input
                placeholder="e.g. 5 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="rounded-xl border-slate-200 focus-visible:ring-indigo-500"
              />
            </div>

          </Card>
        </div>

      </form>
    </div>
  );
}