"use client";
import MobilePropertyListings from "@/components/SearchedProperties/MobilePropertyListings";
import PropertyListings from "@/components/SearchedProperties/PropertyListings";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyListings } from "@/lib/queryFunctions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const itemsPerPage = 10;

export default function index() {
  const searchParams = useSearchParams();

  const getFiltersFromURL = () => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      location: params?.loc ? [params.loc] : [],
      type: params?.type ? [params.type] : [],
      status: params.status || "",
      beds: params.bed ? Number(params.bed) : "",
      baths: params.bath ? Number(params.bath) : "",
      sortBy: "",
    };
  };

  const methods = useForm({
    defaultValues: getFiltersFromURL(),
  });

  const loadMoreRef = useRef(null);

  const formValues = useWatch({ control: methods.control });

  const filters = useMemo(() => {
    const filtersToReturn = Object.fromEntries(
      Object.entries({
        location: formValues?.location ? [formValues.location] : [],
        type: formValues?.type ? formValues.type : [],
        status: formValues?.status,
        bedrooms: formValues?.beds,
        bathrooms: formValues?.baths,
        sortBy: formValues?.sortBy,
        minPrice: formValues?.price_from,
        maxPrice: formValues?.price_to,
      }).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.some((v) => v != null && v !== "" && v !== 0);
        }
        return value != null && value !== "" && value !== 0;
      })
    );

    Object.entries(filtersToReturn).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        filtersToReturn[key] = JSON.stringify(value);
      }
    });
    return filtersToReturn;
  }, [formValues]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: [ROUTES.GET_PROPERTIES, filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchPropertyListings(pageParam, itemsPerPage, filters),
    getNextPageParam: (lastPage) => {
      console.log({ lastPage });
      return lastPage?.currentPage < lastPage?.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  const { data: locationsData } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const totalCount = data?.pages?.[0]?.totalCount || 0;

  const properties = data?.pages?.flatMap((page) => page.properties) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main>
      <FormProvider {...methods}>
        <PropertyListings
          properties={properties}
          locationsData={locationsData}
          refetchListings={refetch}
          isFetchingData={isPending}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
        <MobilePropertyListings
          properties={properties}
          locationsData={locationsData}
          refetchListings={refetch}
          isFetchingData={isPending}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
          totalCount={totalCount}
        />
      </FormProvider>
    </main>
  );
}
