import GeneralDropdown from "@/components/Dropdowns/GeneralDropdown";
import { useTranslations } from "next-intl";
import React from "react";

const PriceFilterModal = () => {
  const translate = useTranslations("filterKeys");

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000)?.map(
    (el) => {
      const formattedNumber = el.toLocaleString("en-IN"); // Using en-IN locale for 1,00,000 format
      return { label: formattedNumber, value: el };
    }
  );

  return (
    <div className="w-full flex gap-4 pt-6 pb-32 px-6">
      <GeneralDropdown
        name={`price_from`}
        placeholder={translate("from")}
        options={priceOptions}
        menuPlacement="bottom"
      />

      <GeneralDropdown
        name={`price_to`}
        placeholder={translate("to")}
        options={priceOptions}
        menuPlacement="bottom"
      />
    </div>
  );
};

export default PriceFilterModal;
