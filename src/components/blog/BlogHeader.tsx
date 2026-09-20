import { Sparkles } from "lucide-react";

export default function BlogHeader() {
  return (
    <header className="mx-auto max-w-4xl text-center">
      {/* Top Tag */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
        <Sparkles className="size-4" aria-hidden="true" />
        <span>Expert Articles & Industry Insights</span>
      </div>

      {/* Professional & Meaningful Heading for Blog */}
      <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
      Read & Explore <br/> <span className="text-indigo-600">Elevate Your Tech Career.</span>
      </h1>

      {/* Meaningful Description */}
      <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
        Explore deep guidelines, AI trends, full-stack web development roadmaps, and insider career strategies to accelerate your professional growth in the tech industry.
      </p>
    </header>
  );
}