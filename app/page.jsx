
import Hero from "./components/Hero";
import FeaturedListings from './components/FeaturedListings';
import PropertyListings from './components/PropertyListings';

export default function Home() {
  return (<>
    
    <Hero />
    <main>
      <FeaturedListings />
      <PropertyListings />
    </main>
    </>
  );
}
