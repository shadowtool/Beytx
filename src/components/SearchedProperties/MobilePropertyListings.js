"use client";
import { CloseIcon, FilterIcon, SearchIcon } from "@/imports/icons";
import React, { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import MobilePropertyCard from "../Reusables/Cards/MobilePropertyCard";
import Loader from "../Reusables/Misc/Loader";
import MobileFilterModal from "../Reusables/Modals/MobileFilterModal";
import ListingTypeFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/ListingTypeFilterModal";
import PropertyTypeFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/PropertyTypeFilterModal";
import BedsFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/BedsFilterModal";
import BathsFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/BathsFilterModal";
import PriceFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/PriceFilterModal";
import MobileDropdownModal from "../Reusables/Modals/MobileDropdownModal/MobileDropdownModal";
import SortByModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/SortByModal";
import MobileSearchModal from "../Reusables/Modals/MobileSearchModal";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

const itemsPerPage = 9;

const defaultValues = {
  location: [],
  type: [],
  status: "",
  beds: "",
  baths: "",
  sortBy: "",
};

const MobilePropertyListings = ({
  properties,
  refetchListings,
  isFetchingData,
  isFetchingNextPage,
  loadMoreRef,
  totalCount,
}) => {
  const translate = useTranslations("propertyListings");
  const [openFilters, setOpenFilters] = useState(false);
  const [openLocationSearch, setOpenLocationSearch] = useState(false);
  const [openDropdownFilterModal, setOpenDropdownFilterModal] = useState(false);
  const [selectedModalFilter, setSelectedModalFilter] = useState(null);

  const { control, reset } = useFormContext();

  const router = useRouter();

  const { locale } = useParams();

  const formValues = useWatch({ control });

  const filterModalOptions = [
    {
      title: translate("status"),
      id: "propertyStatus",
      content: <ListingTypeFilterModal />,
    },
    {
      title: translate("type"),
      id: "type",
      content: <PropertyTypeFilterModal />,
    },
    { title: translate("beds"), id: "beds", content: <BedsFilterModal /> },
    { title: translate("bath"), id: "baths", content: <BathsFilterModal /> },
    { title: translate("price"), id: "price", content: <PriceFilterModal /> },
    { title: translate("sortBy"), id: "sortBy", content: <SortByModal /> },
  ];

  const filterOptions = useMemo(() => {
    return filterModalOptions.map((option) => {
      return {
        title: option?.title,
        id: option.id,
        active:
          Object.keys(formValues)?.length > 0 &&
          JSON.stringify(formValues[option.id]) !==
            JSON.stringify(defaultValues[option.id]),
      };
    });
  }, [filterModalOptions, formValues, defaultValues]);

  const isDifferentFromDefault = useMemo(() => {
    return (
      Object.keys(formValues)?.length > 0 &&
      Object.keys(defaultValues).some(
        (key) =>
          JSON.stringify(formValues[key]) !== JSON.stringify(defaultValues[key])
      )
    );
  }, [formValues, defaultValues]);

  return (
    <>
      <div className="flex md:hidden min-h-screen w-full flex-col gap-6 pt-4">
        <div className="h-12 w-full flex items-center justify-between gap-3 px-4">
          <div
            className="h-full w-full flex items-center gap-4 border border-solid rounded-md border-gray-200 shadow px-4"
            onClick={() => setOpenLocationSearch(true)}
          >
            <SearchIcon size={21} className="text-gray-600" />
            <p>{translate("searchPlaceholder")}</p>
          </div>
        </div>
        <div className="relative px-4 pr-5">
          <div className="h-10 w-full flex items-center gap-3 overflow-x-auto hide-scrollbar">
            <div
              className="h-10 w-10 min-w-10 flex items-center justify-center shadow cursor-pointer border border-solid border-gray-200 rounded-md"
              onClick={() => setOpenFilters(true)}
            >
              <FilterIcon size={18} color="#4b5563" />
            </div>
            {isDifferentFromDefault && (
              <div
                className="h-10 w-10 min-w-10 flex items-center justify-center shadow cursor-pointer border border-solid border-gray-200 rounded-md"
                onClick={() => {
                  reset({});
                  router.push(`/${locale}/properties`, undefined, {
                    shallow: false,
                  });
                }}
              >
                <CloseIcon size={21} color="#4b5563" />
              </div>
            )}
            {filterOptions.map((option, index) => (
              <div
                key={index}
                className={`h-10 w-fit min-w-fit px-6 flex items-center justify-center shadow cursor-pointer border border-solid rounded-md ${
                  option?.active
                    ? "border-green-800 text-green-800 bg-green-100"
                    : "text-black bg-white border-gray-200"
                }`}
                onClick={() => {
                  setOpenDropdownFilterModal(true);
                  const modalFilter = filterModalOptions.find(
                    (filter) => filter.id === option?.id
                  );
                  setSelectedModalFilter(modalFilter);
                }}
              >
                <p>{option?.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          {isFetchingData ? (
            <div className="flex flex-col items-center mt-8">
              <Loader customMessage={translate("loadingMessage")} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {properties.map((property, index) => (
                <MobilePropertyCard
                  key={index}
                  property={property}
                  refetchListings={refetchListings}
                />
              ))}
            </div>
          )}
          <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600  ">
                  {translate("loadingMore")}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MobileFilterModal
        open={openFilters}
        handleClose={() => {
          setOpenFilters(false);
        }}
        refetchListings={refetchListings}
      />

      <MobileDropdownModal
        open={openDropdownFilterModal}
        handleClose={() => {
          setOpenDropdownFilterModal(false);
          setSelectedModalFilter(null);
        }}
        filterTitle={selectedModalFilter?.title}
        filterBody={selectedModalFilter?.content}
        refetchListings={refetchListings}
      />

      <MobileSearchModal
        open={openLocationSearch}
        handleClose={() => {
          setOpenLocationSearch(false);
        }}
        refetchListings={refetchListings}
        totalCount={totalCount}
      />
    </>
  );
};

export default MobilePropertyListings;
