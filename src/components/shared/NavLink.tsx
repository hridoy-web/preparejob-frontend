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
        "relative py-1 text-sm font-medium transition-colors hover:text-primary",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground",
        className
      )}
    >
      {children}
      {/* Active Line Indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-primary transition-all duration-300" />
      )}
    </Link>
  );
}