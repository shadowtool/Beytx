"use client";
import { useParams } from "next/navigation";
import { fetchPropertyDetails } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import PropertyDetailsDesktop from "@/components/PropertyDetails/PropertyDetailsDesktop";
import PropertyDetailsMobile from "@/components/PropertyDetails/PropertyDetailsMobile";

const index = () => {
  const { locale, slug } = useParams();

  const { isLoading, data: propertyData } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, slug[slug?.length - 1]],
    queryFn: () => fetchPropertyDetails(slug[slug?.length - 1]),
    enabled: !!slug[slug?.length - 1],
  });

  return (
    <>
      <PropertyDetailsDesktop loading={isLoading} propertyData={propertyData} />
      <PropertyDetailsMobile loading={isLoading} propertyData={propertyData} />
    </>
  );
};

export default index;
