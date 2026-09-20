import { Sparkles, ShieldCheck, Lock, UserCheck, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 lg:py-20 font-lexend text-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
            <ShieldCheck className="size-4" aria-hidden="true" />
            <span>Data Protection</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Privacy <span className="text-indigo-600">Policy</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
            Your privacy matters to us. Read how we handle your account security and data transparency.
          </p>
        </header>

        {/* Content Box */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs space-y-8">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="size-5 text-indigo-600" /> 1. Information We Collect
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We respect your privacy. We do <strong className="text-slate-900">not</strong> collect, sell, or track any personal or sensitive information beyond what is strictly necessary to provide our services. When you create an account, we only store your basic credentials (such as your name and email) to authenticate your access and save your bookmarked interview questions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="size-5 text-indigo-600" /> 2. Account Creation & Access
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              To practice technical interview questions, view curated roadmaps, and bookmark important concepts, creating an account and logging in is mandatory. This ensures a secure, personalized, and protected learning environment for all developers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="size-5 text-indigo-600" /> 3. Data Security
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We use modern authentication standards and encrypted tokens (via secure cookies and session management) to protect your login state. Your session data is completely safe and restricted to your personal dashboard.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="size-5 text-indigo-600" /> 4. Policy Updates
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We may update this privacy policy from time to time to reflect platform improvements. Continued use of the platform implies your acceptance of these terms.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}