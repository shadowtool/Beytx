"use client";

import { LoginIcon, LogoutIcon, UserIcon } from "@/imports/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import ClickAwayListener from "@/components/Reusables/ClickAwayListener";
import { useState } from "react";
import EditProfile from "@/components/Modals/EditProfile";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AuthButton({ buttonClasses }) {
  const translate = useTranslations("UserOptions");

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const { locale } = useParams();

  return (
    <>
      {session ? (
        <ClickAwayListener onClickAway={() => setShowProfileOptions(false)}>
          <div className="relative">
            <div
              className="h-fit w-fit py-2.5 px-6 flex cursor-pointer items-center gap-2 text-white border-2 border-solid border-white rounded-lg font-semibold"
              onClick={() => {
                setShowProfileOptions(!showProfileOptions);
              }}
            >
              {session?.user?.name}
              <UserIcon size={28} color="#fff" />
            </div>
            {showProfileOptions && (
              <div className="h-fit w-fit absolute top-[110%] right-0 bg-white rounded-md shadow-md z-[9] overflow-hidden">
                <div
                  className="py-3 px-6 flex items-center text-black text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 font-medium"
                  onClick={() => {
                    setShowEditProfileModal(true);
                    setShowProfileOptions(false);
                  }}
                >
                  {translate("editProfile")}
                </div>
                <div
                  className="py-3 px-6 flex items-center text-black text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 font-medium"
                  onClick={() => {
                    router.push(`/${locale}/my-listings`);
                    setShowProfileOptions(false);
                  }}
                >
                  {translate("myListings")}
                </div>
                <div
                  className="py-3 px-6 flex items-center text-black text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 font-medium"
                  onClick={() => {
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
          className={`h-fit w-fit py-2.5 px-6 text-white border-2 border-solid border-white rounded-lg font-semibold ${buttonClasses}`}
          onClick={() => {
            signIn("google");
          }}
        >
          <div className="flex gap-2">
            <p>{translate("login")}</p>
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
    </>
  );
}
