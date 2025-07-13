"use client";

import { LoginIcon, LogoutIcon, UserIcon } from "@/imports/icons";
import ClickAwayListener from "./ClickAwayListener";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import GeneralButton from "../Buttons/GeneralButton";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/context/ModalContext";

export default function AuthButton() {
  const translate = useTranslations("userOptions");

  const { openModal } = useModal();

  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const { userData, isLoggedIn, refreshUserData } = useUserContext();

  const router = useRouter();

  const { locale } = useParams();

  return (
    <>
      {isLoggedIn ? (
        <ClickAwayListener
          onClickAway={() => setShowProfileOptions(false)}
          containerClasses={"!w-fit"}
        >
          <div className="relative">
            <GeneralButton
              type="outlined"
              className="text-white border-white flex items-center gap-3 !py-3 !px-4 hover:bg-transparent"
              onClick={() => {
                setShowProfileOptions(!showProfileOptions);
              }}
            >
              <p className="hidden md:block whitespace-nowrap">
                {userData?.name}
              </p>
              <UserIcon size={21} color="#fff" />
            </GeneralButton>
            {showProfileOptions && (
              <div className="h-fit w-fit min-w-36 absolute top-[110%] rtl:left-0 ltr:right-0 bg-white rounded-md shadow-md z-[10] overflow-hidden">
                <div
                  className="py-3 px-6 flex items-center text-black   cursor-pointer hover:bg-gray-200 transition-all duration-300  "
                  onClick={() => {
                    router.push(`/${locale}/dashboard`);
                    setShowProfileOptions(false);
                  }}
                >
                  {translate("dashboard")}
                </div>
                <div
                  className="py-3 px-6 flex items-center text-black cursor-pointer hover:bg-gray-200 transition-all duration-300  "
                  onClick={(e) => {
                    e.stopPropagation();
                    localStorage.clear();
                    refreshUserData();
                  }}
                >
                  {translate("logout")}
                </div>
              </div>
            )}
          </div>
        </ClickAwayListener>
      ) : (
        <GeneralButton
          id="login-button"
          type="outlined"
          className="text-white border-white flex items-center gap-2 !p-2 md:!py-3 md:!px-4 hover:bg-transparent max-w-fit"
          onClick={() => {
            openModal("login");
          }}
        >
          <p className="text-xs md:text-sm whitespace-nowrap">
            {translate("login")}
          </p>
          <LoginIcon size={21} color="#fff" />
        </GeneralButton>
      )}
    </>
  );
}
