import React from 'react';
import Link from 'next/link';
import { Terminal, Mail, Sparkles } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_NAV: Record<string, FooterLink[]> = {
  Platform: [
    { label: 'Explore Questions', href: '/explore' },
    { label: 'Tech Stacks', href: '/stacks' },
    { label: 'AI Mentor Chat', href: '/ai-chat' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Resources: [
    { label: 'Interview Cheatsheets', href: '/cheatsheets' },
    { label: 'System Design', href: '/system-design' },
    { label: 'Developer Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
};

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-white font-black text-2xl">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-accent)] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span>Prepare<span className="ai-gradient-text">Job</span></span>
            </Link>

            <p className="text-slate-400 text-sm max-w-sm">
              The modern platform for web developers to practice technical interviews and refine concepts with an AI Mentor.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Powered by Interactive AI Mentor</span>
            </div>

            <div>
              <a 
                href="mailto:support@preparejob.com" 
                aria-label="Email Support" 
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 inline-flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            {Object.entries(FOOTER_NAV).map(([category, links]) => (
              <nav key={category} aria-label={`${category} Navigation`}>
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-indigo-400 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PrepareJob. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}