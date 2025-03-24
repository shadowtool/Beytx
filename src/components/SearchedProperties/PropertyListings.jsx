"use client";
import { useRef, useState } from "react";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "../Cards/PropertyCard";
import { Controller, useFormContext } from "react-hook-form";
import { FilterIcon } from "@/imports/icons";
import GeneralDropdown from "../Dropdowns/GeneralDropdown";
import SearchableDropdown from "../Dropdowns/SearchableDropdown";
import Loader from "../Reusables/Loader";

const PropertyListings = ({
  properties,
  locationsData,
  refetchListings,
  isFetchingData,
  isFetchingNextPage,
  loadMoreRef,
}) => {
  const [openFilters, setOpenFilters] = useState(false);

  const methods = useFormContext();

  return (
    <div className="hidden md:block">
      <div className="px-4 md:px-12 mt-12 flex items-start justify-between gap-6">
        <div
          className="h-14 w-14 flex items-center justify-center border border-solid border-gray-200 cursor-pointer"
          onClick={() => {
            setOpenFilters(!openFilters);
          }}
        >
          <FilterIcon size={28} color="#4b5563" />
        </div>
        <div className="w-fit h-14 flex gap-6">
          <Controller
            name="locationDropdown"
            control={methods.control}
            render={({ field }) => (
              <SearchableDropdown
                field={field}
                placeholder="Select a city"
                options={locationsData?.map((el) => {
                  return { label: el?.city, value: el?.city };
                })}
                classes={{
                  dropdown: "!min-w-48 !h-full",
                  button: "!text-gray-700 !text-sm !h-full",
                }}
                customOnChange={(value) => {
                  methods.setValue("location", value);
                  setTimeout(() => {
                    refetchListings();
                  }, 100);
                }}
              />
            )}
          />
          <Controller
            name={`sortBy`}
            control={methods.control}
            render={({ field }) => (
              <GeneralDropdown
                field={field}
                placeholder={"Sort by : "}
                classes={{
                  dropdown: "!min-w-48 !h-full",
                  button: "!text-gray-700 !text-sm !h-full",
                }}
                options={[
                  {
                    label: "Price - Low to High",
                    value: "price_asc",
                  },
                  {
                    label: "Price - High to Low",
                    value: "price_desc",
                  },
                  {
                    label: "Latest",
                    value: "listing_date",
                  },
                  {
                    label: "Beds - Low to High",
                    value: "beds_asc",
                  },
                  {
                    label: "Beds - High to Low",
                    value: "beds_desc",
                  },
                  {
                    label: "Baths - Low to High",
                    value: "baths_asc",
                  },
                  {
                    label: "Baths - High to Low",
                    value: "baths_desc",
                  },
                ]}
                customOnChange={(value) => {
                  methods.setValue("sortBy", value);
                  setTimeout(() => {
                    refetchListings();
                  }, 100);
                }}
              />
            )}
          />{" "}
        </div>
      </div>
      <section
        className={`px-4 md:px-12 py-10 flex items-start ${
          openFilters ? "gap-6" : "gap-0"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <div
          id="filterContainer"
          className={`w-full mb-6 transition-all duration-200 ${
            openFilters
              ? "max-w-72 mb-6 visible opacity-100"
              : "max-w-0 m-0 invisible opacity-0"
          }`}
        >
          <PropertyFilter
            closeFilters={() => {
              setOpenFilters(false);
            }}
            onApply={() => {
              setTimeout(() => {
                refetchListings();
              }, 100);
            }}
            onReset={() => {
              methods.reset();
              setTimeout(() => {
                refetchListings();
              }, 100);
            }}
          />
        </div>

        <div className="w-full grow">
          {isFetchingData ? (
            <Loader customMessage={"Fetching data ..."} />
          ) : (
            <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
              {properties.length > 0
                ? properties.map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))
                : !isFetchingNextPage && (
                    <p className="text-center text-gray-600 text-xl">
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
                <div className="text-green-600 text-xl">
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
