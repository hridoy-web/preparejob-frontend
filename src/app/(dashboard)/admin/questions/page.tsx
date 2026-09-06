"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Star,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { toast } from "sonner";
import { getAllQuestions, deleteQuestion } from "@/lib/apiActions/questionApi";

interface IQuestion {
  _id: string;
  title: string;
  technology: string;
  difficulty: string;
  importanceTag: string;
  updatedAt?: string;
}

interface IPagination {
  currentPage: number;
  totalPages: number;
  totalQuestions: number;
  limit: number;
}

// Tech Specific badge
const getTechBadgeStyle = (tech: string) => {
  const normalizedTech = tech?.toLowerCase() || "";

  switch (normalizedTech) {
    case "javascript":
    case "js":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "react":
    case "reactjs":
      return "bg-cyan-100 text-cyan-800 border-cyan-300";
    case "nodejs":
    case "node":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "typescript":
    case "ts":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "nextjs":
    case "next":
      return "bg-slate-900 text-white border-slate-700";
    case "expressjs":
    case "express":
      return "bg-neutral-200 text-neutral-800 border-neutral-400";
    case "mongodb":
    case "mongo":
      return "bg-green-100 text-green-800 border-green-300";
    case "tailwind":
    case "tailwindcss":
      return "bg-sky-100 text-sky-800 border-sky-300";
    case "css3":
    case "css":
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
    case "html5":
    case "html":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "postgresql":
    case "postgres":
      return "bg-blue-100 text-blue-900 border-blue-300";
    case "prisma":
      return "bg-teal-100 text-teal-800 border-teal-300";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

// Difficulty Badges
const getDifficultyBadgeStyle = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/80 before:bg-emerald-500";
    case "Medium":
      return "bg-amber-50 text-amber-700 border-amber-200/80 before:bg-amber-500";
    case "Hard":
      return "bg-rose-50 text-rose-700 border-rose-200/80 before:bg-rose-500";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 before:bg-slate-500";
  }
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  // Pagination State
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalQuestions: 0,
    limit: 10,
  });

  // Delete Dialog State
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const fetchQuestions = useCallback(async (page = 1, tech = "", diff = "") => {
    setLoading(true);
    try {
      // query params to trigger Backend Filtering & Pagination
      const res = await getAllQuestions({ page, limit: 10, technology: tech, difficulty: diff });

      const rawData = res?.data?.questions || res?.data || res?.questions || res || [];
      const paginationData = res?.data?.pagination || res?.pagination;

      setQuestions(Array.isArray(rawData) ? rawData : []);
      if (paginationData) {
        setPagination(paginationData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch questions");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        fetchQuestions(pagination.currentPage, selectedTech, selectedDifficulty);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchQuestions, pagination.currentPage, selectedTech, selectedDifficulty]);

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleDifficultyChange = (diff: string) => {
    setSelectedDifficulty(diff);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setSelectedTech("");
    setSelectedDifficulty("");
    setSearchTerm("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const openDeleteModal = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedQuestion) return;

    const id = selectedQuestion._id;
    try {
      setDeletingId(id);
      await deleteQuestion(id);
      toast.success("Question deleted successfully!");
      fetchQuestions(pagination.currentPage, selectedTech, selectedDifficulty);
      setIsDeleteDialogOpen(false);
      setSelectedQuestion(null);
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete question");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Client-side quick filter for title / tag search
  const filteredQuestions = questions.filter(
    (q) =>
      q.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.importanceTag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 px-4 sm:px-6 pb-12 font-lexend">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Questions Bank
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage, edit and create interview questions for candidates.
          </p>
        </div>
        <Button
          asChild
          className="text-white h-10 sm:h-11 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shrink-0 text-xs sm:text-sm"
        >
          <Link href="/admin/questions/create">
            <Plus className="size-4 mr-1" /> Add New Question
          </Link>
        </Button>
      </div>

      {/* Search & Server-Side Filter Bar */}
      <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:flex-1">
            <Search className="size-4 absolute left-3 top-3 text-slate-400 shrink-0" />
            <Input
              placeholder="Search title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl border-slate-200 text-xs sm:text-sm h-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Tech Select Filter */}
            <select
              value={selectedTech}
              onChange={(e) => handleTechChange(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 md:w-40"
            >
              <option value="">All Tech</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="typescript">TypeScript</option>
              <option value="nextjs">Next.js</option>
              <option value="expressjs">Express.js</option>
              <option value="mongodb">MongoDB</option>
              <option value="tailwind">Tailwind</option>
            </select>

            {/* Difficulty Select Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 md:w-36"
            >
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {(selectedTech || selectedDifficulty || searchTerm) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                size="icon"
                className="h-10 size-10 rounded-xl text-slate-500 hover:text-slate-900 shrink-0"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Questions Data Table */}
      <Card className="bg-white border-slate-200/80 shadow-xs overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-150">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 sm:px-5 py-3.5">Question Title</th>
                <th className="px-3 sm:px-4 py-3.5">Technology</th>
                <th className="px-3 sm:px-4 py-3.5">Difficulty</th>
                <th className="px-3 sm:px-4 py-3.5">Tag</th>
                <th className="px-4 sm:px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="size-5 animate-spin text-indigo-600" />
                      <span>Loading questions...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-xs sm:text-sm">
                    No questions found.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 sm:px-5 py-4 font-semibold text-slate-900 max-w-xs sm:max-w-md truncate">
                      {q.title}
                    </td>
                    <td className="px-3 sm:px-4 py-4">
                      <span className={`inline-flex items-center font-bold px-2.5 py-1 rounded-md text-[10px] sm:text-xs border uppercase tracking-wide shrink-0 ${getTechBadgeStyle(q.technology)}`}>
                        {q.technology}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 before:size-1.5 before:rounded-full ${getDifficultyBadgeStyle(q.difficulty)}`}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-medium px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs shrink-0">
                        <Star className="size-3 text-amber-500 shrink-0" />
                        {q.importanceTag}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="size-8 p-0 rounded-lg text-slate-600 hover:bg-slate-100"
                        >
                          <Link href={`/admin/questions/edit/${q._id}`}>
                            <Edit3 className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteModal(q)}
                          className="size-8 p-0 rounded-lg text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-Side Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <span className="font-semibold text-slate-800">{questions.length}</span> of{" "}
              <span className="font-semibold text-slate-800">{pagination.totalQuestions}</span> questions
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage <= 1 || loading}
                onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                className="h-8 px-2.5 rounded-lg border-slate-200"
              >
                <ChevronLeft className="size-4 mr-1" /> Previous
              </Button>
              <span className="font-medium text-slate-700">
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage >= pagination.totalPages || loading}
                onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                className="h-8 px-2.5 rounded-lg border-slate-200"
              >
                Next <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white border border-slate-200">
          <DialogHeader className="flex flex-col items-center sm:items-start space-y-3 text-center sm:text-left">
            <div className="size-11 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-lg font-bold text-slate-900">
                Delete Question?
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                This action cannot be undone. This will permanently delete the question:
              </DialogDescription>
            </div>
          </DialogHeader>

          {selectedQuestion && (
            <div className="my-2 p-3 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 truncate">
              {selectedQuestion.title}
            </div>
          )}

          <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={Boolean(deletingId)}
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm h-10 px-4"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={Boolean(deletingId)}
              onClick={handleDeleteConfirm}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs sm:text-sm h-10 px-4 shadow-sm inline-flex items-center justify-center gap-1.5"
            >
              {deletingId ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete Question"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}