import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const SortByModal = () => {
  const methods = useFormContext();

  const formValues = useWatch({ control: methods.control });

  const sortOptions = [
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
  ];

  return (
    <div className="flex flex-col gap-6 hide-scrollbar w-full h-fit p-8 ">
      {sortOptions?.map((el) => (
        <div className="flex items-center gap-2" key={el?.label}>
          <input
            type="radio"
            id={el.value}
            value={el.value}
            checked={formValues?.sortBy === el.value}
            onChange={() => methods.setValue("sortBy", el.value)}
            className="w-4 h-4"
          />
          <label htmlFor={el.value} className="whitespace-nowrap">
            {el.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SortByModal;
