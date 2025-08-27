import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Enable modern compression and optimization
  compress: true,
  poweredByHeader: false,
  // Optimize CSS handling
  experimental: {
    cssChunking: "strict",
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Optimize images for faster loading
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
};

export default withNextIntl(nextConfig);
