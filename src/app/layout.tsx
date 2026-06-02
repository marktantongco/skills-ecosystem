import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skills Ecosystem — Open Agent Skills Platform',
  description:
    'An award-winning interactive showcase of the open agent skills ecosystem. Discover, compare, and deploy AI agent skills with real-time analytics, comparative matrices, and live deployment guides.',
  keywords: [
    'AI skills',
    'agent skills',
    'open source',
    'claude skills',
    'opencode skills',
    'agent ecosystem',
    'skills.sh',
    'AI agents',
    'LLM tools',
  ],
  authors: [{ name: 'Mark Tan Tongco' }],
  openGraph: {
    title: 'Skills Ecosystem — Open Agent Skills Platform',
    description:
      'Award-winning interactive showcase of the open agent skills ecosystem with live comparisons and deployment guides.',
    url: 'https://marktantongco.github.io/skills-ecosystem',
    siteName: 'Skills Ecosystem',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills Ecosystem',
    description:
      'Interactive showcase of the open agent skills platform',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
