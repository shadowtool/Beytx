"use client";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Image from "next/image";
import { CloseIcon, NextIcon, PreviousIcon } from "@/imports/icons";

const PropertyImagesModal = ({ open, handleClose, images }) => {
  const [selectedImageData, setSelectedImageData] = useState(images?.[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <div className="bg-black/90 h-full w-full">
          <CloseIcon
            size={28}
            color="#fff"
            className="absolute top-8 right-8 cursor-pointer"
            onClick={handleClose}
          />
          <div className="h-fit w-full p-8">
            <img
              src={selectedImageData}
              alt="#"
              className="max-h-[calc(100vh-180px)] w-full object-contain"
            />
          </div>
          <div className="px-24">
            <div className="h-20 flex items-center justify-between px-4">
              <button
                className="bg-white p-3 rounded-md cursor-pointer absolute left-4"
                onClick={() => {
                  const container = document.querySelector("#scroll-container");
                  container.scrollBy({
                    left: -96,
                    behavior: "smooth",
                  });
                }}
              >
                <PreviousIcon size={21} color="#000" />
              </button>
              <div
                className="flex overflow-x-hidden scrollbar-hide scrollbar-hide gap-2 px-4"
                id="scroll-container"
              >
                {images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    className={`h-20 w-24 object-cover cursor-pointer ${
                      selectedImage === index ? "border-2 border-green-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedImageData(image);
                      setSelectedImage(index);
                    }}
                  />
                ))}
              </div>
              <button
                className="bg-white p-3 rounded-md cursor-pointer absolute right-4"
                onClick={() => {
                  const container = document.querySelector("#scroll-container");
                  container.scrollBy({
                    left: +96,
                    behavior: "smooth",
                  });
                }}
              >
                <NextIcon size={21} color="#000" />
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default PropertyImagesModal;
