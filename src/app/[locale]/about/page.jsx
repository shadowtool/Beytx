import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("About");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="mb-8">{t("title")}</h1>
      <p className="text-gray-700 mb-4">{t("description")}</p>

      <section className="my-8">
        <h2 className="mb-4">{t("mission.title")}</h2>
        <p className="text-gray-700 mb-4">{t("mission.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{t("vision.title")}</h2>
        <p className="text-gray-700 mb-4">{t("vision.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{t("offer.title")}</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>{t("offer.listings")}</li>
          <li>{t("offer.tools")}</li>
          <li>{t("offer.filters")}</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{t("whyChooseUs.title")}</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>{t("whyChooseUs.localExpertise")}</li>
          <li>{t("whyChooseUs.trust")}</li>
          <li>{t("whyChooseUs.insights")}</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{t("story.title")}</h2>
        <p className="text-gray-700 mb-4">{t("story.content")}</p>
      </section>

      <section className="my-8">
        <h2 className="mb-4">{t("contact.title")}</h2>
        <p className="text-gray-700 mb-4">{t("contact.email")}</p>
      </section>
    </div>
  );
};

export default AboutUs;
