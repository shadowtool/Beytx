import ExploreProperties from "@/components/SearchedProperties/ExploreProperties";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { LOCATIONS_DATA } from "@/lib/locationsData";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import enTranslations from "../../../../messages/en.json";
import arTranslations from "../../../../messages/ar.json";

export async function generateStaticParams() {
  const locales = ["en", "ar"];

  await dbConnect();

  const propertyTypes = await Promise.all(
    PROPERTY_TYPES.map(async (type) => {
      const propertyCount = await Property.countDocuments({
        type: type,
      });
      return { type, propertyCount };
    })
  ).then((types) =>
    types.sort((a, b) => b.propertyCount - a.propertyCount).map((el) => el.type)
  );

  const locations = await Promise.all(
    LOCATIONS_DATA.map(async (location) => {
      const propertyCount = await Property.countDocuments({
        "location.city": location.city,
      });
      return { ...location, propertyCount };
    })
  ).then((locs) => locs.sort((a, b) => b.propertyCount - a.propertyCount));

  const params = locales.flatMap((locale) => {
    const translations = locale === "en" ? enTranslations : arTranslations;

    return ["Sale", "Rent"].flatMap((activeTab) =>
      locations
        .slice(0, 5)
        .map((location) =>
          propertyTypes.map((type) => {
            return {
              locale,
              slug: [
                "explore",
                translations.exploreSection[
                  activeTab.toLowerCase()
                ].toLowerCase(),
                translations.propertyTypes[type.toLowerCase()],
                translations.locations[location.city],
                `${translations.exploreSection.properties}-${translations.exploreSection.in}-${translations.locations[location.city]}`,
              ],
            };
          })
        )
        .flat()
    );
  });

  return params;
}

export default async function Page({ params }) {
  const { locale, slug } = params;

  return (
    <main>
      <ExploreProperties locale={locale} slug={slug} />
    </main>
  );
}
