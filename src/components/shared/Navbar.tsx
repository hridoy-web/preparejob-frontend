import { headers } from "next/headers";
import Link from "next/link";
import { User, LayoutDashboard, Compass } from "lucide-react";

import { auth } from "@/lib/auth"; // adjust path to your server better-auth instance
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
  { label: "Explore", href: "/explore" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default async function Navbar() {
  // Fetch session directly on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Logo />

          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image || ""} alt={user.name || "User Avatar"} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer flex items-center gap-2">
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/explore-questions" className="w-full cursor-pointer flex items-center gap-2">
                      <Compass className="h-4 w-4" /> Explore Questions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogoutMenuItem />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <MobileNav items={NAV_ITEMS} user={user} />

      </div>
    </header>
  );
}