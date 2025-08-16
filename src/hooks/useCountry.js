import { useCountry } from "@/context/CountryContext";

export function useSelectedCountry() {
  const { selectedCountry } = useCountry();
  return selectedCountry;
}

export function useCountryName(locale = "en") {
  const { selectedCountry } = useCountry();

  if (!selectedCountry) return "";

  return locale === "ar" ? selectedCountry.arabic : selectedCountry.english;
}
