import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Sparkles, Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/60 font-sans">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-600 hover:bg-slate-100 rounded-lg p-1.5" />
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 hidden sm:block" />
                <h1 className="font-semibold text-sm sm:text-base text-slate-800 tracking-tight">
                  Admin Workplace
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                System Live
              </div>
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
              </button>
            </div>
          </header>

          {/* Page Body */}
          <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}