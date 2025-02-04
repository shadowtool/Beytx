import { useState } from "react";

const SortBy = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("Featured");

  const sortingOptions = [
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Price (low)", value: "price_low" },
    { label: "Price (high)", value: "price_high" },
    { label: "Beds (least)", value: "beds_least" },
    { label: "Beds (most)", value: "beds_most" }
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    if (onSortChange) onSortChange(value);
  };

  return (
    <div className="relative inline-block text-left">
      {/* <label className="text-black mr-2">Sort by:</label> */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
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
