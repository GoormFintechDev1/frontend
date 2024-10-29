/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // standalone 모드 활성화
  srcDir: 'src',
};

module.exports = nextConfig;