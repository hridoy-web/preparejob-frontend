"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, 
  User, 
  LayoutDashboard, 
  Compass, 
  BookOpen,
  Home,
  Mail,
  LogIn,
  UserPlus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import NavLink from "./NavLink";
import LogoutMenuItem from "./LogoutMenuItem";

interface NavItem {
  label: string;
  href: string;
}

interface UserSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

const getNavIcon = (label: string) => {
  const normalized = label.toLowerCase();
  switch (normalized) {
    case "home":
      return <Home className="size-4 text-slate-500" />;
    case "explore":
      return <Compass className="size-4 text-slate-500" />;
    case "blog":
    case "blogs":
      return <BookOpen className="size-4 text-slate-500" />;
    case "contact":
      return <Mail className="size-4 text-slate-500" />;
    default:
      return <Compass className="size-4 text-slate-500" />;
  }
};

export default function MobileNav({
  items,
  user,
}: {
  items: NavItem[];
  user?: UserSession | null;
}) {
  const [open, setOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const dashboardLink = isAdmin ? "/admin" : "/user";

  return (
    <div className="flex md:hidden items-center justify-between w-full font-lexend">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center space-x-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
              <Menu className="h-5 w-5 text-slate-700" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-70 p-6 bg-white border-slate-200 flex flex-col justify-between">
            <div>
              {/* Top Header Logo */}
              <SheetHeader className="p-0 text-left border-b border-slate-100 pb-4">
                <SheetTitle className="text-left flex items-center justify-between">
                  <Logo onClick={() => setOpen(false)} className="text-lg" />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile Navigation Sidebar
                </SheetDescription>
              </SheetHeader>

              {/* Navigation Hub */}
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    NAVIGATION HUB
                  </h4>
                  <div className="flex flex-col space-y-1">
                    {items.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        className="text-xs font-semibold py-2 px-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-all flex items-center gap-2.5"
                        onClick={() => setOpen(false)}
                      >
                        {getNavIcon(item.label)}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Quick Dashboard Link if user logged in */}
                {user && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      QUICK DASHBOARD
                    </h4>
                    <div className="flex flex-col space-y-1">
                      <Link
                        href={dashboardLink}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 text-xs font-semibold py-2 px-2.5 rounded-xl text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100/70 transition-all"
                      >
                        <LayoutDashboard className="size-4" />
                        <span>Go to {isAdmin ? "Admin Workplace" : "Dashboard"}</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom User Info (Only shown when logged in) */}
            {user && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="size-9 border border-slate-200">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <Logo className="text-lg" />
      </div>

      {/* Right: Profile Avatar or User Icon Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
            {user ? (
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarImage src={user.image || ""} alt={user.name || "User Avatar"} />
                <AvatarFallback className="bg-indigo-600 text-white font-medium text-xs">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-5 w-5 text-slate-700" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-slate-200 font-lexend bg-white">
          {user ? (
            <>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-semibold text-slate-900 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500 leading-none truncate">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              
              {!isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/user/profile" className="w-full cursor-pointer flex items-center gap-2 rounded-xl py-2 text-slate-700">
                    <User className="h-4 w-4 text-slate-500" /> My Profile
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link href={dashboardLink} className="w-full cursor-pointer flex items-center gap-2 rounded-xl py-2 text-slate-700">
                  <LayoutDashboard className="h-4 w-4 text-slate-500" /> Dashboard
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/explore" className="w-full cursor-pointer flex items-center gap-2 rounded-xl py-2 text-slate-700">
                  <Compass className="h-4 w-4 text-slate-500" /> Explore Questions
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/blog" className="w-full cursor-pointer flex items-center gap-2 rounded-xl py-2 text-slate-700">
                  <BookOpen className="h-4 w-4 text-slate-500" /> Blogs
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <LogoutMenuItem />
            </>
          ) : (
            <div className="flex flex-col gap-2.5 p-1">
              <DropdownMenuItem asChild>
                <Link 
                  href="/login" 
                  className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  <LogIn className="size-3.5" />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  href="/register" 
                  className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                >
                  <UserPlus className="size-3.5" />
                  <span>Register</span>
                </Link>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}