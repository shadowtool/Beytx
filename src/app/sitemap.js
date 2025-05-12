import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { LOCATIONS_DATA } from "@/lib/locationsData";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import enTranslations from "../messages/en.json";
import arTranslations from "../messages/ar.json";

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

  const sitemapEntries = locales.flatMap((locale) => {
    return routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }));
  });

  let dynamicEntries = [];

  try {
    await dbConnect();

    const properties = await Property.find({}).limit(100).lean();

    dynamicEntries = locales.flatMap((locale) => {
      const translations = locale === "en" ? enTranslations : arTranslations;

      return properties.map((property) => {
        const id = property._id.toString();

        const dashedTitle =
          locale === "en"
            ? property?.title?.trim().replace(/ +/g, "-")
            : property?.titleArabic?.trim().replace(/ +/g, "-");

        const baseParts = [
          translations.locations[property?.location?.country] ?? "",
          translations.propertyStatus[property?.status] ?? "",
          translations.propertyTypes[property?.type?.toLowerCase()] ?? "",
          translations.locations[property?.location?.city] ?? "",
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
      });
    });

    // Fetch property types and locations for explore links
    const propertyTypes = await Promise.all(
      PROPERTY_TYPES.map(async (type) => {
        const propertyCount = await Property.countDocuments({
          type: type,
        });
        return { type, propertyCount };
      })
    ).then((types) =>
      types
        .sort((a, b) => b.propertyCount - a.propertyCount)
        .map((el) => el.type)
    );

    const locations = await Promise.all(
      LOCATIONS_DATA.map(async (location) => {
        const propertyCount = await Property.countDocuments({
          "location.city": location.city,
        });
        return { ...location, propertyCount };
      })
    ).then((locs) => locs.sort((a, b) => b.propertyCount - a.propertyCount));

    const exploreEntries = locales.flatMap((locale) => {
      const translations = locale === "en" ? enTranslations : arTranslations;

      return ["Sale", "Rent"].flatMap((activeTab) =>
        locations
          .slice(0, 5)
          .map((location) =>
            propertyTypes.map((type) => {
              const link = `/${locale}/explore/${translations.exploreSection[activeTab.toLowerCase()].toLowerCase()}/${translations.propertyTypes[type.toLowerCase()]}/${translations.locations[location.city]}/${translations.exploreSection.properties}-${translations.exploreSection.in}-${translations.locations[location.city]}`;
              return {
                url: `${baseUrl}${link}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.6,
              };
            })
          )
          .flat()
      );
    });

    dynamicEntries = [...dynamicEntries, ...exploreEntries];
  } catch (error) {
    console.warn("Could not fetch dynamic routes for sitemap:", error.message);
  }

  return [...sitemapEntries, ...dynamicEntries];
}
