import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import GeneralButton from "../Buttons/GeneralButton";
import { useModal } from "@/context/ModalContext";
import { useTranslations } from "next-intl";

const ConfirmDeletePropertyModal = ({ open, handleClose }) => {
  const { modalProps, closeModal } = useModal();
  const translations = useTranslations("ConfirmDeletePropertyModal");

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen overflow-hidden p-8 sm:p-24 flex items-center justify-center"
        onClick={() => handleClose()}
      >
        <div
          className="h-fit w-full max-w-sm p-8 bg-white rounded-xl shadow-lg relative border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="mb-6">{translations("areYouSure")}</h3>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <GeneralButton type="outlined" onClick={() => handleClose()}>
              {translations("cancel")}
            </GeneralButton>
            <GeneralButton
              type="default"
              onClick={() => {
                closeModal();
                modalProps.onConfirm();
              }}
            >
              {translations("confirm")}
            </GeneralButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmDeletePropertyModal;
