import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import GeneralButton from "../Buttons/GeneralButton";
import { useModal } from "@/context/ModalContext";
import { useTranslations } from "next-intl";
import { FALLBACK_IMAGE_URL } from "@/constants/constants";
import Image from "next/image";
import { CloseIcon } from "@/imports/icons";

const AgentInfoModal = ({ open, handleClose }) => {
  const { modalProps, closeModal } = useModal();

  const userInfo = modalProps.userInfo;

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen overflow-hidden p-8 sm:p-24 flex items-center justify-center"
        onClick={() => handleClose()}
      >
        <div
          className="h-fit w-full max-w-xs p-4 bg-white rounded-xl shadow-lg relative border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseIcon
            size={21}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => handleClose()}
          />
          <h5 className="mb-4">You are calling</h5>
          <div className="flex items-start gap-4">
            <Image
              src={userInfo?.image || FALLBACK_IMAGE_URL}
              height={144}
              width={144}
              className="min-h-14 max-h-14 min-w-14 max-w-14 object-cover rounded-full"
            />
            <div className="flex flex-col gap-0">
              <h5 className="text-sm mb-2">{userInfo?.name}</h5>
              <p className="text-[10px]">Email : {userInfo?.email}</p>
              <p className="text-[10px]">
                Phone number : {userInfo?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AgentInfoModal;
