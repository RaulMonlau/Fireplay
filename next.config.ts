// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.rawg.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Ignora errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcionalmente, también puedes ignorar errores de TypeScript
    ignoreBuildErrors: true,
  },
};

module.exports = withPWA(nextConfig);