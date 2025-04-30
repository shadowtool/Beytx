import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserMutation } from "@/lib/mutationFunctions";
import { CloseIcon } from "@/imports/icons";
import { ROUTES } from "@/constants/routes";
import { useSession } from "next-auth/react";
import GeneralInput from "../Inputs/GeneralInput";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { useTranslations } from "next-intl";

const UpdatePhoneNumberModal = ({ open, handleClose }) => {
  const translate = useTranslations("updatePhoneNumber");

  const methods = useForm();

  const formValues = useWatch({ control: methods.control });

  const queryClient = useQueryClient();

  const { data: session, update } = useSession();

  const { mutate } = useMutation({
    mutationFn: (variables) => updateUserMutation(variables),
    onSuccess: () => {
      toast.success("Profile Updated successfully");
      queryClient.invalidateQueries([ROUTES.GET_ALL_USERS]);
      update();
      handleClose();
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || "Something went wrong");
    },
  });

  const handleUpdate = async () => {
    mutate({
      userId: session?.user?.id,
      phoneNumber: formValues?.phoneNumber,
    });
  };

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen overflow-hidden p-4 md:p-24 flex items-center justify-center"
        onClick={() => handleClose()}
      >
        <FormProvider {...methods}>
          <div
            className="h-fit w-full max-w-xs md:max-w-md p-8 bg-white rounded-xl shadow-lg relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon size={21} />
            </button>
            <h5 className="mb-6 text-gray-800">{translate("title")}</h5>
            <p>{translate("description")}</p>
            <div className="my-5">
              <PhoneNumberInput name="phoneNumber" />
            </div>
            <button
              className="w-full py-3 px-6 rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleUpdate}
            >
              <p>{translate("update")}</p>
            </button>
          </div>
        </FormProvider>
      </div>
    </ModalWrapper>
  );
};

export default UpdatePhoneNumberModal;
