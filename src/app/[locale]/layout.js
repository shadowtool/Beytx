import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import ContextWrapper from "@/context/ContextWrapper";
import Navbar from "@/components/Navbar/Navbar";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://beyt.co";

export const metadata = {
  title:
    "Buy & Rent Property in Kuwait | Villas, Apartments & Commercial Spaces | Beyt",
  description:
    "Kuwait's property marketplace connecting buyers and renters. Search updated listings or list your property free. Find your perfect property in Kuwait.",
  keywords: [
    "Real Estate Kuwait",
    "Apartments for rent Kuwait",
    "Villas for sale Kuwait",
    "Beyt",
  ],
  robots: "index, follow, max-image-preview:large",
  metadataBase: new URL(baseUrl),

  alternates: {
    canonical: `${baseUrl}/en/`,
    languages: {
      en: `${baseUrl}/en/`,
      ar: `${baseUrl}/ar/`,
      "x-default": `${baseUrl}/en/`,
    },
  },

  openGraph: {
    title: "Find Properties in Kuwait | Beyt Real Estate Platform",
    description:
      "Connect directly with property owners in Kuwait. Free listings available. Search villas, apartments & commercial spaces.",
    url: `${baseUrl}/en/`,
    siteName: "Beyt",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Beyt Real Estate Kuwait",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kuwait Real Estate Listings | Beyt",
    description:
      "Find properties for sale/rent in Kuwait. Free listings available. Updated daily.",
    images: [`${baseUrl}/twitter-home.jpg`],
  },

  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  //   other: {
  //     "msvalidate.01": "YOUR_BING_VERIFICATION_TOKEN",
  //   },
  // },

  icons: {
    icon: `${baseUrl}/favicon.ico`,
    apple: `${baseUrl}/apple-icon.png`,
  },
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Beyt",
    url: baseUrl,
    description:
      "Kuwait's property marketplace connecting buyers and renters. Search updated listings or list your property free. Find your perfect property in Kuwait.",
    inLanguage: locale,
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
    <NextIntlClientProvider messages={messages}>
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
