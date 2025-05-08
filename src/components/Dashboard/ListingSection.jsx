import React from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "../Reusables/Cards/PropertyCard";
import MobilePropertyCard from "../Reusables/Cards/MobilePropertyCard";

const ListingSection = ({ listings, type, isBigScreen }) => {
  const translate = useTranslations("dashboard");

  if (listings?.length <= 0) {
    return (
      <div
        className={`h-fit w-full ${isBigScreen ? "flex items-center justify-center" : "p-6"}`}
      >
        <h5>{translate("noListings")}</h5>
      </div>
    );
  }

  if (isBigScreen) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {listings?.map((el, idx) => (
          <PropertyCard key={idx} property={el} cardType={type} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-fit w-full flex flex-col gap-6 pb-16">
      {listings?.map((el, idx) => (
        <MobilePropertyCard key={idx} property={el} cardType={type} />
      ))}
    </div>
  );
};

export default ListingSection;
