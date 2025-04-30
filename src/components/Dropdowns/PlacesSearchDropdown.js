"use client";

import { LOCATIONS_DATA } from "@/lib/locationsData";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import enTranslations from "../../messages/en.json";
import arTranslations from "../../messages/ar.json";

const PlacesSearchDropdown = ({ name, classes = {}, customOnChange }) => {
  const translate = useTranslations("locations");
  const { locale } = useParams();
  const { setValue, control } = useFormContext();
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const backendValue = useWatch({ name, control });

  useEffect(() => {
    if (inputRef.current) {
      if (backendValue) {
        inputRef.current.value = translate(backendValue.city);
      } else {
        inputRef.current.value = ""; // Clear the input on reset
      }
    }
  }, [backendValue, translate]);

  const handleInputChange = (e) => {
    const searchText = e.target.value.toLowerCase();

    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const filtered = LOCATIONS_DATA.filter((loc) => {
      const currentTranslation = translate(loc.city)?.toLowerCase() || "";
      const englishTranslation =
        enTranslations.locations[loc.city]?.toLowerCase() || "";
      const arabicTranslation =
        arTranslations.locations[loc.city]?.toLowerCase() || "";

      return (
        currentTranslation.includes(searchText) ||
        englishTranslation.includes(searchText) ||
        arabicTranslation.includes(searchText)
      );
    });

    setSuggestions(filtered);
  };

  const handleSelect = (loc) => {
    customOnChange && customOnChange(loc);
    setValue(name, loc);
    inputRef.current.value = translate(loc.city);
    setSuggestions([]);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${
        classes.wrapper || ""
      }`}
    >
      <div className={`relative w-full ${classes.inputWrapper || ""}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder={
            locale === "ar" ? "ابحث عن المنطقة. " : "Search by location ..."
          }
          className={`w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-600 outline-none ${
            classes.input || ""
          }`}
          onChange={handleInputChange}
          autoComplete="off"
          dir={locale === "ar" ? "rtl" : "ltr"}
        />

        {suggestions.length > 0 && (
          <ul
            className={`absolute left-0 mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-48 overflow-auto z-50 ${
              classes.dropdown || ""
            }`}
          >
            {suggestions.map((loc) => (
              <li
                key={loc.city}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  classes.dropdownItem || ""
                }`}
                onClick={() => handleSelect(loc)}
              >
                {translate(loc.city)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlacesSearchDropdown;
