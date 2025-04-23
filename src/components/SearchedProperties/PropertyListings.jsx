"use client";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "../Cards/PropertyCard";
import { useFormContext } from "react-hook-form";
import Loader from "../Reusables/Loader";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PropertyListings = ({
  properties,
  locationsData,
  isFetchingData,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  const methods = useFormContext();
  const { locale } = useParams();
  const router = useRouter();
  const translate = useTranslations("propertyListings");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="hidden md:block">
      <section className={`min-h-screen`}>
        <PropertyFilter
          locationsData={locationsData}
          onReset={() => {
            methods.reset({});
            router.push(`/${locale}/properties`, undefined, { shallow: false });
          }}
        />

        <div className="px-4 md:px-12 py-10 w-full grow">
          {isFetchingData ? (
            <Loader customMessage={translate("fetchingData")} />
          ) : (
            <div className="grid grid-cols-1 md-lg:grid-cols-2 xl:grid-cols-3 gap-6 2xl:grid-cols-4">
              {properties.length > 0
                ? properties.map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))
                : !isFetchingNextPage && (
                    <p className="text-center text-gray-600">
                      {translate("noPropertiesFound")}
                    </p>
                  )}
            </div>
          )}

          <div ref={ref} className="flex flex-col items-center mt-8">
            {isFetchingNextPage && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <div className="text-green-600">
                  {translate("loadingMoreProperties")}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyListings;
