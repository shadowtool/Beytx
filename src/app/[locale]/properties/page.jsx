"use client";
import MobilePropertyListings from "@/components/SearchedProperties/MobilePropertyListings";
import PropertyListings from "@/components/SearchedProperties/PropertyListings";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyListings } from "@/lib/queryFunctions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const itemsPerPage = 9;

export default function index() {
  const searchParams = useSearchParams();

  // Function to extract filters from URL
  const getFiltersFromURL = () => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      location: params?.loc ? [params.loc] : [],
      propertyType: params?.type ? [params.type] : [],
      propertyStatus: params.status || "",
      beds: params.bed ? Number(params.bed) : "",
      baths: params.bath ? Number(params.bath) : "",
      sortBy: "",
    };
  };

  // Initialize react-hook-form with default values from URL
  const methods = useForm({
    defaultValues: getFiltersFromURL(),
  });

  const loadMoreRef = useRef(null);

  const formValues = useWatch({ control: methods.control });

  const filters = useMemo(() => {
    const filtersToReturn = Object.fromEntries(
      Object.entries({
        location: formValues?.location,
        type: formValues?.propertyType,
        status: formValues?.propertyStatus,
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

    // Stringify array values in filters
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
    isFetching,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: [ROUTES.GET_PROPERTIES],
    queryFn: ({ pageParam = 1 }) =>
      fetchPropertyListings(pageParam, itemsPerPage, filters),
    getNextPageParam: (lastPage) => {
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
      { threshold: 1.0 }
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
          isFetchingData={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
        <MobilePropertyListings
          properties={properties}
          locationsData={locationsData}
          refetchListings={refetch}
          isFetchingData={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
          totalCount={totalCount}
        />
      </FormProvider>
    </main>
  );
}
