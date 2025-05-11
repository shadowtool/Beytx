"use client";
import PropertyCard from "../Reusables/Cards/PropertyCard";
import MobilePropertyCard from "../Reusables/Cards/MobilePropertyCard";
import PropertyFilter from "./PropertyFilter";
import Loader from "../Reusables/Misc/Loader";
import MobileFilterModal from "../Reusables/Modals/MobileFilterModal";
import MobileDropdownModal from "../Reusables/Modals/MobileDropdownModal/MobileDropdownModal";
import ListingTypeFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/ListingTypeFilterModal";
import PropertyTypeFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/PropertyTypeFilterModal";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";
import BedsFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/BedsFilterModal";
import BathsFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/BathsFilterModal";
import PriceFilterModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/PriceFilterModal";
import SortByModal from "../Reusables/Modals/MobileDropdownModal/DropdownModals/SortByModal";
import { CloseIcon, FilterIcon, SearchIcon } from "@/imports/icons";
import MobileSearchModal from "../Reusables/Modals/MobileSearchModal";
import { DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS } from "@/constants/constants";

const PropertyListings = ({
  properties,
  locationsData,
  isFetchingData,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  loadMoreRef,
  totalCount,
}) => {
  const translate = useTranslations("propertyListings");
  const { locale } = useParams();
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { control, reset } = useFormContext();
  const formValues = useWatch({ control });

  const [openFilters, setOpenFilters] = useState(false);
  const [openLocationSearch, setOpenLocationSearch] = useState(false);
  const [openDropdownFilterModal, setOpenDropdownFilterModal] = useState(false);
  const [selectedModalFilter, setSelectedModalFilter] = useState(null);

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
            JSON.stringify(DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS[option.id]),
      };
    });
  }, [filterModalOptions, formValues]);

  const isDifferentFromDefault = useMemo(() => {
    console.log("formValues", formValues);
    return (
      Object.keys(formValues)?.length > 0 &&
      Object.keys(DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS).some(
        (key) =>
          JSON.stringify(formValues[key]) !==
          JSON.stringify(DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS[key])
      )
    );
  }, [formValues]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="hidden md:block">
        <section className={`min-h-screen`}>
          <PropertyFilter
            locationsData={locationsData}
            onReset={() => {
              const url = window.location.origin + window.location.pathname;
              router.replace(url, undefined, { shallow: false });
              setTimeout(() => {
                reset(DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS);
              }, 10);
            }}
          />

          <div className="px-4 md:px-12 py-10 w-full grow">
            {isFetchingData ? (
              <Loader customMessage={translate("fetchingData")} />
            ) : (
              <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
                {properties.length > 0
                  ? properties.map((property, index) => (
                      <PropertyCard property={property} key={index} />
                    ))
                  : !isFetchingNextPage && (
                      <p className="text-center text-gray-600">
                        {translate("noPropertiesFound")}
                      </p>
                    )}
              </div>
            )}

            <div ref={ref} className="flex flex-col items-center mt-8">
              {isFetchingNextPage && (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                  <div className="text-green-600">
                    {translate("loadingMoreProperties")}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Mobile View */}
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
                  const url = window.location.origin + window.location.pathname;
                  router.replace(url, undefined, { shallow: false });
                  setTimeout(() => {
                    reset(DEFAULT_VALUES_PROPERTY_LISTINGS_FILTERS);
                  }, 10);
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
                  refetchListings={fetchNextPage}
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
        refetchListings={fetchNextPage}
      />

      <MobileDropdownModal
        open={openDropdownFilterModal}
        handleClose={() => {
          setOpenDropdownFilterModal(false);
          setSelectedModalFilter(null);
        }}
        filterTitle={selectedModalFilter?.title}
        filterBody={selectedModalFilter?.content}
        refetchListings={fetchNextPage}
      />

      <MobileSearchModal
        open={openLocationSearch}
        handleClose={() => {
          setOpenLocationSearch(false);
        }}
        refetchListings={fetchNextPage}
        totalCount={totalCount}
      />
    </>
  );
};

export default PropertyListings;
