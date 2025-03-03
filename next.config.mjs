import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default withNextIntl(nextConfig);
