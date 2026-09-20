import { FileText, CheckCircle, ShieldAlert, UserX, Copy, HelpCircle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 lg:py-20 font-lexend text-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
            <FileText className="size-4" aria-hidden="true" />
            <span>Rules & Guidelines</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Terms of <span className="text-indigo-600">Service</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
            Please read these terms carefully before accessing our interview preparation platform.
          </p>
        </header>

        {/* Content Box */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs space-y-8">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="size-5 text-indigo-600" /> 1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              By accessing and using this platform, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="size-5 text-indigo-600" /> 2. Mandatory Authentication
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Access to technical interview questions, code breakdowns, and practice tools requires an active user account. <strong className="text-slate-900">You must be logged in</strong> to view and practice questions. Unauthenticated users cannot access protected learning materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Copy className="size-5 text-indigo-600" /> 3. Intellectual Property & Usage Rights
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              All interview questions, roadmaps, structured guides, and platform contents are protected. <strong className="text-slate-900">You cannot copy, republish, or use our content on any other website or commercial medium.</strong> This platform and its resources are strictly for individual learning, skill development, and personal interview preparation only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <UserX className="size-5 text-indigo-600" /> 4. User Conduct
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Users agree not to misuse the platform, attempt unauthorized access to administrative routes, or scrape platform content through automated scripts. Violation of these rules may lead to immediate account termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="size-5 text-indigo-600" /> 5. Support & Inquiries
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              If you have any questions regarding our terms or face login/authentication issues, feel free to reach out to us through our contact page.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}