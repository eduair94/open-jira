/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = {
      'mongodb-client-encryption': false,
      aws4: false,
      socks: false,
      snappy: false,
      '@aws-sdk/credential-providers': false,
      '@mongodb-js/zstd': false,
      kerberos: false,
    };

    return config;
  },
};

module.exports = nextConfig;
