import { getTranslations } from "next-intl/server";
import seoData from "@/constants/seoData";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";

  const dataToAdd = seoData?.about?.[locale || "en"];

  return {
    title: dataToAdd?.title,
    description: dataToAdd?.metaDescription,
    keywords: dataToAdd?.metaKeywords,
    alternates: {
      canonical: dataToAdd?.canonical,
      languages: {
        en: dataToAdd?.hrefEn,
        ar: dataToAdd?.hrefAr,
        "x-default": dataToAdd?.hrefDefault,
      },
    },
  };
}

export default async function AboutPage() {
  const translate = await getTranslations("About");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{translate("title")}</h1>
      <p className="text-gray-700 mb-4">{translate("description")}</p>

      <section className="my-8">
        <h2 className="mb-4">{translate("mission.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("mission.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{translate("vision.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("vision.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{translate("offer.title")}</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>{translate("offer.listings")}</li>
          <li>{translate("offer.tools")}</li>
          <li>{translate("offer.filters")}</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{translate("whyChooseUs.title")}</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>{translate("whyChooseUs.localExpertise")}</li>
          <li>{translate("whyChooseUs.trust")}</li>
          <li>{translate("whyChooseUs.insights")}</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{translate("story.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("story.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{translate("contact.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("contact.email")}</p>
      </section>
    </div>
  );
}
