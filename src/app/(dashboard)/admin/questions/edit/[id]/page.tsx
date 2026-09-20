"use client";

import { useEffect, useState, useCallback, use } from "react";
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
  Loader2,
  Edit3,
  CheckCircle2,
  Layers,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { updateQuestion, getQuestionById } from "@/lib/apiActions/questionApi";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditQuestionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    technology: "javascript",
    difficulty: "Medium",
    importanceTag: "Most Popular",
    easyAnswer: "",
    advancedAnswer: "",
  });

  // Dynamic Key Points State
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

  // সরাসরি ব্যাকএন্ডের getQuestionById ব্যবহার করে নির্দিষ্ট কোয়েশ্চেন ফেচ করা
  const fetchSingleQuestion = useCallback(async () => {
    try {
      const res = await getQuestionById(id);
      const currentQ = res?.data || res;

      if (currentQ) {
        setFormData({
          title: currentQ.title || "",
          technology: currentQ.technology || "javascript",
          difficulty: currentQ.difficulty || "Medium",
          importanceTag: currentQ.importanceTag || "Most Popular",
          easyAnswer: currentQ.easyAnswer?.explanation || "",
          advancedAnswer: currentQ.advancedAnswer?.explanation || "",
        });

        // Extract and set existing key points safely
        const rawKP = currentQ.easyAnswer?.keyPoints || [];
        const formattedKP = rawKP
          .map((kp: unknown) => {
            if (typeof kp === "string") return kp;
            if (kp && typeof kp === "object" && "point" in kp) {
              return (kp as { point: string }).point;
            }
            return "";
          })
          .filter(Boolean);

        if (formattedKP.length > 0) {
          setKeyPoints(formattedKP);
        }
      } else {
        toast.error("Question not found");
        router.push("/admin/questions");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to load question details");
      }
      router.push("/admin/questions");
    } finally {
      setFetching(false);
    }
  }, [id, router]);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        fetchSingleQuestion();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchSingleQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.easyAnswer || !formData.advancedAnswer) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Validate key points
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

      await updateQuestion(id, payload);
      toast.success("Question updated successfully!");

      router.push("/admin/questions");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update question");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-3">
        <Loader2 className="size-8 animate-spin text-indigo-600" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">Fetching question data...</p>
      </div>
    );
  }

  return (
    <div className="font-lexend max-w-5xl mx-auto space-y-6 px-3 sm:px-6 pb-20 sm:pb-12">
      {/* Top Banner Notice */}
      <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-indigo-900">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700 shrink-0">
            <Edit3 className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold truncate">Editing Question Mode</p>
            <p className="text-[10px] sm:text-xs text-indigo-700/80 truncate">ID: {id}</p>
          </div>
        </div>
        <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full shrink-0">
          <Layers className="size-3" /> Live Record
        </span>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-9 sm:size-10 rounded-xl border-slate-200 text-slate-600 shrink-0"
          >
            <Link href="/admin/questions">
              <ArrowLeft className="size-4 sm:size-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Update Question Details
            </h2>
            <p className="text-xs text-slate-500">
              Modify the question text, difficulty, tags, key points, or explanations.
            </p>
          </div>
        </div>

        {/* Desktop Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="h-10 px-4 rounded-xl text-slate-600 text-xs sm:text-sm"
            disabled={loading}
          >
            <Link href="/admin/questions">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-xs transition-all text-xs sm:text-sm cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 mr-1.5 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="size-4 mr-1.5" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 px-4 sm:px-6">
                <CardTitle className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <HelpCircle className="size-4 text-indigo-600 shrink-0" /> Question Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-xs font-semibold text-slate-700">
                    Question Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    required
                    placeholder="e.g. What is Closure in JavaScript?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="rounded-xl border-slate-200 h-10 text-xs sm:text-sm focus-visible:ring-indigo-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 px-4 sm:px-6">
                <CardTitle className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="size-4 text-indigo-600 shrink-0" /> Answers, Key Points & Explanations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="easyAnswer" className="text-xs font-semibold text-slate-700">
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
                    placeholder="Provide a simplified explanation..."
                    value={formData.easyAnswer}
                    onChange={(e) => setFormData({ ...formData, easyAnswer: e.target.value })}
                    className="rounded-xl border-slate-200 resize-none text-xs sm:text-sm focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Dynamic Key Points Section (Required) */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      Core Concepts / Key Points <span className="text-rose-500">*</span>
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
                          onChange={(e) => handleKeyPointChange(index, e.target.value)}
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

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="advancedAnswer" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-indigo-600 shrink-0" /> Advanced Answer <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md shrink-0">
                      In-depth Concept
                    </span>
                  </div>
                  <Textarea
                    id="advancedAnswer"
                    required
                    rows={5}
                    placeholder="Provide deep technical details..."
                    value={formData.advancedAnswer}
                    onChange={(e) => setFormData({ ...formData, advancedAnswer: e.target.value })}
                    className="rounded-xl border-slate-200 resize-none text-xs sm:text-sm focus-visible:ring-indigo-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl">
              <CardHeader className="border-b border-slate-100 py-3.5 px-4 sm:px-6">
                <CardTitle className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Settings2 className="size-4 text-indigo-600 shrink-0" /> Categorization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="technology" className="text-xs font-semibold text-slate-700">
                    Technology <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="technology"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
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

                <div className="space-y-1.5">
                  <Label htmlFor="difficulty" className="text-xs font-semibold text-slate-700">
                    Difficulty Level <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="importanceTag" className="text-xs font-semibold text-slate-700">
                    Importance Tag <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="importanceTag"
                    value={formData.importanceTag}
                    onChange={(e) => setFormData({ ...formData, importanceTag: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Top Asked">Top Asked</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Most Popular">Most Popular</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900">
                <CheckCircle2 className="size-3.5 text-indigo-600 shrink-0" /> Edit Instructions
              </div>
              <p className="text-xs text-indigo-800/80 leading-relaxed">
                Updating this question and key points will immediately affect candidate practice tests and cached interview resources.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between gap-2 z-50">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex-1 rounded-xl text-slate-600 text-xs"
            disabled={loading}
          >
            <Link href="/admin/questions">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            size="sm"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-3.5 mr-1 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="size-3.5 mr-1" /> Update
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}