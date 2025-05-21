import { getTranslations } from "next-intl/server";
import seoData from "@/constants/seoData";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";

  const dataToAdd = seoData?.terms?.[locale || "en"];

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

export default async function TermsAndConditions() {
  const translate = await getTranslations("TermsAndConditions");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{translate("title")}</h1>

      <section className="mb-8">
        <h2 className="mb-4">{translate("definitions.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("definitions.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("acceptance.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("acceptance.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("changes.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("changes.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("access.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("access.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("userAccounts.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("userAccounts.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("listingContent.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("listingContent.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("intellectualProperty.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("intellectualProperty.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("prohibitedConduct.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("prohibitedConduct.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("thirdPartyLinks.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("thirdPartyLinks.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("disclaimers.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("disclaimers.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("limitationOfLiability.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("limitationOfLiability.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("indemnification.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("indemnification.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("termination.title")}</h2>
        <p className="text-gray-700 mb-4">{translate("termination.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("governingLaw.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("governingLaw.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{translate("contactInformation.title")}</h2>
        <p className="text-gray-700 mb-4">
          {translate("contactInformation.content")}
        </p>
      </section>
    </div>
  );
}
