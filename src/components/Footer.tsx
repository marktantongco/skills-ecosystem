'use client';

import { Github, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
                S
              </div>
              <span className="font-display text-sm font-semibold">
                Skills<span className="text-teal-400">.</span>
              </span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs">
              The open ecosystem for extending AI agent capabilities. Built with Next.js, Framer Motion,
              GSAP, and the open agent skills platform.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-white/30 font-medium mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Skills', href: '#skills' },
                { label: 'Comparison', href: '#comparison' },
                { label: 'Install Guide', href: '#install' },
                { label: 'Deploy', href: '#deploy' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-white/30 font-medium mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'skills.sh', href: 'https://skills.sh' },
                { label: 'GitHub Repo', href: 'https://github.com/marktantongco/skills-ecosystem' },
                { label: 'OpenCode', href: 'https://github.com/opencode-ai' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors group"
                  >
                    {link.label}
                    <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/20">
            © {new Date().getFullYear()} Skills Ecosystem. Open source. MIT License.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-white/20">
            <span>Built with Next.js + Framer Motion + GSAP</span>
            <a
              href="https://github.com/marktantongco/skills-ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              <Github size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
