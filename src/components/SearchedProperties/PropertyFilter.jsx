"use client";
import { useFormContext } from "react-hook-form";
import { CloseIcon } from "@/imports/icons";
import FilterDropdown from "../Dropdowns/FilterDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { PROPERTY_STATUS } from "@/constants/propertyStatus";

const PropertyFilter = ({ closeFilters, onApply, onReset }) => {
  const { control } = useFormContext();

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000)?.map(
    (el) => {
      const formattedNumber = el.toLocaleString("en-IN"); // Using en-IN locale for 1,00,000 format
      return { label: formattedNumber, value: el };
    }
  );

  return (
    <div className="flex flex-col w-full bg-white border shadow-md">
      <div className="w-full flex items-center justify-between border-b border-solid border-gray-200 p-4">
        <p>Filters</p>
        <CloseIcon
          size={21}
          color="#000"
          onClick={closeFilters}
          className="!cursor-pointer"
        />
      </div>
      <FilterDropdown
        type={"radioList"}
        title="Property Status"
        name="propertyStatus"
        control={control}
        options={PROPERTY_STATUS?.map((el) => {
          return { label: el, value: el };
        })}
      />

      <FilterDropdown
        type={"checkboxList"}
        title="Property Type"
        name="propertyType"
        options={PROPERTY_TYPES?.map((el) => {
          return { label: el, value: el };
        })}
      />
      <FilterDropdown
        type={"radioList"}
        title="Beds"
        name="beds"
        options={["Studio", "1", "2", "3", "4", "5", "6", "7+"]?.map((el) => {
          return { label: el, value: el };
        })}
      />
      <FilterDropdown
        type={"radioList"}
        title="Bathrooms"
        name="baths"
        options={["Studio", "1", "2", "3", "4", "5", "6", "7+"]?.map((el) => {
          return { label: el, value: el };
        })}
      />
      <FilterDropdown
        type={"rangeFilter"}
        title="Price"
        name="price"
        rangeInputOptionsOne={priceOptions}
        rangeInputOptionsTwo={priceOptions}
      />

      <div className="w-full flex items-center gap-6 p-4">
        <button
          onClick={() => {
            onApply();
          }}
          className="px-6 py-2 bg-emerald-500 w-full grow text-white rounded-md hover:bg-emerald-600 transition"
        >
          Search
        </button>
        <button
          className="px-6 py-2 bg-emerald-500 w-full grow text-white rounded-md hover:bg-emerald-600 transition"
          onClick={() => {
            onReset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;
