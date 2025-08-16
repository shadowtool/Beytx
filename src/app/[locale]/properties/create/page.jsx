"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import MultiTagInput from "@/components/Reusables/Inputs/TagInput";
import { toast } from "react-toastify";
import TextEditor from "@/components/Reusables/Inputs/TextEditor";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/queryFunctions";
import { createPropertyMutation } from "@/lib/mutationFunctions";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import PlacesSearchDropdown from "@/components/Reusables/Dropdowns/PlacesSearchDropdown";
import GeneralInput from "@/components/Reusables/Inputs/GeneralInput";
import GeneralDropdown from "@/components/Reusables/Dropdowns/GeneralDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import arValues from "../../../../messages/ar.json";
import enValues from "../../../../messages/en.json";
import FileUpload from "@/components/Reusables/Misc/FileUpload";
import { translateText, detectLanguage } from "@/lib/translation";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/context/ModalContext";

// —— DIGIT CONVERSION UTILS ——
const ARABIC_TO_LATIN = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "۰": "0",
};
const LATIN_TO_ARABIC = Object.entries(ARABIC_TO_LATIN).reduce(
  (acc, [arabic, latin]) => ((acc[latin] = arabic), acc),
  {}
);

function convertArabicDigitsToLatin(str) {
  return str.replace(
    /[\u0660-\u0669\u06F0-\u06F9]/g,
    (d) => ARABIC_TO_LATIN[d] || d
  );
}
function convertLatinDigitsToArabic(str) {
  return str.replace(/\d/g, (d) => LATIN_TO_ARABIC[d] || d);
}
function isArabicDigits(str) {
  return /[\u0660-\u0669\u06F0-\u06F9]/.test(str);
}
// ————————————————

