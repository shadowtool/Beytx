"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Reusables/Loader";
import { CREATOR_ACTIONS, USER_ACTIONS } from "@/constants/constants";
import Image from "next/image";
import { motion } from "framer-motion";
import { AgentIcon, BathroomIcon, BedIcon, DownIcon } from "@/imports/icons";
import PropertyImagesModal from "../Modals/PropertyImagesModal";
import MapPicker from "../Misc/MapPicker";
import { AreaIcon, LocationIcon } from "@/imports/images";
import { useTranslations } from "next-intl";
import SimilarProperties from "./SimilarProperties";

const PropertyDetailsDesktop = ({ loading, propertyData }) => {
  const t = useTranslations("propertyDetails");
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [propertyData?.description]);

  return (
    <div className="hidden md:block">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="container mx-auto p-0 md:px-12 w-full md:py-8">
            <div className="hidden md:flex justify-end gap-6 w-full px-4">
              {USER_ACTIONS.map((el, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  {el.icon}
                  <p className="text-green-600">
                    {t(`${el.label.toLowerCase()}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden md:flex flex-col md:flex-row gap-6 mt-8">
              <div className="grow w-full relative">
                <Image
                  src={
                    propertyData?.images?.[0] ||
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                  }
                  alt={"property-image-0"}
                  className="h-full w-full object-cover rounded-lg max-h-[500px]"
                  onClick={() => setOpenImagesModal(true)}
                  height={500}
                  width={1400}
                />
              </div>
              <div className="md:min-w-96 md:max-w-96 grow flex flex-col gap-6">
                {propertyData?.images?.slice(1, 3).map((img, idx) => (
                  <Image
                    key={idx}
                    src={
                      img ||
                      "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                    }
                    alt={"property-image-2"}
                    className="h-full w-full grow object-cover rounded-lg max-h-[238px]"
                    onClick={() => setOpenImagesModal(true)}
                    height={500}
                    width={1400}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="container mx-auto flex flex-col lg-xl:flex-row gap-6 mt-8 px-4 md:px-12 mb-24">
            <div className="w-full grow">
              <div
                className={`p-6 bg-white border border-solid border-gray-200 rounded-lg shadow-lg ${
                  isDescriptionExpanded ? "pb-24" : "pb-6"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4">
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-gray-800 text-left font-semibold">
                      {t("pricePerYear", {
                        price: propertyData?.price,
                      })}{" "}
                    </h3>
                    <p className="text-gray-500 flex items-center mb-2 mt-1 ">
                      <Image
                        src={LocationIcon}
                        alt={t("locationIconAlt")}
                        className="h-5 w-auto object-contain"
                      />
                      {propertyData?.location?.city}
                    </p>
                  </div>
                  <div className="flex gap-6 items-end mt-4 text-gray-600">
                    <div className="flex flex-col gap-1 items-center">
                      <BedIcon color="#aaa" size={21} />
                      {t("bedrooms", {
                        count: propertyData?.bedrooms,
                      })}
                    </div>
                    <div className="h-8 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-1 items-center">
                      <BathroomIcon color="#aaa" size={21} />
                      {t("bathrooms", {
                        count: propertyData?.bathrooms,
                      })}{" "}
                    </div>
                    <div className="h-8 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-1 items-center">
                      <Image
                        src={AreaIcon}
                        alt={t("areaIconAlt")}
                        className="h-5 w-auto object-contain"
                      />
                      {t("area", {
                        size: propertyData?.size,
                      })}
                    </div>
                  </div>
                </div>

                <div className="relative my-20">
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
                      className="flex items-center gap-3"
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                    >
                      {isDescriptionExpanded
                        ? t("seeLessDetails")
                        : t("seeMoreDetails")}
                      <DownIcon size={21} color="#000" />
                    </button>
                  </div>
                </div>

                {propertyData?.amenities?.length > 0 && (
                  <div className="border-t border-solid border-gray-300 py-6">
                    <h2 className="font-medium">{t("amenities")}</h2>
                    <div className="mt-4 flex flex-col gap-2">
                      {propertyData?.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="my-12">
                  <h2 className="mb-4">{t("location")}</h2>
                  <MapPicker location={propertyData?.location} isReadable />
                </div>

                <SimilarProperties propertyData={propertyData} />
              </div>
            </div>

            <div className="lg-xl:min-w-96 lg-xl:max-w-96 h-fit">
              <div className="bg-green-100 px-4 py-12 rounded-md flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-3 mt-4">
                  <img
                    src={
                      propertyData?.user?.image ?? "/images/portrait-image.jpg"
                    }
                    onError={(e) => {
                      e.target.src = "/images/portrait-image.jpg";
                    }}
                    alt="#"
                    className="min-h-28 max-h-28 min-w-28 max-w-28 object-cover rounded-full border-2 border-solid border-green-600"
                  />
                  <div className="h-fit w-fit py-1 px-4 bg-green-600 flex items-center justify-center gap-2 text-white rounded-md">
                    <AgentIcon size={24} color="#fff" />
                    <p className="font-semibold text-xs">{t("newAgent")}</p>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h5 className="text-black">{propertyData?.user?.name}</h5>
                  </div>
                </div>

                <div className="flex items-center flex-col justify-between gap-3 mt-6 min-w-80 max-w-80">
                  <div className="flex gap-3 w-full">
                    {CREATOR_ACTIONS?.slice(0, 2).map((el, idx) => (
                      <button
                        key={idx}
                        className="h-fit w-full px-4 rounded-md py-3 flex items-center justify-center gap-3 text-[13px] font-semibold text-white bg-green-600"
                      >
                        {el.icon}
                        {t(`${el.value}`)}
                      </button>
                    ))}
                  </div>
                  <div className="w-full mt-3">
                    {CREATOR_ACTIONS?.[2] && (
                      <button className="w-full px-4 rounded-md py-3 flex items-center justify-center gap-3 text-[13px] font-semibold text-white bg-green-600">
                        {CREATOR_ACTIONS[2].icon}
                        {t(`${CREATOR_ACTIONS[2].value}`)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

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

export default PropertyDetailsDesktop;
