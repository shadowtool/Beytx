"use client";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../Reusables/Cards/PropertyCard";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import Loader from "../Reusables/Misc/Loader";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import {
  fetchFeaturedListings,
  fetchPropertyListings,
} from "@/lib/queryFunctions";
import { ListIcon } from "@/imports/icons";
import PropertyListCard from "../Reusables/Cards/PropertyListCard";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

const FeaturedListings = () => {
  const [activeTab, setActiveTab] = useState("Villa");
  const [selectedView, setSelectedView] = useState("grid");

  const { isLoading, data: propertyData } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, activeTab],
    queryFn: () =>
      fetchPropertyListings(1, 9, {
        featured: "true",
        type: JSON.stringify([activeTab]),
      }),
  });

  const { locale } = useParams();
  const router = useRouter();
  const translatePropertyTypes = useTranslations("propertyTypes");
  const translateFeaturedListings = useTranslations("featuredListings");

  return (
    <section className="p-6 md:px-12 md:py-16">
      <h3 className="my-8">
        {translateFeaturedListings("discoverProperties")}
      </h3>
      <div className="w-full flex flex-col items-center">
        <div className="w-full overflow-x-auto hide-scrollbar whitespace-nowrap scrollbar-hide">
          <div className="flex gap-6 justify-start border-b border-gray-300 relative">
            {PROPERTY_TYPES?.slice(0, 5).map((tab) => (
              <button
                key={tab}
                className={`pb-2 transition-all min-w-[100px] max-w-[100px] ${
                  activeTab === tab
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-emerald-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {translatePropertyTypes(`${tab?.toLowerCase()}`)}
              </button>
            ))}
            <div
              className="absolute bottom-0 h-[2px] bg-green-600 transition-all duration-300"
              style={
                locale === "ar"
                  ? {
                      width: "100px",
                      right: `${PROPERTY_TYPES.indexOf(activeTab) * 124}px`,
                    }
                  : {
                      width: "100px",
                      left: `${PROPERTY_TYPES.indexOf(activeTab) * 124}px`,
                    }
              }
            />
            <div
              className={`h-fit w-fit cursor-pointer hidden md:block ${
                locale === "ar" ? "mr-auto" : "ml-auto"
              }`}
              onClick={() => {
                setSelectedView(selectedView === "list" ? "grid" : "list");
              }}
            >
              <ListIcon size={21} color="#000" />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader
            customMessage={translateFeaturedListings("fetchingProperties")}
          />
        </div>
      ) : (
        <div
          className={`flex overflow-x-auto hide-scrollbar p-2 md:grid gap-4 mt-6 ${
            selectedView === "list" ? "grid-cols-1" : "grid-cols-4"
          }`}
        >
          {propertyData?.properties?.map((property, index) => {
            return selectedView === "list" ? (
              <PropertyListCard property={property} key={index} />
            ) : (
              <PropertyCard property={property} key={index} />
            );
          })}
        </div>
      )}
      <div className="w-full flex mt-12 mb-8 items-center justify-center">
        <button
          className="py-4 rounded-md px-8 w-fit h-fit border-2 border-solid border-emerald-600 bg-emerald-500 backdrop-blur-sm text-white"
          onClick={() => router.push(`/${locale}/properties`)}
        >
          {translateFeaturedListings("allProperties")}
        </button>
      </div>
    </section>
  );
};

export default FeaturedListings;
