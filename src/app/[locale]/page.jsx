import Hero from "@/components/Landing/Hero";
import FeaturedListings from "@/components/Landing/FeaturedListings";
import LinksSection from "@/components/Landing/LinksSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedListings />
        {/* <LinksSection /> */}
      </main>
    </>
  );
}
