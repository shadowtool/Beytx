import { CloseIcon } from "@/imports/icons";
import React from "react";
import ModalWrapper from "../ModalWrapper";

const MobileDropdownModal = ({
  open,
  handleClose,
  filterTitle,
  filterBody,
  refetchListings,
}) => {
  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div
        className="h-screen w-screen bg-black/25 flex items-end justify-end"
        onClick={handleClose}
      >
        <div
          className="h-fit w-full bg-white rounded-t-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between h-14 border-b border-solid border-gray-200 px-6">
            <h5 className="font-semibold text-base">{filterTitle}</h5>
            <CloseIcon size={28} color="#000" onClick={() => handleClose()} />
          </div>

          {filterBody}

          <div className="h-16 w-full flex items-center justify-end px-6 border-t border-solid border-gray-300">
            <button
              className="h-fit w-fit px-6 py-2 rounded-md bg-green-600 font-semibold text-sm text-white"
              onClick={() => {
                setTimeout(() => {
                  refetchListings();
                  handleClose();
                }, 100);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default MobileDropdownModal;
