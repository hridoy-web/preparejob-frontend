"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, LayoutDashboard, Compass } from "lucide-react";


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
}

export default function MobileNav({
  items,
  user,
}: {
  items: NavItem[];
  user?: UserSession | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden items-center justify-between w-full">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center space-x-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo onClick={() => setOpen(false)} className="text-lg" />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation drawer menu
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col space-y-4 mt-8">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="text-base py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Logo className="text-lg" />
      </div>

      {/* Right: Profile Avatar or User Icon */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            {user ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          {user ? (
            <>
              <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                {user.email}
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
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full cursor-pointer">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register" className="w-full cursor-pointer">
                  Register
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}