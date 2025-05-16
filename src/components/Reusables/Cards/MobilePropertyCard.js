import { ROUTES } from "@/constants/routes";
import {
  BathroomIcon,
  BedIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  WhatsappIcon,
} from "@/imports/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import LikeButton from "../Misc/LikeButton";
import {
  archivePropertyMutation,
  deletePropertyMutation,
  toggleListingInSavedListings,
} from "@/lib/mutationFunctions";
import { useSession } from "next-auth/react";
import { AreaIcon, LocationIcon } from "@/imports/images";
import Image from "next/image";
import { toast } from "react-toastify";
import { useModal } from "@/context/ModalContext";
import { CldImage } from "next-cloudinary";
import {
  DEFAULT_IMAGES_FOR_TYPES,
  FALLBACK_IMAGE_URL,
} from "@/constants/constants";

const MotionImage = motion(CldImage);

const MobilePropertyCard = ({ property, cardType }) => {
  const [showUserPhoneNumber, setShowUserPhoneNumber] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(property?.isLiked || false);
  const { locale } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const translateCards = useTranslations("cards");
  const translatePropertyTypes = useTranslations("propertyTypes");
  const locationTranslations = useTranslations("locations");
  const { data: session } = useSession();
  const { openModal } = useModal();

  const { mutate } = useMutation({
    mutationFn: (variables) => archivePropertyMutation(variables),
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: [ROUTES.GET_PROPERTIES],
        exact: false,
      });
      toast.dismiss();
      toast.success(translateCards("deletePropertySuccess"));
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(translateCards("errorDeletingProperty"));
      console.error("Error archiving property:", error);
    },
  });

  const archivePropertyCall = (id) => {
    toast.loading(translateCards("loadingDeleteProperty"));
    mutate({ propertyId: id });
  };

  const [dragging, setDragging] = useState(false); // Track if user is dragging

  const images = property?.images;

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
      queryClient.refetchQueries({
        queryKey: [ROUTES.GET_USER_SAVED_LISTINGS],
        exact: false,
      });
    },
  });

  const handlePropertyRedirect = () => {
    const dashedTitle =
      locale === "en"
        ? property?.title?.trim().replace(/\s+/g, "-")
        : property?.titleArabic?.trim().replace(/\s+/g, "-");

    const encodedTitle = encodeURIComponent(dashedTitle);
    const encodedId = encodeURIComponent(property?._id);

    const city = encodeURIComponent(
      locationTranslations(property?.location?.city)
    );
    const country = encodeURIComponent(
      locationTranslations(property?.location?.country)
    );
    const status = encodeURIComponent(translateCards(property?.status));
    const type = encodeURIComponent(
      translatePropertyTypes(property?.type?.toLowerCase())
    );

    const segments = [country, status, type, city, encodedTitle];

    const finalSegments =
      locale === "en" ? [...segments, encodedId] : [encodedId, ...segments];

    const path = `/${locale}/${finalSegments.join("/")}`;

    return router.push(path);
  };

  return (
    <div
      key={property?._id}
      onClick={handlePropertyRedirect}
      className="w-full border bg-white shadow-md hover:shadow-xl cursor-pointer relative overflow-hidden"
    >
      {images?.length <= 0 ? (
        <div className="w-full min-h-40 max-h-40 md:max-h-52 md:min-h-52 object-contain bg-[#2f3b56]">
          <Image
            src={DEFAULT_IMAGES_FOR_TYPES[property?.type] || FALLBACK_IMAGE_URL}
            alt={locale === "en" ? property?.title : property?.titleArabic}
            width={200}
            height={600}
            className="h-full w-full min-h-36 max-h-36 md:max-h-48 md:min-h-48 object-contain"
          />
        </div>
      ) : (
        <div className="relative h-52">
          <motion.div
            className="flex ltr:flex-row rtl:flex-row-reverse w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragStart={() => setDragging(true)}
            onDragEnd={(event, info) => {
              setDragging(false);
              handleSwipeRelease(info.offset.x, info.velocity.x);
            }}
          >
            {images.map((image, index) => (
              <MotionImage
                key={index}
                src={image}
                alt={`property-image-${index}`}
                width="600"
                height="400"
                className="w-full h-52 object-cover"
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
          {cardType !== "userListing" && cardType !== "savedListing" && (
            <div className="min-h-10 max-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-full shadow absolute top-4 right-4 bg-white">
              <LikeButton
                isLiked={isLiked}
                onClick={async (e) => {
                  setIsLiked(!isLiked);
                  e.stopPropagation();
                  await toggleSaveListing();
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className="p-4 flex relative">
        <span
          className={`px-3 py-1 rounded-md text-white text-xs absolute top-5 ltr:right-5 rtl:left-5 h-fit w-fit ${
            property?.status === "sale" ? "bg-emerald-600" : "bg-amber-600"
          }`}
        >
          {property?.status === "sale"
            ? translateCards("sale")
            : translateCards("rent")}
        </span>
        <div className="flex-1">
          <p className="text-zinc-600">
            {translatePropertyTypes(property?.type?.toLowerCase())}
          </p>
          <h4 className="text-green-700 mt-1 mb-2 ">
            {Number(property?.price) === 0
              ? "N/A"
              : `${new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  maximumFractionDigits: 0,
                }).format(property?.price)}  KWD`}
          </h4>
          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-gray-500 flex items-center mb-2 mt-1 ">
              <Image
                src={LocationIcon}
                alt={"location-icon"}
                className="h-5 w-auto object-contain"
              />
              {locationTranslations(property?.location?.city)}
            </p>
            <div className="text-gray-500 mt-2 flex items-center gap-2">
              <p className="flex items-center  ">
                <BedIcon size={14} className="mr-1" />
                {property?.bedrooms || "--"} {translateCards("beds")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center  ">
                <BathroomIcon size={14} className="mr-1" />
                {property?.bathrooms || "--"} {translateCards("baths")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center  ">
                <Image
                  src={AreaIcon}
                  alt={"area-icon"}
                  className="h-5 w-auto object-contain"
                />
                {property?.size || "--"} {translateCards("areaNotation")}
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
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-amber-500 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/${locale}/properties/create/${property?._id}`
                    );
                  }}
                >
                  <EditIcon size={18} color="#fff" className="mr-2" />
                  {translateCards("edit")}
                </button>

                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-red-700 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("deleteConfirmation", {
                      onConfirm: () => archivePropertyCall(property?._id),
                    });
                  }}
                >
                  <DeleteIcon size={18} color="#fff" className="mr-2" />
                  {translateCards("delete")}
                </button>
              </div>
            </>
          ) : cardType === "savedListing" ? (
            <>
              <button
                className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-red-700 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveListing();
                }}
              >
                <DeleteIcon size={18} color="#fff" className="mr-2" />
                {translateCards("removeSavedListing")}
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <a
                  href={`tel:${property?.userId?.phoneNumber.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="text-white px-3 md:px-4 py-2 rounded-md flex items-center justify-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow md:max-w-full gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("agentInfo", {
                      userInfo: property?.userId,
                    });
                    setShowUserPhoneNumber(true);
                  }}
                >
                  {showUserPhoneNumber ? (
                    <span className="flex items-center">
                      {property?.userId?.phoneNumber}
                    </span>
                  ) : (
                    <>
                      <CallIcon size={18} color="#fff" className="mr-2" />
                      <span className="flex items-center">
                        {translateCards("call")}
                      </span>
                    </>
                  )}
                </a>
                <a
                  href={`https://wa.me/${property?.userId?.phoneNumber.replace(
                    /\s/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center justify-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WhatsappIcon size={18} color="#fff" className="mr-2" />
                  <span className="flex items-center">
                    {translateCards("whatsapp")}
                  </span>
                </a>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default MobilePropertyCard;
