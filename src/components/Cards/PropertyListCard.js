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
  ViewIcon,
  WhatsappIcon,
} from "@/imports/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AreaIcon, LocationIcon } from "@/imports/images";
import Image from "next/image";
import { archivePropertyMutation } from "@/lib/mutationFunctions";
import { CldImage } from "next-cloudinary";
import { useModal } from "@/context/ModalContext";

const PropertyListCard = ({ property, cardType }) => {
  const [showUserPhoneNumber, setShowUserPhoneNumber] = useState(false);

  const router = useRouter();

  const { openModal } = useModal();

  const { locale } = useParams();

  const queryClient = useQueryClient();

  const translateCards = useTranslations("cards");

  const locationTranslations = useTranslations("locations");

  const translatePropertyTypes = useTranslations("propertyTypes");

  const { mutate } = useMutation({
    mutationFn: (variables) => archivePropertyMutation(variables),
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTES.GET_PROPERTIES]);
    },
    onError: (error) => {
      console.error("Error archiving property:", error);
    },
  });

  const archivePropertyCall = (id) => {
    mutate({ propertyId: id });
  };
  return (
    <div
      key={property?._id}
      className="border rounded-lg max-h-36 bg-white flex items-center shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.005] relative overflow-hidden "
      onClick={() => {
        if (cardType !== "UserlistingCard") {
          return router.push(
            `/${locale}/${property?.status}/${property?.location?.country}/${property?.location?.city}/${property?._id}`
          );
        }
      }}
    >
      <div className="h-full w-full max-w-36 mr-4 relative">
        <div
          className={`absolute top-2 left-2 w-fit px-3 py-1 rounded-md text-white bg-emerald-600 text-xs`}
        >
          {property?.status === "sale"
            ? translateCards("sale")
            : translateCards("rent")}{" "}
        </div>
        <CldImage
          src={property?.images?.[0]}
          alt={locale === "en" ? property?.title : property?.titleArabic}
          width="144"
          height="144"
          className="min-h-36 max-h-36 min-w-36 max-w-36 object-cover"
        />
      </div>
      <div className="p-4 flex w-full grow">
        <div className="flex-1">
          <p className="text-pretty text-zinc-600">
            {" "}
            {translatePropertyTypes(property?.type?.toLowerCase())}
          </p>
          <p className="text-green-700 mt-1 mb-2">
            {new Intl.NumberFormat("en-US", {
              style: "decimal",
              maximumFractionDigits: 0,
            }).format(property?.price)}{" "}
            KWD
          </p>

          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-gray-500 flex items-center mb-2 mt-1 ">
              <Image
                src={LocationIcon}
                alt="area-icon"
                className="h-5 w-auto object-contain"
              />
              {locationTranslations(property?.location?.city)}
            </p>
            <div className="text-gray-500 mt-2 flex items-center gap-2">
              <p className="flex items-center ltr:flex-row rtl:flex-row-reverse">
                <BedIcon size={14} className="mr-1" />
                {property?.bedrooms} {translateCards("beds")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center ltr:flex-row rtl:flex-row-reverse">
                <BathroomIcon size={14} className="mr-1" />
                {property?.bathrooms} {translateCards("baths")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center ltr:flex-row rtl:flex-row-reverse">
                <Image
                  src={AreaIcon}
                  alt="area-icon"
                  className="h-5 w-auto object-contain"
                />
                {property?.size} {translateCards("areaNotation")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0 px-2 pb-2 flex justify-between gap-2">
        <>
          {cardType === "UserlistingCard" ? (
            <>
              <div className="flex gap-2 w-full">
                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={() => {
                    router.push(`/${locale}/properties/${property?._id}`);
                  }}
                >
                  <ViewIcon size={21} color="#fff" className="mr-2" />
                  {translateCards("view")}
                </button>
                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-amber-500 backdrop-blur w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={() => {
                    router.push(
                      `/${locale}/properties/create/${property?._id}`
                    );
                  }}
                >
                  <EditIcon size={21} color="#fff" className="mr-2" />
                  {translateCards("edit")}
                </button>

                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-red-700 backdrop-blur w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={() => {
                    openModal("deleteConfirmation", {
                      onConfirm: () => archivePropertyCall(property?._id),
                    });
                  }}
                >
                  <DeleteIcon size={21} color="#fff" className="mr-2" />
                  {translateCards("delete")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <a
                  href={`tel:${property?.userId?.phoneNumber.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse whitespace-nowrap"
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
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
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

export default PropertyListCard;