export default function AddProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useTranslations("createPropertyPage");
  const propertyTypeTranslations = useTranslations("propertyTypes");
  const { userData } = useUserContext();
  const { openModal } = useModal();
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

  const { mutateAsync: uploadSingleImage } = useMutation({
    mutationFn: uploadImage,
  });
  const { mutate: createProperty } = useMutation({
    mutationFn: createPropertyMutation,
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

  const uploadImagesCall = async (files) => {
    if (!files?.length) return [];
    try {
      const urls = await Promise.all(files.map((f) => uploadSingleImage(f)));
      return urls;
    } catch {
      return [];
    }
  };

  const onSubmit = async (data) => {
    if (!data.location) {
      toast.error(translate("locationError"));
      return;
    }
    if (!data.type) {
      toast.error(translate("typeError"));
      return;
    }
    if (!data.description) {
      toast.error(translate("descriptionError"));
      return;
    }

    try {
      setIsLoading(true);

      // build base payload
      const dataToSend = {
        status: data.status,
        // numeric fields + their Arabic variants
        price: "",
        priceArabic: "",
        bedrooms: "",
        bedroomsArabic: "",
        bathrooms: "",
        bathroomsArabic: "",
        location: data.location,
        size: data.area,
        sizeArabic: "",
        type: data.type,
        amenities: data.amenities,
        userId: userData?.id,
        title: "",
        titleArabic: "",
        description: "",
        descriptionArabic: "",
        images: [],
      };

      // —— PRICE ——
      if (isArabicDigits(data.price)) {
        dataToSend.priceArabic = data.price;
        dataToSend.price = convertArabicDigitsToLatin(data.price);
      } else {
        dataToSend.price = data.price;
        dataToSend.priceArabic = convertLatinDigitsToArabic(data.price);
      }

      // —— SIZE ——
      if (isArabicDigits(data.area)) {
        dataToSend.sizeArabic = data.area;
        dataToSend.size = convertArabicDigitsToLatin(data.area);
      } else {
        dataToSend.size = data.area;
        dataToSend.sizeArabic = convertLatinDigitsToArabic(data.area);
      }

      // —— BEDROOMS ——
      if (isArabicDigits(data.beds)) {
        dataToSend.bedroomsArabic = data.beds;
        dataToSend.bedrooms = convertArabicDigitsToLatin(data.beds);
      } else {
        dataToSend.bedrooms = data.beds;
        dataToSend.bedroomsArabic = convertLatinDigitsToArabic(data.beds);
      }

      // —— BATHROOMS ——
      if (isArabicDigits(data.baths)) {
        dataToSend.bathroomsArabic = data.baths;
        dataToSend.bathrooms = convertArabicDigitsToLatin(data.baths);
      } else {
        dataToSend.bathrooms = data.baths;
        dataToSend.bathroomsArabic = convertLatinDigitsToArabic(data.baths);
      }

      // —— DESCRIPTION TRANSLATION ——
      const originalLang = detectLanguage(data.description);
      if (originalLang === "ar") {
        dataToSend.descriptionArabic = data.description;
        dataToSend.description =
          (await translateText(data.description, "en")) || data.description;
      } else {
        dataToSend.description = data.description;
        dataToSend.descriptionArabic =
          (await translateText(data.description, "ar")) || data.description;
      }

      // —— TITLE & TITLE_ARABIC ——
      const common = {
        beds: dataToSend.bedrooms,
        bedsAr: dataToSend.bedroomsArabic,
        type: data.type.toLowerCase(),
        status: data.status.toLowerCase(),
        city: data.location.city,
      };

      dataToSend.title = `${common.beds} ${enValues.createPropertyPage.bedrooms} ${enValues.propertyTypes[common.type]} ${enValues.createPropertyPage.for} ${enValues.createPropertyPage[common.status]} ${enValues.createPropertyPage.in} ${enValues.locations[common.city]}`;
      dataToSend.titleArabic = `${common.bedsAr} ${arValues.createPropertyPage.bedrooms} ${arValues.propertyTypes[common.type]} ${arValues.createPropertyPage.for} ${arValues.createPropertyPage[common.status]} ${arValues.createPropertyPage.in} ${arValues.locations[common.city]}`;

      // —— IMAGE UPLOAD ——
      if (data.images?.length) {
        toast.loading(translate("uploadingImages"));
        dataToSend.images = await uploadImagesCall(data.images);
        toast.dismiss();
      }

      // —— CREATE PROPERTY ——
      toast.loading(translate("creatingProperty"));
      createProperty(dataToSend);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] gap-8">
        <h2 className="text-center">{translate("loginMessageText")}</h2>
        <button
          onClick={() => openModal("login")}
          className="bg-emerald-500 text-white text-lg px-4 py-2 rounded"
        >
          {translate("login")}
        </button>
      </div>
    );
  } else if (!userData?.phoneNumber) {
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
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* STATUS TOGGLE */}
              <div className="flex flex-col md:flex-row justify-center gap-4 px-12 py-4">
                {["sale", "rent"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("status", s)}
                    className={`px-6 py-2 w-full rounded-lg transition-all duration-300 shadow-lg ${
                      status === s
                        ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                        : "bg-gray-300 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {translate(s)}
                  </button>
                ))}
              </div>

              {/* PROPERTY TYPE */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("type")}
                </label>
                <GeneralDropdown
                  name="type"
                  options={PROPERTY_TYPES.map((el) => ({
                    label: propertyTypeTranslations(el.toLowerCase()),
                    value: el,
                  }))}
                  showSelectedEffect={false}
                  placeholder={translate("selectPropertyType")}
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("price")}
                </label>
                <GeneralInput
                  name="price"
                  placeholder={translate("enterPrice")}
                  type="number"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("location")}
                </label>
                <PlacesSearchDropdown name="location" />
              </div>

              {/* BEDROOMS */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("bedrooms")}
                </label>
                <GeneralInput
                  name="beds"
                  placeholder={translate("enterNumberOfBeds")}
                  type="number"
                />
              </div>

              {/* BATHROOMS */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("bathrooms")}
                </label>
                <GeneralInput
                  name="baths"
                  placeholder={translate("enterNumberOfBaths")}
                  type="number"
                />
              </div>

              {/* AREA */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("area")}
                </label>
                <GeneralInput
                  name="area"
                  placeholder={translate("enterPropertyArea")}
                  type="number"
                />
              </div>

              {/* AMENITIES */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("amenities")}
                </label>
                <MultiTagInput
                  name="amenities"
                  placeholder={translate("enterAmenities")}
                  emptyTagsBlockPlaceholder={translate("emptyTagsPlaceholder")}
                  typingTagsBlockPlaceholder={translate(
                    "typingTagsPlaceholder"
                  )}
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-gray-700 mb-1">
                  {translate("description")}
                </label>
                <TextEditor
                  name="description"
                  placeholder={translate("enterDescription")}
                />
              </div>

              {/* IMAGES */}
              <FileUpload name="images" />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
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
