"use client";
import { axiosInstance } from "@/axios";
import PropertyCard from "@/components/Cards/PropertyCard";
import Loader from "@/components/Reusables/Loader";
import { ROUTES } from "@/constants/routes";
import { fetchPropertiesOfLoggedUser } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const index = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const { locale } = useParams();

  const { isLoading, data: properties } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, session],
    queryFn: () => fetchPropertiesOfLoggedUser(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  return (
    <div className="p-12 min-h-screen flex flex-col items-start">
      <h2 className="text-4xl font-medium">Your Properties</h2>

      <div className="grow h-full w-full flex items-center justify-center flex-col">
        {isLoading ? (
          <Loader />
        ) : properties?.length <= 0 ? (
          <>
            <h5 className="text-2xl font-medium"> No properties created yet</h5>
            <button
              className="h-fit w-fit px-6 py-3 bg-green-600 rounded-md text-xl font-medium text-white mt-8"
              onClick={() => router.push(`/${locale}/properties/create`)}
            >
              Add A Property
            </button>
          </>
        ) : (
          <div className="grid grid-cols-4 gap-4 mt-6 h-full w-full">
            {properties?.map((property, index) => (
              <PropertyCard
                property={property}
                key={index}
                cardType={"UserlistingCard"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
