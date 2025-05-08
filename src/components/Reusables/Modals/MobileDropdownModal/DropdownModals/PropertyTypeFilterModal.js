import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PropertyTypeFilterModal = () => {
  const { setValue, control } = useFormContext();

  const translate = useTranslations("propertyTypes");

  const formValues = useWatch({ control: control });

  const handlePropertyTypeClick = (type) => {
    const currentTypes = formValues?.type || [];
    if (currentTypes.includes(type)) {
      setValue(
        "type",
        currentTypes.filter((t) => t !== type)
      );
    } else {
      setValue("type", [...currentTypes, type]);
    }
  };

  return (
    <div className="flex gap-4 flex-nowrap hide-scrollbar p-2 overflow-x-auto w-full h-fit py-8 px-6">
      {PROPERTY_TYPES?.map((el) => (
        <div
          className={`h-fit w-fit border border-solid rounded-md shadow px-6 py-2 cursor-pointer min-w-fit transition-all duration-200 ${
            formValues?.type?.includes(el)
              ? "bg-green-100 border-green-600 text-green-600"
              : "bg-white border-white text-black"
          }`}
          onClick={() => handlePropertyTypeClick(el)}
          key={el}
        >
          {translate(el?.toLowerCase())}
        </div>
      ))}
    </div>
  );
};

export default PropertyTypeFilterModal;
