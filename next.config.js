// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/school-evaluator',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Redirects don't work with static export, using index.html redirect instead
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ];
  // },

  // Fix for webpack issues with fs/module in client-side code
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig); 