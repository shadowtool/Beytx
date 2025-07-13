import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import MobileHeader from "./MobileHeader";
import EditProfile from "./EditProfile";
import ListingSection from "./ListingSection";
import ResetPassword from "./ResetPassword";

const Dashboard = ({
  userData,
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
  isBigScreen,
}) => {
  const renderContent = () => {
    if (!isBigScreen && !selectedTab) {
      return (
        <MobileHeader
          userData={userData}
          TABS={TABS}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      );
    }

    switch (selectedTab) {
      case "editProfile":
        return (
          <EditProfile
            isBigScreen={isBigScreen}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            selectedImage={selectedImage}
            triggerFileInput={triggerFileInput}
            handleUpdate={handleUpdate}
          />
        );
      case "my-listings":
        return (
          <ListingSection
            listings={properties}
            type="userListing"
            isBigScreen={isBigScreen}
          />
        );
      case "saved-listings":
        return (
          <ListingSection
            listings={savedListings}
            type="savedListing"
            isBigScreen={isBigScreen}
          />
        );
      case "reset-password":
        return <ResetPassword userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        isBigScreen
          ? "min-h-[calc(100vh-96px)] flex gap-6 p-12"
          : "relative w-full h-fit min-h-screen"
      } bg-[url('/images/bg-signup-right.png')] bg-repeat bg-white overflow-hidden`}
    >
      {isBigScreen && (
        <DashboardSidebar
          userData={userData}
          TABS={TABS}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}

      <div className={`${isBigScreen ? "w-full grow" : ""} p-4`}>
        {!isBigScreen && selectedTab !== null && (
          <MobileHeader
            userData={userData}
            TABS={TABS}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
