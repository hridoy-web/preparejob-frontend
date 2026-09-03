import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Eye, Edit, Trash2 } from "lucide-react";

export default function AdminBlogsPage() {
  const dummyBlogs = [
    { id: "1", title: "Top 10 MERN Stack Interview Questions for 2026", status: "Published", date: "Sep 01, 2026" },
    { id: "2", title: "Mastering Tailwind CSS v4 for Modern Dashboards", status: "Draft", date: "Aug 28, 2026" },
  ];

  return (
    <div className="font-lexend space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Blogs Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Publish and edit articles for job seekers.</p>
        </div>
        
        {/* Write New Blog Button with Link */}
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs h-11 px-5">
          <Link href="/admin/blogs/create">
            <Plus className="size-4 mr-2" /> Write New Blog
          </Link>
        </Button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4 px-6">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <FileText className="size-4 text-emerald-600" /> Blog Articles ({dummyBlogs.length})
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-slate-100">
          {dummyBlogs.map((blog) => (
            <div key={blog.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{blog.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    blog.status === "Published" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {blog.status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{blog.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button size="sm" variant="outline" className="rounded-lg text-slate-600">
                  <Eye className="size-3.5 mr-1" /> View
                </Button>
                <Button size="sm" variant="outline" className="rounded-lg text-slate-600">
                  <Edit className="size-3.5 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="rounded-lg text-rose-600 hover:bg-rose-50">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}