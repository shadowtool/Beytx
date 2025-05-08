import React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import PhoneNumberInput from "../Reusables/Inputs/PhoneNumberInput";

const EditProfile = ({
  isBigScreen,
  fileInputRef,
  handleFileChange,
  selectedImage,
  triggerFileInput,
  handleUpdate,
}) => {
  const methods = useFormContext();
  const translate = useTranslations("dashboard");

  return (
    <div
      className={`${isBigScreen ? "h-fit w-full p-8 bg-white rounded-xl shadow-lg relative border border-gray-200" : "p-4"}`}
    >
      <div
        className={`${!isBigScreen ? "h-fit w-full p-4 rounded-xl shadow-lg relative border border-gray-200 bg-white" : ""}`}
      >
        <h5 className="mb-6 text-gray-800">{translate("editYourInfo")}</h5>
        <div className="min-h-24 max-h-24 rounded-full bg-green-600 flex items-center justify-center min-w-24 max-w-24 mb-6 overflow-hidden shadow-md">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={translate("profileImageAlt")}
              className="min-h-24 max-h-24 min-w-24 max-w-24 object-cover rounded-full cursor-pointer border-2 border-white"
              height={128}
              width={128}
              onClick={triggerFileInput}
            />
          ) : (
            <div
              className="h-full w-full flex flex-col items-center justify-center text-center text-white cursor-pointer"
              onClick={triggerFileInput}
            >
              {translate("addProfileImage")}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full items-start mb-4">
          <h6 className="text-gray-700 text-sm">{translate("name")}</h6>
          <input
            {...methods.register("name")}
            className="py-3 px-6 bg-gray-50 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2 w-full items-start mb-4">
          <h6 className="text-gray-700 text-sm">{translate("email")}</h6>
          <input
            {...methods.register("email")}
            className="py-3 px-6 bg-gray-50 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2 w-full items-start mb-4">
          <h6 className="text-gray-700">{translate("phoneNumber")}</h6>
          <PhoneNumberInput name="phoneNumber" />
        </div>
        <button
          className="w-full py-3 px-6 rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition"
          onClick={handleUpdate}
        >
          {translate("update")}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
