"use client";
import { useRef, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/axios";
import PropertyCard from "@/components/Cards/PropertyCard";
import Loader from "@/components/Reusables/Loader";
import { fetchPropertyListings } from "@/lib/queryFunctions";

const itemsPerPage = 9;

const index = () => {
  const loadMoreRef = useRef(null);
  const { slug = [] } = useParams(); // Get slug from URL

  // Map slug parts to relevant fields
  const filters = {
    language: slug[0] || "",
    location: slug[1] || "",
    status: slug[2] || "",
    type: slug[3] || "",
    title: slug[5] || "",
  };

  // Fetch properties based on URL filters
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["properties", filters],
      queryFn: fetchPropertyListings,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length === itemsPerPage
          ? allPages.length + 1
          : undefined;
      },
    });

  const properties = data?.pages?.flat() || [];

  // Infinite scrolling
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
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader customMessage={"Fetching properties"} />
        </div>
      ) : (
        <section
          className="container mx-auto py-10 px-12"
          style={{ minHeight: "100vh" }}
        >
          <h4 className="mb-8 text-3xl font-semibold">Properties For you</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties?.length > 0
              ? properties?.map((property, index) => (
                  <PropertyCard key={index} property={property} />
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

export default index;
