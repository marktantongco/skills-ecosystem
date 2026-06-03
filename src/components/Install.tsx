'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installGuide } from '@/lib/skills-data';

gsap.registerPlugin(ScrollTrigger);

export function Install() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = sectionRef.current?.querySelectorAll('.install-step');
      if (!steps || steps.length === 0) return;
      gsap.from(steps, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="install" ref={sectionRef} className="relative py-24 md:py-40 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-medium">
            Quick Start
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Install any skill in{' '}
            <span className="gradient-text">one command</span>
          </h2>
          <p className="text-white/50 mt-4 text-lg leading-relaxed">
            The Skills CLI is the package manager for the open agent skills ecosystem.
          </p>
        </div>

        {/* Install commands */}
        <div className="space-y-4">
          {installGuide.map((step) => (
            <div
              key={step.tool}
              className="install-step glass rounded-2xl p-5 md:p-6 border border-white/5 hover:border-teal-500/20 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white mb-1">{step.tool}</div>
                  <div className="text-xs text-white/40">{step.description}</div>
                </div>
                <div className="shrink-0">
                  <code className="block text-xs md:text-sm font-mono bg-white/5 rounded-xl px-4 py-3 text-teal-300 border border-white/5 whitespace-nowrap overflow-x-auto">
                    {step.command}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal aesthetic */}
        <div className="mt-12 glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-[10px] text-white/30 ml-2 font-mono">terminal</span>
          </div>
          <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed">
            <div className="text-white/30"># Install the top ecosystem skill</div>
            <div className="text-teal-300 mt-1">
              <span className="text-white/50">$ </span>npx skills add vercel-labs/skills@find-skills
            </div>
            <div className="text-white/50 mt-1">✓ Installed find-skills (1.8M installs)</div>
            <div className="text-white/30 mt-3"># Search for design skills</div>
            <div className="text-teal-300 mt-1">
              <span className="text-white/50">$ </span>npx skills find design
            </div>
            <div className="text-white/50 mt-1">→ 12 skills found in category &quot;design&quot;</div>
            <div className="text-white/30 mt-3"># Create your own skill</div>
            <div className="text-teal-300 mt-1">
              <span className="text-white/50">$ </span>npx skills init my-awesome-skill
            </div>
            <div className="text-white/50 mt-1">✓ Skill scaffolded in ./my-awesome-skill/</div>
          </div>
        </div>
      </div>
    </section>
  );
}
