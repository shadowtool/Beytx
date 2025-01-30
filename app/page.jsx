import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedListings from './components/FeaturedListings';
import PropertyListings from './components/PropertyListings';

export default function Home() {
  return (<>
    <Header />
    <Hero />
    <main>
      <FeaturedListings />
      <PropertyListings />
    </main>
    </>
  );
}
