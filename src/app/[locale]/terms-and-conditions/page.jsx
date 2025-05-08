"use client";

import { useTranslations } from "next-intl";

export default function TermsAndConditions() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{t("TermsAndConditions.title")}</h1>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.definitions.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.definitions.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.acceptance.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.acceptance.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.changes.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.changes.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.access.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.access.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.userAccounts.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.userAccounts.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.listingContent.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.listingContent.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.intellectualProperty.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.intellectualProperty.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.prohibitedConduct.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.prohibitedConduct.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.thirdPartyLinks.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.thirdPartyLinks.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.disclaimers.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.disclaimers.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.limitationOfLiability.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.limitationOfLiability.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.indemnification.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.indemnification.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.termination.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.termination.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("TermsAndConditions.governingLaw.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.governingLaw.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">
          {t("TermsAndConditions.contactInformation.title")}
        </h2>
        <p className="text-gray-700 mb-4">
          {t("TermsAndConditions.contactInformation.content")}
        </p>
      </section>
    </div>
  );
}
