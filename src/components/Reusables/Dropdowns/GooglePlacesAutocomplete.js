"use client";

import { useState, useRef } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Script from "next/script";
import { COUNTRY } from "@/constants/constants";

const GooglePlacesAutocomplete = ({ name }) => {
  const { setValue } = useFormContext();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const inputRef = useRef(null);

  const initializeAutocomplete = () => {
    if (typeof window !== "undefined" && window.google && inputRef.current) {
      const service = new window.google.maps.places.AutocompleteService();
      const placesService = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      inputRef.current.addEventListener("input", () => {
        const searchText = inputRef.current.value;
        if (!searchText) {
          setSuggestions([]);
          return;
        }

        // Fetch place predictions - use single COUNTRY configuration
        service.getPlacePredictions(
          {
            input: searchText,
            types: ["(regions)"], // Establishments only
            componentRestrictions: {
              country: COUNTRY.googleMapsCode,
            }, // Use configured country
          },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      });
    }
  };

  const handleSelect = (suggestion) => {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      { placeId: suggestion.place_id },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const cityData = {
            address: place?.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            city: place?.vicinity,
            country: COUNTRY.english,
            selectedCountry: COUNTRY, // Include the configured country object
          };

          setSelectedCity(cityData);
          setValue(name, cityData); // Set react-hook-form value
          inputRef.current.value = place.name;
          setSuggestions([]); // Clear suggestions
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Load Google Maps API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={initializeAutocomplete}
      />

      {/* Input Field */}
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a place..."
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-600 outline-none"
          autoComplete="off" // Prevent browser autocomplete
        />

        {/* Custom Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md mt-1 max-h-48 overflow-auto z-50">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GooglePlacesAutocomplete;
