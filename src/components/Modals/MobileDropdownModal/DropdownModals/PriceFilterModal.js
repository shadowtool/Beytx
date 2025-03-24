import GeneralDropdown from "@/components/Dropdowns/GeneralDropdown";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const PriceFilterModal = () => {
  const { setValue, control } = useFormContext();

  const formValues = useWatch({ control: control });

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000)?.map(
    (el) => {
      const formattedNumber = el.toLocaleString("en-IN"); // Using en-IN locale for 1,00,000 format
      return { label: formattedNumber, value: el };
    }
  );

  return (
    <div className="w-full flex gap-4 pt-6 pb-32 px-6">
      <Controller
        name={`price_from`}
        control={control}
        render={({ field }) => (
          <GeneralDropdown
            field={field}
            placeholder={"From"}
            options={priceOptions}
            menuPlacement="bottom"
          />
        )}
      />
      <Controller
        name={`price_to`}
        control={control}
        render={({ field }) => (
          <GeneralDropdown
            field={field}
            placeholder={"To"}
            options={priceOptions}
            menuPlacement="bottom"
          />
        )}
      />
    </div>
  );
};

export default PriceFilterModal;
