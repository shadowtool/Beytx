import Hero from "@/components/Landing/Hero";
import FeaturedListings from "@/components/Landing/FeaturedListings";
import ExploreSection from "@/components/Landing/ExploreSection";
import TokenHandler from "@/components/Reusables/Misc/TokenHandler";
import { generateCountryMetadata } from "@/lib/seoUtils";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  return generateCountryMetadata("home", locale);
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedListings />
        <ExploreSection />
        <TokenHandler />
      </main>
    </>
  );
}
