export interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: string;
  installs: string;
  source: string;
  tier: 'premium' | 'standard' | 'essential';
  tags: string[];
}

export interface ComparisonRow {
  feature: string;
  ecosystem: string;
  alternatives: { name: string; value: string }[];
}

export const skills: SkillItem[] = [
  {
    id: 'ui-ux-pro-max-v7',
    name: 'UI/UX Pro Max v7',
    description: '60 design styles, 48 palettes, 36 fonts, 24 industry rules — the definitive AI design intelligence system.',
    category: 'design',
    installs: '195K',
    source: 'nextlevelbuilder',
    tier: 'premium',
    tags: ['design-systems', 'ui-ux', 'components', 'palettes'],
  },
  {
    id: 'frontend-design',
    name: 'Frontend Design',
    description: 'Distinctive, production-grade frontend interfaces that avoid generic AI aesthetics. Bold, memorable design.',
    category: 'design',
    installs: '490K',
    source: 'anthropics',
    tier: 'premium',
    tags: ['ui', 'react', 'html-css', 'components'],
  },
  {
    id: 'high-end-visual-design',
    name: 'High-End Visual Design',
    description: '$150k agency-tier digital experiences with cinematic spatial rhythm, obsessive micro-interactions, and fluid motion.',
    category: 'design',
    installs: '85K',
    source: 'leonxlnx',
    tier: 'premium',
    tags: ['premium', 'agency', 'motion', 'glassmorphism'],
  },
  {
    id: 'design-taste-frontend',
    name: 'Design Taste Frontend',
    description: 'High-agency frontend engineering with bias correction, anti-generic patterns, and performance guardrails.',
    category: 'design',
    installs: '100K',
    source: 'leonxlnx',
    tier: 'premium',
    tags: ['engineering', 'css', 'refactoring', 'best-practices'],
  },
  {
    id: 'gsap',
    name: 'GSAP Animation',
    description: 'Cinematic scroll-driven storytelling, timeline orchestration, SVG morphing, and text reveals.',
    category: 'animation',
    installs: '120K',
    source: 'gsap',
    tier: 'premium',
    tags: ['scroll', 'svg', 'timeline', 'motion'],
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    description: 'Declarative React animation — UI transitions, gestures, layout animations, spring physics, and orchestration.',
    category: 'animation',
    installs: '180K',
    source: 'framer',
    tier: 'premium',
    tags: ['react', 'gestures', 'spring', 'layout'],
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    description: 'Component registry and design system manager. Add, customize, and compose production UI components.',
    category: 'components',
    installs: '170K',
    source: 'shadcn',
    tier: 'premium',
    tags: ['react', 'tailwind', 'design-system', 'registry'],
  },
  {
    id: 'impeccable',
    name: 'Impeccable',
    description: 'Four-phase stacked quality pipeline — technical audit, UX critique, design improvement, and final polish.',
    category: 'design',
    installs: '143K',
    source: 'pbakaus',
    tier: 'premium',
    tags: ['audit', 'qa', 'ux', 'polish'],
  },
  {
    id: 'stitch-design',
    name: 'Stitch Design',
    description: 'Bridge between vague ideas and precise design specifications. AI-powered design system synthesis.',
    category: 'design',
    installs: '95K',
    source: 'stitch',
    tier: 'standard',
    tags: ['ai-design', 'design-system', 'prompt', 'mcp'],
  },
  {
    id: 'find-skills',
    name: 'Find Skills',
    description: 'The #1 skill with 1.8M installs. Discover and install capabilities from the open agent skills ecosystem.',
    category: 'system',
    installs: '1.8M',
    source: 'vercel-labs',
    tier: 'essential',
    tags: ['discovery', 'cli', 'ecosystem', 'search'],
  },
  {
    id: 'deployment-manager',
    name: 'Deployment Manager',
    description: 'Deploy to Vercel, Netlify, GitHub Pages. CI/CD, env management, monitoring, and rollbacks.',
    category: 'devops',
    installs: '88K',
    source: 'opencode',
    tier: 'essential',
    tags: ['deploy', 'ci-cd', 'vercel', 'github-pages'],
  },
  {
    id: 'vercel-react-best-practices',
    name: 'React Best Practices',
    description: 'React and Next.js performance optimization guidelines from Vercel Engineering.',
    category: 'development',
    installs: '444K',
    source: 'vercel-labs',
    tier: 'essential',
    tags: ['react', 'nextjs', 'performance', 'optimization'],
  },
];

