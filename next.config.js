/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // standalone 모드 활성화
  images: {
    domains: ['d1c5n4ri2guedi.cloudfront.net'], // 외부 이미지 URL 도메인 추가
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;