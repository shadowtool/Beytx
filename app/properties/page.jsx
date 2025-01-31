import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PropertyListings from '../components/PropertyListings';

export default function Home() {
  return (<>
    <Header />
    <Hero />
    <main>
      <PropertyListings />
    </main>
    </>
  );
}
