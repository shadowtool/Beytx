"use client";
import { useRef, useState } from "react";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "../Cards/PropertyCard";
import { Controller, useFormContext } from "react-hook-form";
import Loader from "../Reusables/Loader";
import { useTranslations } from "next-intl";

const PropertyListings = ({
  properties,
  locationsData,
  refetchListings,
  isFetchingData,
  isFetchingNextPage,
  loadMoreRef,
  hasNextPage,
  fetchNextPage,
}) => {
  const methods = useFormContext();
  const translate = useTranslations("propertyListings");

  return (
    <div className="hidden md:block">
      <section className={`min-h-screen`}>
        <PropertyFilter
          locationsData={locationsData}
          onReset={() => {
            methods.reset();
            setTimeout(() => {
              refetchListings();
            }, 100);
          }}
        />

        <div className="container mx-auto px-4 md:px-12 py-10 w-full grow">
          {isFetchingData ? (
            <Loader customMessage={translate("fetchingData")} />
          ) : (
            <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
              {properties.length > 0
                ? properties.map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))
                : !isFetchingNextPage && (
                    <p className="text-center text-gray-600">
                      {translate("noPropertiesFound")}
                    </p>
                  )}
            </div>
          )}

          {hasNextPage && (
            <div className="flex justify-center my-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 mt-8 disabled:opacity-50 transition-all duration-300"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600">
                  {translate("loadingMoreProperties")}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyListings;
