"use client";
import { useFormContext } from "react-hook-form";
import { CloseIcon } from "@/imports/icons";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import {
  PRICE_OPTIONS,
  PRICE_OPTIONS_RENT,
  PRICE_OPTIONS_SALE,
  SORT_OPTIONS,
} from "@/constants/constants";
import { useTranslations } from "next-intl";
import SearchableDropdown from "../Dropdowns/SearchableDropdown";
import GeneralDropdown from "../Dropdowns/GeneralDropdown";
import BedsAndBathsDropdown from "../Dropdowns/BedsAndBathsDropdown";
import PriceRangeDropdown from "../Dropdowns/PriceRangeDropdown";
import { useMemo } from "react";
import PlacesSearchDropdown from "../Dropdowns/PlacesSearchDropdown";

const PropertyFilter = ({ onReset, locationsData }) => {
  const { setValue, watch } = useFormContext();

  const translateFilters = useTranslations("filterKeys");
  const translatePropertyTypes = useTranslations("propertyTypes");
  const translateSortOptions = useTranslations("sortOptions");

  const hasActiveFilters = Object.values(watch()).some((value) => {
    if (value === "" || value === null || value === undefined) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (value === 0) return false;
    return true;
  });

  const statusFilterValue = watch("status");

  const priceFrom = watch("price_from");

  const priceToOptions = useMemo(() => {
    const priceOptionsToUse =
      statusFilterValue === "sale" ? PRICE_OPTIONS_SALE : PRICE_OPTIONS_RENT;

    const priceToOptions = priceOptionsToUse?.filter((option) => {
      if (!priceFrom) return true;
      return option.value > priceFrom;
    });

    return priceToOptions;
  }, [statusFilterValue, PRICE_OPTIONS_RENT, PRICE_OPTIONS_SALE]);

  return (
    <div className="sticky top-0 z-[8] w-screen bg-white border-b border-gray-200 py-6 px-12 shadow-md">
      <div className="w-full h-fit items-center flex flex-col xl:flex-row gap-6">
        <div className="w-full flex gap-6">
          <PlacesSearchDropdown
            name={"locationDropdown"}
            customOnChange={(e) => {
              setValue("location", e?.city);
            }}
          />
          <div className="flex max-w-fit gap-4 xl:hidden">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
              >
                <CloseIcon size={21} color="#fff" />
                {translateFilters("reset")}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-4 w-full xl:max-w-fit grow items-center">
          <GeneralDropdown
            name="status"
            placeholder={translateFilters("status")}
            options={[
              { label: translateFilters("sale"), value: "sale" },
              { label: translateFilters("rent"), value: "rent" },
            ]}
            classes={{ dropdown: "w-full grow xl:!min-w-36 xl:!max-w-36" }}
            showSelectedEffect={true}
          />
          <GeneralDropdown
            name="type"
            placeholder={translateFilters("type")}
            options={PROPERTY_TYPES.map((type) => ({
              label: translatePropertyTypes(type.toLowerCase()),
              value: type,
            }))}
            classes={{ dropdown: "w-full grow xl:!min-w-36 xl:!max-w-36" }}
            isMulti
            showSelectedEffect={true}
          />
          <BedsAndBathsDropdown
            classes={{ dropdown: "w-full grow xl:!min-w-48" }}
          />
          {statusFilterValue?.length > 0 && (
            <PriceRangeDropdown
              name="price"
              fromOptions={
                statusFilterValue === "sale"
                  ? PRICE_OPTIONS_SALE
                  : PRICE_OPTIONS_RENT
              }
              toOptions={priceToOptions}
              placeholder={translateFilters("priceRange")}
              classes={{ dropdown: "xl:!min-w-44" }}
              customOnChange={(value) => {}}
            />
          )}
          <GeneralDropdown
            name="sortBy"
            placeholder={translateFilters("sortBy")}
            classes={{
              dropdown: "!min-w-48 !max-w-48 !h-full",
              button: "!text-gray-700 !h-full",
            }}
            options={SORT_OPTIONS.map((option) => ({
              value: option,
              label: translateSortOptions(option),
            }))}
            showSelectedEffect={true}
          />
        </div>
        <div className="hidden xl:flex xl:max-w-fit w-full grow gap-4">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
            >
              <CloseIcon size={21} color="#fff" />
              {translateFilters("reset")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
