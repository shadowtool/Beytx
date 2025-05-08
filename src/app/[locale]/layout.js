import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import ContextWrapper from "@/context/ContextWrapper";
import Navbar from "@/components/Navbar/Navbar";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://beyt.co";

export async function generateMetadata({ params }) {
  const { locale } = params;

  return {
    title:
      locale === "ar"
        ? "شراء وتأجير عقارات في الكويت | فلل، شقق ومساحات تجارية | Beyt | بيت"
        : "Buy & Rent Property in Kuwait | Villas, Apartments & Commercial Spaces | Beyt",
    description:
      locale === "ar"
        ? "اكتشف أفضل عقارات الكويت—فلل، شقق، مكاتب ومساحات تجارية. أضف عقارك مجانًا وتواصل مباشرة مع المشترين والمستأجرين على Beyt | بيت."
        : "Kuwait's property marketplace connecting buyers and renters. Search updated listings or list your property free. Find your perfect property in Kuwait.",
    keywords:
      locale === "ar"
        ? "عقارات الكويت, شقق للإيجار الكويت, فلل للبيع الكويت, عقارات تجارية الكويت, Beyt | بيت"
        : "Real Estate Kuwait, Apartments for rent Kuwait, Villas for sale Kuwait, Beyt",
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: {
        en: `${baseUrl}/en/`,
        ar: `${baseUrl}/ar/`,
        "x-default": `${baseUrl}/en/`,
      },
    },
    openGraph: {
      title:
        locale === "ar"
          ? "شراء وتأجير عقارات في الكويت | منصة Beyt | بيت للعقارات"
          : "Find Properties in Kuwait | Beyt Real Estate Platform",
      description:
        locale === "ar"
          ? "تواصل مباشرة مع مالكي العقار في الكويت على Beyt | بيت. قوائم مجانية للفلل والشقق والمساحات التجارية."
          : "Connect directly with property owners in Kuwait. Free listings available. Search villas, apartments & commercial spaces.",
      url: `${baseUrl}/${locale}/`,
      siteName: "Beyt",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image-home.jpg`,
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "منصة Beyt | بيت للعقارات في الكويت"
              : "Beyt Real Estate Kuwait",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "ar"
          ? "عقارات الكويت للبيع والإيجار | Beyt | بيت"
          : "Kuwait Real Estate Listings | Beyt",
      description:
        locale === "ar"
          ? "اعثر على فلل، شقق ومساحات تجارية في الكويت مجانًا على Beyt | بيت. قوائم محدثة يومياً."
          : "Find properties for sale/rent in Kuwait. Free listings available. Updated daily.",
      images: [`${baseUrl}/twitter-home.jpg`],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Beyt | بيت",
    url: baseUrl,
    description:
      "Kuwait's property marketplace connecting buyers and renters. Search updated listings or list your property free. Find your perfect property in Kuwait.",
    inLanguage: locale,
    sameAs: [
      "https://www.facebook.com/Beyt.co",
      "https://www.instagram.com/beyt.co/",
      "https://www.linkedin.com/company/beyt-co/",
      "https://www.tiktok.com/@beyt.co",
      "https://x.com/beytkw",
    ],
    publisher: {
      "@type": "Organization",
      name: "Beyt",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    keywords: [
      "Real Estate Kuwait",
      "Apartments for rent Kuwait",
      "Villas for sale Kuwait",
    ],
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ContextWrapper>
        <Script
          id="json-ld-home"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <div className=""></div>
        <Navbar />
        <div className="min-h-[calc(100vh-250px)] flex flex-col">
          {children}
        </div>
        <Footer />
      </ContextWrapper>
    </NextIntlClientProvider>
  );
}
