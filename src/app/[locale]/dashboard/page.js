"use client";

import { ROUTES } from "@/constants/routes";
import {
  EditIcon,
  HeartIcon,
  MyListingIcon,
  ResetPasswordIcon,
} from "@/imports/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchFavorites,
  fetchPropertiesOfLoggedUser,
  uploadImage,
} from "@/lib/queryFunctions";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { updateUserMutation } from "@/lib/mutationFunctions";
import { toast } from "react-toastify";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard/Dashboard";

const TABS = [
  { label: "editProfile", value: "editProfile", icon: <EditIcon size={18} /> },
  {
    label: "resetPassword",
    value: "reset-password",
    icon: <ResetPasswordIcon size={18} className="rotate-[45deg]" />,
  },
  {
    label: "myListings",
    value: "my-listings",
    icon: <MyListingIcon size={18} />,
  },
  {
    label: "savedListings",
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
  const { data, status, update } = useSession();
  const userInfo = data?.user ?? {};
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isBigScreen } = useMediaQuery();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [userInfo]);

  const { data: properties, refetch: refetchProperties } = useQuery({
    queryKey: [ROUTES.GET_PROPERTIES, userInfo?.id],
    queryFn: () => fetchPropertiesOfLoggedUser(userInfo?.id),
    enabled: !!userInfo?.id,
  });

  const { data: savedListings } = useQuery({
    queryKey: [ROUTES.GET_USER_SAVED_LISTINGS],
    queryFn: () => fetchFavorites(userInfo?.id),
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: updateUserData } = useMutation({
    mutationFn: (variables) => updateUserMutation(variables),
    onSuccess: async () => {
      await update();
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
      userId: userInfo.id,
      name: formValues?.name,
      email: formValues?.email,
      phoneNumber: formValues?.phoneNumber,
      image: imageUrl,
    });
  };

  const props = {
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
    refetchProperties,
    isBigScreen,
  };

  return (
    <FormProvider {...methods}>
      <Dashboard {...props} />
    </FormProvider>
  );
};

export default index;
