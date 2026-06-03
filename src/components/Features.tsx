'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/skills-data';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, string> = {
  design: '🎨',
  animation: '✨',
  components: '🧩',
  development: '⚡',
  devops: '🚀',
  system: '🔧',
};

const tierColors: Record<string, string> = {
  premium: 'from-amber-400 to-orange-500',
  standard: 'from-blue-400 to-cyan-500',
  essential: 'from-teal-400 to-emerald-500',
};

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-medium">
            The Ecosystem
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
            78+ skills,{' '}
            <span className="gradient-text">one ecosystem</span>
          </h2>
          <p className="text-white/50 mt-4 text-lg leading-relaxed max-w-xl">
            From design systems to deployment pipelines — every skill is a composable capability
            installable with a single command.
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              className={`bento-card p-6 md:p-8 ${
                i === 0 ? 'md:col-span-2 md:row-span-1' : ''
              } ${i === 3 ? 'lg:col-span-1' : ''}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  '--mouse-x',
                  `${((e.clientX - rect.left) / rect.width) * 100}%`
                );
                e.currentTarget.style.setProperty(
                  '--mouse-y',
                  `${((e.clientY - rect.top) / rect.height) * 100}%`
                );
              }}
            >
              {/* Icon + tier */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{categoryIcons[skill.category] ?? '📦'}</span>
                <span
                  className={`text-[10px] uppercase tracking-[0.15em] font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${tierColors[skill.tier]} text-white/90`}
                >
                  {skill.tier}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-lg font-semibold mb-2 text-white">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skill.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-white/30">{skill.source}</span>
                <span className="text-xs font-mono text-teal-400/60">{skill.installs} installs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
