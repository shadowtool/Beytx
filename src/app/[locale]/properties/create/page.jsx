"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import MultiTagInput from "@/components/Reusables/TagInput";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";
import TextEditor from "@/components/Reusables/TextEditor";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/queryFunctions";
import { createPropertyMutation } from "@/lib/mutationFunctions";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import MapPicker from "@/components/Misc/MapPicker";
import PlacesSearchDropdown from "@/components/Dropdowns/PlacesSearchDropdown";
import GeneralInput from "@/components/Inputs/GeneralInput";
import GeneralDropdown from "@/components/Dropdowns/GeneralDropdown";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

export default function AddProperty() {
  const translate = useTranslations("createPropertyPage");

  const propertyTypeTranslations = useTranslations("propertyTypes");

  const { data: session } = useSession();

  const router = useRouter();

  const { locale } = useParams();

  const methods = useForm({
    defaultValues: {
      status: "sale",
      title: "",
      status: "",
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
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("sale");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset, control, setValue } = methods;

  const formValues = useWatch({ control: control });

  useEffect(() => {
    setValue("status", "sale");
    setValue("title", "Default Title");
    setValue("price", 100000);
    setValue("area", 1000);
    setValue("type", "Villa");
    setValue("beds", 3);
    setValue("baths", 2);
    setValue("description", "Default Description");
    setValue("amenities", ["pool", "gym", "parking"]);
  }, [setValue]);

  const { mutateAsync } = useMutation({
    mutationFn: uploadImage,
  });

  const { mutate: createProperty } = useMutation({
    mutationFn: (variables) => createPropertyMutation(variables),
    onSuccess: () => {
      toast.success("Property added successfully!");
      router.push(`/${locale}/properties`);
      reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const uploadImagesCall = async (imageFiles) => {
    if (!imageFiles || imageFiles.length === 0) return [];

    try {
      // Map each file to a mutation promise
      const uploadPromises = imageFiles.map((file) => mutateAsync(file));

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);

      return uploadedUrls; // Return the array of uploaded URLs
    } catch (error) {
      console.error("Upload failed:", error);
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      let dataToSend = {
        title: data?.title,
        status: data?.status,
        price: data?.price,
        location: data?.location,
        size: data?.area,
        type: data?.type,
        bedrooms: data?.beds,
        bathrooms: data?.baths,
        description: data?.description,
        images: [],
        amenities: data?.amenities,
        userId: session?.user?.id,
      };

      if (images?.length > 0) {
        toast.loading("Uploading images");
        const response = await uploadImagesCall(images);
        const imageUrls = response?.map((el) => {
          return el?.url;
        });
        dataToSend["images"] = imageUrls;
        toast.dismiss();
      }

      createProperty({ ...dataToSend });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    e.target.value = null; // Clear the input value
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

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
                    {translate("forSale")}
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
                    {translate("forRent")}
                  </button>
                </div>

                <div>
                  <label htmlFor="title" className="block text-gray-700 mb-1">
                    {translate("title")}
                  </label>
                  <GeneralInput
                    name={"title"}
                    placeholder={"Enter property title"}
                  />
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
                        value: el?.toLowerCase(),
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

                {/* Drag and Drop Image Upload */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={handleClick}
                  className="mt-1 block w-full h-52 px-4 py-12 border-2 border-dashed border-gray-300 rounded-md shadow-sm text-center cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                >
                  <p className="text-gray-500">
                    {translate("dragAndDropPlaceholderText")}
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>

                {/* Display selected images */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm     text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
                disabled={loading}
              >
                {loading ? translate("adding") : translate("addProperty")}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
