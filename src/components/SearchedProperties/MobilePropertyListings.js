"use client";
import {
  CloseIcon,
  FilterIcon,
  LeftArrowIcon,
  SearchIcon,
} from "@/imports/icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useWatch,
} from "react-hook-form";
import MobilePropertyCard from "../Cards/MobilePropertyCard";
import Loader from "../Reusables/Loader";
import MobileFilterModal from "../Modals/MobileFilterModal";
import ListingTypeFilterModal from "../Modals/MobileDropdownModal/DropdownModals/ListingTypeFilterModal";
import PropertyTypeFilterModal from "../Modals/MobileDropdownModal/DropdownModals/PropertyTypeFilterModal";
import BedsFilterModal from "../Modals/MobileDropdownModal/DropdownModals/BedsFilterModal";
import BathsFilterModal from "../Modals/MobileDropdownModal/DropdownModals/BathsFilterModal";
import PriceFilterModal from "../Modals/MobileDropdownModal/DropdownModals/PriceFilterModal";
import MobileDropdownModal from "../Modals/MobileDropdownModal/MobileDropdownModal";
import SearchableDropdown from "../Dropdowns/SearchableDropdown";
import SortByModal from "../Modals/MobileDropdownModal/DropdownModals/SortByModal";
import MobileSearchModal from "../Modals/MobileSearchModal";

const itemsPerPage = 9;

const defaultValues = {
  location: [],
  propertyType: [],
  propertyStatus: "",
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
  const [openFilters, setOpenFilters] = useState(false);
  const [openLocationSearch, setOpenLocationSearch] = useState(false);
  const [openDropdownFilterModal, setOpenDropdownFilterModal] = useState(false);
  const [selectedModalFilter, setSelectedModalFilter] = useState(null);

  const { control, reset } = useFormContext();

  const formValues = useWatch({ control });

  const filterModalOptions = [
    { title: "Sort By", id: "sortBy", content: <SortByModal /> },
    {
      title: "Listing Type",
      id: "propertyStatus",
      content: <ListingTypeFilterModal />,
    },
    {
      title: "Property Type",
      id: "type",
      content: <PropertyTypeFilterModal />,
    },
    { title: "Bed Rooms", id: "beds", content: <BedsFilterModal /> },
    { title: "Bath Rooms", id: "baths", content: <BathsFilterModal /> },
    { title: "Price", id: "price", content: <PriceFilterModal /> },
  ];

  const filterOptions = useMemo(() => {
    return filterModalOptions.map((option) => {
      return {
        title: option?.title,
        id: option.id,
        active:
          JSON.stringify(formValues[option.id]) !==
          JSON.stringify(defaultValues[option.id]),
      };
    });
  }, [filterModalOptions, formValues, defaultValues]);

  const isDifferentFromDefault = useMemo(() => {
    return Object.keys(defaultValues).some(
      (key) =>
        JSON.stringify(formValues[key]) !== JSON.stringify(defaultValues[key])
    );
  }, [formValues, defaultValues]);

  console.log({ isDifferentFromDefault });

  return (
    <>
      <div className="flex md:hidden min-h-screen w-full flex-col gap-6 pt-4">
        <div className="h-12 w-full flex items-center justify-between gap-3 px-4">
          <div
            className="h-full w-full flex items-center gap-4 border border-solid rounded-md border-gray-200 shadow px-4"
            onClick={() => setOpenLocationSearch(true)}
          >
            <SearchIcon size={21} className="text-gray-600" />
            <p>Search by city, community or state</p>
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
                  reset();
                  setTimeout(() => {
                    refetchListings();
                  }, 100);
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
              <Loader customMessage={"Loading properties"} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {properties.map((property, index) => (
                <MobilePropertyCard key={index} property={property} />
              ))}
            </div>
          )}
          <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600 text-xl">
                  Loading more properties...
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
