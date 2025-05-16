import React from "react";
import ModalWrapper from "./ModalWrapper";
import { BathroomIcon, BedIcon, CloseIcon, PriceIcon } from "@/imports/icons";
import { useFormContext, useWatch } from "react-hook-form";
import GeneralDropdown from "../Dropdowns/GeneralDropdown";
import { PROPERTY_STATUS } from "@/constants/propertyStatus";
import { useTranslations } from "next-intl";
import { SORT_OPTIONS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { fetchPropertyTypes } from "@/lib/queryFunctions";

const MobileFilterModal = ({ open, handleClose, refetchListings }) => {
  const { data: PROPERTY_TYPES } = useQuery({
    queryKey: [ROUTES.GET_PROPERTY_TYPES],
    queryFn: fetchPropertyTypes,
  });

  const translate = useTranslations("filterKeys");

  const translatePropertyTypes = useTranslations("propertyTypes");

  const sortTranslations = useTranslations("sortOptions");

  const { setValue, control, reset } = useFormContext();

  const formValues = useWatch({ control: control });

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000)?.map(
    (el) => {
      const formattedNumber = el.toLocaleString("en-IN"); // Using en-IN locale for 1,00,000 format
      return { label: formattedNumber, value: el };
    }
  );

  const sortOptions = SORT_OPTIONS?.map((el) => {
    return { label: sortTranslations(el), value: el };
  });

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="fixed inset-0 bg-black/25 flex items-end justify-center z-50"
        onClick={handleClose}
      >
        <div
          className="h-full w-full overflow-y-auto bg-white relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between py-3 px-6 border-b border-solid border-gray-200 shadow">
            <h5 className="">{translate("filterKeys")}</h5>
            <CloseIcon size={28} onClick={handleClose} />
          </div>
          <div className="border-b border-solid border-gray-200 shadow p-6">
            <div className="flex gap-0 flex-nowrap hide-scrollbar w-full h-fit">
              {PROPERTY_STATUS?.map((el) => (
                <button
                  className={`h-fit w-full grow border border-solid shadow px-6 py-2 cursor-pointer transition-all duration-200 ${
                    el === PROPERTY_STATUS?.[0]
                      ? "rounded-l-lg"
                      : "rounded-r-lg"
                  } ${
                    formValues?.status === el
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-white border-white text-black"
                  }`}
                  onClick={() => {
                    setValue("status", el);
                  }}
                  key={el}
                >
                  {translate(el)}
                </button>
              ))}
            </div>
          </div>
          <div className="border-b border-solid border-gray-200 shadow p-6">
            <h5 className="text-green-900 mb-2">{translate("type")}</h5>
            <div className="flex gap-4 flex-nowrap hide-scrollbar p-2 overflow-x-auto w-full h-fit">
              {PROPERTY_TYPES?.map((el) => (
                <div
                  className={`h-fit w-fit border border-solid rounded-md shadow px-6 py-2 cursor-pointer min-w-fit transition-all duration-200 ${
                    formValues?.type?.includes(el)
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-white border-white text-black"
                  }`}
                  onClick={() => {
                    const currentTypes = formValues?.type || [];
                    const newTypes = currentTypes.includes(el)
                      ? currentTypes.filter((type) => type !== el)
                      : [...currentTypes, el];
                    setValue("type", newTypes);
                  }}
                  key={el}
                >
                  {translatePropertyTypes(el?.toLowerCase())}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-solid border-gray-200 shadow p-6">
            <h5 className="text-green-900 mb-2 flex items-center gap-1">
              <BedIcon size={21} color="#14532d" />
              {translate("beds")} :
            </h5>
            <div className="flex gap-4 flex-nowrap hide-scrollbar p-2 overflow-x-auto w-full h-fit">
              {[...Array.from({ length: 7 }, (_, i) => i + 1)]?.map((el) => (
                <div
                  className={`h-fit w-fit border border-solid rounded-md shadow px-6 py-2 cursor-pointer min-w-fit transition-all duration-200 ${
                    formValues?.beds === el
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-white border-white text-black"
                  }`}
                  onClick={() => {
                    setValue("beds", el);
                  }}
                  key={el}
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-solid border-gray-200 shadow p-6">
            <h5 className="text-green-900 mb-2 flex items-center gap-1">
              <BathroomIcon size={21} color="#14532d" />
              {translate("baths")} :
            </h5>
            <div className="flex gap-4 flex-nowrap hide-scrollbar p-2 overflow-x-auto w-full h-fit">
              {[...Array.from({ length: 7 }, (_, i) => i + 1)]?.map((el) => (
                <div
                  className={`h-fit w-fit border border-solid rounded-md shadow px-6 py-2 cursor-pointer min-w-fit transition-all duration-200 ${
                    formValues?.baths === el
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-white border-white text-black"
                  }`}
                  onClick={() => {
                    setValue("baths", el);
                  }}
                  key={el}
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-solid border-gray-200 shadow p-6">
            <h5 className="text-green-900 mb-2 flex items-center gap-1">
              <PriceIcon size={21} color="#14532d" />
              {translate("price")} :
            </h5>
            <div className="w-full flex gap-4">
              <GeneralDropdown
                name={`price_from`}
                placeholder={translate("from")}
                options={priceOptions}
                menuPlacement="top"
              />

              <GeneralDropdown
                name={`price_to`}
                placeholder={translate("to")}
                options={priceOptions}
                menuPlacement="top"
              />
            </div>
          </div>
          <div className="h-fit w-full flex gap-6 absolute z-[10] bottom-0 border-2 border-solid border-gray-300 bg-white p-4">
            <button
              className="w-full grow py-3 px-6 rounded-md bg-green-600 text-white"
              onClick={() => {
                reset();
                setTimeout(() => {
                  refetchListings();
                  handleClose();
                }, 100);
              }}
            >
              {translate("reset")}
            </button>
            <button
              className="w-full grow py-3 px-6 rounded-md bg-green-600 text-white"
              onClick={() => {
                refetchListings();
                handleClose();
              }}
            >
              {translate("apply")}
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default MobileFilterModal;
