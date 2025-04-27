"use client";
import MobilePropertyListings from "@/components/SearchedProperties/MobilePropertyListings";
import PropertyListings from "@/components/SearchedProperties/PropertyListings";
import { ROUTES } from "@/constants/routes";
import { fetchCities, fetchPropertyListings } from "@/lib/queryFunctions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const itemsPerPage = 10;

export default function index() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const getFiltersFromURL = () => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      location: params?.loc ? params.loc : "",
      type: params?.type ? params.type.split(",") : [],
      status: params.status || "",
      beds: params.bed ? Number(params.bed) : "",
      baths: params.bath ? Number(params.bath) : "",
      price_from: params.price_from ? Number(params.price_from) : "",
      price_to: params.price_to ? Number(params.price_to) : "",
      sortBy: params?.sortBy || "",
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
    if (isLocationsFetched && locationsData?.length > 0) {
      const params = Object.fromEntries(searchParams.entries());
      if (params?.loc) {
        const selectedLocation = locationsData?.find(
          (el) => el?.city === params?.loc
        );
        if (selectedLocation) {
          methods.setValue("locationDropdown", selectedLocation);
        }
      }
    }
  }, [locationsData, isLocationsFetched]);

  useEffect(() => {
    let searchParams;
    if (Object.keys(formValues)?.length > 0) {
      searchParams = new URLSearchParams(window.location.search);
    } else {
      searchParams = new URLSearchParams();
    }

    if (formValues.locationDropdown) {
      searchParams.set("loc", formValues.locationDropdown.city);
    }

    if (formValues.type?.length) {
      searchParams.set("type", formValues.type.join(","));
    }

    if (formValues.status) {
      searchParams.set("status", formValues.status);
    }

    if (formValues.beds) {
      searchParams.set("bed", formValues.beds);
    }

    if (formValues.baths) {
      searchParams.set("bath", formValues.baths);
    }

    if (formValues.price_from) {
      searchParams.set("price_from", formValues.price_from);
    }

    if (formValues.price_to) {
      searchParams.set("price_to", formValues.price_to);
    }

    if (formValues.sortBy) {
      searchParams.set("sortBy", formValues.sortBy);
    }

    router.replace(`?${searchParams.toString()}`);
  }, [formValues, router]);

  return (
    <main>
      <FormProvider {...methods}>
        <PropertyListings
          properties={properties}
          locationsData={locationsData}
          isFetchingData={isPending}
          isFetchingNextPage={isFetchingNextPage}
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
