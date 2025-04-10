import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const SortByModal = () => {
  const methods = useFormContext();

  const formValues = useWatch({ control: methods.control });

  const translate = useTranslations("sortOptions");

  const sortOptions = [
    {
      label: translate("price_asc"),
      value: "price_asc",
    },
    {
      label: translate("price_desc"),
      value: "price_desc",
    },
    {
      label: translate("listing_date"),
      value: "listing_date",
    },
    {
      label: translate("beds_asc"),
      value: "beds_asc",
    },
    {
      label: translate("beds_desc"),
      value: "beds_desc",
    },
    {
      label: translate("baths_asc"),
      value: "baths_asc",
    },
    {
      label: translate("baths_desc"),
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
