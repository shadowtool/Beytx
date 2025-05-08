import Hero from "@/components/Landing/Hero";
import FeaturedListings from "@/components/Landing/FeaturedListings";
import LinksSection from "@/components/Landing/LinksSection";
import ExploreSection from "@/components/Landing/ExploreSection";

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
