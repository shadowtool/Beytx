"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Reusables/Misc/Loader";
import {
  CREATOR_ACTIONS,
  DEFAULT_IMAGES_FOR_TYPES,
  FALLBACK_IMAGE_URL,
} from "@/constants/constants";
import Image from "next/image";
import { motion } from "framer-motion";
import { BathroomIcon, BedIcon, DownIcon } from "@/imports/icons";
import PropertyImagesModal from "../Reusables/Modals/PropertyImagesModal";
import MapPicker from "../Reusables/Misc/MapPicker";
import { AreaIcon, LocationIcon } from "@/imports/images";
import { useTranslations } from "next-intl";
import SimilarProperties from "./SimilarProperties";
import { useParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

const PropertyDetailsMobile = ({ loading, propertyData }) => {
  const { locale } = useParams();
  const t = useTranslations("propertyDetails");
  const locationsTranslations = useTranslations("locations");

  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [propertyData?.description, propertyData?.descriptionArabic]);

  const images = propertyData?.images ?? [FALLBACK_IMAGE_URL];

  const handleSwipeRelease = (offsetX, velocityX) => {
    if (offsetX > 200 || velocityX > 0.5) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (offsetX < -200 || velocityX < -0.5) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const MotionImage = motion(CldImage);

  return (
    <div className="md:hidden">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="p-0 md:px-12 w-full md:py-8 overflow-hidden">
            <div className="relative h-52">
              {images?.length <= 0 ? (
                <div className="h-full w-full object-contain bg-[#2f3b56] max-h-[450px]">
                  <Image
                    height={600}
                    width={400}
                    src={
                      DEFAULT_IMAGES_FOR_TYPES[propertyData?.type] ||
                      FALLBACK_IMAGE_URL
                    }
                    alt={`property-image-default}`}
                    className="w-full h-52 object-contain flex-shrink-0"
                  />
                </div>
              ) : (
                <motion.div
                  className="flex ltr:flex-row rtl:flex-row-reverse w-full h-full"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(event, info) => {
                    handleSwipeRelease(info.offset.x, info.velocity.x);
                  }}
                >
                  {images.map((image, index) => (
                    <MotionImage
                      height={600}
                      width={400}
                      key={index}
                      src={image}
                      alt={`property-image-${index}`}
                      className="w-full h-52 object-cover flex-shrink-0"
                      style={{
                        flex: "0 0 100%",
                      }}
                      animate={{
                        x: `-${selectedImageIndex * 100}%`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      onClick={() => setOpenImagesModal(true)}
                    />
                  ))}
                </motion.div>
              )}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 ltr:flex-row rtl:flex-row-reverse">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full bg-white transition-all duration-300 ${
                      index === selectedImageIndex ? "scale-150" : "scale-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-8 mb-24">
            <div className="w-full grow px-4">
              <div>
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4">
                  <h4 className="text-gray-800 text-left">
                    {t("pricePerYear", {
                      price:
                        locale === "ar"
                          ? propertyData?.priceArabic
                          : new Intl.NumberFormat("en-US", {
                              style: "decimal",
                              maximumFractionDigits: 0,
                            }).format(propertyData?.price),
                    })}
                  </h4>
                  <p className="text-gray-500 flex items-center my-4">
                    <Image
                      src={LocationIcon}
                      alt={t("locationIconAlt")}
                      className="h-5 w-auto object-contain"
                    />
                    {locationsTranslations(propertyData?.location?.city)}
                  </p>
                  <div className="flex gap-6 w-full items-center text-gray-600 my-8">
                    <div className="flex flex-col w-full grow xs:max-w-fit gap-2 items-center">
                      <BedIcon color="#aaa" size={28} />
                      <span className="text-xs font-medium">
                        {t("bedrooms", {
                          count:
                            locale === "ar"
                              ? propertyData?.bedroomsArabic
                              : propertyData?.bedrooms,
                        })}
                      </span>
                    </div>
                    <div className="h-16 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-2 w-full grow xs:max-w-fit items-center">
                      <BathroomIcon color="#aaa" size={28} />
                      <span className="text-xs font-medium">
                        {t("bathrooms", {
                          count:
                            locale === "ar"
                              ? propertyData?.bathroomsArabic
                              : propertyData?.bathrooms,
                        })}
                      </span>
                    </div>
                    <div className="h-16 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-2 w-full grow xs:max-w-fit items-center">
                      <Image
                        src={AreaIcon}
                        alt="area-icon"
                        className="h-5 w-auto object-contain"
                      />
                      <span className="text-xs font-medium">
                        {t("area", {
                          size:
                            locale === "ar"
                              ? propertyData?.sizeArabic
                              : propertyData?.size,
                        })}
                      </span>
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
                        __html:
                          locale === "ar"
                            ? propertyData?.descriptionArabic
                            : propertyData?.description,
                      }}
                      className={locale === "ar" ? "rtl" : "ltr"}
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

                <div className="border-t border-solid border-gray-300 py-6">
                  <h2>{t("amenities")}</h2>
                  <div className="mt-4 flex flex-col gap-2">
                    {propertyData?.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-12">
                  <h2 className="mb-4">{t("location")}</h2>
                  <MapPicker location={propertyData?.location} isReadable />
                </div>
              </div>
            </div>

            <div className="bg-green-100 px-4 py-12 rounded-md flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-3 mt-4">
                <Image
                  src={
                    propertyData?.userId?.image ?? "/images/user-default.png"
                  }
                  onError={(e) => {
                    e.target.src = "/images/user-default.png";
                  }}
                  alt="#"
                  height={112}
                  width={112}
                  className="min-h-28 max-h-28 min-w-28 max-w-28 object-cover rounded-full border-2 border-solid border-green-600"
                />

                <div className="flex gap-1 flex-col">
                  <h5 className="text-black">{propertyData?.userId?.name}</h5>
                </div>
              </div>

              <div className="flex items-center flex-col justify-between gap-3 mt-6 min-w-80 max-w-80">
                <div className="flex gap-3 w-full">
                  {CREATOR_ACTIONS?.slice(0, 2).map((el, idx) => (
                    <a
                      key={idx}
                      className="h-fit w-full px-4 rounded-md py-3 flex items-center justify-center gap-3 text-[13px] font-semibold text-white bg-green-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        el?.value === "call"
                          ? `tel:${propertyData?.userId?.phoneNumber.replace(
                              /\s/g,
                              ""
                            )}`
                          : `https://wa.me/${propertyData?.userId?.phoneNumber.replace(
                              /\s/g,
                              ""
                            )}`
                      }
                    >
                      {el.icon}
                      {t(el.value)}
                    </a>
                  ))}
                </div>
                <div className="w-full mt-3">
                  {CREATOR_ACTIONS?.[2] && (
                    <button
                      className="w-full px-4 rounded-md py-3 flex items-center justify-center gap-3 text-[13px] font-semibold text-white bg-green-600"
                      onClick={() => {
                        router.push(
                          `/${locale}/agent/${propertyData?.userId?._id}`
                        );
                      }}
                    >
                      {CREATOR_ACTIONS[2].icon}
                      {t(CREATOR_ACTIONS[2].value)}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <SimilarProperties propertyData={propertyData} />

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
