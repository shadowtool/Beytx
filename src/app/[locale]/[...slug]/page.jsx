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
import ar from "../../../messages/ar.json";
import en from "../../../messages/en.json";
import { parseDocument } from "htmlparser2";
import mongoose from "mongoose";

export async function generateMetadata({ params }) {
  try {
    const { locale, slug } = params;

    const translations = locale === "ar" ? ar : en;

    const slugArray = slug || [];

    const id =
      locale === "ar" ? slugArray?.[0] : slugArray?.[slugArray.length - 1];

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return notFound();
    }

    const property = await fetchPropertyFromDB(id);

    if (!property) return notFound();

    const title =
      params?.locale === "en" ? property?.title : property?.titleArabic;

    const translatedStatus =
      locale === "en"
        ? property?.status
        : property?.status === "sale"
          ? translations.cards.sale
          : translations.cards.rent;

    const translatedType =
      locale === "en"
        ? property?.type
        : translations.propertyTypes[property?.type];

    const translatedCity =
      locale === "en"
        ? property?.location?.city
        : translations.locations[property?.location?.city];

    const translatedCountry =
      locale === "en"
        ? property?.location?.country
        : translations.locations[property?.location?.country];

    const stripHtml = (html) => {
      const doc = parseDocument(html);
      return doc?.children?.[0]?.data || "";
    };

    return {
      title: `${title} | Beyt`,
      description:
        locale === "en"
          ? stripHtml(property?.description)
          : stripHtml(property?.descriptionArabic),
      keywords: [
        translatedStatus,
        translatedType,
        translatedCity,
        translatedCountry,
      ],
      openGraph: {
        title: title,
        description: stripHtml(property.description),
        images: [
          {
            url: property.images?.[0],
            width: 800,
            height: 600,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description:
          locale === "en"
            ? stripHtml(property?.description)
            : stripHtml(property?.descriptionArabic),
        images: [property.images?.[0]],
      },
    };
  } catch (error) {
    // console.error("Error generating metadata:", error);
    return notFound();
  }
}

export default async function Page({ params }) {
  try {
    const { locale, slug } = params;

    const slugArray = slug || [];

    const id =
      locale === "ar" ? slugArray?.[0] : slugArray?.[slugArray.length - 1];

    const path = [locale, ...slug].join("/");

    const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${path}`;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return notFound();
    }
    const finalPropertyData = await fetchPropertyFromDB(id);

    console.log({ finalPropertyData });

    if (!finalPropertyData) return notFound();

    const jsonLdData = getJSONLDForPropertyDetails(
      pageUrl,
      finalPropertyData,
      locale
    );

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
        <PropertyDetailsMobile
          loading={false}
          propertyData={finalPropertyData}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading property page:", error);
    return notFound();
  }
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
