'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  { label: '🎨', x: '10%', y: '20%', delay: 0 },
  { label: '⚡', x: '85%', y: '15%', delay: 0.5 },
  { label: '🧩', x: '75%', y: '70%', delay: 1 },
  { label: '🚀', x: '15%', y: '75%', delay: 0.3 },
  { label: '✨', x: '50%', y: '10%', delay: 0.8 },
  { label: '🔧', x: '90%', y: '45%', delay: 0.2 },
];

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.from(words, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power4.out',
        });
      }
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100dvh] grid-bg flex items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/5 blur-[150px] animate-pulse-slow" style={{ animationDelay: '-4s' }} />

      {/* Floating icons */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.label}
          className="absolute text-2xl hidden md:block"
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          {icon.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-teal-400 mb-8 border border-teal-500/20"
        >
          <span className="pulse-dot" />
          <span className="uppercase tracking-[0.15em] font-medium">Open Agent Skills Platform</span>
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          {'Skills Ecosystem'.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.15em]">
              {word}
            </span>
          ))}
          <br />
          <span className="word inline-block gradient-text">Open Source</span>
          <span className="word inline-block ml-[0.15em]">AI Agent Skills</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Discover, compare, and deploy <span className="text-white/80 font-medium">78+ skills</span> across{' '}
          <span className="text-white/80 font-medium">13 categories</span>. The open ecosystem for extending
          AI agent capabilities — one command at a time.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#skills"
            className="group magnetic-btn bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
          >
            Explore Skills
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#comparison"
            className="group magnetic-btn glass text-white/80 hover:text-white hover:bg-white/10"
          >
            Compare Options
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-white/5"
        >
          {[
            { value: '78+', label: 'Active Skills' },
            { value: '13', label: 'Categories' },
            { value: '1.8M+', label: 'Top Skill Installs' },
            { value: '7', label: 'Agent Modes' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
