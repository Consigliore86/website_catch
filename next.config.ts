/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tcgdex.net',
        pathname: '/en/**',
      },
    ],
  },
};

module.exports = nextConfig;