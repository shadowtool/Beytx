"use client";
import { useRef, useEffect } from "react";
import PropertyFilter from "./PropertyFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import Loader from "./Reusables/Loader";
import PropertyCard from "./Cards/PropertyCard";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { axiosInstance } from "@/axios";
import { fetchPropertyListings } from "@/lib/queryFunctions";

const itemsPerPage = 9;

const PropertyListings = () => {
  const methods = useForm();
  const loadMoreRef = useRef(null);
  const filterBarRef = useRef(null);

  const formValues = useWatch({ control: methods.control });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["properties", formValues],
    queryFn: ({ pageParam }) =>
      fetchPropertyListings(pageParam, itemsPerPage, formValues),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === itemsPerPage
        ? allPages.length + 1
        : undefined;
    },
  });

  const properties = data?.pages.flat() || [];

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

  useEffect(() => {
    const handleScroll = () => {
      if (filterBarRef.current) {
        if (window.scrollY > filterBarRef.current.offsetTop) {
          filterBarRef.current.classList.add(
            "fixed",
            "top-0",
            "left-1/2",
            "transform",
            "-translate-x-1/2",
            "w-3/5",
            "max-w-8xl",
            "flex",
            "justify-center",
            "mb-10",
            "z-[9999]"
          );
        } else {
          filterBarRef.current.classList.remove(
            "fixed",
            "top-0",
            "left-1/2",
            "transform",
            "-translate-x-1/2",
            "w-3/5",
            "max-w-8xl",
            "flex",
            "justify-center",
            "mb-10"
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader customMessage={"Fetching properties"} />
        </div>
      ) : (
        <section
          className="container mx-auto py-10 px-4"
          style={{ minHeight: "100vh" }}
        >
          <div ref={filterBarRef} className="w-full max-w-8xl mx-auto mb-6">
            <FormProvider {...methods}>
              <PropertyFilter />
            </FormProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.length > 0
              ? properties.map((property, index) => (
                  <PropertyCard property={property} index={index} />
                ))
              : !isFetchingNextPage && (
                  <p className="text-center text-gray-600 text-xl">
                    No properties found.
                  </p>
                )}
          </div>

          {/* Load More Indicator */}
          <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600 text-xl">
                  Loading more properties...
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default PropertyListings;
