"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Reusables/Loader";
import { CREATOR_ACTIONS, USER_ACTIONS } from "@/constants/constants";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AgentIcon,
  AreaIcon,
  BathroomIcon,
  BedIcon,
  DownIcon,
} from "@/imports/icons";
import PropertyImagesModal from "../Modals/PropertyImagesModal";
import DescriptionModal from "../Modals/DescriptionModal";
import MapPicker from "../Misc/MapPicker";

const PropertyDetailsMobile = ({ loading, propertyData }) => {
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [propertyData?.description, isDescriptionExpanded]);

  return (
    <div className="md:hidden">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {/* Properties details page */}
          <div className="p-0 md:px-12 w-full md:py-8">
            <div className="hidden md:flex justify-end gap-6 w-full px-4">
              {USER_ACTIONS.map((el, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  {el.icon}
                  <p className="text-green-600">{el.label}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <motion.img
                key={selectedImageIndex} // Re-renders when src changes
                src={
                  propertyData?.images?.[selectedImageIndex] ??
                  "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                }
                alt={propertyData?.title}
                className="w-full h-56 object-cover"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(propertyData?.images?.length ?? 1)].map(
                  (_, index) => (
                    <div
                      key={index}
                      className={`min-h-3 min-w-3 max-h-3 max-w-3 rounded-full transition-all duration-300 ${
                        index === selectedImageIndex
                          ? "bg-green-600"
                          : "bg-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(index);
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-8 mb-24">
            <div className="w-full grow px-4">
              <div className="">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800 text-left">
                    KWD{" "}
                    <span className="text-black">{propertyData?.price}</span>{" "}
                    <span className="text-lg">/year</span>
                  </h2>
                  <div className="flex gap-6 items-end text-gray-600 my-8">
                    <div className="flex flex-col gap-2 items-center text-sm md:text-base">
                      <BedIcon color="#aaa" size={28} />
                      {propertyData?.bathrooms} Bedrooms
                    </div>
                    <div className="h-16 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-2 items-center text-sm md:text-base">
                      <BathroomIcon color="#aaa" size={28} />
                      {propertyData?.bedrooms} Bathrooms
                    </div>
                    <div className="h-16 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-2 items-center text-sm md:text-base">
                      <AreaIcon color="#aaa" size={28} />
                      {propertyData?.size} Sq. ft.
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 mb-20">
                  <motion.div
                    initial={{ height: 250 }}
                    animate={{ height: isDescriptionExpanded ? height : 250 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      ref={contentRef}
                      dangerouslySetInnerHTML={{
                        __html: propertyData?.description,
                      }}
                    />
                  </motion.div>

                  <div
                    className={`absolute left-0 w-full flex items-end justify-center transition-opacity duration-500 bg-gradient-to-b from-white/30 to-white ${
                      isDescriptionExpanded
                        ? "top-full h-[40px]"
                        : "top-2/3 h-[120px]"
                    }`}
                  >
                    <button
                      className="flex items-center gap-3 text-lg font-semibold"
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                    >
                      {isDescriptionExpanded
                        ? "See Less Details"
                        : "See More Details"}
                      <DownIcon size={21} color="#000" />
                    </button>
                  </div>
                </div>
                <div className="border-t border-solid border-gray-300 py-6">
                  <h2 className="text-2xl font-semibold"> Amenities</h2>
                  <div className="mt-4 flex flex-col gap-2">
                    {propertyData?.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-12 ">
                  <h2 className="text-2xl font-semibold mb-4">Location</h2>
                  <MapPicker location={propertyData?.location} isReadable />
                </div>
              </div>
            </div>
            <div className="bg-green-100 px-4 py-12 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-3 mt-4">
                <img
                  src={propertyData?.user?.image}
                  alt="#"
                  className="min-h-28 max-h-28 min-w-28 max-w-28 object-cover rounded-full border-2 border-solid border-green-600"
                />
                <div className="h-fit w-fit py-1 px-4 bg-green-600 flex items-center justify-center gap-2 text-white rounded-md">
                  <AgentIcon size={24} color="#fff" />
                  <p className="text-xs font-semibold">New Agent</p>
                </div>
                <div className="flex gap-1 flex-col">
                  <h5 className="text-2xl text-black font-medium">
                    {propertyData?.user?.name}
                  </h5>
                </div>
              </div>
              <div className="h-fit w-full my-2 max-w-80">
                <div className="flex items-center my-3">
                  <h5 className="text-sm font-normal min-w-28">
                    Response Time
                  </h5>
                  <p className="text-xl font-semibold">within 5 minutes</p>
                </div>
                <div className="flex items-center my-3">
                  <h5 className="text-sm font-normal min-w-28">Closed Deals</h5>
                  <p className="text-xl font-semibold">3</p>
                </div>
                <div className="flex items-center my-3">
                  <h5 className="text-sm font-normal min-w-28">Languages </h5>
                  <p className="text-xl font-semibold">English</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-6 mt-6 max-w-80">
                {CREATOR_ACTIONS?.map((el, idx) => (
                  <button
                    key={idx}
                    className="h-fit w-fit grow px-4 rounded-md py-3 flex items-center text-xs md:text-sm gap-1 md:gap-2 text-white bg-green-600"
                  >
                    {el.icon}
                    {el.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal to show property images */}
          <PropertyImagesModal
            open={openImagesModal}
            handleClose={() => setOpenImagesModal(false)}
            images={propertyData?.images}
          />
        </>
      )}
    </div>
  );
};

export default PropertyDetailsMobile;
