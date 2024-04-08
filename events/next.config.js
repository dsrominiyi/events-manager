/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@api/types'],
};

module.exports = nextConfig;
