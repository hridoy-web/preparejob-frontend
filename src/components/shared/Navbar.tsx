import { headers } from "next/headers";
import Link from "next/link";
import { 
  User, 
  LayoutDashboard, 
  Compass, 
  ArrowRight
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import MobileNav from "./MobileNav";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/explore" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const isAdmin = user?.role === "admin";
  const dashboardLink = isAdmin ? "/admin" : "/user";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md font-lexend">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Logo />

          <nav className="flex items-center space-x-5 lg:space-x-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.href} 
                href={item.href}
                className="text-slate-600 hover:text-slate-950 font-medium transition-colors text-sm lg:text-base"
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 cursor-pointer">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarImage src={user.image || ""} alt={user.name || "User Avatar"} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5 border-slate-200 shadow-xl">
                  <div className="flex flex-col space-y-1 p-2.5 bg-slate-50 rounded-xl mb-1">
                    <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-slate-500 mt-1 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  
                  {!isAdmin && (
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                      <Link href="/user/profile" className="w-full flex items-center gap-2.5 font-medium text-slate-700">
                        <User className="h-4 w-4 text-slate-500" /> My Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                    <Link href={dashboardLink} className="w-full flex items-center gap-2.5 font-medium text-slate-700">
                      <LayoutDashboard className="h-4 w-4 text-slate-500" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                    <Link href="/explore" className="w-full flex items-center gap-2.5 font-medium text-slate-700">
                      <Compass className="h-4 w-4 text-slate-500" /> Explore Questions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  <LogoutMenuItem />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2 lg:gap-2.5">
                <Button 
                  variant="ghost" 
                  asChild
                  className="h-10 px-5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 font-semibold transition-all cursor-pointer text-sm"
                >
                  <Link href="/login">Log in</Link>
                </Button>

                <Button 
                  asChild 
                  className="group h-10 px-5 rounded-full bg-slate-950 text-white hover:bg-slate-800 font-bold shadow-sm transition-all duration-300 cursor-pointer flex items-center gap-2 text-sm"
                >
                  <Link href="/register">
                    <span>Get Started</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <MobileNav items={NAV_ITEMS} user={user} />

      </div>
    </header>
  );
}