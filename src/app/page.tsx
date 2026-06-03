'use client';

import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('@/components/Nav').then((m) => ({ default: m.Nav })), {
  ssr: false,
});
const Hero = dynamic(() => import('@/components/Hero').then((m) => ({ default: m.Hero })), {
  ssr: false,
});
const Features = dynamic(
  () => import('@/components/Features').then((m) => ({ default: m.Features })),
  { ssr: false }
);
const Comparison = dynamic(
  () => import('@/components/Comparison').then((m) => ({ default: m.Comparison })),
  { ssr: false }
);
const Install = dynamic(
  () => import('@/components/Install').then((m) => ({ default: m.Install })),
  { ssr: false }
);
const DeploySection = dynamic(
  () => import('@/components/DeploySection').then((m) => ({ default: m.DeploySection })),
  { ssr: false }
);
const Footer = dynamic(
  () => import('@/components/Footer').then((m) => ({ default: m.Footer })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0d0d0d] text-white">
      <Nav />
      <Hero />
      <Features />
      <Comparison />
      <Install />
      <DeploySection />
      <Footer />
    </main>
  );
}
