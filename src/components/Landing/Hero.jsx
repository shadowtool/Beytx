"use client";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { FilterBgImage } from "@/imports/images";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import SearchableDropdown from "../Dropdowns/SearchableDropdown";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { fetchCities } from "@/lib/queryFunctions";
import GeneralDropdown from "../Dropdowns/GeneralDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useTranslations } from "next-intl";
import PlacesSearchDropdown from "../Dropdowns/PlacesSearchDropdown";

const Hero = () => {
  const [filterStatus, setFilterStatus] = useState("sale");

  const router = useRouter();
  const { locale } = useParams();
  const translate = useTranslations("hero");

  const typesTranslations = useTranslations("propertyTypes");

  const methods = useForm({
    defaultValues: {
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      furnished: "",
      location: "",
    },
  });

  const { register, handleSubmit, control, setValue } = methods;

  useEffect(() => {
    setFilterStatus("sale");
  }, [setFilterStatus]);

  const onSubmit = (data) => {
    const queryParams = new URLSearchParams();

    queryParams.append("status", filterStatus ?? "sale");
    if (data?.location !== "") queryParams.append("loc", data.location.city);
    if (data?.bathrooms !== "") queryParams.append("bath", data.bathrooms);
    if (data?.bedrooms !== "") queryParams.append("bed", data.bedrooms);
    if (data?.propertyType !== "")
      queryParams.append("type", data.propertyType);

    router.push(`/${locale}/properties?${queryParams.toString()}`);
  };

  const locationMobileInputValue = useWatch({
    name: "locationMobileInput",
    control,
  });

  return (
    <FormProvider {...methods}>
      <div className="relative text-center flex p-0 md:py-36 items-center justify-center flex-col">
        <Image
          src={FilterBgImage}
          alt="filter-background-image"
          className="hidden md:block absolute h-full w-full object-cover"
        />
        <div className="hidden md:block h-full w-full bg-black/15  absolute top-0 left-0 z-[1]"></div>

        <div className="md:hidden h-full w-full flex flex-col items-center justify-center gap-6 p-6 py-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-500 z-[1]">
          <h2 className="leading-10 text-white">
            {translate("findYourProperty")}
          </h2>

          <div className="w-full max-w-sm flex items-center justify-center flex-col">
            <div className="flex justify-center gap-4 relative z-[3] mb-4 w-full">
              <button
                onClick={() => setFilterStatus("sale")}
                className={`px-6 py-2 w-full border-none rounded-lg transition-all duration-300 shadow-lg ${
                  filterStatus === "sale"
                    ? "bg-emerald-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {translate("buy")}
              </button>

              <button
                onClick={() => setFilterStatus("rent")}
                className={`px-6 py-2 w-full border-none rounded-lg transition-all duration-300 shadow-lg ${
                  filterStatus === "rent"
                    ? "bg-emerald-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {translate("rent")}
              </button>
            </div>
            <div className="relative w-full bg-white flex gap-4 items-center justify-between rounded-md ltr:pl-3 rtl:pr-3">
              <PlacesSearchDropdown
                name={"locationMobileInput"}
                classes={{
                  input: "focus:!ring-0 !border-none",
                  dropdownItem: "!text-left",
                }}
              />

              <button
                className="self-stretch min-h-full w-fit py-1 px-3 bg-emerald-600 text-white   rounded-md min-w-fit"
                onClick={() => {
                  router.push(
                    `/${locale}/properties?loc=${locationMobileInputValue?.city}`
                  );
                }}
              >
                {translate("search")}
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-fit w-fit px-8 py-4 bg-black/25 rounded-xl backdrop-blur min-w-[65%] z-[3]">
          <div className="flex justify-center gap-4 relative z-[3]">
            <button
              onClick={() => setFilterStatus("sale")}
              className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
                filterStatus === "sale"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                  : "bg-gray-300 text-gray-700 border-2 border-solid rounded-lg hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white "
              }`}
            >
              {translate("buy")}
            </button>

            <button
              onClick={() => setFilterStatus("rent")}
              className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
                filterStatus === "rent"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                  : "bg-gray-300 text-gray-700 border-2 border-solid hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white rounded-lg"
              }`}
            >
              {translate("rent")}
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center p-6 relative z-[3]"
          >
            {/* Filter Bar Container */}
            <div className="flex h-fit items-center bg-white rounded-xl shadow-md w-full max-w-3xl mb-2">
              <GeneralDropdown
                name={"propertyType"}
                placeholder={translate("type")}
                options={PROPERTY_TYPES?.map((el) => {
                  return {
                    label: typesTranslations(el?.toLowerCase()),
                    value: el,
                  };
                })}
                classes={{
                  button:
                    "!text-gray-700 !px-6 focus:!ring-0 ltr:!rounded-l-xl ltr:!rounded-r-none rtl:!rounded-r-xl rtl:!rounded-l-none",
                }}
              />

              <GeneralDropdown
                name={"bedrooms"}
                placeholder={translate("bedrooms")}
                options={["1", "2", "3", "4", "5", "6", "7"]?.map((el) => {
                  return { label: el, value: el?.toLowerCase() };
                })}
                classes={{
                  button: "!text-gray-700 !px-6 focus:!ring-0 !rounded-none",
                }}
              />

              <GeneralDropdown
                name={"bathrooms"}
                placeholder={translate("bathrooms")}
                options={["1", "2", "3", "4", "5", "6", "7"]?.map((el) => {
                  return { label: el, value: el?.toLowerCase() };
                })}
                classes={{
                  button:
                    "!text-gray-700 !px-6 focus:!ring-0 ltr:!rounded-r-xl ltr:!rounded-l-none rtl:!rounded-l-xl rtl:!rounded-r-none",
                }}
              />
            </div>

            {/* Search Bar Container */}
            <div className="flex items-center bg-white rounded-xl shadow-md w-full max-w-3xl">
              {/* Search Bar Input */}

              <PlacesSearchDropdown
                name={"location"}
                classes={{
                  input: "focus:!ring-0 !border-none",
                  dropdownItem: "!text-left",
                }}
              />

              {/* Search Button */}
              <button
                type="submit"
                className="bg-emerald-500 text-white px-10 py-3 hover:bg-emerald-600 transition ltr:rounded-r-xl rtl:rounded-l-xl"
              >
                {translate("search")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Hero;
