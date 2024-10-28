/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
  output: 'standalone'
};

module.exports = nextConfig;
