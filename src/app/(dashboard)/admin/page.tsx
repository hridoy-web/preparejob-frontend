import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, FileText, Users } from "lucide-react";
import { AdminProfileCard } from "@/components/admin/admin-profile-card";

export default function AdminOverviewPage() {
  const stats = {
    totalQuestions: 120,
    totalBlogs: 15,
    totalUsers: 450,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
        <p className="font-lexend text-sm text-slate-500 mt-1">
          Welcome back! Monitor system statistics and manage database resources.
        </p>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Questions
            </CardTitle>
            <HelpCircle className="size-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalQuestions}</div>
            <p className="font-lexend text-xs text-slate-400 mt-1 font-medium">Active in database</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Blogs
            </CardTitle>
            <FileText className="size-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalBlogs}</div>
            <p className="font-lexend text-xs text-slate-400 mt-1 font-medium">Published articles</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-lexend text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Users
            </CardTitle>
            <Users className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalUsers}</div>
            <p className="font-lexend text-xs text-slate-400 mt-1 font-medium">Registered candidates</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Profile Section */}
      <AdminProfileCard />
    </div>
  );
}