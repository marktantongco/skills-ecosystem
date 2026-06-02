'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Skills', href: '#skills' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'Install', href: '#install' },
  { label: 'Deploy', href: '#deploy' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'mt-0 mx-0 rounded-none border-b border-white/5 bg-surface/80 backdrop-blur-2xl'
          : 'mt-4 mx-4 max-w-2xl 2xl:mx-auto 2xl:left-1/2 2xl:-translate-x-1/2'
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 py-3 ${
          !scrolled ? 'glass rounded-2xl' : ''
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            S
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            Skills<span className="text-teal-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#deploy"
            className="ml-3 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
          >
            Deploy Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white/60 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden glass rounded-b-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#deploy"
                onClick={() => setOpen(false)}
                className="block mt-2 px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl"
              >
                Deploy Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
