import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, FileText, Users, ArrowUpRight } from "lucide-react";
import { AdminProfileCard } from "@/components/admin/admin-profile-card";
import { getAdminStats } from "@/lib/apiActions/adminApi";

export default async function AdminOverviewPage() {
  let stats = {
    totalQuestions: 0,
    totalBlogs: 0,
    totalUsers: 0,
  };

  try {
    const response = await getAdminStats();
    if (response?.data) {
      stats = {
        totalQuestions: response.data.totalQuestions || 0,
        totalBlogs: response.data.totalBlogs || 0,
        totalUsers: response.data.totalUsers || 0,
      };
    }
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title & Description */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Dashboard Overview
        </h2>
        <p className="font-lexend text-xs sm:text-sm text-slate-500 mt-1">
          Welcome back! Monitor system statistics and manage database resources.
        </p>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Questions Card */}
        <Card className="relative overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Questions
              </span>
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <HelpCircle className="size-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalQuestions}
              </div>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ArrowUpRight className="size-3 mr-0.5" /> Live
              </span>
            </div>
            <p className="font-lexend text-xs text-slate-400 mt-2 font-medium">
              Active in database
            </p>
          </CardContent>
        </Card>

        {/* Total Blogs Card */}
        <Card className="relative overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Blogs
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                <FileText className="size-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalBlogs}
              </div>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ArrowUpRight className="size-3 mr-0.5" /> Published
              </span>
            </div>
            <p className="font-lexend text-xs text-slate-400 mt-2 font-medium">
              Published articles
            </p>
          </CardContent>
        </Card>

        {/* Total Users Card */}
        <Card className="relative overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Users
              </span>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-500/10 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                <Users className="size-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalUsers}
              </div>
              <span className="inline-flex items-center text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Registered
              </span>
            </div>
            <p className="font-lexend text-xs text-slate-400 mt-2 font-medium">
              Registered candidates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Profile Section */}
      <AdminProfileCard />
    </div>
  );
}