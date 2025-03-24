import { axiosInstance } from "@/lib/axios";
import { ROUTES } from "@/constants/routes";
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  HeartFilledIcon,
  HeartIcon,
  LocationIcon,
  MailIcon,
  ShareIcon,
  ViewIcon,
  WhatsappIcon,
} from "@/imports/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toggleListingInSavedListings } from "@/lib/mutationFunctions";
import { useSession } from "next-auth/react";

const PropertyCard = ({ property, cardType, selectedView }) => {
  const { locale } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const cardsTranslations = useTranslations("Cards");

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
      ]);
    },
  });

  return (
    <div
      key={property?._id}
      className="min-w-[250px] max-w-[250px] md:w-full md:grow md:max-w-full border rounded-lg bg-white shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
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
        {property?.status === "sale" ? "Buy" : "Rent"}
      </div>
      <img
        src={property?.images?.[0]}
        alt={property?.title}
        className="w-full h-36 md:h-48 object-cover"
      />
      <div className="p-4 flex">
        <div className="flex-1">
          <p className="text-pretty text-sm md:text-base text-zinc-600">
            {property?.type}
          </p>
          <p className="text-green-700 font-bold mt-1 mb-2 text-xl">
            KWD {property?.price}
          </p>
          <h3 className="text-base text-zinc-600 font-semibold transition-colors duration-500">
            {property?.title}
          </h3>
          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-green-700 text-base font-semibold flex items-center mb-2 mt-1 ">
              <LocationIcon size={21} />

              {property?.location?.city}
            </p>
            <div className="text-gray-500 mt-2 flex items-center space-x-2">
              <p className="flex items-center text-sm">
                <BedIcon size={14} className="mr-1" />
                {property?.bedrooms} {cardsTranslations("beds")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center text-sm">
                <BathroomIcon size={14} className="mr-1" />
                {property?.bathrooms} {cardsTranslations("baths")}
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center text-sm">
                <AreaIcon size={14} className="mr-1" />
                {property?.size}{" "}
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
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow"
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
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow"
                  onClick={() => {
                    deletePropertyCall(property?._id);
                  }}
                >
                  <DeleteIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("delete")}
                </button>
              </div>
            </>
          ) : cardType === "savedListing" ? (
            <>
              <button
                className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow"
                onClick={() => toggleSaveListing()}
              >
                <DeleteIcon size={18} color="#fff" className="mr-2" />
                {cardsTranslations("removeSavedListing")}
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow">
                  <CallIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("call")}
                </button>
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow">
                  <WhatsappIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("whatsapp")}
                </button>
              </div>
              <div className="flex gap-1 w-full">
                <button className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow">
                  <MailIcon size={18} color="#fff" className="mr-2" />
                  {cardsTranslations("email")}
                </button>
                <button
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-green-600 backdrop-blur text-xs md:text-sm font-semibold w-full grow"
                  onClick={() => toggleSaveListing()}
                >
                  {property?.isLiked ? (
                    <>
                      <HeartFilledIcon
                        size={18}
                        color="#fff"
                        className="mr-2"
                      />
                      {cardsTranslations("removeSavedListing")}
                    </>
                  ) : (
                    <>
                      <HeartIcon size={18} color="#fff" className="mr-2" />
                      {cardsTranslations("saveListing")}
                    </>
                  )}
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
