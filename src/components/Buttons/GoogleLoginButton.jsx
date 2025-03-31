import React from "react";
import { signIn } from "next-auth/react";
import { GoogleLogoImage } from "@/imports/images";
import Image from "next/image";

const GoogleLoginButton = ({ classes }) => {
  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <button
      onClick={handleLogin}
      className={`bg-green-600 text-white py-2 px-4   rounded-lg transition duration-300 flex items-center justify-center   w-full h-12 ${classes}`}
    >
      <Image
        src={GoogleLogoImage}
        alt="#"
        className="h-8 w-8 object-contain mr-2"
      />
      Continue with google
    </button>
  );
};

export default GoogleLoginButton;
