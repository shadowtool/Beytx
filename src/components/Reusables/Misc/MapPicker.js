"use client";

import { LIBRARIES } from "@/constants/constants";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";

const MapPicker = ({ onLocationSelect, location, isReadable = false }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [locationDetails, setLocationDetails] = useState({
    city: "",
    state: "",
    country: "",
    pincode: "",
    address: "",
  });

  const autocompleteRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (location) {
      setSelectedLocation({
        lat: Number(location?.lat),
        lng: Number(location?.lng),
      });
    }
  }, [location]);

  // Extract city, state, country, and pincode from place details
  const extractLocationDetails = (place) => {
    const addressComponents = place.address_components || [];
    const getComponent = (type) =>
      addressComponents.find((comp) => comp.types.includes(type))?.long_name ||
      "";

    return {
      city: getComponent("locality"),
      state: getComponent("administrative_area_level_1"),
      country: getComponent("country"),
      pincode: getComponent("postal_code"),
      address: place.formatted_address || "",
    };
  };

  // Handle map click (Only if isReadable is false)
  const handleMapClick = async (event) => {
    if (isReadable) return;

    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setSelectedLocation(newLocation);

    // Reverse Geocode using Google Maps API in browser
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const locationData = extractLocationDetails(results[0]);
        setLocationDetails(locationData);
        onLocationSelect({ ...newLocation, ...locationData });
      }
    });
  };

  // Handle place selection (Only if isReadable is false)
  const handlePlaceSelect = () => {
    if (isReadable || !autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(newLocation);

      const locationData = extractLocationDetails(place);
      setLocationDetails(locationData);
      onLocationSelect({ ...newLocation, ...locationData });
    }
  };

  // Handle script loading errors
  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading...</p>; // Prevent rendering until API is ready

  return (
    <div>
      {/* Address Search Input - Hidden if isReadable */}
      {!isReadable && (
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search for an address..."
            className="border p-2 w-full mb-2"
          />
        </Autocomplete>
      )}

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation}
        zoom={12}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>

      {/* Selected Location Details */}
      {!isReadable && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="  ">📍 Selected Address:</h3>
          <p>
            <strong>Address:</strong> {locationDetails.address || "N/A"}
          </p>
          <p>
            <strong>City:</strong> {locationDetails.city || "N/A"}
          </p>
          <p>
            <strong>State:</strong> {locationDetails.state || "N/A"}
          </p>
          <p>
            <strong>Country:</strong> {locationDetails.country || "N/A"}
          </p>
          <p>
            <strong>Pincode:</strong> {locationDetails.pincode || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
