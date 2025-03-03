import { axiosInstance } from "@/axios";
import { ROUTES } from "@/constants/routes";
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
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

const PropertyListCard = ({ property, cardType, selectedView }) => {
  const router = useRouter();

  const { locale } = useParams();

  const queryClient = useQueryClient();

  const cardsTranslations = useTranslations("Cards");

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
  return (
    <div
      key={property?._id}
      className="border rounded-lg max-h-48 bg-white flex items-center shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden "
      onClick={() => {
        if (cardType !== "UserlistingCard") {
          return router.push(`/${locale}/properties/${property?._id}`);
        }
      }}
    >
      <div className="h-full w-full max-w-48 mr-8 relative">
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
          className="min-h-52 max-h-52 min-w-52 max-w-52 object-cover"
        />
      </div>
      <div className="p-4 flex w-full grow">
        <div className="flex-1">
          <p className="text-pretty text-zinc-600">{property?.type}</p>
          <p className="text-green-700 font-bold mt-1 mb-2 text-xl">
            KWD {property?.price}
          </p>
          <h3 className="text-base text-zinc-600 font-semibold transition-colors duration-500">
            {property?.title}
          </h3>
          <div className="mt-2 flex flex-col items-start text-balance">
            <p className="text-green-700 text-base font-semibold flex items-center mb-2 mt-1 ">
              <LocationIcon size={21} />

              {property?.location}
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
      <div className="mt-0 px-2 pb-2 flex justify-between gap-2">
        <>
          {cardType === "UserlistingCard" ? (
            <>
              <div className="flex gap-2 w-full">
                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow"
                  onClick={() => {
                    router.push(`/${locale}/properties/${property?._id}`);
                  }}
                >
                  <ViewIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("view")}
                </button>
                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow"
                  onClick={() => {
                    router.push(
                      `/${locale}/properties/create/${property?._id}`
                    );
                  }}
                >
                  <EditIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("edit")}
                </button>

                <button
                  className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow"
                  onClick={() => {
                    deletePropertyCall(property?._id);
                  }}
                >
                  <DeleteIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("delete")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <button className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow">
                  <CallIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("call")}{" "}
                </button>
                <button className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow">
                  <WhatsappIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("whatsapp")}{" "}
                </button>
              </div>
              <div className="flex gap-1 w-full">
                <button className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow">
                  <MailIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("email")}
                </button>
                <button className="text-white px-4 py-2 rounded-md flex max-h-10 items-center bg-green-600 backdrop-blur text-sm font-semibold w-full grow">
                  <ShareIcon size={21} color="#fff" className="mr-2" />
                  {cardsTranslations("share")}
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default PropertyListCard;
