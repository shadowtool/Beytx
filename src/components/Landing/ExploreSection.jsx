"use client";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyTypes } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Loader from "../Reusables/Misc/Loader";

export default function ExploreSection() {
  const { data: PROPERTY_TYPES, isPending: propertyTypesLoading } = useQuery({
    queryKey: [ROUTES.GET_PROPERTY_TYPES],
    queryFn: fetchPropertyTypes,
  });

  const { locale } = useParams();

  const [activeTab, setActiveTab] = useState("Sale");

  const [selectedLocation, setSelectedLocation] = useState();

  const {
    data: locationsData,
    isPending: locationsLoading,
    isFetched: locationsFetched,
  } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };
  const translate = useTranslations();

  const propertyLinks = useMemo(() => {
    // Don't generate links if selectedLocation is not available
    if (!selectedLocation?.city) {
      return [];
    }

    return PROPERTY_TYPES?.map((el) => {
      return {
        name: `${translate(`propertyTypes.${el?.toLowerCase()}`)} ${translate("exploreSection.in")} ${translate(`locations.${selectedLocation?.city}`)}`,
        link: `/${locale}/explore/${translate(`exploreSection.${activeTab?.toLowerCase()}`).toLowerCase() || ""}/${translate(`propertyTypes.${el?.toLowerCase()}`)}/${translate(`locations.${selectedLocation?.city}`)}/${translate("exploreSection.properties")}-${translate("exploreSection.in")}-${translate(`locations.${selectedLocation?.city}`)}`,
      };
    });
  }, [selectedLocation, activeTab, PROPERTY_TYPES, locale, translate]);

  useEffect(() => {
    if (locationsFetched) {
      setSelectedLocation(locationsData?.[0]);
    }
  }, [locationsData, locationsFetched]);

  const isLoading = locationsLoading || propertyTypesLoading;

  if (isLoading) {
    return (
      <div className="p-6 md:p-16 pt-0">
        <h2 className="text-4xl font-light mb-16">Explore more properties</h2>
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-16 pt-0">
      <h2 className="text-4xl font-light mb-16">Explore more properties</h2>
      <div className="flex gap-6 border-b mb-4 text-lg font-medium">
        {["Sale", "Rent"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative text-lg text-emerald-600 pb-2 ${
              activeTab === tab ? "font-bold" : "font-medium"
            }`}
          >
            {translate(`exploreSection.${tab?.toLowerCase()}`)}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3 my-6 overflow-x-auto hide-scrollbar">
        {locationsData?.slice(0, 6)?.map((loc) => {
          // Only render if the city exists and has a translation
          if (!loc?.city) return null;

          return (
            <button
              key={loc?.city}
              className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedLocation?.city === loc?.city
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "text-emerald-600 border-gray-300 hover:bg-emerald-600 hover:text-white"
              }`}
              onClick={() => handleLocationClick(loc)}
            >
              {translate(`locations.${loc?.city}`)}
            </button>
          );
        })}
      </div>
      {/* Property Type Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-4 gap-4">
        {propertyLinks?.map((type) => (
          <a
            key={type.name}
            href={type.link}
            className="text-base font-medium text-emerald-600 underline underline-offset-[6px] tracking-wide"
          >
            {type.name}
          </a>
        ))}
      </div>
    </div>
  );
}
