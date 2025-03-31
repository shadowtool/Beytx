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

const Hero = () => {
  const [filterStatus, setFilterStatus] = useState("sale");

  const router = useRouter();

  const { locale } = useParams();

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
    if (data?.location !== "") queryParams.append("loc", data.location);
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

  const { data: locationsData } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
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
          <h2 className="  leading-10   text-white">Find your property</h2>
          <div className="w-full">
            <div className="relative w-full bg-white flex gap-4 items-center justify-between rounded-md pl-3">
              <SearchableDropdown
                name={"locationMobileInput"}
                control={control}
                options={locationsData?.map((el) => {
                  return { label: el?.city, value: el?.city };
                })}
                classes={{
                  dropdown: "!h-full !px-0",
                  button:
                    "!text-gray-700 !px-0 !h-full !border-none !rounded-l-xl focus-within:ring-0 focus-within:ring-transparent",
                }}
                placeholder="Filter by location ..."
              />

              <button
                className="self-stretch min-h-full w-fit py-1 px-3 bg-green-600 text-white   rounded-r-md min-w-fit"
                onClick={() =>
                  router.push(
                    `/${locale}/properties?loc=${locationMobileInputValue}`
                  )
                }
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-fit w-fit px-8 py-4 bg-black/25 rounded-xl backdrop-blur min-w-[65%] z-[3]">
          <div className="flex justify-center space-x-4 relative z-[3]">
            <button
              onClick={() => setFilterStatus("sale")}
              className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
                filterStatus === "sale"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                  : "bg-gray-300 text-gray-700 border-2 border-solid rounded-lg hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white "
              }`}
            >
              Buy
            </button>

            <button
              onClick={() => setFilterStatus("rent")}
              className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
                filterStatus === "rent"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                  : "bg-gray-300 text-gray-700 border-2 border-solid hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white rounded-lg"
              }`}
            >
              Rent
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center p-6 relative z-[3]"
          >
            {/* Filter Bar Container */}
            <div className="flex h-fit items-center bg-white rounded-xl shadow-md w-full max-w-3xl mb-2">
              <GeneralDropdown
                name={"type"}
                placeholder={"Type"}
                options={PROPERTY_TYPES?.map((el) => {
                  return { label: el, value: el };
                })}
                classes={{
                  button:
                    "!text-gray-700 !  !px-6 focus:!ring-0 !rounded-l-xl !rounded-r-none",
                }}
              />

              <GeneralDropdown
                name={"beds"}
                placeholder={"Bedrooms"}
                options={[
                  "studio",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "7+",
                ]?.map((el) => {
                  return { label: el, value: el?.toLowerCase() };
                })}
                classes={{
                  button: "!text-gray-700 !  !px-6 focus:!ring-0 !rounded-none",
                }}
              />

              <GeneralDropdown
                name={"baths"}
                placeholder={"Bathrooms"}
                options={[
                  "studio",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "7+",
                ]?.map((el) => {
                  return { label: el, value: el?.toLowerCase() };
                })}
                classes={{
                  button:
                    "!text-gray-700 !  !px-6 focus:!ring-0 !rounded-r-xl !rounded-l-none",
                }}
              />
            </div>

            {/* Search Bar Container */}
            <div className="flex items-center bg-white rounded-xl shadow-md w-full max-w-3xl">
              {/* Search Bar Input */}

              <SearchableDropdown
                name={"location"}
                placeholder="Select a city"
                options={locationsData?.map((el) => {
                  return { label: el?.city, value: el?.city };
                })}
                classes={{
                  dropdown: "!min-w-48 !h-full",
                  button:
                    "!text-gray-700 !  !h-full !border-none !px-6 !rounded-l-xl",
                }}
              />

              {/* Search Button */}
              <button
                type="submit"
                className="bg-emerald-500 text-white px-10 py-3    hover:bg-emerald-600 transition !rounded-r-xl"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Hero;
