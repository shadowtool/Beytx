import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyFilter from "../SearchedProperties/PropertyFilter";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon, LeftArrowIcon } from "@/imports/icons";
import { useFormContext, useWatch } from "react-hook-form";
import GeneralInput from "../Inputs/GeneralInput";
import { fetchCities } from "@/lib/queryFunctions";
import { ROUTES } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { LocationIcon } from "@/imports/images";
import Image from "next/image";

const MobileSearchModal = ({
  open,
  handleClose,
  refetchListings,
  totalCount,
}) => {
  const { setValue, control, reset } = useFormContext();

  const selectedBedrooms = useWatch({ name: "beds", control });

  const locationInputValue = useWatch({ name: "locationInput", control });

  const selectedLocationsValue = useWatch({
    name: "selectedLocations",
    control,
  });

  const { data: locationsData } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const handleLocationSelect = (location) => {
    if (
      !selectedLocationsValue?.some(
        (loc) => loc.city.toLowerCase() === location.city.toLowerCase()
      )
    ) {
      setValue("selectedLocations", [
        ...(selectedLocationsValue || []),
        location,
      ]);
    }
    if (selectedLocationsValue?.length <= 0) {
      setValue("beds", "");
    }
    setValue("locationInput", "");
  };

  useEffect(() => {
    if (open) {
      if (selectedBedrooms?.length > 0 || selectedLocationsValue?.length > 0) {
        if (selectedLocationsValue?.length > 0) {
          setValue(
            "location",
            selectedLocationsValue?.map((el) => {
              return el?.city;
            })
          );
          setTimeout(() => {
            refetchListings();
          }, 100);
        }
      } else {
        reset();
        setTimeout(() => {
          refetchListings();
        }, 100);
      }
    }
  }, [selectedBedrooms, selectedLocationsValue]);

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="h-full w-full overflow-y-auto bg-white relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-fit w-full flex items-center justify-between gap-3 bg-white sticky top-0 left-0 p-4 shadow-md z-10">
            <div
              className="h-10 w-10 flex items-center shadow cursor-pointer justify-center border border-gray-200 rounded-md"
              onClick={handleClose}
            >
              <LeftArrowIcon size={14} color="#4b5563" />
            </div>
            <GeneralInput
              name="locationInput"
              placeholder="Search by city, state or community"
              classes="focus:ring-2 focus:ring-green-200 transition-all duration-300"
              debounce={true}
              debounceTime={500}
            />
          </div>
          <div className="px-6">
            {selectedLocationsValue?.length > 0 &&
              locationInputValue?.length === 0 && (
                <>
                  <div className={`mt-6 flex flex-wrap gap-2`}>
                    <AnimatePresence>
                      {selectedLocationsValue?.map((el, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="py-1 px-2 bg-green-100 shadow text-green-800 border border-green-800   flex items-center gap-2 cursor-pointer rounded-md"
                          onClick={() => {
                            setValue(
                              "selectedLocations",
                              selectedLocationsValue.filter(
                                (loc) => loc.city !== el.city
                              )
                            );
                          }}
                        >
                          {el.city}, {el.country}
                          <CloseIcon size={18} className="text-green-800" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full mt-6"
                      >
                        <h5 className="">Bedrooms</h5>
                        <div className="flex gap-2 mt-2 max-w-full overflow-x-auto hide-scrollbar">
                          {[1, 2, 3, 4, 5, 6, 7].map((bed) => (
                            <button
                              key={bed}
                              className={`py-2 px-4 border rounded-md ${
                                selectedBedrooms === bed
                                  ? "bg-green-600 text-white"
                                  : "border-gray-300"
                              }`}
                              onClick={() => setValue("beds", bed)}
                            >
                              {bed} Bed{bed > 1 ? "s" : ""}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </>
              )}

            <AnimatePresence>
              {locationInputValue?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col gap-2 pt-6 pb-28"
                >
                  {locationsData
                    ?.filter((el) => {
                      return el?.city
                        ?.toLowerCase()
                        ?.includes(locationInputValue?.toLowerCase());
                    })
                    ?.map((el) => (
                      <div
                        key={el.city}
                        className="py-2 flex items-center gap-2 cursor-pointer"
                        onClick={() => handleLocationSelect(el)}
                      >
                        <Image
                          src={LocationIcon}
                          className="min-h-6 min-w-6 max-h-6 max-w-6"
                        />
                        <div>
                          <h6 className="">{el.city}</h6>
                          <p className="">{el.country}</p>
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 flex gap-6">
              <button
                className="py-3 px-6 rounded-md text-black underline   "
                onClick={() => {
                  reset();
                  setTimeout(() => {
                    refetchListings();
                  }, 100);
                  handleClose();
                }}
              >
                Clear
              </button>
              <button
                className="w-full py-3 px-6 rounded-md bg-green-600 text-white   "
                onClick={handleClose}
              >
                {totalCount ?? 0} Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default MobileSearchModal;
