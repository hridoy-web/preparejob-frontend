import Link from "next/link";
import Image from "next/image";
import { Sparkles, Layers, Terminal, Database, Cpu, ArrowRight, type LucideIcon } from "lucide-react";

interface RoadmapTech {
  id: string;
  name: string;
  logo: string;
}

interface RoadmapCategory {
  category: "Fundamentals" | "Frontend" | "Backend & Database" | "DevOps & Tools";
  icon: LucideIcon;
  techs: RoadmapTech[];
}

const ROADMAP_CATEGORIES: RoadmapCategory[] = [
  {
    category: "Fundamentals",
    icon: Terminal,
    techs: [
      { id: "html5", name: "HTML", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
      { id: "css3", name: "CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
      { id: "tailwind-css", name: "Tailwind CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
      { id: "javascript", name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { id: "typescript", name: "TypeScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
    ],
  },
  {
    category: "Frontend",
    icon: Layers,
    techs: [
      { id: "react", name: "React.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
      { id: "nextjs", name: "Next.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
    ],
  },
  {
    category: "Backend & Database",
    icon: Database,
    techs: [
      { id: "nodejs", name: "Node.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
      { id: "expressjs", name: "Express.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
      { id: "mongodb", name: "MongoDB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
      { id: "mongoose", name: "Mongoose", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongoose/mongoose-original.svg" },
      { id: "postgresql", name: "PostgreSQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
      { id: "prisma", name: "Prisma", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg" },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: Cpu,
    techs: [
      { id: "git-github", name: "Git / GitHub", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
      { id: "docker", name: "Docker", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
    ],
  },
];

export function TechRoadmapSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 border-y border-slate-200/60 font-lexend">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/25 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            Comprehensive Tech Stack Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Explore Interview Questions Across All Major Technologies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
            Access deep-researched technical questions, core concepts, and dual-level answers for every essential tech stack you need to master.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ROADMAP_CATEGORIES.map((phase, catIdx) => {
            const IconComponent = phase.icon;

            return (
              <div 
                key={phase.category}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-2xs">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-lexend">
                        Phase {catIdx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-lexend">
                        {phase.category}
                      </h3>
                    </div>
                  </div>

                  {/* Tech Items List */}
                  <div className="space-y-3 mb-6">
                    {phase.techs.map((tech) => (
                      <Link 
                        key={tech.id}
                        href={`/explore/${tech.id}`}
                        className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-indigo-50/40 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                            <Image
                              src={tech.logo}
                              alt={`${tech.name} logo`}
                              width={24}
                              height={24}
                              className="object-contain transition-transform duration-300 group-hover:scale-110"
                              unoptimized
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate font-lexend group-hover:text-indigo-600 transition-colors">
                            {tech.name}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-indigo-600" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer phase tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Coverage</span>
                  <span className="font-bold text-slate-700">{phase.techs.length} Technologies</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}