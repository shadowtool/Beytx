import React from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "../Reusables/Cards/PropertyCard";
import MobilePropertyCard from "../Reusables/Cards/MobilePropertyCard";
import Image from "next/image";
import noDataFoundSvg from "../../../public/images/noDataFound.png";
import { useParams, useRouter } from "next/navigation";

const ListingSection = ({ listings, type, isBigScreen }) => {
  const translate = useTranslations("dashboard");

  const router = useRouter();

  const { locale } = useParams();

  if (listings?.length <= 0) {
    return (
      <div
        className={`h-full w-full flex flex-col items-center justify-center gap-4 bg-white rounded-xl border border-solid border-gray-200 shadow-lg`}
      >
        <Image
          src={noDataFoundSvg}
          alt="No data found"
          width={320}
          height={320}
          className="mb-2 h-56 w-auto object-contain"
        />
        <h5 className="text-2xl font-semibold text-gray-700 mb-1">
          {translate("noListings")}
        </h5>
        {type === "userListing" ? (
          <button
            className="h-fit w-fit bg-emerald-600 text-white text-sm rounded-md px-4 py-2"
            onClick={() => router.push(`/${locale}/properties/create`)}
          >
            Add Property
          </button>
        ) : type === "savedListing" ? (
          <button
            className="h-fit w-fit bg-emerald-600 text-white text-sm rounded-md px-4 py-2"
            onClick={() => router.push(`/${locale}/properties`)}
          >
            Explore Properties
          </button>
        ) : (
          <></>
        )}
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
