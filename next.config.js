/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep hot-reload output separate from production build chunks.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  reactStrictMode: true,
  devIndicators: false,
  images: { qualities: [75, 90] },
  async redirects() {
    // 구 정적 사이트 주소 호환
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/service.html', destination: '/full-life', permanent: true },
      { source: '/membership.html', destination: '/membership', permanent: true },
      { source: '/partners.html', destination: '/partners', permanent: true },
      { source: '/download.html', destination: '/download', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/delete-account.html', destination: '/delete-account', permanent: true },
    ];
  },
};
module.exports = nextConfig;
