"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import MultiTagInput from "@/components/Reusables/TagInput";
import { toast } from "react-toastify";
import TextEditor from "@/components/Reusables/TextEditor";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/queryFunctions";
import { createPropertyMutation } from "@/lib/mutationFunctions";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import PlacesSearchDropdown from "@/components/Dropdowns/PlacesSearchDropdown";
import GeneralInput from "@/components/Inputs/GeneralInput";
import GeneralDropdown from "@/components/Dropdowns/GeneralDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import arValues from "../../../../messages/ar.json";
import enValues from "../../../../messages/en.json";
import FileUpload from "@/components/Misc/FileUpload";
import { translateText, detectLanguage } from "@/lib/translation";

export default function AddProperty() {
  const [isLoading, setIsLoading] = useState(false);

  const translate = useTranslations("createPropertyPage");

  const propertyTypeTranslations = useTranslations("propertyTypes");

  const { data: session } = useSession();

  const router = useRouter();

  const { locale } = useParams();

  const methods = useForm({
    defaultValues: {
      status: "sale",
      title: "",
      price: "",
      location: "",
      size: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      amenities: [],
    },
  });

  const status = useWatch({ name: "status", control: methods.control });

  const { handleSubmit, reset, setValue } = methods;

  const { mutateAsync } = useMutation({
    mutationFn: uploadImage,
  });

  const { mutate: createProperty } = useMutation({
    mutationFn: (variables) => createPropertyMutation(variables),
    onSuccess: () => {
      toast.dismiss();
      toast.success(translate("createPropertySuccess"));
      router.push(`/${locale}/properties`);
      reset();
    },
    onError: () => {
      toast.dismiss();
      toast.error(translate("createPropertyError"));
    },
  });

  const uploadImagesCall = async (imageFiles) => {
    if (!imageFiles || imageFiles.length === 0) return [];

    try {
      const uploadPromises = imageFiles.map((file) => mutateAsync(file));

      const uploadedUrls = await Promise.all(uploadPromises);

      return uploadedUrls;
    } catch (error) {
      return [];
    }
  };

  const onSubmit = async (data) => {
    if (!data?.location) {
      toast.error(translate("locationError"));
      return;
    }

    if (!data?.type) {
      toast.error(translate("typeError"));
      return;
    }

    if (!data?.description) {
      toast.error(translate("descriptionError"));
      return;
    }

    try {
      setIsLoading(true);
      let dataToSend = {
        status: data?.status,
        price: data?.price,
        location: data?.location,
        size: data?.area,
        type: data?.type,
        bedrooms: data?.beds,
        bathrooms: data?.baths,
        images: [],
        amenities: data?.amenities,
        userId: session?.user?.id,
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

      const title = `${data?.beds} ${enValues?.createPropertyPage?.bedrooms} ${
        enValues.propertyTypes[data?.type?.toLowerCase()]
      } ${enValues?.createPropertyPage?.for} ${
        enValues.createPropertyPage[data?.status?.toLowerCase()]
      } ${enValues?.createPropertyPage?.in} ${
        enValues.locations[data?.location?.city]
      } `;

      const titleArabic = `${data?.beds} ${
        arValues?.createPropertyPage?.bedrooms
      } ${arValues.propertyTypes[data?.type?.toLowerCase()]} ${
        arValues?.createPropertyPage?.for
      } ${arValues.createPropertyPage[data?.status?.toLowerCase()]} ${
        arValues?.createPropertyPage?.in
      } ${arValues.locations[data?.location?.city]} `;

      dataToSend["title"] = title;
      dataToSend["titleArabic"] = titleArabic;

      if (data?.images?.length > 0) {
        toast.loading(translate("uploadingImages"));
        const response = await uploadImagesCall(data?.images);

        dataToSend["images"] = response;
        toast.dismiss();
      }
      toast.loading(translate("creatingProperty"));
      createProperty({ ...dataToSend });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8">
        <h2 className="text-center">{translate("loginMessageText")}</h2>
        <button
          onClick={() => signIn("google")}
          className="bg-emerald-500 text-white text-lg px-4 py-2 rounded"
        >
          {translate("login")}
        </button>
      </div>
    );
  } else if (!session?.user?.phoneNumber) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8">
        <h2 className="text-center">{translate("incompleteProfileError")}</h2>
        <button
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="bg-emerald-500 text-white text-lg px-4 py-2 rounded"
        >
          {translate("goToDashboard")}
        </button>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row justify-center gap-4 px-12 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setValue("status", "sale");
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
                        setValue("status", "rent");
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
                      placeholder={translate("selectPropertyType")}
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-gray-700 mb-1">
                      {translate("price")}
                    </label>
                    <GeneralInput
                      name={"price"}
                      placeholder={translate("enterPrice")}
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

                  <div>
                    <label htmlFor="beds" className="block text-gray-700 mb-1">
                      {translate("bedrooms")}
                    </label>
                    <GeneralInput
                      name={"beds"}
                      placeholder={translate("enterNumberOfBeds")}
                      type="number"
                    />
                  </div>

                  <div>
                    <label htmlFor="baths" className="block text-gray-700 mb-1">
                      {translate("bathrooms")}
                    </label>
                    <GeneralInput
                      name={"baths"}
                      placeholder={translate("enterNumberOfBaths")}
                      type="number"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-gray-700 mb-1">
                      {translate("area")}
                    </label>
                    <GeneralInput
                      name={"area"}
                      placeholder={translate("enterPropertyArea")}
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
                      placeholder={translate("enterAmenities")}
                      emptyTagsBlockPlaceholder={translate(
                        "emptyTagsPlaceholder"
                      )}
                      typingTagsBlockPlaceholder={translate(
                        "typingTagsPlaceholder"
                      )}
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
                      placeholder={translate("enterDescription")}
                    />
                  </div>

                  <FileUpload name={"images"} />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? translate("adding") : translate("addProperty")}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    );
  }
}
