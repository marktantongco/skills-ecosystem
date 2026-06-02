'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { comparisons, skills } from '@/lib/skills-data';

gsap.registerPlugin(ScrollTrigger);

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('tbody tr');
        gsap.from(rows, {
          x: -30,
          opacity: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-medium">
            Comparative Analysis
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
            How the ecosystem{' '}
            <span className="gradient-text">stacks up</span>
          </h2>
          <p className="text-white/50 mt-4 text-lg leading-relaxed">
            Direct comparison against alternative UI and agent tooling approaches across key dimensions.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Total Skills', value: '78+', desc: 'across 13 categories' },
            { label: 'Top Install', value: '1.8M', desc: 'for find-skills' },
            { label: 'Avg Rating', value: '94%', desc: 'synergy score' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="double-bezel"
            >
              <div className="double-bezel-inner">
                <div className="text-3xl font-display font-bold gradient-text">{card.value}</div>
                <div className="text-sm font-medium text-white mt-1">{card.label}</div>
                <div className="text-xs text-white/30 mt-0.5">{card.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <div
          ref={tableRef}
          className="glass rounded-2xl overflow-hidden border border-white/5"
        >
          {/* Mobile scroll hint */}
          <div className="md:hidden flex items-center justify-center gap-2 py-3 px-4 border-b border-white/5">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Scroll horizontally →</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
                    Feature
                  </th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-[0.15em] text-teal-400 font-medium">
                    Skills Ecosystem
                  </th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
                    Tailwind UI
                  </th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
                    shadcn/ui
                  </th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
                    Radix UI
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors ${
                      i % 2 === 0 ? 'bg-white/[0.01]' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-white/70">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-sm text-teal-300/90">
                      {row.ecosystem}
                    </td>
                    {row.alternatives.map((alt) => (
                      <td key={alt.name} className="py-4 px-6 text-sm text-white/40">
                        {alt.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros / Cons matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 md:p-8 border border-emerald-500/10"
          >
            <h3 className="font-display text-lg font-semibold text-emerald-400 mb-4">Pros</h3>
            <ul className="space-y-3">
              {[
                'One-command install for any capability',
                'Composable — mix and match skills per project',
                'Open source ecosystem, community-driven',
                'Runs on any agent platform (Claude, Cursor, OpenCode, etc.)',
                'Quality-gated with audit and review skills',
                'CI/CD integration with deployment managers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 md:p-8 border border-red-500/10"
          >
            <h3 className="font-display text-lg font-semibold text-red-400 mb-4">Cons</h3>
            <ul className="space-y-3">
              {[
                'Quality varies across community skills',
                'No centralized versioning or dependency management yet',
                'Learning curve for skill authoring',
                'Some premium skills need specific model access',
                'Mobile agent support still maturing',
                'Documentation coverage varies by skill',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="text-red-400 mt-0.5 shrink-0">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
