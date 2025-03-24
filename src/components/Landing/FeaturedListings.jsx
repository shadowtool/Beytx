"use client";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../Cards/PropertyCard";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import Loader from "../Reusables/Loader";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { fetchFeaturedListings } from "@/lib/queryFunctions";
import { ListIcon } from "@/imports/icons";
import PropertyListCard from "../Cards/PropertyListCard";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

const FeaturedListings = () => {
  const [activeTab, setActiveTab] = useState("Villa");

  const [selectedView, setSelectedView] = useState("grid");

  const { isLoading, data: properties } = useQuery({
    queryKey: [ROUTES.GET_FEATURED_PROPERTIES, activeTab],
    queryFn: () => fetchFeaturedListings(),
    enabled: !!activeTab,
  });

  const { locale } = useParams();

  const router = useRouter();

  const translate = useTranslations("PropertyTypes");

  return (
    <section className="p-6 md:px-12 md:py-16">
      <h3 className="my-8 text-2xl md:text-4xl font-semibold">
        Discover Properties Around you
      </h3>
      <div className="w-full flex flex-col items-center">
        <div className="w-full overflow-x-auto hide-scrollbar whitespace-nowrap scrollbar-hide">
          <div className="flex gap-6 justify-start border-b border-gray-300 relative">
            {PROPERTY_TYPES.map((tab) => (
              <button
                key={tab}
                className={`pb-2 transition-all min-w-[100px] max-w-[100px] font-medium text-sm ${
                  activeTab === tab
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-emerald-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {translate(`${tab?.toLowerCase()}`)}
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
                if (selectedView === "list") {
                  setSelectedView("grid");
                } else {
                  setSelectedView("list");
                }
              }}
            >
              <ListIcon size={21} color="#000" />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader customMessage={"Fetching properties"} />
        </div>
      ) : (
        <div
          className={`flex overflow-x-auto hide-scrollbar px-0 md:grid gap-4 mt-6 ${
            selectedView === "list" ? "grid-cols-1" : "grid-cols-4"
          }`}
        >
          {properties?.map((property, index) => {
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
          className="py-4 rounded-md px-8 w-fit h-fit border-2  border-solid border-green-600 bg-green-100 backdrop-blur-sm text-green-600 font-semibold"
          onClick={() => router.push(`/${locale}/properties`)}
        >
          See all new projects
        </button>
      </div>
    </section>
  );
};

export default FeaturedListings;
