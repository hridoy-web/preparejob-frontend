import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit3, Trash2, Layers, Star } from "lucide-react";

export default function AdminQuestionsPage() {
  const dummyQuestions = [
    {
      _id: "1",
      title: "What is Closure in JavaScript?",
      technology: "javascript",
      difficulty: "Medium",
      importanceTag: "Top Asked",
      updatedAt: "2026-08-30",
    },
    {
      _id: "2",
      title: "How does indexing work in MongoDB?",
      technology: "mongodb",
      difficulty: "Hard",
      importanceTag: "Important",
      updatedAt: "2026-08-31",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Questions Bank</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage, edit and create interview questions for candidates.</p>
        </div>
        <Button asChild className="text-white h-11 hover:bg-brand-accent rounded-lg shadow-xs">
          <Link href="/admin/questions/create">
            <Plus className="size-4 mr-1" /> Add New Question
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border-slate-200/80 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="size-4 absolute left-3 top-3 text-slate-400" />
            <Input placeholder="Search questions by title, technology, or tag..." className="pl-9 rounded-xl border-slate-200" />
          </div>
        </CardContent>
      </Card>

      {/* Questions Data Table */}
      <Card className="bg-white border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Question Title</th>
                <th className="px-4 py-3.5">Technology</th>
                <th className="px-4 py-3.5">Difficulty</th>
                <th className="px-4 py-3.5">Tag</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyQuestions.map((q) => (
                <tr key={q._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900 max-w-xs sm:max-w-md truncate">
                    {q.title}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 font-medium px-2.5 py-1 rounded-md text-xs border border-indigo-100 uppercase">
                      <Layers className="size-3" />
                      {q.technology}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md ${
                      q.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      q.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                      "bg-rose-50 text-rose-700 border border-rose-100"
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md text-xs">
                      <Star className="size-3 text-amber-500" />
                      {q.importanceTag}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button size="sm" variant="ghost" className="size-8 p-0 rounded-lg text-slate-600 hover:bg-slate-100">
                        <Edit3 className="size-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="size-8 p-0 rounded-lg text-rose-600 hover:bg-rose-50">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}