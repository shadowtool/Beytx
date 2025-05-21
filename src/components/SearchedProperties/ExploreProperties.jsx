"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import PropertyListings from "./PropertyListings";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyListings } from "@/lib/queryFunctions";
import { PROPERTY_STATUS } from "@/constants/propertyStatus";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

const itemsPerPage = 10;

export default function ExploreProperties({ locale, slug }) {
  const methods = useForm({ defaultValues: {} });
  const loadMoreRef = useRef(null);
  const formValues = useWatch({ control: methods.control });

  // Build the filters object for your API
  const filters = useMemo(() => {
    const raw = {
      location: formValues.location ? [formValues.location] : [],
      type: formValues.type ? formValues.type : [],
      status: formValues.status,
      bedrooms: formValues.beds,
      bathrooms: formValues.baths,
      sortBy: formValues.sortBy,
      minPrice: formValues.price_from,
      maxPrice: formValues.price_to,
    };

    // drop empty fields
    const filtered = Object.fromEntries(
      Object.entries(raw).filter(([_, v]) =>
        Array.isArray(v)
          ? v.some((x) => x != null && x !== "" && x !== 0)
          : v != null && v !== "" && v !== 0
      )
    );

    // stringify arrays for the API
    Object.entries(filtered).forEach(([k, v]) => {
      if (Array.isArray(v)) filtered[k] = JSON.stringify(v);
    });

    return filtered;
  }, [formValues]);

  // === Data fetching ===
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
    getNextPageParam: (last) =>
      last.currentPage < last.totalPages ? last.currentPage + 1 : undefined,
  });

  const { data: locationsData, isFetched: isLocationsFetched } = useQuery({
    queryKey: [ROUTES.GET_LOCATIONS],
    queryFn: fetchCities,
  });

  const totalCount = data?.pages?.[0]?.totalCount || 0;
  const properties = data?.pages?.flatMap((p) => p.properties) || [];

  // Infinite-scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // === NEW: slug-parsing to auto-set status/type/location ===
  useEffect(() => {
    if (!slug || !Array.isArray(slug) || !isLocationsFetched) return;

    const locationSlugs = locationsData.map((c) => c.city.toLowerCase());

    const statusSegment = slug.find((s) =>
      PROPERTY_STATUS?.map((el) => el?.toLowerCase())?.includes(
        s?.toLowerCase()
      )
    );
    const typeSegment = slug.find((s) =>
      PROPERTY_TYPES?.map((el) => el?.toLowerCase())?.includes(s?.toLowerCase())
    );
    const locationSegment = slug.find((s) =>
      locationSlugs.includes(s?.toLowerCase())
    );

    methods.reset({
      status: statusSegment || "",
      type: typeSegment ? [typeSegment] : [],
      location: locationSegment ? [locationSegment] : [],
      locationDropdown: locationSegment
        ? locationsData.find((c) => c.city === locationSegment)
        : undefined,
    });
  }, [slug, isLocationsFetched, locationsData, methods]);

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
