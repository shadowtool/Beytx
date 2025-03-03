"use client";

import PropertyImagesModal from "@/components/Modals/PropertyImagesModal";
import { PortraitImage } from "@/imports/images";
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  CallIcon,
  HeartIcon,
  MailIcon,
  ReportIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/imports/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DescriptionModal from "@/components/Modals/DescriptionModal";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/axios";
import Loader from "@/components/Reusables/Loader";
import { ROUTES } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyDetails } from "@/lib/queryFunctions";

const index = () => {
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const USER_ACTIONS = [
    { icon: <HeartIcon size={21} color="#16a34a" />, label: "Save" },
    { icon: <ShareIcon size={21} color="#16a34a" />, label: "Share" },
    { icon: <ReportIcon size={21} color="#16a34a" />, label: "Report" },
  ];

  const CREATOR_ACTIONS = [
    { icon: <CallIcon size={21} color="#fff" />, label: "Call" },
    { icon: <MailIcon size={21} color="#fff" />, label: "Mail" },
    { icon: <WhatsappIcon size={21} color="#fff" />, label: "Whatsapp" },
  ];

  const params = useParams();

  console.log({ params });

  const { isLoading, data: propertyData } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, params?.propertyId],
    queryFn: () => fetchPropertyDetails(params?.propertyId),
    enabled: !!params?.propertyId,
  });

  console.log({ propertyData });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {/* Properties details page */}
          <div className="px-12 w-full py-8">
            <div className="flex justify-end gap-6 w-full">
              {USER_ACTIONS.map((el, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  {el.icon}
                  <p className="text-green-600">{el.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-8">
              <div className="grow w-full relative">
                <Image
                  src={
                    propertyData?.images?.[0] ||
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                  }
                  alt="#"
                  className="h-full w-full object-cover rounded-lg max-h-[500px]"
                  onClick={() => setOpenImagesModal(true)}
                  height={500}
                  width={1400}
                />
              </div>
              <div className="min-w-96 max-w-96 grow flex flex-col gap-6">
                <Image
                  src={
                    propertyData?.images?.[1] ||
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                  }
                  alt="#"
                  className="h-full w-full grow object-cover rounded-lg max-h-[238px]"
                  onClick={() => setOpenImagesModal(true)}
                  height={500}
                  width={1400}
                />
                <Image
                  src={
                    propertyData?.images?.[2] ||
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                  }
                  alt="#"
                  className="h-full w-full grow object-cover rounded-lg max-h-[238px]"
                  onClick={() => setOpenImagesModal(true)}
                  height={500}
                  width={1400}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-8 px-12 mb-24">
            <div className="w-full grow">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-end justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    AED{" "}
                    <span className="text-black">{propertyData?.price}</span>{" "}
                    <span className="text-lg">/year</span>
                  </h2>
                  <div className="flex gap-6 items-end mt-4 text-gray-600">
                    <div className="flex flex-col gap-1 items-center">
                      <BedIcon color="#aaa" size={21} />
                      {propertyData?.bathrooms} Bedrooms
                    </div>
                    <div className="h-8 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-1 items-center">
                      <BathroomIcon color="#aaa" size={21} />
                      {propertyData?.bedrooms} Bathrooms
                    </div>
                    <div className="h-8 w-[1.5px] bg-[#aaa]"></div>
                    <div className="flex flex-col gap-1 items-center">
                      <AreaIcon color="#aaa" size={21} />
                      {propertyData?.size}
                    </div>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: propertyData?.description,
                  }}
                  className="text-black"
                />

                <button
                  className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg"
                  onClick={() => setOpenDescriptionModal(true)}
                >
                  See full description
                </button>
              </div>
            </div>
            <div className="min-w-96 sticky top-16 h-fit bg-white shadow-md rounded-md p-4">
              <div className="flex items-center justify-between gap-6">
                {CREATOR_ACTIONS.map((el, idx) => (
                  <button
                    key={idx}
                    className="h-fit w-fit grow px-4 rounded-md py-3 flex items-center text-sm gap-2 text-white bg-green-600"
                  >
                    {el.icon}
                    {el.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <img
                  src={propertyData?.user?.image}
                  alt="#"
                  className="min-h-16 max-h-16 min-w-16 max-w-16 rounded-full border-2 border-solid border-green-600"
                />
                <div className="flex gap-1 flex-col">
                  <h5 className="text-base text-black font-medium">
                    {propertyData?.user?.name}
                  </h5>
                  <p className="text-xs font-semibold">
                    <span className="text-black mr-1">
                      {propertyData?.user?.rating ?? "--"}
                    </span>
                    <span className="text-gray-700">Ratings</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal to show property images */}
          <PropertyImagesModal
            open={openImagesModal}
            handleClose={() => setOpenImagesModal(false)}
            images={propertyData?.images}
          />
          <DescriptionModal
            open={openDescriptionModal}
            handleClose={() => setOpenDescriptionModal(false)}
            propertyData={propertyData}
          />
        </>
      )}
    </>
  );
};

export default index;
