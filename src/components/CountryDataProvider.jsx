"use client";

import { useCountry } from "@/context/CountryContext";
import { useEffect } from "react";

export function CountryDataProvider({ children, onCountryChange }) {
  const { selectedCountry } = useCountry();

  useEffect(() => {
    if (selectedCountry && onCountryChange) {
      onCountryChange(selectedCountry);
    }
  }, [selectedCountry, onCountryChange]);

  return children;
}
