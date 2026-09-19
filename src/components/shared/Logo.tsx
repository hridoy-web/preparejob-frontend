import React from "react";
import Link from "next/link";
import { TbTargetArrow } from "react-icons/tb";

interface LogoProps {
  className?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
}

export default function Logo({ 
  className = "text-xl", 
  onClick, 
  variant = "light" 
}: LogoProps): React.JSX.Element {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 group font-urbanist tracking-tight ${className}`}
    >
      {/* Target Icon Box */}
      <div className={`size-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs ${
        isDark 
          ? "bg-slate-900/80 border border-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600" 
          : "bg-indigo-50/80 border border-indigo-500/30 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600"
      }`}>
        <TbTargetArrow className="size-5 stroke-2" />
      </div>

      <div className="flex items-center text-xl sm:text-2xl font-extrabold">
        <span className={`tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
          Prepare
        </span>
        <span className="text-indigo-600 tracking-tight ml-px">
          Job
        </span>
        <span className="inline-block size-1.5 rounded-full bg-indigo-600 ml-1 mb-2.5" />
      </div>
    </Link>
  );
}