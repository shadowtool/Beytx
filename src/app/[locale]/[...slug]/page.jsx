export const dynamicParams = true; // Enable fallback for non-prebuilt pages
export const revalidate = 60; // ISR: revalidate page every 60 seconds

import { fetchPropertyDetails } from "@/lib/queryFunctions";
import PropertyDetailsDesktop from "@/components/PropertyDetails/PropertyDetailsDesktop";
import PropertyDetailsMobile from "@/components/PropertyDetails/PropertyDetailsMobile";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slugArray = params.slug || [];
  const id = slugArray[slugArray.length - 1];

  const property = await fetchPropertyDetails(id);
  if (!property) return {};

  return {
    title: `${property.title} | Beyt`,
    description:
      property.description?.slice(0, 160) ||
      "View full details of this property.",
    keywords: property.title.split(" "),
    openGraph: {
      title: property.title,
      description: property.description?.slice(0, 160),
      images: [
        {
          url: property.images?.[0],
          width: 800,
          height: 600,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description?.slice(0, 160),
      images: [property.images?.[0]],
    },
  };
}

export default async function Page({ params }) {
  const slugArray = params.slug || [];

  // Get the last element in the slug array as the property ID
  const id = slugArray[slugArray.length - 1];

  if (!id) return notFound();

  // Fetch data on the server (runs at build or request time)
  const propertyData = await fetchPropertyDetails(id);

  if (!propertyData) return notFound();

  return (
    <>
      <PropertyDetailsDesktop loading={false} propertyData={propertyData} />
      <PropertyDetailsMobile loading={false} propertyData={propertyData} />
    </>
  );
}
