"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-sm transition-all duration-200",
        isActive
          ? "ai-gradient-text font-bold bg-indigo-500/10 shadow-xs"
          : "text-muted-foreground hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
}