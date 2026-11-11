/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "backend",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: '/services/pickup', destination: '/services/gom-hang-le-lcl', permanent: true },
      { source: '/services/van-chuyen-lcl', destination: '/services/gom-hang-le-lcl', permanent: true },
      { source: '/services/kho-bai', destination: '/services/dich-vu-thue-kho-bai', permanent: true },
      { source: '/services/kho-bai-phan-phoi', destination: '/services/dich-vu-thue-kho-bai', permanent: true },
      { source: '/services/cho-thue-kho-bai', destination: '/services/dich-vu-thue-kho-bai', permanent: true },
      { source: '/services/van-tai-hang-khong', destination: '/services/van-chuyen-duong-khong', permanent: true },
      { source: '/services/van-tai-duong-bien', destination: '/services/van-chuyen-duong-bien', permanent: true },
      { source: '/services/van-tai-duong-bo', destination: '/services/van-chuyen-duong-bo', permanent: true },
      { source: '/services/khai-bao-hai-quan', destination: '/services/khai-thue-hai-quan', permanent: true },
      { source: '/services/hang-dac-biet', destination: '/services/hang-dac-biet-du-an', permanent: true },
      { source: '/dich-vu/:path*', destination: '/services/:path*', permanent: true },
      { source: '/ve-chung-toi', destination: '/about', permanent: true },
      { source: '/tin-tuc', destination: '/news', permanent: true },
      { source: '/lien-he', destination: '/contact', permanent: true },
      { source: '/tuyen-dung', destination: '/careers', permanent: true },
    ];
  },
};
export default nextConfig;
