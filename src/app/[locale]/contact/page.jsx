import seoData from "@/constants/seoData";
import Contact from "@/components/Contact/contact";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";

  const dataToAdd = seoData?.contact?.[locale || "en"];

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

export default function Page() {
  return <Contact />;
}
