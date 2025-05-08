"use client";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { motion } from "framer-motion";
import { CloseIcon, NextIcon, PreviousIcon } from "@/imports/icons";
import { CldImage } from "next-cloudinary";

const MotionImage = motion(CldImage);

const PropertyImagesModal = ({ open, handleClose, images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSwipeRelease = (offsetX, velocityX) => {
    if (offsetX > 200 || velocityX > 0.5) {
      setSelectedImage((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (offsetX < -200 || velocityX < -0.5) {
      setSelectedImage((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <div className="bg-black/90 h-full w-full relative">
          <CloseIcon
            size={28}
            color="#fff"
            className="absolute top-8 right-8 cursor-pointer"
            onClick={handleClose}
          />
          <div className="p-8 md:p-24">
            <div className="max-h-[calc(100vh-280px)] min-h-[calc(100vh-280px)] w-full flex items-center justify-center overflow-hidden">
              <motion.div
                className="flex ltr:flex-row rtl:flex-row-reverse w-full h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(event, info) => {
                  handleSwipeRelease(info.offset.x, info.velocity.x);
                }}
                style={{
                  display: "flex",
                }}
              >
                {images.map((image, index) => (
                  <MotionImage
                    key={index}
                    src={image}
                    height={1280}
                    width={720}
                    alt={`property-image-${index}`}
                    className="w-full h-full object-contain"
                    style={{
                      flex: "0 0 100%",
                    }}
                    animate={{
                      x: `-${selectedImage * 100}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="px-24 fixed bottom-8 left-0">
            <div className="h-20 flex ltr:flex-row rtl:flex-row-reverse items-center justify-between px-4">
              <button
                className="bg-white p-3 rounded-md cursor-pointer"
                onClick={handlePreviousImage}
              >
                <PreviousIcon size={21} color="#000" />
              </button>
              <div
                className="flex overflow-x-auto md:overflow-x-hidden hide-scrollbar gap-2 px-4"
                id="scroll-container"
              >
                {images?.map((image, index) => (
                  <CldImage
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    height={80}
                    width={96}
                    className={`h-20 w-24 object-cover cursor-pointer ${
                      selectedImage === index ? "border-2 border-green-600" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
              <button
                className="bg-white p-3 rounded-md cursor-pointer"
                onClick={handleNextImage}
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
