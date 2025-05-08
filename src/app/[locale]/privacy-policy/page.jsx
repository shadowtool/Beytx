import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("PrivacyPolicy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{t("title")}</h1>
      <p className="text-gray-500 mb-4">{t("effectiveDate")}</p>

      <section className="mb-8">
        <h2 className="mb-4">{t("introduction.title")}</h2>
        <p className="text-gray-700 mb-4">{t("introduction.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("dataCollection.providedData.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("dataCollection.providedData.content")}
        </p>

        <h2 className="mb-4">{t("dataCollection.automaticData.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("dataCollection.automaticData.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("dataUsage.title")}</h2>
        <p className="text-gray-700 mb-4">{t("dataUsage.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("dataSharing.title")}</h2>
        <p className="text-gray-700 mb-4">{t("dataSharing.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("dataRetention.title")}</h2>
        <p className="text-gray-700 mb-4">{t("dataRetention.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("userRights.title")}</h2>
        <p className="text-gray-700 mb-4">{t("userRights.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("childrenPrivacy.title")}</h2>
        <p className="text-gray-700 mb-4">{t("childrenPrivacy.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("internationalTransfers.title")}</h2>
        <p className="text-gray-700 mb-4">
          {t("internationalTransfers.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("policyUpdates.title")}</h2>
        <p className="text-gray-700 mb-4">{t("policyUpdates.content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4">{t("contact.title")}</h2>
        <p className="text-gray-700 mb-4">{t("contact.content")}</p>
      </section>
    </div>
  );
}
