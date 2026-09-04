"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  HelpCircle, 
  FileText, 
  Users, 
  Home, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  LucideIcon 
} from "lucide-react";

interface SidebarNavLinkProps {
  title: string;
  url: string;
  isHome?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  // Admin Routes
  "/admin": LayoutDashboard,
  "/admin/questions": HelpCircle,
  "/admin/blogs": FileText,
  "/admin/users": Users,
  
  // User Routes
  "/user": LayoutDashboard,
  "/user/bookmarks": Bookmark,
  "/user/liked-blogs": Heart,
  "/user/comments": MessageSquare,
};

export function SidebarNavLink({ title, url, isHome }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  const Icon = isHome ? Home : iconMap[url] || LayoutDashboard;

  return (
    <SidebarMenuButton
      asChild
      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
        isActive
          ? "bg-indigo-50 text-indigo-600 font-semibold shadow-xs"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Link href={url}>
        <Icon className={`size-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
        <span className="text-sm font-lexend">{title}</span>
      </Link>
    </SidebarMenuButton>
  );
}