import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarNavLink } from "./sidebar-nav-link";
import Logo from "../shared/Logo";

const adminItems = [
    { title: "Overview", url: "/admin" },
    { title: "Questions Bank", url: "/admin/questions" },
    { title: "Blogs", url: "/admin/blogs" },
    { title: "Users Management", url: "/admin/users" },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-r border-slate-200 bg-white shadow-xs">
            <SidebarHeader className="p-4 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                        <span className="tracking-tight flex items-center gap-1.5">
                            <Logo />
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-1.5 py-0.5 rounded-full font-semibold">
                                PRO
                            </span>
                        </span>
                        <span className="font-lexend text-xs text-slate-400 font-medium">Control Center</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3 bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] font-lexend font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">
                        Core Operations
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {adminItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarNavLink title={item.title} url={item.url} />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarNavLink title="Back to Main Site" url="/" isHome />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}