import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

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
          <DashboardHeader />
          <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </SidebarProvider>
  );
}