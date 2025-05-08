"use client";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { ROUTES } from "@/constants/routes";
import { fetchCities } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function ExploreSection() {
  const { locale } = useParams();

  const [activeTab, setActiveTab] = useState("Sale");

  const [selectedLocation, setSelectedLocation] = useState();

  const { data: locationsData, isFetched: isLocationsFetched } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const propertyLinks = useMemo(() => {
    return PROPERTY_TYPES?.map((el) => {
      return {
        name: `${el} in ${selectedLocation?.city}`,
        link: `/${locale}/properties?type=${el}`,
      };
    });
  }, [selectedLocation]);

  useEffect(() => {
    if (isLocationsFetched) {
      setSelectedLocation(locationsData[0]);
    }
  }, [locationsData, isLocationsFetched]);

  return (
    <div className="p-6 md:p-16 pt-0">
      <h2 className="text-4xl font-light mb-16">Explore more properties</h2>
      <div className="flex gap-6 border-b mb-4 text-lg font-medium">
        {["Sale", "Rent"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative text-emerald-600 pb-2 transition-all duration-300 ${
              activeTab === tab ? "font-medium" : "font-normal"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3 my-6 overflow-x-auto hide-scrollbar">
        {locationsData?.slice(0, 6)?.map((loc) => (
          <button
            key={loc?.city}
            className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              selectedLocation?.city === loc?.city
                ? "bg-emerald-600 text-white border-emerald-600"
                : "text-emerald-600 border-gray-300 hover:bg-emerald-600 hover:text-white"
            }`}
            onClick={() => handleLocationClick(loc)}
          >
            {loc?.city}
          </button>
        ))}
      </div>
      {/* Property Type Links */}
      <div className="grid gap-4">
        {propertyLinks.map((type) => (
          <a
            key={type.name}
            href={type.link}
            className="text-base font-normal text-emerald-600 hover:underline"
          >
            {type.name}
          </a>
        ))}
      </div>
    </div>
  );
}
