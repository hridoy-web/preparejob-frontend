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
  Plus,
  Trash2,
  CheckCircle2,
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

  // Dynamic state for Key Points (starting with 1 empty field)
  const [keyPoints, setKeyPoints] = useState<string[]>([""]);

  const handleAddKeyPoint = () => {
    setKeyPoints([...keyPoints, ""]);
  };

  const handleRemoveKeyPoint = (index: number) => {
    const updated = keyPoints.filter((_, i) => i !== index);
    setKeyPoints(updated.length > 0 ? updated : [""]);
  };

  const handleKeyPointChange = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.easyAnswer || !formData.advancedAnswer) {
      toast.error("Please fill in all required fields (including Advanced Answer)!");
      return;
    }

    // Filter and validate required key points
    const formattedKeyPoints = keyPoints
      .map((kp) => kp.trim())
      .filter((kp) => kp.length > 0);

    if (formattedKeyPoints.length === 0) {
      toast.error("Please provide at least 1 key point!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        technology: formData.technology,
        difficulty: formData.difficulty,
        importanceTag: formData.importanceTag,
        easyAnswer: {
          explanation: formData.easyAnswer,
          keyPoints: formattedKeyPoints,
        },
        advancedAnswer: {
          explanation: formData.advancedAnswer,
        },
      };

      await createQuestion(payload);
      toast.success("Question created successfully!");

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
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-slate-600 text-xs sm:text-sm cursor-pointer"
            disabled={loading}
          >
            <Link href="/admin/questions">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 sm:h-11 px-4 sm:px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-xs transition-all text-xs sm:text-sm cursor-pointer"
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

            {/* Answer Explanations & Key Points */}
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 sm:py-4 px-4 sm:px-6">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="size-4 text-indigo-600 shrink-0" />{" "}
                  Explanations & Key Points
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

                {/* Dynamic Key Points Section (Required) */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      Core Concepts / Key Points{" "}
                      <span className="text-rose-500">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddKeyPoint}
                      className="h-7 px-2.5 text-xs font-medium rounded-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                    >
                      <Plus className="size-3.5 mr-1" /> Add Point
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {keyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono text-[11px] font-bold text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Input
                          required={index === 0}
                          placeholder={`Key point ${index + 1} (e.g. Tracks code changes over time)`}
                          value={point}
                          onChange={(e) =>
                            handleKeyPointChange(index, e.target.value)
                          }
                          className="rounded-xl border-slate-200 h-9 text-xs focus-visible:ring-indigo-500 flex-1"
                        />
                        {keyPoints.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveKeyPoint(index)}
                            className="size-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl shrink-0 cursor-pointer"
                            title="Remove point"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Answer (Required) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <Label
                      htmlFor="advancedAnswer"
                      className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                    >
                      <Sparkles className="size-3.5 text-indigo-600 shrink-0" />{" "}
                      Advanced Answer <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md shrink-0">
                      In-depth Concept
                    </span>
                  </div>
                  <Textarea
                    id="advancedAnswer"
                    required
                    rows={5}
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
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nextjs">Next.js</option>
                    <option value="expressjs">Express.js</option>
                    <option value="mongodb">MongoDB</option>
                    <option value="mongoose">Mongoose</option>
                    <option value="tailwind-css">Tailwind CSS</option>
                    <option value="css3">CSS3</option>
                    <option value="html5">HTML5</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="prisma">Prisma ORM</option>
                    <option value="redis">Redis</option>
                    <option value="git-github">Git & GitHub</option>
                    <option value="docker">Docker</option>
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
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
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
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
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
                Explanation & Key Points Guide
              </div>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Providing both Easy, Advanced answers and at least 1 key point is mandatory to ensure complete preparation for all levels of technical interviews.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}