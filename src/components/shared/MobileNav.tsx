"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";

import Logo from "./Logo";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  href: string;
}

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden items-center justify-between w-full">
      {/* Left Side: Hamburger & Logo */}
      <div className="flex items-center space-x-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle navigation menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo onClick={() => setOpen(false)} className="text-lg" />
              </SheetTitle>
              {/* Added for Radix UI Accessibility Compliance */}
              <SheetDescription className="sr-only">
                Mobile navigation menu
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col space-y-4 mt-8">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="text-base py-2"
                  onClick={() => setOpen(false)} // Auto-closes sheet on click
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Logo className="text-lg" />
      </div>

      {/* Right Side: User Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User Account">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}