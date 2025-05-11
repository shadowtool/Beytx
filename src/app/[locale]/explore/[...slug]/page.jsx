import ExploreProperties from "@/components/SearchedProperties/ExploreProperties";

export default async function Page({ params }) {
  const { locale, slug } = params;

  return (
    <main>
      <ExploreProperties locale={locale} slug={slug} />
    </main>
  );
}
