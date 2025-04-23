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
import React from "react";
import {
  archivePropertyMutation,
  toggleListingInSavedListings,
} from "@/lib/mutationFunctions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AreaIcon, LocationIcon } from "@/imports/images";
import LikeButton from "../Misc/LikeButton";
import { toast } from "react-toastify";
import { useModal } from "@/context/ModalContext";

const PropertyCard = ({ property, cardType }) => {
  const { locale } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const translateCards = useTranslations("cards");

  const locationTranslations = useTranslations("locations");

  const translatePropertyTypes = useTranslations("propertyTypes");

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
      <Image
        height={200}
        width={800}
        src={property?.images?.[0]}
        alt={locale === "en" ? property?.title : property?.titleArabic}
        className="w-full h-36 md:h-48 object-cover"
      />
      <div className="p-2 md:p-4 flex">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="md:text-zinc-600">
              {translatePropertyTypes(property?.type?.toLowerCase())}
            </p>
            <span
              className={`px-3 py-1 rounded-md text-white text-xs ${
                property?.status === "sale" ? "bg-emerald-600" : "bg-amber-600"
              }`}
            >
              {property?.status === "sale"
                ? translateCards("sale")
                : translateCards("rent")}
            </span>
          </div>
          <h4 className="text-green-700 mt-1 mb-2">{property?.price} KWD</h4>

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
              <p className="flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <BedIcon size={14} />
                <span className="text-xs flex gap-1">
                  {property?.bedrooms}
                  <span className="text-xs hidden md:inline">
                    {translateCards("beds")}
                  </span>
                </span>
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <BathroomIcon size={14} />
                <span className="text-xs flex gap-1">
                  {property?.bathrooms}
                  <span className="text-xs hidden md:inline">
                    {translateCards("baths")}
                  </span>
                </span>
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <Image
                  src={AreaIcon}
                  alt="area-icon"
                  className="h-5 w-auto object-contain"
                />
                <span className="text-xs flex gap-1">
                  {property?.size}
                  <span className="text-xs hidden md:inline">
                    {translateCards("areaNotation")}
                  </span>
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
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-amber-500 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
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
                  className="text-white px-0 pl-2 md:px-4 py-2 rounded-md flex items-center bg-red-700 backdrop-blur text-xs md:text-sm w-full grow gap-1 ltr:flex-row rtl:flex-row-reverse"
                  onClick={() => {
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
                onClick={() => toggleSaveListing()}
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
                  onClick={(e) => e.stopPropagation()}
                  className="text-white px-3 md:px-4 py-2 rounded-md flex items-center justify-center bg-green-600 backdrop-blur text-xs md:text-sm w-full grow max-w-fit md:max-w-full gap-1 ltr:flex-row rtl:flex-row-reverse"
                >
                  <CallIcon size={18} color="#fff" className="mr-2" />
                  <span className="flex items-center">
                    {translateCards("call")}
                  </span>
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

export default PropertyCard;
