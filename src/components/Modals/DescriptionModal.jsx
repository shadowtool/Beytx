import React from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "@/imports/icons";

const DescriptionModal = ({ open, handleClose, propertyData }) => {
  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen flex items-center justify-center relative"
        onClick={handleClose}
      >
        <div
          className="max-w-3xl relative max-h-[400px] min-h-[400px] overflow-y-auto w-full p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseIcon
            color="#000"
            size={28}
            onClick={handleClose}
            className="absolute top-6 right-6 cursor-pointer"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: propertyData?.description,
            }}
            className="text-black"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DescriptionModal;
