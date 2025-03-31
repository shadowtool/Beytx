"use client";
import { useFormContext } from "react-hook-form";
import { CloseIcon, SearchIcon } from "@/imports/icons";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useState } from "react";
import SearchableDropdown from "../Dropdowns/SearchableDropdown";
import GeneralDropdown from "../Dropdowns/GeneralDropdown";
import { PRICE_OPTIONS, SORT_OPTIONS } from "@/constants/constants";
import BedsAndBathsDropdown from "../Dropdowns/BedsAndBathsDropdown";
import PriceRangeDropdown from "../Dropdowns/PriceRangeDropdown";

const PropertyFilter = ({ onReset, locationsData }) => {
  const { control, watch } = useFormContext();

  const hasActiveFilters = Object.values(watch()).some((value) => {
    if (value === "" || value === null || value === undefined) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (value === 0) return false;
    return true;
  });

  const priceFrom = watch("price_from");

  const priceToOptions = PRICE_OPTIONS.filter((option) => {
    if (!priceFrom) return true;
    return option.value > priceFrom;
  });

  return (
    <div className="sticky top-0 z-50 w-screen bg-white border-b border-gray-200 py-6 px-12 shadow-md">
      <div className="w-full h-fit items-center flex flex-col xl:flex-row gap-6">
        <div className="w-full flex gap-6">
          <SearchableDropdown
            name="location"
            control={control}
            options={locationsData?.map((el) => {
              return { label: el?.city, value: el?.city };
            })}
            classes={{
              dropdown: "w-full grow !h-full",
              button: "!text-gray-700 !  !h-full",
            }}
            placeholder="Filter by location ..."
          />
          <GeneralDropdown
            name={"sortBy"}
            placeholder={"Sort by : "}
            classes={{
              dropdown: "!min-w-48 !max-w-48 !h-full",
              button: "!text-gray-700 !  !h-full",
            }}
            options={SORT_OPTIONS}
          />
          <div className="flex max-w-fit gap-4 xl:hidden">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
              >
                <CloseIcon size={21} color="#fff" />
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-4 w-full xl:max-w-fit grow items-center">
          <GeneralDropdown
            name={"status"}
            placeholder={"Status"}
            options={[
              { label: "Sale", value: "sale" },
              { label: "Rent", value: "rent" },
            ]}
            classes={{ dropdown: "w-full grow xl:!min-w-36 xl:!max-w-36" }}
          />
          <GeneralDropdown
            name={"type"}
            placeholder={"Type"}
            options={PROPERTY_TYPES.map((el) => ({ label: el, value: el }))}
            classes={{ dropdown: "w-full grow xl:!min-w-36 xl:!max-w-36" }}
            isMulti
          />
          <BedsAndBathsDropdown
            classes={{ dropdown: "w-full grow xl:!min-w-48" }}
          />
          <PriceRangeDropdown
            name="price"
            fromOptions={PRICE_OPTIONS}
            toOptions={priceToOptions}
            placeholder="Select Price Range"
            classes={{ dropdown: "xl:!min-w-44" }}
            customOnChange={(value) => console.log("Changed:", value)}
          />
        </div>
        <div className="hidden xl:flex xl:max-w-fit w-full grow gap-4">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
            >
              <CloseIcon size={21} color="#fff" />
              Reset
            </button>
          )}
        </div>
      </div>
      {/* Filter Controls */}
    </div>
  );
};

export default PropertyFilter;
