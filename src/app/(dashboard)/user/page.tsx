import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Bookmark,
    Heart,
    MessageSquare,
    ArrowRight,
    HelpCircle,
    BookOpen,
    UserCheck,
    Zap,
    Target
} from "lucide-react";

export default async function UserDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userName = session?.user?.name || "Candidate";

    return (
        <div className="font-lexend max-w-6xl mx-auto space-y-6 pb-12">

            {/*  Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-50/80 via-white to-slate-50 p-6 sm:p-8 border border-indigo-100/80 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">

                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-semibold">
                            <Zap className="size-3.5 fill-indigo-600 text-indigo-600" />
                            <span>Ready for today&apos;s goal?</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-urbanist">
                            Welcome back, <span className="text-indigo-600">{userName}</span>! 👋
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal font-lexend">
                            Small daily steps lead to massive outcomes. Revise your saved bookmarks and stay on top of your preparation today.
                        </p>
                    </div>

                    <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
                        <Button asChild className="bg-brand-accent hover:bg-indigo-700 text-white rounded-lg h-11 px-5 text-xs font-semibold shadow-xs transition-all font-lexend">
                            <Link href="/user/bookmarks" className="flex items-center gap-2">
                                <Target className="size-4" />
                                <span>Continue Practice</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </Button>
                    </div>

                </div>

                <div className="absolute -right-10 -bottom-10 size-48 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Bookmarked Questions */}
                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-lexend">
                        Bookmarked Questions
                    </p>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                            <Bookmark className="size-5" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 font-lexend tracking-tight">18</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium font-lexend">Saved for revision</p>
                </Card>

                {/* Liked Blogs */}
                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-lexend">
                        Liked Blogs
                    </p>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                            <Heart className="size-5" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 font-lexend tracking-tight">12</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium font-lexend">Helpful interview guides</p>
                </Card>

                {/* My Comments */}
                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-lexend">
                        My Comments
                    </p>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                            <MessageSquare className="size-5" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 font-lexend tracking-tight">5</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium font-lexend">Active discussions</p>
                </Card>

            </div>

            {/* Candidate Profile Settings CTA */}
            <Card className="p-5 sm:p-6 rounded-2xl bg-white border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                        <UserCheck className="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm font-urbanist">Candidate Profile Settings</h4>
                        <p className="text-xs text-slate-500 font-lexend">Update your profile image, full name, and bio</p>
                    </div>
                </div>
                <Button asChild variant="outline" className="rounded-xl h-10 text-xs font-semibold px-5 border-slate-200 hover:bg-slate-50 shrink-0 font-lexend">
                    <Link href="/user/profile">Edit Profile</Link>
                </Button>
            </Card>

            {/* Quick Action Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                            <HelpCircle className="size-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-xs font-urbanist">Saved Questions</h4>
                            <p className="text-xs text-slate-500 font-lexend">Review your bookmarked prep questions</p>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="w-full rounded-xl justify-between h-9 text-xs font-medium border-slate-200 font-lexend">
                        <Link href="/user/bookmarks">
                            <span>View Bookmarks</span>
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </Button>
                </Card>

                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                            <BookOpen className="size-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-xs font-urbanist">Liked Blogs</h4>
                            <p className="text-xs text-slate-500 font-lexend">Articles you found helpful</p>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="w-full rounded-xl justify-between h-9 text-xs font-medium border-slate-200 font-lexend">
                        <Link href="/user/liked-blogs">
                            <span>View Liked Blogs</span>
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </Button>
                </Card>

                <Card className="p-5 rounded-2xl bg-white border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                            <MessageSquare className="size-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-xs font-urbanist">My Comments</h4>
                            <p className="text-xs text-slate-500 font-lexend">Manage your discussions</p>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="w-full rounded-xl justify-between h-9 text-xs font-medium border-slate-200 font-lexend">
                        <Link href="/user/comments">
                            <span>View Comments</span>
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </Button>
                </Card>

            </div>

        </div>
    );
}