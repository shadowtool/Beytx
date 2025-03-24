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
