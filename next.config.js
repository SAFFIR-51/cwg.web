/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep hot-reload output separate from production build chunks.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  reactStrictMode: true,
  devIndicators: false,
  images: { qualities: [75, 90, 95] },
  // 노트 글을 읽고 뒤로 오면 보던 자리로(QA-11)
  experimental: { scrollRestoration: true },
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
      // 「기프티콘 잔액, 어디까지」는 ONE MORE 꿀팁 1편 02 로 합쳐졌다(2026-10-15)
      { source: '/notes/gifticon-balance', destination: '/notes/coupon-three-habits', permanent: false },
    ];
  },
};
module.exports = nextConfig;
