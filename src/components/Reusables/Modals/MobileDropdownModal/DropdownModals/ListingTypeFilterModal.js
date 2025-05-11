import { PROPERTY_STATUS } from "@/constants/propertyStatus";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ListingTypeFilterModal = () => {
  const { setValue, control } = useFormContext();

  const formValues = useWatch({ control: control });

  const translate = useTranslations("filterKeys");

  return (
    <div className="flex gap-6 flex-nowrap hide-scrollbar w-full h-fit p-8 ">
      {PROPERTY_STATUS?.map((el) => (
        <button
          className={`h-fit w-full grow border border-solid shadow px-6 py-2 cursor-pointer transition-all duration-200 rounded-md ${
            formValues?.status === el
              ? "bg-green-100 border-green-600 text-green-600"
              : "bg-white border-white text-black"
          }`}
          onClick={() => {
            setValue("status", el);
          }}
          key={el}
        >
          {translate(el)}
        </button>
      ))}
    </div>
  );
};

export default ListingTypeFilterModal;
