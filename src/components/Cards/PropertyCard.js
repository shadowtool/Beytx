import { axiosInstance } from "@/lib/axios";
import { ROUTES } from "@/constants/routes";
import {
  BathroomIcon,
  BedIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  HeartFilledIcon,
  HeartIcon,
  MailIcon,
  WhatsappIcon,
} from "@/imports/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toggleListingInSavedListings } from "@/lib/mutationFunctions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AreaIcon, LocationIcon } from "@/imports/images";
import LikeButton from "../Misc/LikeButton";

const PropertyCard = ({ property, cardType, selectedView }) => {
  const { locale } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const translateCards = useTranslations("cards");
  const translatePropertyTypes = useTranslations("propertyTypes");

  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: (propertyId) => deletePropertyMutation(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTES.GET_PROPERTIES]);
    },
    onError: (error) => {
      console.error("Error archiving property:", error);
    },
  });

  const deletePropertyCall = (id) => {
    mutate(id);
  };

  const { mutateAsync: toggleSaveListing } = useMutation({
    mutationFn: () =>
      toggleListingInSavedListings(session?.user?.id, property?._id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        ROUTES.GET_USER_SAVED_LISTINGS,
        ROUTES.GET_PROPERTIES,
        ROUTES.GET_FEATURED_PROPERTIES,
      ]);
    },
  });

  return (
    <div
      key={property?._id}
      className="min-w-[220px] max-w-[220px] md:w-full md:grow md:max-w-full border rounded-lg bg-white shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
      onClick={() => {
        return router.push(
          `/${locale}/${property?.status}/${property?.location?.country}/${property?.location?.city}/${property?._id}`
        );
      }}
    >
      <div
        className={`absolute top-2 left-0 w-16 px-3 py-1 rounded-r-full text-white ${
          property?.status === "sale"
            ? "bg-emerald-800 border border-zinc-400 "
            : "bg-red-800 border border-zinc-400 "
        }`}
      >
        {property?.status === "sale"
          ? translateCards("forSale")
          : translateCards("forRent")}
      </div>
      {cardType !== "userListing" && cardType !== "savedListing" && (
        <div className="min-h-10 max-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-full shadow absolute top-4 right-4 bg-white">
          <LikeButton
            isLiked={property?.isLiked}
            onClick={async (e) => {
              e.stopPropagation();
              await toggleSaveListing();
            }}
          />
        </div>
      )}
      <img
        src={property?.images?.[0]}
        alt={property?.title}
        className="w-full h-36 md:h-48 object-cover"
      />
      <div className="p-2 md:p-4 flex">
        <div className="flex-1">
          <p className="md:text-zinc-600">
            {translatePropertyTypes(property?.type?.toLowerCase())}
          </p>
          <h4 className="text-green-700 mt-1 mb-2">{property?.price} KWD</h4>
          <p className="text-zinc-600 transition-colors duration-500">
            {property?.title}
          </p>
          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-gray-500 flex items-center mb-2 mt-1 ">
              <Image
                src={LocationIcon}
                alt="area-icon"
                className="h-5 w-auto object-contain"
              />
              {property?.location?.city}
            </p>
            <div className="text-gray-500 mt-2 flex items-center space-x-2">
              <p className="flex items-center">
                <BedIcon size={14} className="mr-1" />
                <span className="text-xs">{property?.bedrooms} </span>
                <span className="text-xs hidden md:inline ml-1">
                  {translateCards("beds")}
                </span>
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center">
                <BathroomIcon size={14} className="mr-1" />
                <span className="text-xs">{property?.bathrooms} </span>
                <span className="text-xs hidden md:inline ml-1">
                  {translateCards("baths")}
                </span>
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center">
                <Image
                  src={AreaIcon}
                  alt="area-icon"
                  className="h-5 w-auto object-contain"
                />
                {property?.size}{" "}
                <span className="ml-1  text-xs">
                  {translateCards("areaNotation")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-0 px-2 pb-2 flex justify-between border-t border-gray-300 pt-4 flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <>
          {cardType === "userListing" ? (
            <>
              <div className="flex gap-2 w-full">
                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow"
                  onClick={() => {
                    router.push(
                      `/${locale}/properties/create/${property?._id}`
                    );
                  }}
                >
                  <EditIcon size={18} color="#fff" className="mr-2" />
                  {translateCards("edit")}
                </button>

                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-red-700 backdrop-blur text-xs md:text-sm w-full grow"
                  onClick={() => {
                    deletePropertyCall(property?._id);
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
                className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-red-700 backdrop-blur text-xs md:text-sm w-full grow"
                onClick={() => toggleSaveListing()}
              >
                <DeleteIcon size={18} color="#fff" className="mr-2" />
                {translateCards("removeSavedListing")}
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <button className="text-white px-3 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow max-w-fit md:max-w-full">
                  <CallIcon size={18} color="#fff" className="mr-2" />
                  {translateCards("call")}
                </button>
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow">
                  <WhatsappIcon size={18} color="#fff" className="mr-2" />
                  {translateCards("whatsapp")}
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default PropertyCard;
