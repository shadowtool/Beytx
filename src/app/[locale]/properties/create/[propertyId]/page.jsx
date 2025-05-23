"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import MultiTagInput from "@/components/Reusables/Inputs/TagInput";
import { toast } from "react-toastify";
import TextEditor from "@/components/Reusables/Inputs/TextEditor";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { fetchPropertyDetails, uploadImage } from "@/lib/queryFunctions";
import { updatePropertyMutation } from "@/lib/mutationFunctions";
import { useTranslations } from "next-intl";
import GeneralDropdown from "@/components/Reusables/Dropdowns/GeneralDropdown";
import GeneralInput from "@/components/Reusables/Inputs/GeneralInput";
import PlacesSearchDropdown from "@/components/Reusables/Dropdowns/PlacesSearchDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import FileUpload from "@/components/Reusables/Misc/FileUpload";
import Loader from "@/components/Reusables/Misc/Loader";
import { detectLanguage, translateText } from "@/lib/translation";

export default function index() {
  const translate = useTranslations("createPropertyPage");
  const propertyTypeTranslations = useTranslations("propertyTypes");
  const { data: session } = useSession();
  const methods = useForm({ defaultValues: { status: "sale" } });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("sale");
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const params = useParams();

  const router = useRouter();

  const {
    data: propertyData,
    isFetched,
    isPending,
  } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, params?.propertyId],
    queryFn: () => fetchPropertyDetails(params?.propertyId),
    enabled: !!params?.propertyId,
  });

  const { mutate: updatePropertyData, isLoading } = useMutation({
    mutationFn: (variables) => updatePropertyMutation(variables),
    onSuccess: () => {
      queryClient.invalidateQueries([
        ROUTES.GET_PROPERTIES,
        ROUTES.GET_LOCATIONS,
      ]);
      toast.success("Property Updated successfully");
      if (
        document.referrer &&
        new URL(document.referrer).origin === window.location.origin
      ) {
        router.back();
      } else {
        router.push(`/${params.locale}/dashboard`);
      }
    },
    onError: (error) => {
      console.error("Error updating property:", error);
      toast.error("Something went wrong, please try later");
    },
  });

  const { handleSubmit, setValue } = methods;

  const { mutateAsync } = useMutation({
    mutationFn: uploadImage,
  });

  const uploadImagesCall = async (imageFiles) => {
    if (!imageFiles || imageFiles.length === 0) return [];

    try {
      const uploadPromises = imageFiles.map((file) => mutateAsync(file));

      const uploadedUrls = await Promise.all(uploadPromises);

      return uploadedUrls;
    } catch (error) {
      console.error("Upload failed:", error);
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        status: data?.status,
        price: data?.price,
        location: data?.location,
        size: data?.area,
        type: data?.type,
        bedrooms: data?.beds,
        bathrooms: data?.baths,
        description: data?.description,
        images: data?.images,
        amenities: data?.amenities,
      };

      const originalLang = detectLanguage(data?.description);

      if (originalLang === "ar") {
        dataToSend.descriptionArabic = data?.description;
        const translatedDesc = await translateText(data?.description, "en");
        dataToSend.description = translatedDesc || data?.description;
      } else {
        dataToSend.description = data?.description;
        const translatedDesc = await translateText(data?.description, "ar");
        dataToSend.descriptionArabic = translatedDesc || data?.description;
      }

      const allImages = data?.images || [];
      const existingImageUrls = allImages.filter(
        (img) => typeof img === "string"
      );
      const newImageFiles = allImages.filter((img) => typeof img !== "string");

      let uploadedUrls = [];

      if (newImageFiles.length > 0) {
        toast.loading("Uploading images...");
        const response = await uploadImagesCall(newImageFiles);
        uploadedUrls = response;
        toast.dismiss();
      }

      const finalImages = [...existingImageUrls, ...uploadedUrls];

      updatePropertyData({
        ...dataToSend,
        propertyId: params?.propertyId,
        images: finalImages,
      });
    } catch (error) {
      console.error("Error submitting property:", { error });
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (isFetched) {
      const dataToSetInForm = {
        ...propertyData,
        beds: propertyData?.bedrooms,
        baths: propertyData?.bathrooms,
        area: propertyData?.size,
      };
      methods.reset(dataToSetInForm ?? {});
    }
  }, [isFetched, propertyData]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>{translate("loginMessageText")}</p>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {translate("login")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isPending ? (
        <Loader />
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row justify-center gap-4 px-12 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setValue("status", status === "sale" ? "" : "sale");
                        setStatus(status === "sale" ? "" : "sale");
                      }}
                      className={`px-6 py-2 w-full border-none rounded-lg transition-all duration-300 shadow-lg ${
                        status === "sale"
                          ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                          : "bg-gray-300 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {translate("sale")}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setValue("status", status === "rent" ? "" : "rent");
                        setStatus(status === "rent" ? "" : "rent");
                      }}
                      className={`px-6 py-2 w-full border-none rounded-lg transition-all duration-300 shadow-lg ${
                        status === "rent"
                          ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                          : "bg-gray-300 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {translate("rent")}
                    </button>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-gray-700 mb-1">
                      {translate("type")}
                    </label>
                    <GeneralDropdown
                      name={"type"}
                      options={PROPERTY_TYPES?.map((el) => {
                        return {
                          label: propertyTypeTranslations(el?.toLowerCase()),
                          value: el,
                        };
                      })}
                      showSelectedEffect={false}
                      placeholder="Select property type"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-gray-700 mb-1">
                      {translate("price")}
                    </label>
                    <GeneralInput
                      name={"price"}
                      placeholder={"Enter price"}
                      type="number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-gray-700 mb-1"
                    >
                      {translate("location")}
                    </label>
                    <PlacesSearchDropdown name={"location"} />
                  </div>

                  {/* Beds */}
                  <div>
                    <label htmlFor="beds" className="block text-gray-700 mb-1">
                      {translate("bedrooms")}
                    </label>
                    <GeneralInput
                      name={"beds"}
                      placeholder={"Enter number of beds"}
                      type="number"
                    />
                  </div>

                  {/* Baths */}
                  <div>
                    <label
                      htmlFor="baths"
                      className="block     text-gray-700 mb-1"
                    >
                      {translate("bathrooms")}
                    </label>
                    <GeneralInput
                      name={"baths"}
                      placeholder={"Enter number of baths"}
                      type="number"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <label
                      htmlFor="area"
                      className="block     text-gray-700 mb-1"
                    >
                      {translate("area")}
                    </label>
                    <GeneralInput
                      name={"area"}
                      placeholder={"Enter property area"}
                      type="number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="amenities"
                      className="block text-gray-700 mb-1"
                    >
                      {translate("amenities")}
                    </label>
                    <MultiTagInput
                      name={"amenities"}
                      placeholder="Enter amenities here"
                      emptyTagsBlockPlaceholder={
                        "Enter the amenities below, and then press ENTER to add it"
                      }
                      typingTagsBlockPlaceholder={
                        "press ENTER to add this amenity"
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-gray-700 mb-1"
                    >
                      {translate("description")}
                    </label>
                    <TextEditor
                      name={"description"}
                      placeholder={"Enter your text here ..."}
                    />
                  </div>

                  <FileUpload name={"images"} />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm     text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? translate("adding") : translate("addProperty")}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
}
