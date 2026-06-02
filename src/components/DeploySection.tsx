'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Globe, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    name: 'GitHub Pages',
    icon: Github,
    command: 'npm run deploy:pages',
    steps: [
      'Push to main branch',
      'Run npm run export (static build)',
      'Run npm run deploy:pages (gh-pages)',
      'Configure repo Settings → Pages → gh-pages branch',
    ],
    color: 'from-gray-500 to-gray-400',
  },
  {
    name: 'Vercel',
    icon: Globe,
    command: 'vercel --prod',
    steps: [
      'Push to GitHub',
      'Import repo in Vercel dashboard',
      'Auto-detects Next.js config',
      'Custom domain + SSL auto-provisioned',
    ],
    color: 'from-black to-gray-800',
  },
  {
    name: 'Netlify',
    icon: Server,
    command: 'netlify deploy --prod',
    steps: [
      'Connect GitHub repo',
      'Set build command: npm run build',
      'Set publish dir: out/',
      'Add redirects for SPA routing',
    ],
    color: 'from-teal-600 to-emerald-500',
  },
];

export function DeploySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.deploy-card');
      if (!cards) return;
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="deploy" ref={sectionRef} className="relative py-24 md:py-40 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-medium">
            Deployment
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Ship to{' '}
            <span className="gradient-text">any platform</span>
          </h2>
          <p className="text-white/50 mt-4 text-lg leading-relaxed">
            This site is deployable to GitHub Pages, Vercel, and Netlify — with or without a custom domain.
            Static export ensures maximum compatibility.
          </p>
        </div>

        {/* Architect diagram */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-10 border border-white/5">
          <h3 className="text-sm font-medium text-white/60 mb-6">Architecture Flow</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg">📝</div>
              <span className="text-white/40">Source</span>
            </div>
            <div className="text-white/20 hidden md:block">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg">⚡</div>
              <span className="text-white/40">Next.js Build</span>
            </div>
            <div className="text-white/20 hidden md:block">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg">📁</div>
              <span className="text-white/40">Static Export</span>
            </div>
            <div className="text-white/20 hidden md:block">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg">🚀</div>
              <span className="text-white/40">Deploy</span>
            </div>
          </div>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="deploy-card double-bezel"
            >
              <div className="double-bezel-inner">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                  >
                    <platform.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{platform.name}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider">Deploy target</div>
                  </div>
                </div>

                {/* Steps */}
                <ul className="space-y-2 mb-4">
                  {platform.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="text-teal-400/60 mt-px shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>

                {/* Command */}
                <div className="bg-white/5 rounded-xl px-3 py-2.5 font-mono text-[11px] text-teal-300/80 border border-white/5 overflow-x-auto whitespace-nowrap">
                  {platform.command}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/marktantongco/skills-ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            <Github size={16} />
            View on GitHub
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