export const categories = [
  { id: 'design', label: 'Design & UI', count: 6, icon: '🎨' },
  { id: 'animation', label: 'Animation & Motion', count: 2, icon: '✨' },
  { id: 'components', label: 'Components & Systems', count: 1, icon: '🧩' },
  { id: 'development', label: 'Development', count: 1, icon: '⚡' },
  { id: 'devops', label: 'DevOps & Deploy', count: 1, icon: '🚀' },
  { id: 'system', label: 'System & Tools', count: 1, icon: '🔧' },
];

export const comparisons: ComparisonRow[] = [
  {
    feature: 'Design Styles',
    ecosystem: '60 styles across 13 categories',
    alternatives: [
      { name: 'Tailwind UI', value: '~30 component patterns' },
      { name: 'shadcn/ui', value: '~50 components' },
      { name: 'Radix UI', value: '~30 primitives' },
    ],
  },
  {
    feature: 'Animation Libraries',
    ecosystem: 'Framer Motion + GSAP dual-engine',
    alternatives: [
      { name: 'Tailwind UI', value: 'CSS transitions only' },
      { name: 'shadcn/ui', value: 'No built-in animation' },
      { name: 'Radix UI', value: 'CSS transitions' },
    ],
  },
  {
    feature: 'Quality Pipeline',
    ecosystem: '4-phase audit + critique + polish',
    alternatives: [
      { name: 'Tailwind UI', value: 'No quality tooling' },
      { name: 'shadcn/ui', value: 'No audit pipeline' },
      { name: 'Radix UI', value: 'Accessibility audits' },
    ],
  },
  {
    feature: 'AI Integration',
    ecosystem: 'Native AI agent tools and prompts',
    alternatives: [
      { name: 'Tailwind UI', value: 'No AI integration' },
      { name: 'shadcn/ui', value: 'CLI-based only' },
      { name: 'Radix UI', value: 'No AI integration' },
    ],
  },
  {
    feature: 'Skill Ecosystem',
    ecosystem: '78+ skills, 13 categories, CLI install',
    alternatives: [
      { name: 'Tailwind UI', value: 'Single library' },
      { name: 'shadcn/ui', value: 'Component registry' },
      { name: 'Radix UI', value: 'Primitives only' },
    ],
  },
  {
    feature: 'Deployment Targets',
    ecosystem: 'GitHub Pages + Vercel + Netlify',
    alternatives: [
      { name: 'Tailwind UI', value: 'No deployment' },
      { name: 'shadcn/ui', value: 'Vercel only' },
      { name: 'Radix UI', value: 'No deployment' },
    ],
  },
  {
    feature: 'PWA Support',
    ecosystem: 'Built-in next-pwa + manifest',
    alternatives: [
      { name: 'Tailwind UI', value: 'No PWA' },
      { name: 'shadcn/ui', value: 'No PWA' },
      { name: 'Radix UI', value: 'No PWA' },
    ],
  },
  {
    feature: 'Install Base',
    ecosystem: '1.8M+ (top skill)',
    alternatives: [
      { name: 'Tailwind UI', value: 'N/A (paid)' },
      { name: 'shadcn/ui', value: '170K installs' },
      { name: 'Radix UI', value: 'N/A (npm)' },
    ],
  },
];

export const installGuide = [
  {
    tool: 'Skills CLI',
    command: 'npx skills add owner/repo@skill-name',
    description: 'Install any skill from the ecosystem. Use -g for global, -y to skip prompts.',
  },
  {
    tool: 'Find Skills',
    command: 'npx skills find [query]',
    description: 'Search the skills.sh registry for capabilities matching your needs.',
  },
  {
    tool: 'Check Updates',
    command: 'npx skills check && npx skills update',
    description: 'Keep your installed skills current with the latest versions.',
  },
  {
    tool: 'Create Skill',
    command: 'npx skills init my-skill-name',
    description: 'Scaffold a new skill with the official template.',
  },
];
