
import Hero from "./components/Hero";
import FeaturedListings from './components/FeaturedListings';
import PropertyListings from './components/PropertyListings';
import PropertyHyperlinks from "./components/PropertyHyperlinks";

export default function Home() {
  return (<>
  

    <main>
    <Hero />
      <FeaturedListings />
        <PropertyHyperlinks />
          <PropertyListings />
    </main>
    </>
  );
}
