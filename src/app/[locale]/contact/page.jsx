import Contact from "@/components/Contact/contact";
import { generateCountryMetadata } from "@/lib/seoUtils";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  return generateCountryMetadata("contact", locale);
}

export default function Page() {
  return <Contact />;
}
