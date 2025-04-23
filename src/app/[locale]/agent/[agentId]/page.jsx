"use client";
import MobilePropertyCard from "@/components/Cards/MobilePropertyCard";
import PropertyCard from "@/components/Cards/PropertyCard";
import Loader from "@/components/Reusables/Loader";
import { ROUTES } from "@/constants/routes";
import useMediaQuery from "@/hooks/useMediaQuery";
import { fetchAgentListings, fetchUserInfo } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const index = () => {
  const { agentId } = useParams();

  const { data: agentData, isLoading } = useQuery({
    queryKey: [ROUTES.GET_USER_INFO],
    queryFn: () => fetchUserInfo(agentId),
    enabled: !!agentId,
  });

  const { isBigScreen } = useMediaQuery();

  return (
    <div className="container mx-auto p-12 min-h-screen">
      {isLoading ? (
        <Loader customMessage={"Fetching agent details"} />
      ) : (
        <>
          <div className="w-full flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% mb-12">
            <div className="flex gap-4">
              <Image
                src={agentData?.image}
                alt="agent-image"
                height={128}
                width={128}
                className="min-h-24 min-w-24 max-h-24 max-w-24 object-cover rounded-full border-2 border-solid border-softGray"
              />
              <div className="flex flex-col gap-1.5">
                <h3 className="font-medium text-white">{agentData?.name}</h3>
                <p className="text-white text-xs">
                  Email : <span>{agentData?.email}</span>
                </p>
                <p className="text-white text-xs">
                  Phone number : <span>{agentData?.phoneNumber}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-white">Listings</p>
                <h4 className="font-semibold text-white">
                  {agentData?.properties?.length || 0}
                </h4>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
            {agentData?.properties.length > 0
              ? agentData?.properties.map((property, index) => (
                  <>
                    {isBigScreen ? (
                      <PropertyCard property={property} />
                    ) : (
                      <MobilePropertyCard property={property} />
                    )}
                  </>
                ))
              : !isLoading && (
                  <p className="text-center text-gray-600">
                    No Properties Found
                  </p>
                )}
          </div>
        </>
      )}
    </div>
  );
};

export default index;
