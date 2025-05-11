import ExploreProperties from "@/components/SearchedProperties/ExploreProperties";
import { fetchPropertyListings } from "@/lib/queryFunctions";

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  const properties = await fetchPropertyListings(1, 10, {});

  const params = [];

  locales.forEach((locale) => {
    properties.pages.forEach((page) => {
      page.properties.forEach((property) => {
        params.push({
          locale,
          slug: [property.status, property.type, property.location],
        });
      });
    });
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
