"use client";

import PropertyCard from "@/components/Cards/PropertyCard";
import { ROUTES } from "@/constants/routes";
import { CloseIcon, EditIcon, HeartIcon, MyListingIcon } from "@/imports/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  fetchFavorites,
  fetchPropertiesOfLoggedUser,
  uploadImage,
} from "@/lib/queryFunctions";
import { useForm, useWatch } from "react-hook-form";
import { useUserInfoContext } from "@/context/UserInfoContext";
import { updateUserMutation } from "@/lib/mutationFunctions";
import { toast } from "react-toastify";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileDashboard from "@/components/Dashboard/MobileDashboard";
import DesktopDashboard from "@/components/Dashboard/DesktopDashboard";

const TABS = [
  { label: "Edit Profile", value: "editProfile", icon: <EditIcon size={18} /> },
  {
    label: "My Listings",
    value: "my-listings",
    icon: <MyListingIcon size={18} />,
  },
  {
    label: "Saved Listings",
    value: "saved-listings",
    icon: <HeartIcon size={18} />,
  },
];

const index = () => {
  const [selectedTab, setSelectedTab] = useState("my-listings");

  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const methods = useForm();

  const formValues = useWatch({ control: methods.control });

  const { userInfo } = useUserInfoContext();

  const queryClient = useQueryClient();

  const { isLoading: fetchMyListingsLoading, data: properties } = useQuery({
    queryKey: ["userProperties"],
    queryFn: () => fetchPropertiesOfLoggedUser(userInfo?._id),
    enabled: !!userInfo?._id,
  });

  const { isLoading: fetchSavedListingsLoading, data: savedListings } =
    useQuery({
      queryKey: [ROUTES.GET_USER_SAVED_LISTINGS],
      queryFn: () => fetchFavorites(userInfo?._id),
      enabled: !!userInfo?._id,
      refetchOnWindowFocus: false,
    });

  const { mutateAsync: updateUserData } = useMutation({
    mutationFn: (variables) => updateUserMutation(variables),
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTES.GET_USER_INFO]);
      toast.success("Profile Updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutateAsync: uploadImageMutation } = useMutation({
    mutationFn: uploadImage,
  });

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setSelectedImage(userInfo?.image);
      methods.reset(userInfo);
    }
  }, [userInfo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async () => {
    let imageUrl = selectedImage;

    if (selectedImage && !selectedImage.startsWith("http")) {
      toast.loading("Uploading image...");
      try {
        const file = fileInputRef.current.files[0];
        if (file) {
          const uploadedImage = await uploadImageMutation(file);
          imageUrl = uploadedImage?.url || imageUrl;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
        return;
      } finally {
        toast.dismiss();
      }
    }

    await updateUserData({
      userId: userInfo._id,
      name: formValues?.name,
      email: formValues?.email,
      phoneNumber: formValues?.phoneNumber,
      image: imageUrl,
    });
  };

  const { isBigScreen } = useMediaQuery();

  const props = {
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
  };

  return (
    <>
      {isBigScreen ? (
        <DesktopDashboard {...props} />
      ) : (
        <MobileDashboard {...props} />
      )}
    </>
  );
};

export default index;
