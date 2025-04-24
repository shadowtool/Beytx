import React, { useEffect } from "react";
import PropertyCard from "../Cards/PropertyCard";
import Image from "next/image";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import ConfirmActionModal from "../Modals/ConfirmDeletePropertyModal";
import ConfirmDeletePropertyModal from "../Modals/ConfirmDeletePropertyModal";

const DesktopDashboard = ({
  userInfo,
  TABS,
  selectedTab,
  setSelectedTab,
  fileInputRef,
  handleFileChange,
  selectedImage,
  triggerFileInput,
  handleUpdate,
  properties,
  savedListings,
}) => {
  const methods = useFormContext();
  const translate = useTranslations("dashboard");

  useEffect(() => {
    setSelectedTab("my-listings");
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] flex gap-6 p-12 bg-[url('/images/bg-signup-right.png')]">
      <div className="min-w-64 max-w-64 border border-solid bg-white border-gray-200 shadow-lg p-6 flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-600">
          <Image
            src={userInfo?.image || "/images/user-default.png"}
            alt={translate("profileImageAlt")}
            width={144}
            height={144}
            className="object-cover w-full h-full"
          />
        </div>
        <h4>{userInfo?.name}</h4>
        <div className="w-full flex flex-col gap-2">
          {TABS?.map((el) => (
            <button
              key={el.value}
              className={`w-full py-2 rounded-lg text-center border border-solid hover:bg-green-300 hover:border-green-600 transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedTab === el?.value
                  ? "bg-green-300 border-green-600"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setSelectedTab(el?.value)}
            >
              {el?.icon}
              <span className="min-w-36 text-left">{translate(el?.label)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full grow">
        {selectedTab === "editProfile" ? (
          <div className="h-fit w-full p-8 bg-white rounded-xl shadow-lg relative border border-gray-200">
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
                  src={selectedImage || "/images/user-default.png"}
                  alt={translate("profileImageAlt")}
                  className="min-h-24 max-h-24 min-w-24 max-w-24 object-cover rounded-full cursor-pointer border-2 border-white"
                  height={128}
                  width={128}
                  onClick={triggerFileInput}
                />
              ) : (
                <div
                  className="h-full w-full flex flex-col items-center justify-center rounded-full text-white text-center cursor-pointer"
                  onClick={triggerFileInput}
                >
                  {translate("addProfileImage")}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">{translate("name")}</h6>
              <input
                {...methods.register("name")}
                className="py-3 px-6 bg-gray-50 w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">{translate("email")}</h6>
              <input
                {...methods.register("email")}
                className="py-3 px-6 bg-gray-50 w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">{translate("phoneNumber")}</h6>
              <PhoneNumberInput name="phoneNumber" />
            </div>

            <button
              className="w-full py-3 px-6 rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleUpdate}
            >
              {translate("update")}
            </button>
          </div>
        ) : selectedTab === "my-listings" ? (
          <>
            {properties?.length <= 0 ? (
              <div className="h-full w-full flex items-center justify-center text-black">
                {translate("noListings")}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {properties?.map((el, idx) => (
                  <PropertyCard
                    key={idx}
                    property={el}
                    cardType="userListing"
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedTab === "saved-listings" ? (
          <>
            {savedListings?.length <= 0 ? (
              <div className="h-full w-full flex items-center justify-center">
                {translate("noListings")}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {savedListings?.map((el, idx) => (
                  <PropertyCard
                    key={idx}
                    property={el}
                    cardType="savedListing"
                  />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DesktopDashboard;
