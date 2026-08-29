import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export default function Logo({ className = "text-2xl", onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`font-bold ai-gradient-text tracking-tight ${className}`}
    >
      PrepareJob
    </Link>
  );
}