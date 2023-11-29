/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  generateEtags: false,
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
