/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cho phép unoptimized với local images để tránh vấn đề optimize
    unoptimized: false,
    // Remote patterns nếu cần dùng ảnh ngoài
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Kích thước phổ biến
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
