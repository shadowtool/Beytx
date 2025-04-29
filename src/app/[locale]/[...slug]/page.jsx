export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 3600;

import PropertyDetailsDesktop from "@/components/PropertyDetails/PropertyDetailsDesktop";
import PropertyDetailsMobile from "@/components/PropertyDetails/PropertyDetailsMobile";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import {
  fetchPropertyFromDB,
  getJSONLDForPropertyDetails,
} from "@/lib/helpers";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  const slugArray = slug || [];

  const id =
    locale === "ar" ? slugArray?.[0] : slugArray?.[slugArray.length - 1];

  const property = await fetchPropertyFromDB(id);

  if (!property) return {};

  const title =
    params?.locale === "en" ? property?.title : property?.titleArabic;

  return {
    title: `${title} | Beyt`,
    description:
      property.description?.slice(0, 160) ||
      "View full details of this property.",
    keywords: [
      property?.status,
      property?.type,
      property?.location?.city,
      property?.location?.country,
    ],
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
  const { locale, slug } = params;

  const slugArray = slug || [];

  const id =
    locale === "ar" ? slugArray?.[0] : slugArray?.[slugArray.length - 1];

  const path = [locale, ...slug].join("/");

  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${path}`;

  if (!id) return notFound();

  const finalPropertyData = await fetchPropertyFromDB(id);

  const jsonLdData = getJSONLDForPropertyDetails(
    pageUrl,
    finalPropertyData,
    locale
  );

  if (!finalPropertyData) return notFound();

  return (
    <>
      <Script
        id="json-ld-property-details"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <PropertyDetailsDesktop
        loading={false}
        propertyData={finalPropertyData}
      />
      <PropertyDetailsMobile loading={false} propertyData={finalPropertyData} />
    </>
  );
}

export async function generateStaticParams() {
  await dbConnect();

  const properties = await Property.find({}).limit(100).lean();

  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    properties?.map((property) => {
      const id = property?._id?.toString();

      const dashedTitle =
        locale === "en"
          ? property?.title?.trim().replace(/ +/g, "-")
          : property?.titleArabic?.trim().replace(/ +/g, "-");

      const baseParts = [
        property?.location?.country ?? "",
        property?.status ?? "",
        property?.type ?? "",
        property?.location?.city ?? "",
        dashedTitle,
      ];

      let slug;

      if (locale === "ar") {
        slug = [id, ...baseParts];
      } else {
        slug = [...baseParts, id];
      }

      return {
        locale,
        slug,
      };
    })
  );
}
