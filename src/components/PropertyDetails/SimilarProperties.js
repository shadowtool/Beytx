import React from "react";
import PropertyCard from "../Cards/PropertyCard";
import { useTranslations } from "next-intl";

const SimilarProperties = ({ propertyData }) => {
  const translate = useTranslations("propertyDetails");

  return (
    <div className="p-4">
      {propertyData?.similarProperties?.length > 0 && (
        <h3>{translate("similarProperties")}</h3>
      )}
      <div
        className={`flex overflow-x-auto hide-scrollbar md:grid gap-4 mt-6 grid-cols-3`}
      >
        {propertyData?.similarProperties?.map((property, index) => {
          return <PropertyCard property={property} key={index} />;
        })}
      </div>
    </div>
  );
};

export default SimilarProperties;
