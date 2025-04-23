import { LogoImage, PropertyImageOne, SignupBgImage } from "@/imports/images";
import Image from "next/image";
import React from "react";

const FormWrapper = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <div className="h-12 w-full bg-green-600 shadow-lg flex items-center px-36">
        <Image src={LogoImage} className="h-8 w-auto object-contain" />
      </div>
      <div className="min-h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] h-full w-full flex">
        <div className="h-full w-full max-w-96 min-w-96 relative md-lg:flex items-center justify-center flex-col hidden">
          <Image
            src={SignupBgImage}
            alt="property-image-signup"
            className="min-h-[calc(100vh-48px)] w-full object-cover object-center absolute top-0 left-0"
          />
          <div className="h-full w-full absolute top-0 left-0 bg-black/30 z-[1]"></div>
          <Image
            src={LogoImage}
            alt="logo-image"
            className="h-24 w-auto object-contain relative z-[2]"
          />
          <h5 className="text-white relative z-[2] mt-8">
            List. Rent. Buy. <br /> Sign Up Today!
          </h5>
        </div>
        <div className="h-full w-full grow bg-[url('/images/bg-signup-right.png')] bg-repeat flex items-center justify-center">
          <div className="h-full max-h-[500px] w-full max-w-72 md-lg:max-w-96 bg-white rounded-xl shadow-lg border border-solid border-solid-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
