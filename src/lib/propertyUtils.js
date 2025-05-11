import { parseDocument } from "htmlparser2";

export const stripHtml = (html) => {
  const doc = parseDocument(html);
  return doc?.children?.[0]?.data || "";
};

export const generateMetadataUtils = async ({
  locale,
  slug,
  fetchPropertyFromDB,
  translations,
}) => {
  const slugArray = slug || [];
  const id =
    locale === "ar" ? slugArray?.[0] : slugArray?.[slugArray.length - 1];
  const property = await fetchPropertyFromDB(id);

  if (!property) return null;

  const title = locale === "en" ? property?.title : property?.titleArabic;
  const translatedStatus =
    locale === "en"
      ? property?.status
      : property?.status === "sale"
        ? translations.cards.sale
        : translations.cards.rent;

  const translatedType =
    locale === "en"
      ? property?.type
      : translations.propertyTypes[property?.type];

  const translatedCity =
    locale === "en"
      ? property?.location?.city
      : translations.locations[property?.location?.city];

  const translatedCountry =
    locale === "en"
      ? property?.location?.country
      : translations.locations[property?.location?.country];

  return {
    title: `${title} | Beyt`,
    description:
      locale === "en"
        ? stripHtml(property?.description)
        : stripHtml(property?.descriptionArabic),
    keywords: [
      translatedStatus,
      translatedType,
      translatedCity,
      translatedCountry,
    ],
    openGraph: {
      title: title,
      description: stripHtml(property.description),
      images: [
        {
          url: property.images?.[0],
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:
        locale === "en"
          ? stripHtml(property?.description)
          : stripHtml(property?.descriptionArabic),
      images: [property.images?.[0]],
    },
  };
};

export const getFiltersFromURL = (searchParams) => {
  const params = Object.fromEntries(searchParams.entries());

  return {
    location: params?.loc ? params.loc : "",
    type: params?.type ? params.type.split(",") : [],
    status: params.status || "",
    beds: params.bed ? Number(params.bed) : "",
    baths: params.bath ? Number(params.bath) : "",
    price_from: params.price_from ? Number(params.price_from) : "",
    price_to: params.price_to ? Number(params.price_to) : "",
    sortBy: params?.sortBy || "",
  };
};

export const getFilters = (formValues) => {
  const filtersToReturn = Object.fromEntries(
    Object.entries({
      location: formValues?.location ? [formValues.location] : [],
      type: formValues?.type ? formValues.type : [],
      status: formValues?.status,
      bedrooms: formValues?.beds,
      bathrooms: formValues?.baths,
      sortBy: formValues?.sortBy,
      minPrice: formValues?.price_from,
      maxPrice: formValues?.price_to,
    }).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.some((v) => v != null && v !== "" && v !== 0);
      }
      return value != null && value !== "" && value !== 0;
    })
  );

  Object.entries(filtersToReturn).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      filtersToReturn[key] = JSON.stringify(value);
    }
  });
  return filtersToReturn;
};
