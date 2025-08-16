import {
  AgentIcon,
  CallIcon,
  HeartIcon,
  ReportIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/imports/icons";
import {
  DefaultImageApartment,
  DefaultImageBuilding,
  DefaultImageChalet,
  DefaultImageCommercial,
  DefaultImageDuplex,
  DefaultImageFarm,
  DefaultImageFloor,
  DefaultImageLand,
  DefaultImageOffice,
  DefaultImageStable,
  DefaultImageVilla,
} from "@/imports/images";

export const USER_ACTIONS = [
  { icon: <HeartIcon size={21} color="#16a34a" />, label: "Save" },
  { icon: <ShareIcon size={21} color="#16a34a" />, label: "Share" },
  { icon: <ReportIcon size={21} color="#16a34a" />, label: "Report" },
];

export const CREATOR_ACTIONS = [
  { icon: <CallIcon size={21} color="#fff" />, label: "Call", value: "call" },
  {
    icon: <WhatsappIcon size={21} color="#fff" />,
    label: "Whatsapp",
    value: "whatsapp",
  },
  {
    icon: <AgentIcon size={21} color="#fff" />,
    label: "Agent Properties",
    value: "agentProperties",
  },
];

export const LIBRARIES = ["places"];

export const SORT_OPTIONS = [
  "price_asc",
  "price_desc",
  "listing_date",
  "beds_asc",
  "beds_desc",
  "baths_asc",
  "baths_desc",
];

export const PRICE_OPTIONS_SALE = [
  { label: "100,000", value: 100000 },
  { label: "200,000", value: 200000 },
  { label: "300,000", value: 300000 },
  { label: "400,000", value: 400000 },
  { label: "500,000", value: 500000 },
  { label: "600,000", value: 600000 },
  { label: "700,000", value: 700000 },
  { label: "800,000", value: 800000 },
  { label: "900,000", value: 900000 },
  { label: "1,000,000", value: 1000000 },
];

export const PRICE_OPTIONS_RENT = [
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "300", value: 300 },
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "600", value: 600 },
  { label: "700", value: 700 },
  { label: "800", value: 800 },
  { label: "900", value: 900 },
  { label: "1000", value: 1000 },
];

export const USER_ROLES = ["user", "admin"];

export const FALLBACK_IMAGE_URL =
  "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png";

export const DEFAULT_IMAGES_FOR_TYPES = {
  Villa: DefaultImageVilla,
  Apartment: DefaultImageApartment,
  Land: DefaultImageLand,
  Office: DefaultImageOffice,
  Chalet: DefaultImageChalet,
  Building: DefaultImageBuilding,
  Farm: DefaultImageFarm,
  Duplex: DefaultImageDuplex,
  Floor: DefaultImageFloor,
  Commercial: DefaultImageCommercial,
  Stable: DefaultImageStable,
};

// Keep COUNTRIES array for configuration reference
export const COUNTRIES = [
  {
    name: "kuwait",
    english: "Kuwait",
    arabic: "الكويت",
    countryCode: "+965",
    googleMapsCode: "KW",
    baseurl: "https://kw-beyt-personal.vercel.app",
    currencySymbolEnglish: "KWD",
    currencySymbolArabic: "د.ك",
  },
  {
    name: "saudi",
    english: "Saudi Arabia",
    arabic: "المملكة العربية السعودية",
    countryCode: "+966",
    googleMapsCode: "SA",
    baseurl: "https://sa-beyt-personal.vercel.app",
    currencySymbolEnglish: "SAR",
    currencySymbolArabic: "ر.س",
  },
  {
    name: "uae",
    english: "UAE",
    arabic: "الإمارات العربية المتحدة",
    countryCode: "+971",
    googleMapsCode: "AE",
    baseurl: "https://ae-beyt-personal.vercel.app",
    currencySymbolEnglish: "AED",
    currencySymbolArabic: "د.إ",
  },
  {
    name: "egypt",
    english: "Egypt",
    arabic: "مصر",
    countryCode: "+20",
    googleMapsCode: "EG",
    baseurl: "https://eg-beyt-personal.vercel.app",
    currencySymbolEnglish: "EGP",
    currencySymbolArabic: "ج.م",
  },
  {
    name: "iraq",
    english: "Iraq",
    arabic: "العراق",
    countryCode: "+964",
    googleMapsCode: "IQ",
    baseurl: "https://iq-beyt-personal.vercel.app",
    currencySymbolEnglish: "IQD",
    currencySymbolArabic: "د.ع",
  },
  {
    name: "syria",
    english: "Syria",
    arabic: "سوريا",
    countryCode: "+963",
    googleMapsCode: "SY",
    baseurl: "https://sy-beyt-personal.vercel.app",
    currencySymbolEnglish: "SYP",
    currencySymbolArabic: "ل.س",
  },
];

// Dynamic country configuration from environment variables
function getCountryFromEnv() {
  const countryName =
    process.env.NEXT_PUBLIC_COUNTRY || process.env.COUNTRY || "kuwait";
  const foundCountry = COUNTRIES.find(
    (country) => country.name === countryName.toLowerCase()
  );

  if (!foundCountry) {
    console.warn(
      `Country "${countryName}" not found in COUNTRIES array. Falling back to Kuwait.`
    );
    return COUNTRIES.find((country) => country.name === "kuwait");
  }

  return foundCountry;
}

// Export the country configuration based on environment variable
export const COUNTRY = getCountryFromEnv();

export const DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS = {
  location: "",
  type: [],
  status: "",
  beds: "",
  baths: "",
  price_from: "",
  price_to: "",
  sortBy: "",
};

export const PROPERTY_TYPE_SCHEMA_MAPPING = {
  Villa: {
    "@type": "SingleFamilyResidence",
    additionalType: "Villa",
  },
  Apartment: {
    "@type": "Apartment",
  },
  Land: {
    "@type": "Landform",
    additionalType: "Residential Lot",
  },
  Office: {
    "@type": "Office",
  },
  Chalet: {
    "@type": "SingleFamilyResidence",
    additionalType: "Chalet",
  },
  Building: {
    "@type": "Building",
  },
  Farm: {
    "@type": "SingleFamilyResidence",
    additionalType: "Farmhouse",
  },
  Commercial: {
    "@type": "Landform",
    additionalType: "Commercial Lot",
  },
  Floor: {
    "@type": "Accommodation",
    additionalProperty: { name: "Floor", value: true },
  },
  Duplex: {
    "@type": "SingleFamilyResidence",
    additionalType: "Duplex",
  },
  Stable: {
    "@type": "Building",
    additionalType: "Stable",
  },
};
