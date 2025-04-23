import Property from "@/models/Property";
import User from "@/models/User";
import dbConnect from "./mongodb";

export const getAddressDetails = async (lat, lng) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "OK" || !data.results.length) {
      throw new Error("Invalid response from Google Maps API");
    }

    // Extract relevant address components
    const addressComponents = data.results[0].address_components;
    const formattedAddress =
      data.results[0].formatted_address || "Unknown Address";

    // Extract city (fallback to sublocality if locality is missing)
    let city = "Unknown City";
    const cityComponent =
      addressComponents.find((comp) => comp.types.includes("locality")) ||
      addressComponents.find((comp) =>
        comp.types.includes("sublocality_level_1")
      );
    if (cityComponent) city = cityComponent.long_name;

    // Extract postal code (pincode)
    let pincode = "Unknown Pincode";
    const postalComponent = addressComponents.find((comp) =>
      comp.types.includes("postal_code")
    );
    if (postalComponent) pincode = postalComponent.long_name;

    // Extract country
    let country = "Unknown Country";
    const countryComponent = addressComponents.find((comp) =>
      comp.types.includes("country")
    );
    if (countryComponent) country = countryComponent.long_name;

    return { address: formattedAddress, city, pincode, country };
  } catch (error) {
    console.error("Error fetching address details:", error.message);
    return {
      address: "Unknown Address",
      city: "Unknown City",
      pincode: "Unknown Pincode",
      country: "Unknown Country",
    };
  }
};

export const getJSONLDForPropertyDetails = (pageUrl, propertyData, locale) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    datePosted: `${new Date(propertyData?.createdAt)?.toLocaleDateString()}`,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${propertyData?.images?.[0]}`,
    },
    itemOffered: {
      "@type": `${propertyData?.type}`,
      name: `${
        locale === "en" ? propertyData?.title : propertyData?.titleArabic
      }`,
      description: "{{property.summary}}",
      image: propertyData?.images?.join(","),
      location: {
        "@type": "location",
        locationRegion: propertyData?.location?.city,
        locationCountry: propertyData?.location?.country,
      },
      numberOfRooms: propertyData.bedrooms,
      numberOfBathrooms: propertyData.bathrooms,
      propertySize: {
        "@type": "QuantitativeValue",
        value: propertyData.size,
      },
      amenityFeature: propertyData?.amenities?.map((el) => {
        return {
          "@type": "LocationFeatureSpecification",
          name: "el",
          value: true,
        };
      }),
    },
  };

  return jsonLd;
};

export const fetchPropertyFromDB = async (id) => {
  await dbConnect();

  let propertyData = await Property.findById(id)
    .populate({
      path: "userId",
      select: "email phoneNumber name image",
    })
    .lean();

  const similarProperties = await Property.find({
    _id: { $ne: id },
    "location.city": propertyData.location.city,
    archived: { $ne: true },
  }).limit(5);

  propertyData.similarProperties = similarProperties?.map((el) => {
    const { userId, _id, ...rest } = el.toObject?.() || el; // handle Mongoose docs or plain objects
    return {
      ...rest,
      _id: _id?.toString(),
    };
  });

  const finalPropertyData = {
    ...propertyData,
    _id: propertyData?._id?.toString(),
    userId: {
      ...propertyData?.userId,
      _id: propertyData?.userId?._id?.toString(),
    },
  };

  return finalPropertyData;
};
