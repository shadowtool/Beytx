import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { updateUserMutation } from "@/lib/mutationFunctions";
import { uploadImage } from "@/lib/queryFunctions";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { CloseIcon } from "@/imports/icons";
import { ROUTES } from "@/constants/routes";
import { useSession } from "next-auth/react";

const EditProfile = ({ open, handleClose, userData }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const methods = useForm();

  const formValues = useWatch({ control: methods.control });

  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: (variables) => updateUserMutation(variables),
    onSuccess: () => {
      toast.success("Profile Updated successfully");
      queryClient.invalidateQueries([ROUTES.GET_ALL_USERS]);
      handleClose();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutateAsync: uploadImageMutation } = useMutation({
    mutationFn: uploadImage,
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setSelectedImage(userData?.image);

      methods.reset(userData);
    }
  }, [userData]);

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
      userId: userData._id,
      email: formValues?.email,
      phoneNumber: formValues?.phoneNumber,
      image: imageUrl,
      name: formValues?.name,
      isVerified: formValues.isVerified,
      role: formValues?.makeAdmin ? "admin" : "user",
    });
  };

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen overflow-hidden p-24 flex items-center justify-center"
        onClick={() => handleClose()}
      >
        <FormProvider {...methods}>
          <div
            className="h-fit w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon size={21} />
            </button>
            <h5 className="mb-6 text-gray-800">Edit User's Info</h5>

            <div className="flex gap-4 items-center">
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
                    alt="Profile"
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
                    Add Profile Image
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    {...methods.register("isVerified")}
                    className="mr-2"
                  />
                  <label htmlFor="verified" className="text-gray-700">
                    Is user verified ?
                  </label>
                </div>
                {session?.user?.role === "admin" && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="makeAdmin"
                      {...methods.register("makeAdmin")}
                      className="mr-2"
                    />
                    <label htmlFor="makeAdmin" className="text-gray-700">
                      {userData?.role === "admin"
                        ? "Remove admin rights"
                        : "Make User Admin"}
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">Name</h6>
              <input
                {...methods.register("name")}
                className="py-3 px-6 bg-gray-50 w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder-gray-500   focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">Email</h6>
              <input
                {...methods.register("email")}
                className="py-3 px-6 bg-gray-50 w-full rounded-lg focus:outline-none border border-solid border-gray-300 text-black placeholder-gray-500   focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex flex-col gap-2 w-full items-start mb-4">
              <h6 className="text-gray-700">Phone Number</h6>
              <PhoneNumberInput name="phoneNumber" />
            </div>

            <button
              className="w-full py-3 px-6 rounded-md bg-green-600 text-white      shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </FormProvider>
      </div>
    </ModalWrapper>
  );
};

export default EditProfile;
