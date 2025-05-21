import { getTranslations } from "next-intl/server";
import seoData from "@/constants/seoData";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";

  const dataToAdd = seoData?.privacy?.[locale || "en"];

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

export default async function PrivacyPolicy() {
  const translate = await getTranslations("PrivacyPolicy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{translate("title")}</h1>
      <p className="text-gray-500 mb-4">{translate("effectiveDate")}</p>

      <section className="mb-8">
        <h2 className="mb-4">{translate("introduction.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("introduction.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {translate("dataCollection.providedData.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {translate("dataCollection.providedData.content")}
        </p>

        <h2 className="mb-4">
          {translate("dataCollection.automaticData.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {translate("dataCollection.automaticData.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("dataUsage.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("dataUsage.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("dataSharing.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("dataSharing.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("dataRetention.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("dataRetention.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("userRights.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("userRights.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("childrenPrivacy.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("childrenPrivacy.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("internationalTransfers.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("internationalTransfers.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("policyUpdates.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("policyUpdates.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("contact.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("contact.content")}</p>
      </section>
    </div>
  );
}
