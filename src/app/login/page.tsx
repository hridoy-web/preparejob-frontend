import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-surface p-4">
      {/* Decorative color glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-brand-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl" />

      <LoginForm />
    </main>
  );
}