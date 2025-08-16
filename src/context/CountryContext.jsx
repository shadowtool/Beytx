"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COUNTRY } from "@/constants/constants";

const CountryContext = createContext();

/**
 * Gets the current country data (now using single COUNTRY constant)
 * @returns {Object} Country data object
 */
function getCountryFromDomain() {
  // Return the single configured country
  return COUNTRY;
}

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Set the configured country
    const configuredCountry = getCountryFromDomain();
    setSelectedCountry(configuredCountry);
  }, []);

  const getCountryByDomain = () => {
    // Return the single configured country
    return getCountryFromDomain();
  };

  const value = {
    selectedCountry,
    setSelectedCountry,
    countries: [COUNTRY], // Only the configured country
    getCountryByDomain,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
