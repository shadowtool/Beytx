import { SORT_OPTIONS } from "@/constants/constants";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const SortByModal = () => {
  const methods = useFormContext();

  const formValues = useWatch({ control: methods.control });

  const translate = useTranslations("sortOptions");

  const sortOptions = SORT_OPTIONS?.map((el) => {
    return { label: translate(el), value: el };
  });

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
