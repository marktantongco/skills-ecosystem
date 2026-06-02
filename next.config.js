/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // For GitHub Pages deployment at /skills-ecosystem/
  basePath: process.env.NODE_ENV === 'production' ? '/skills-ecosystem' : '',
};

module.exports = withPWA(nextConfig);
