'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, comparisons, installGuide, type SkillItem } from '@/lib/skills-data';
import { Search, X, Command } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */

type ResultGroup = 'Skills' | 'Comparisons' | 'Install' | 'Sections';

interface SearchResult {
  id: string;
  group: ResultGroup;
  title: string;
  subtitle: string;
  section: `#${string}`;
  badge?: string;
  icon?: string;
}

/* ─── Data ──────────────────────────────────────────── */

const sections: { label: string; href: `#${string}`; icon: string }[] = [
  { label: 'Skills', href: '#skills', icon: '🎨' },
  { label: 'Comparison', href: '#comparison', icon: '📊' },
  { label: 'Install', href: '#install', icon: '⚡' },
  { label: 'Deploy', href: '#deploy', icon: '🚀' },
];

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const s of skills) {
    results.push({
      id: `skill-${s.id}`,
      group: 'Skills',
      title: s.name,
      subtitle: s.description,
      section: '#skills',
      badge: s.category,
      icon: s.tier === 'premium' ? '⭐' : s.tier === 'standard' ? '✦' : '•',
    });
  }

  for (const c of comparisons) {
    results.push({
      id: `comp-${c.feature}`,
      group: 'Comparisons',
      title: c.feature,
      subtitle: c.ecosystem,
      section: '#comparison',
    });
  }

  for (const inst of installGuide) {
    results.push({
      id: `install-${inst.tool}`,
      group: 'Install',
      title: inst.tool,
      subtitle: inst.description,
      section: '#install',
      badge: inst.command,
    });
  }

  for (const sec of sections) {
    results.push({
      id: `section-${sec.label}`,
      group: 'Sections',
      title: sec.label,
      subtitle: `Navigate to ${sec.label} section`,
      section: sec.href,
      icon: sec.icon,
    });
  }

  return results;
}

/* ─── Helpers ───────────────────────────────────────── */

function score(query: string, item: SearchResult): number {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const sub = item.subtitle.toLowerCase();
  const badge = (item.badge ?? '').toLowerCase();

  // Exact title match = highest
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (sub.includes(q)) return 40;
  if (badge.includes(q)) return 20;
  return 0;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const q = query.toLowerCase();
  const lower = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let last = 0;

  let idx = lower.indexOf(q, last);
  while (idx !== -1) {
    if (idx > last) parts.push(text.slice(last, idx));
    parts.push(
      <mark key={idx} className="bg-teal-500/30 text-teal-200 rounded-sm px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    last = idx + q.length;
    idx = lower.indexOf(q, last);
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

/* ─── Group icons ───────────────────────────────────── */

const groupIcon: Record<ResultGroup, string> = {
  Skills: '🧩',
  Comparisons: '📊',
  Install: '⚡',
  Sections: '📍',
};

/* ─── Component ─────────────────────────────────────── */

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Rebuild index once
  const index = useMemo(() => buildIndex(), []);

  // Filtered + scored results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const scored = index
      .map((item) => ({ item, score: score(query, item) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    // Group preserving score order
    const groups = new Map<ResultGroup, SearchResult[]>();
    for (const { item } of scored) {
      const g = groups.get(item.group) ?? [];
      if (g.length < 6) g.push(item); // cap per group
      groups.set(item.group, g);
    }
    return Array.from(groups.entries());
  }, [query, index]);

  const totalItems = results.reduce((a, [, g]) => a + g.length, 0);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll selection into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const go = useCallback(
    (result: SearchResult) => {
      onClose();
      const el = document.querySelector(result.section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Flash highlight
        el.classList.add('search-highlight');
        setTimeout(() => el.classList.remove('search-highlight'), 2000);
      }
    },
    [onClose]
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((p) => Math.min(p + 1, totalItems - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((p) => Math.max(p - 1, 0));
        return;
      }
      if (e.key === 'Enter' && totalItems > 0) {
        e.preventDefault();
        let idx = 0;
        for (const [, items] of results) {
          for (const item of items) {
            if (idx === selectedIndex) {
              go(item);
              return;
            }
            idx++;
          }
        }
      }
    },
    [onClose, go, results, selectedIndex, totalItems]
  );

  /* ─── Render ──────────────────────────────────────── */

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative w-full max-w-xl glass rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search size={18} className="text-white/30 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search skills, comparisons, install guides..."
                className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md hover:bg-white/10 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/30 font-mono border border-white/5">
                <Command size={12} />
                K
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto py-2 px-2 space-y-1"
            >
              {results.length === 0 && query.trim() && (
                <div className="py-12 text-center">
                  <div className="text-2xl mb-2 opacity-40">🔍</div>
                  <p className="text-sm text-white/30">No results for &quot;{query}&quot;</p>
                </div>
              )}

              {results.length === 0 && !query.trim() && (
                <div className="py-12 text-center">
                  <p className="text-sm text-white/20">
                    Type to search across skills, comparisons, install guides, and sections
                  </p>
                </div>
              )}

              {results.map(([group, items]) => {
                // Find the starting index for this group
                let groupStart = 0;
                for (const [g] of results) {
                  if (g === group) break;
                  const gItems = results.find(([k]) => k === g)?.[1] ?? [];
                  groupStart += gItems.length;
                }

                return (
                  <div key={group}>
                    {/* Group header */}
                    <div className="flex items-center gap-2 px-3 py-2 mt-1 first:mt-0">
                      <span className="text-xs">{groupIcon[group]}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/20 font-medium">
                        {group}
                      </span>
                    </div>

                    {items.map((item, i) => {
                      const globalIdx = groupStart + i;
                      const isSelected = globalIdx === selectedIndex;

                      return (
                        <button
                          key={item.id}
                          data-index={globalIdx}
                          onClick={() => go(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors duration-100 ${
                            isSelected
                              ? 'bg-teal-500/15 border border-teal-500/20'
                              : 'border border-transparent hover:bg-white/[0.03]'
                          }`}
                        >
                          {/* Icon */}
                          <span className="text-lg mt-0.5 shrink-0 w-6 text-center">
                            {item.icon ?? groupIcon[item.group]}
                          </span>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white/80 truncate">
                              {highlight(item.title, query)}
                            </div>
                            <div className="text-xs text-white/40 mt-0.5 line-clamp-1">
                              {highlight(item.subtitle, query)}
                            </div>
                          </div>

                          {/* Badge */}
                          {item.badge && (
                            <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/30 truncate max-w-[140px] hidden sm:block">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
              <div className="flex items-center gap-4 text-[10px] text-white/20">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↵</kbd> Open
                </span>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-white/20">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">Esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hook: keyboard shortcut ───────────────────────── */

export function useSearchShortcut(
  onOpen: () => void,
  onClose: () => void,
  isOpen: boolean
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
      // Slash to open
      if (!isOpen && e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpen, onClose, isOpen]);
}
