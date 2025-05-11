"use client";

import PropertyListings from "./PropertyListings";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyListings } from "@/lib/queryFunctions";

const itemsPerPage = 10;

export default function ExploreProperties({ locale, slug }) {
  const methods = useForm({
    defaultValues: {},
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
      return lastPage?.currentPage < lastPage?.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  const { data: locationsData, isFetched: isLocationsFetched } = useQuery({
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

  useEffect(() => {
    if (slug && Array.isArray(slug) && isLocationsFetched) {
      const [status, type, locationCity] =
        locale === "ar" ? slug.slice(-3) : slug.slice(0, 3);

      methods.reset({
        status: status || undefined,
        type: type ? [type] : [],
        location: locationCity ? [locationCity] : [],
        locationDropdown: locationCity
          ? locationsData?.find((el) => el?.city === locationCity)
          : undefined,
      });
    }
  }, [slug, methods, locationsData, isLocationsFetched]);

  return (
    <FormProvider {...methods}>
      <PropertyListings
        properties={properties}
        locationsData={locationsData}
        refetchListings={refetch}
        isFetchingData={isPending}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
        totalCount={totalCount}
      />
    </FormProvider>
  );
}
