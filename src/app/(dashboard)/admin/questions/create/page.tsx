"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Sparkles,
  HelpCircle,
  FileText,
  Settings2,
  Info,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { createQuestion } from "@/lib/apiActions/questionApi";

export default function CreateQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    technology: "javascript",
    difficulty: "Medium",
    importanceTag: "Most Popular",
    easyAnswer: "",
    advancedAnswer: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.easyAnswer) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      setLoading(true);

      // Format payload according to backend 
      const payload = {
        title: formData.title,
        technology: formData.technology,
        difficulty: formData.difficulty,
        importanceTag: formData.importanceTag,
        easyAnswer: {
          explanation: formData.easyAnswer,
        },
        ...(formData.advancedAnswer && {
          advancedAnswer: {
            explanation: formData.advancedAnswer,
          },
        }),
      };

      await createQuestion(payload);
      toast.success("Question created successfully!");

      // Redirect to questions list on success
      router.push("/admin/questions");
      router.refresh();

    } catch (error: unknown) {
      
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create question");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-lexend max-w-5xl mx-auto space-y-6 px-4 sm:px-6 pb-12">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-10 rounded-xl border-slate-200 text-slate-600 shrink-0"
          >
            <Link href="/admin/questions">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Create New Question
            </h2>
            <p className="text-xs text-slate-500">
              Add technical interview questions with dual-level explanations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            asChild
            variant="ghost"
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-slate-600 text-xs sm:text-sm"
            disabled={loading}
          >
            <Link href="/admin/questions">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 sm:h-11 px-4 sm:px-5 bg-brand-accent hover:bg-indigo-700 text-white font-medium rounded-xl shadow-xs transition-all text-xs sm:text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 mr-1 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="size-4 mr-1" /> Save Question
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Core Details */}
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 sm:py-4 px-4 sm:px-6">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <HelpCircle className="size-4 text-indigo-600 shrink-0" />{" "}
                  Question Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Question Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    required
                    placeholder="e.g. What is Closure in JavaScript?"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="rounded-xl border-slate-200 h-10 text-sm focus-visible:ring-indigo-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Answer Explanations */}
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 sm:py-4 px-4 sm:px-6">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="size-4 text-indigo-600 shrink-0" />{" "}
                  Explanations & Answers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-5">
                {/* Easy Answer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label
                      htmlFor="easyAnswer"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Easy Answer <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md shrink-0">
                      Beginner Friendly
                    </span>
                  </div>
                  <Textarea
                    id="easyAnswer"
                    required
                    rows={4}
                    placeholder="Provide a simplified explanation with short code example..."
                    value={formData.easyAnswer}
                    onChange={(e) =>
                      setFormData({ ...formData, easyAnswer: e.target.value })
                    }
                    className="rounded-xl border-slate-200 resize-none text-sm focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Advanced Answer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label
                      htmlFor="advancedAnswer"
                      className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                    >
                      <Sparkles className="size-3.5 text-indigo-600 shrink-0" />{" "}
                      Advanced Answer
                    </Label>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md shrink-0">
                      In-depth Concept
                    </span>
                  </div>
                  <Textarea
                    id="advancedAnswer"
                    rows={6}
                    placeholder="Provide deep technical details, engine behavior, or performance impacts..."
                    value={formData.advancedAnswer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        advancedAnswer: e.target.value,
                      })
                    }
                    className="rounded-xl border-slate-200 resize-none text-sm focus-visible:ring-indigo-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 sm:py-4 px-4 sm:px-6">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Settings2 className="size-4 text-indigo-600 shrink-0" />{" "}
                  Categorization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Technology Dropdown */}
                <div className="space-y-2">
                  <Label
                    htmlFor="technology"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Technology <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="technology"
                    value={formData.technology}
                    onChange={(e) =>
                      setFormData({ ...formData, technology: e.target.value })
                    }
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nextjs">Next.js</option>
                    <option value="expressjs">Express.js</option>
                    <option value="mongodb">MongoDB</option>
                    <option value="tailwind">Tailwind CSS</option>
                    <option value="css3">CSS3</option>
                    <option value="html5">HTML5</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="prisma">Prisma ORM</option>
                  </select>
                </div>

                {/* Difficulty Level Dropdown */}
                <div className="space-y-2">
                  <Label
                    htmlFor="difficulty"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Difficulty Level <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Importance Tag Dropdown */}
                <div className="space-y-2">
                  <Label
                    htmlFor="importanceTag"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Importance Tag <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="importanceTag"
                    value={formData.importanceTag}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        importanceTag: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Top Asked">Top Asked</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Most Popular">Most Popular</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Helper Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900">
                <Info className="size-3.5 text-indigo-600 shrink-0" /> Dual
                Explanation Guide
              </div>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Providing both Easy and Advanced answers helps candidates
                prepare effectively for both entry-level and senior technical
                interviews.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}