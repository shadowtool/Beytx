import Image from "next/image";
import React, { useEffect } from "react";
import PropertyCard from "../Cards/PropertyCard";
import MobilePropertyCard from "../Cards/MobilePropertyCard";
import { LeftArrowIcon } from "@/imports/icons";

const MobileDashboard = ({
  userInfo,
  TABS,
  selectedTab,
  setSelectedTab,
  fileInputRef,
  handleFileChange,
  selectedImage,
  triggerFileInput,
  methods,
  handleUpdate,
  properties,
  savedListings,
}) => {
  const handleUpdateModified = async () => {
    await handleUpdate();
    setSelectedTab(null);
  };

  useEffect(() => {
    setSelectedTab(null);
  }, []);

  return (
    <div className="relative w-full h-fit min-h-screen bg-white overflow-hidden bg-[url('/images/bg-signup-right.png')] bg-repeat ">
      {!selectedTab ? (
        <div className="p-6 flex flex-col items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-600">
            <Image
              src={userInfo?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={144}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>
          <h4 className="    ">{userInfo?.name}</h4>
          <div className="w-full flex flex-col gap-2">
            {TABS?.map((el) => (
              <button
                key={el.value}
                className="w-full py-2 rounded-lg text-center border border-solid hover:bg-green-300 hover:border-green-600 transition-all duration-300 flex items-center justify-center gap-2 bg-white border-gray-300"
                onClick={() => setSelectedTab(el?.value)}
              >
                {el?.icon}
                <span className="min-w-36 text-left">{el?.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full min-h-fit flex flex-col">
          <div className="h-fit w-full p-4">
            <button
              className="mb-4 px-4 py-2   border border-solid border-green-600 text-green-600 bg-green-100 flex items-center gap-2 rounded-md transition w-fit"
              onClick={() => setSelectedTab(null)}
            >
              <LeftArrowIcon />
              Back
            </button>
          </div>
          {selectedTab === "editProfile" ? (
            <div className="p-4">
              <div className="h-fit w-full p-4 rounded-xl shadow-lg relative border border-gray-200 bg-white">
                <h5 className="  mb-6    text-gray-800">Edit Your Info</h5>
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
                      alt="Profile"
                      className="min-h-24 max-h-24 min-w-24 max-w-24 object-cover rounded-full cursor-pointer border-2 border-white"
                      height={128}
                      width={128}
                      onClick={triggerFileInput}
                    />
                  ) : (
                    <div
                      className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-full text-gray-500 cursor-pointer hover:border-gray-600"
                      onClick={triggerFileInput}
                    >
                      Add Profile Image
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full items-start mb-4">
                  <h5 className="     text-gray-700">Name</h5>
                  <input
                    {...methods.register("name")}
                    className="py-3 px-6 bg-gray-50 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full items-start mb-4">
                  <h5 className="     text-gray-700">Email</h5>
                  <input
                    {...methods.register("email")}
                    className="py-3 px-6 bg-gray-50 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full items-start mb-4">
                  <h5 className="     text-gray-700">Phone Number</h5>
                  <input
                    {...methods.register("phoneNumber")}
                    className="py-3 px-6 bg-gray-50 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <button
                  className="w-full py-3 px-6 rounded-md bg-green-600 text-white      shadow-md hover:bg-green-700 transition"
                  onClick={handleUpdateModified}
                >
                  Update
                </button>
              </div>
            </div>
          ) : selectedTab === "my-listings" ? (
            <div className="min-h-fit w-full flex flex-col gap-6 pb-16">
              {properties?.length <= 0 ? (
                <div className="h-fit w-full p-6    ">
                  <h5>No listings found</h5>
                </div>
              ) : (
                properties?.map((el, idx) => (
                  <MobilePropertyCard
                    key={idx}
                    property={el}
                    cardType="userListing"
                  />
                ))
              )}
            </div>
          ) : selectedTab === "saved-listings" ? (
            <div className="min-h-fit w-full flex flex-col gap-6 pb-16">
              {savedListings?.length <= 0 ? (
                <div className="h-fit w-full p-6    ">
                  <h5>No listings found</h5>
                </div>
              ) : (
                savedListings?.map((el, idx) => (
                  <MobilePropertyCard
                    key={idx}
                    property={el}
                    cardType="savedListing"
                  />
                ))
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MobileDashboard;
