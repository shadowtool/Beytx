"use client";

import { LoginIcon, LogoutIcon, UserIcon } from "@/imports/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import ClickAwayListener from "@/components/Reusables/ClickAwayListener";
import { useState } from "react";
import EditProfile from "@/components/Modals/EditProfile";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import AuthModal from "../Modals/AuthModals/AuthModal";

export default function AuthButton({ buttonClasses }) {
  const translate = useTranslations("UserOptions");

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const { locale } = useParams();

  return (
    <>
      {session ? (
        <ClickAwayListener
          onClickAway={() => setShowProfileOptions(false)}
          containerClasses={"!w-fit"}
        >
          <div className="relative">
            <div
              className="h-fit w-fit py-2.5 px-2 md:px-6 flex cursor-pointer items-center gap-2 text-white border-0 md:border-2 border-solid border-white rounded-lg   "
              onClick={() => {
                setShowProfileOptions(!showProfileOptions);
              }}
            >
              <p className="hidden md:block">{session?.user?.name}</p>
              <UserIcon size={21} color="#fff" />
            </div>
            {showProfileOptions && (
              <div className="h-fit w-fit min-w-36 absolute top-[110%] right-0 bg-white rounded-md shadow-md z-[9] overflow-hidden">
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
                  className="py-3 px-6 flex items-center text-black   cursor-pointer hover:bg-gray-200 transition-all duration-300  "
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut();
                  }}
                >
                  {translate("logout")}
                </div>
              </div>
            )}
          </div>
        </ClickAwayListener>
      ) : (
        <button
          className={`h-fit w-fit p-0 md:py-2.5 md:px-6 text-white border-2 border-none md:border-solid border-white rounded-lg    ${buttonClasses}`}
          onClick={() => {
            setShowAuthModal(true);
          }}
        >
          <div className="flex gap-2">
            <p className="hidden md:inline">{translate("login")}</p>
            <LoginIcon size={28} color="#fff" />
          </div>
        </button>
      )}

      <EditProfile
        open={showEditProfileModal}
        handleClose={() => {
          setShowEditProfileModal(false);
        }}
      />
      <AuthModal
        open={showAuthModal}
        handleClose={() => {
          setShowAuthModal(false);
        }}
      />
    </>
  );
}
