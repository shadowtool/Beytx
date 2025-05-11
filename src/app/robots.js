export default function robots() {
  const baseUrl = process.env.SITE_URL || "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/static/", "/*/admin"],
    },
    sitemap: `${
      process.env.NEXT_PUBLIC_DOMAIN ?? "https://beyt-personal.vercel.app"
    }/sitemap.xml`,
  };
}
