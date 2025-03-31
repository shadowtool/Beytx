"use client";
import { useRef, useState } from "react";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "../Cards/PropertyCard";
import { Controller, useFormContext } from "react-hook-form";
import Loader from "../Reusables/Loader";

const PropertyListings = ({
  properties,
  locationsData,
  refetchListings,
  isFetchingData,
  isFetchingNextPage,
  loadMoreRef,
}) => {
  const methods = useFormContext();

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

        <div className="px-4 md:px-12 py-10 w-full grow">
          {isFetchingData ? (
            <Loader customMessage={"Fetching data ..."} />
          ) : (
            <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
              {properties.length > 0
                ? properties.map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))
                : !isFetchingNextPage && (
                    <p className="text-center text-gray-600  ">
                      No properties found.
                    </p>
                  )}
            </div>
          )}

          {/* Load More Indicator */}
          <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600  ">
                  Loading more properties...
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
