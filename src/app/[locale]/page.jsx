import Hero from "@/components/Landing/Hero";
import FeaturedListings from "@/components/Landing/FeaturedListings";
import ExploreSection from "@/components/Landing/ExploreSection";
import seoData from "@/constants/seoData";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";

  const dataToAdd = seoData?.home?.[locale || "en"];

  return {
    title: dataToAdd?.title,
    description: dataToAdd?.metaDescription,
    keywords: dataToAdd?.metaKeywords,
    alternates: {
      canonical: dataToAdd?.canonical,
      languages: {
        en: dataToAdd?.hrefEn,
        ar: dataToAdd?.hrefAr,
        "x-default": dataToAdd?.hrefDefault,
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedListings />
        <ExploreSection />
      </main>
    </>
  );
}
