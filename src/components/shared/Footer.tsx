import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-lexend border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 lg:pt-16 pb-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand Info & Logo */}
          <div className="md:col-span-5 space-y-4">

            <div className="flex items-center">
             <Logo variant="dark" />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The modern platform for web developers to practice technical interviews, explore curated interview questions, and read insightful developer blogs.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-400 font-medium">
              <Sparkles className="size-3.5" />
              <span>AI-Powered Interview Preparation</span>
            </div>
          </div>

          {/* Quick Links / Platform */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-urbanist">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Explore Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Developer Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support  */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-urbanist">
              Support & Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="size-4 text-indigo-400" />
                <span>t.okay383@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PrepareJob. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}