import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";

export default async function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://example.com";

  const locales = ["en", "ar"];

  const routes = [
    "",
    "/about",
    "/admin",
    "/contact",
    "/dashboard",
    "/privacy-policy",
    "/properties",
    "/terms-and-conditions",
  ];

  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }))
  );

  let dynamicEntries = [];

  try {
    await dbConnect();

    const properties = await Property.find({}).limit(100).lean();

    dynamicEntries = locales.flatMap((locale) =>
      properties.map((property) => {
        const id = property._id.toString();

        const dashedTitle =
          locale === "en"
            ? property?.title?.trim().replace(/ +/g, "-")
            : property?.titleArabic?.trim().replace(/ +/g, "-");

        const baseParts = [
          property?.location?.country ?? "",
          property?.status ?? "",
          property?.type ?? "",
          property?.location?.city ?? "",
          dashedTitle,
        ];

        const slugParts =
          locale === "ar" ? [id, ...baseParts] : [...baseParts, id];

        const fullUrl = `${baseUrl}/${locale}/${slugParts.join("/")}`;

        return {
          url: fullUrl,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      })
    );
  } catch (error) {
    console.warn("Could not fetch dynamic routes for sitemap:", error.message);
  }

  return [...sitemapEntries, ...dynamicEntries];
}
