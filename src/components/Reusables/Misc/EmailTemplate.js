import { LogoImage } from "@/imports/images";
import Image from "next/image";
import React from "react";

const OtpEmail = ({ otp }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md text-center max-w-md w-full p-6">
        <h1 className="text-2xl font-semibold mb-2">OTP Verification</h1>
        <p className="text-gray-700 mb-4">
          Use the following One-Time Password (OTP) to verify your identity for{" "}
          <strong>Byet.co</strong>.
        </p>
        <div className="text-3xl font-mono bg-gray-100 border border-gray-300 inline-block px-6 py-3 rounded mb-6">
          {otp}
        </div>
        <p className="text-sm text-gray-500">
          This OTP is valid for a limited time. If you did not request this, you
          can safely ignore this email.
        </p>
      </div>
    </div>
  );
};

export default OtpEmail;
