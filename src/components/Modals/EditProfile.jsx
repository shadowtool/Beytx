import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "@/imports/icons";
import { useForm, useWatch } from "react-hook-form";
import { useUserInfoContext } from "@/context/UserInfoContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { updateUserMutation } from "@/lib/mutationFunctions";
import { uploadImage } from "@/lib/queryFunctions";

const EditProfile = ({ open, handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const methods = useForm();
  const formValues = useWatch({ control: methods.control });

  const { userInfo } = useUserInfoContext();

  const { mutate } = useMutation({
    mutationFn: (variables) => updateUserMutation(variables),
    onSuccess: () => {
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

    mutate({
      userId: userInfo._id,
      email: formValues?.email,
      phoneNumber: formValues?.phoneNumber,
      image: imageUrl,
    });
  };

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-fit w-fit p-8 bg-white rounded-xl relative min-w-[700px]">
          <CloseIcon
            size={21}
            color="#000"
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleClose}
          />
          <h5 className="text-lg mb-6 font-medium">Edit your info</h5>

          <div className="min-h-24 max-h-24 rounded-full bg-green-600 flex items-center justify-center min-w-24 max-w-24 mb-4 overflow-hidden">
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
                className="min-h-24 max-h-24 min-w-24 max-w-24 object-cover rounded-full cursor-pointer"
                height={128}
                width={128}
                onClick={triggerFileInput}
              />
            ) : (
              <div
                className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed rounded-full text-gray-500 cursor-pointer"
                onClick={triggerFileInput}
              >
                Add Profile Image
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1 w-full items-start">
            <h5 className="text-xs font-semibold">Email</h5>
            <input
              {...methods.register("email")}
              className="py-3 px-6 bg-white w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder:text-gray-700 text-sm"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-1 w-full items-start mt-6">
            <h5 className="text-xs font-semibold">Phone Number</h5>
            <input
              {...methods.register("phoneNumber")}
              className="py-3 px-6 bg-white w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder:text-gray-700 text-sm"
            />
          </div>

          {/* Update Button */}
          <button
            className="my-8 py-2.5 px-6 rounded-md bg-green-600 text-white text-sm font-semibold"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditProfile;
