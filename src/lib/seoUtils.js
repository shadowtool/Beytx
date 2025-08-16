import { COUNTRY } from "@/constants/constants";
import seoData from "@/constants/seoData";

/**
 * Gets the current country data (now using single COUNTRY constant)
 * @returns {Object} Country data object
 */
export function getCountryFromDomain() {
  // Return the single configured country
  return COUNTRY;
}

/**
 * Processes SEO data by replacing placeholders with country-specific data
 * @param {Object} seoDataSection - The section of seoData to process
 * @param {string} locale - The locale (en/ar)
 * @param {Object} countryData - The country data object
 * @returns {Object} Processed SEO data with replacements
 */
export function processSeoData(seoDataSection, locale, countryData) {
  if (!seoDataSection || !seoDataSection[locale]) {
    return {};
  }

  const data = seoDataSection[locale];
  const processedData = {};

  // Replace placeholders in each property
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      processedData[key] = value
        .replace(/{baseurl}/g, countryData.baseurl)
        .replace(/{countryNameEnglish}/g, countryData.english)
        .replace(/{countryNameArabic}/g, countryData.arabic);
    } else {
      processedData[key] = value;
    }
  }

  return processedData;
}

/**
 * Generates metadata for a page with country-specific SEO data
 * @param {string} seoKey - The key in seoData object (e.g., 'home', 'about', 'contact')
 * @param {string} locale - The locale (en/ar)
 * @returns {Object} Metadata object for Next.js
 */
export function generateCountryMetadata(seoKey, locale = "en") {
  const countryData = getCountryFromDomain();
  const dataToAdd = processSeoData(seoData[seoKey], locale, countryData);

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
