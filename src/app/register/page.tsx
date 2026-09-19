import { RegisterForm } from "@/components/auth/register-form";
import { Code2, Terminal, Braces, GitBranch } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-surface px-4 py-10 sm:px-6">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-accent/10 via-transparent to-transparent" />

      {/* Top-left glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-indigo-400/15 blur-3xl" />

      {/* Bottom-right glow */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-400/15 blur-3xl" />

      {/* Developer-themed decorative elements */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-[0.035] lg:block">
        <Code2 className="absolute left-[12%] top-[20%] h-28 w-28" />
        <Terminal className="absolute bottom-[20%] left-[18%] h-24 w-24" />
        <Braces className="absolute right-[15%] top-[18%] h-28 w-28" />
        <GitBranch className="absolute bottom-[18%] right-[18%] h-24 w-24" />
      </div>

      {/* Register form */}
      <RegisterForm />
    </main>
  );
}