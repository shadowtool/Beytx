"use client";
import { ROUTES } from "@/constants/routes";
import { fetchCities } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LinksSection = () => {
  const router = useRouter();
  const { locale } = useParams();
  const translate = useTranslations("linksSection");
  const translatePropertyTypes = useTranslations("propertyTypes");

  const { data: locationsData } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const LINKS = locationsData
    ?.map((location) =>
      PROPERTY_TYPES.map((type) => ({
        type,
        city: location.city,
        text: `${translatePropertyTypes(type.toLowerCase())} ${translate(
          "in"
        )} ${location.city}`,
      }))
    )
    .flat();

  return (
    <div className="h-fit w-full p-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-500 z-[1] backdrop-blur-sm py-10 md:hidden">
      <h4 className="mb-8 text-white">
        {translate("exploreByMajorLocations")}
      </h4>
      <div className="w-full h-fit max-w-full overflow-x-auto hide-scrollbar flex flex-nowrap items-center gap-6">
        {locationsData?.map((el) => (
          <button
            className="h-fit w-fit min-w-28 py-2.5 border border-solid rounded-md border-emerald-600 bg-white flex items-center justify-center text-emerald-600"
            key={el}
            onClick={() => router.push(`/${locale}/properties?loc=${el?.city}`)}
          >
            {el?.city}
          </button>
        ))}
      </div>
      <div className="my-6 flex flex-col gap-3">
        {LINKS?.map((el) => (
          <Link
            href={`/${locale}/properties?loc=${el?.city}&type=${el?.type}`}
            className="underline text-zinc-100"
            key={el?.text}
          >
            {el?.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
