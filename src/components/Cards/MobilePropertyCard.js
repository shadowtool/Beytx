import { axiosInstance } from "@/lib/axios";
import { ROUTES } from "@/constants/routes";
import {
  BathroomIcon,
  BedIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  MailIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/imports/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import LikeButton from "../Misc/LikeButton";
import { toggleListingInSavedListings } from "@/lib/mutationFunctions";
import { useSession } from "next-auth/react";
import { AreaIcon, LocationIcon } from "@/imports/images";
import Image from "next/image";

const MobilePropertyCard = ({ property, cardType }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { locale } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const cardsTranslations = useTranslations("cards");
  const translatePropertyTypes = useTranslations("propertyTypes");
  const { data: session } = useSession();

  const { mutate: deleteProperty } = useMutation({
    mutationFn: (propertyId) => deletePropertyMutation(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTES.GET_PROPERTIES]);
    },
    onError: (error) => {
      console.error(cardsTranslations("errorArchivingProperty"), error);
    },
  });

  const deletePropertyCall = (id) => {
    deleteProperty(id);
  };

  const [dragging, setDragging] = useState(false); // Track if user is dragging

  const images = property?.images ?? [
    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png",
  ];

  const handleSwipe = (offsetX) => {
    if (offsetX > 100) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (offsetX < -100) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

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

  const { mutateAsync: toggleSaveListing } = useMutation({
    mutationFn: () =>
      toggleListingInSavedListings(session?.user?.id, property?._id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        ROUTES.GET_USER_SAVED_LISTINGS,
        ROUTES.GET_PROPERTIES,
      ]);
    },
  });

  return (
    <div
      key={property?._id}
      className="w-full border bg-white shadow-md hover:shadow-xl cursor-pointer relative overflow-hidden"
    >
      <div className="relative h-52">
        <motion.div
          className="flex w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragStart={() => setDragging(true)}
          onDragEnd={(event, info) => {
            setDragging(false);
            handleSwipeRelease(info.offset.x, info.velocity.x);
          }}
          style={{
            display: "flex",
          }}
        >
          {images.map((image, index) => (
            <motion.img
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
            />
          ))}
        </motion.div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
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
        {cardType !== "userListing" && cardType !== "savedListing" && (
          <div className="min-h-10 max-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-full shadow absolute top-4 right-4 bg-white">
            <LikeButton
              isLiked={property?.isLiked}
              onClick={async () => {
                await toggleSaveListing();
              }}
            />
          </div>
        )}
      </div>
      <div
        className="p-4 flex"
        onClick={() => {
          return router.push(
            `/${locale}/${property?.status}/${property?.location?.country}/${property?.location?.city}/${property?._id}`
          );
        }}
      >
        <div className="flex-1">
          <p className="text-zinc-600">
            {translatePropertyTypes(property?.type?.toLowerCase())}
          </p>
          <h4 className="text-green-700 mt-1 mb-2 ">{property?.price} KWD</h4>
          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-gray-500 flex items-center mb-2 mt-1 ">
              <Image
                src={LocationIcon}
                alt={"location-icon"}
                className="h-5 w-auto object-contain"
              />
              {property?.location?.city}
            </p>
            <div className="text-gray-500 mt-2 flex items-center space-x-2">
              <p className="flex items-center  ">
                <BedIcon size={14} className="mr-1" />
                {property?.bedrooms} {cardsTranslations("beds")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center  ">
                <BathroomIcon size={14} className="mr-1" />
                {property?.bathrooms} {cardsTranslations("baths")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center  ">
                <Image
                  src={AreaIcon}
                  alt={"area-icon"}
                  className="h-5 w-auto object-contain"
                />
                {property?.size} {cardsTranslations("areaNotation")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0 px-2 pb-2 flex justify-between border-t border-gray-300 pt-4 flex-col gap-2">
        <>
          {cardType === "userListing" ? (
            <>
              <div className="flex gap-2 w-full">
                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur   md:     w-full grow"
                  onClick={() => {
                    router.push(
                      `/${locale}/properties/create/${property?._id}`
                    );
                  }}
                >
                  <EditIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("edit")}
                </button>

                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur   md:     w-full grow"
                  onClick={() => {
                    deletePropertyCall(property?._id);
                  }}
                >
                  <DeleteIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("delete")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur   md:     w-full grow">
                  <CallIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("call")}
                </button>
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur   md:     w-full grow">
                  <WhatsappIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("whatsapp")}
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default MobilePropertyCard;
