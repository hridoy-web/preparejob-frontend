"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Bell, UserCheck, Home, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 

export function DashboardHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-slate-600 hover:bg-slate-100 rounded-lg p-1.5" />
        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Sparkles className="h-4 w-4 text-indigo-600 hidden sm:block" />
          ) : (
            <UserCheck className="h-4 w-4 text-emerald-600 hidden sm:block" />
          )}
          <h1 className="font-semibold text-sm sm:text-base text-slate-800 tracking-tight">
            {isAdmin ? "Admin Workplace" : "Candidate Dashboard"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Badge */}
        {isAdmin ? (
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200/60">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            System Live
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200/60">
            Candidate Mode
          </div>
        )}

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
        </button>

        <div className="h-4 w-px bg-slate-200" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none">
              <Avatar className="size-8 border border-slate-200 shadow-xs">
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-indigo-600 text-white font-medium text-xs">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-slate-200 font-lexend">
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-slate-900">{user?.name || "Candidate"}</p>
                <p className="text-xs leading-none text-slate-500 truncate">{user?.email || "user@preparejob.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Edit Profile Menu Item */}
            <DropdownMenuItem asChild>
              <Link href="/user/profile" className="cursor-pointer flex items-center gap-2 rounded-xl py-2">
                <User className="size-4 text-slate-500" />
                <span className="text-xs font-medium">Edit Profile</span>
              </Link>
            </DropdownMenuItem>

            {/* Back to Home Menu Item */}
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer flex items-center gap-2 rounded-xl py-2">
                <Home className="size-4 text-slate-500" />
                <span className="text-xs font-medium">Back to Home</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Sign Out */}
            <DropdownMenuItem 
              onClick={() => authClient.signOut()} 
              className="cursor-pointer flex items-center gap-2 text-rose-600 hover:bg-rose-50 rounded-xl py-2"
            >
              <LogOut className="size-4" />
              <span className="text-xs font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}