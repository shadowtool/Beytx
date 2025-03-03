import { useState } from "react";
import { useFormContext } from "react-hook-form";

const SortBy = ({ onSortChange }) => {
  const { register } = useFormContext();

  const sortingOptions = [
    { label: "select sorting", value: "" },
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Price (low)", value: "price_low" },
    { label: "Price (high)", value: "price_high" },
    { label: "Beds (least)", value: "beds_least" },
    { label: "Beds (most)", value: "beds_most" },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* <label className="text-black mr-2">Sort by:</label> */}
      <div className="relative">
        <select
          {...register("sort")}
          className="w-full px-4 py-2 border-2 border-emerald-500 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
        >
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortBy;
