"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { AddPropertyIcon, CloseIcon, HamMenuIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { LogoImage } from "@/imports/images";
import { useSession } from "next-auth/react";
import GeneralButton from "../Buttons/GeneralButton";
import { useModal } from "@/context/ModalContext";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { locale } = useParams();

  const translate = useTranslations("header");

  const router = useRouter();

  const { data: session, status } = useSession();

  const { openModal } = useModal();

  return (
    <section>
      <header className="md:hidden  rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-500 shadow-md p-4">
        <div className="w-full flex justify-between items-center">
          <button
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <CloseIcon size={28} /> : <HamMenuIcon size={28} />}
          </button>

          <div className="flex items-center gap-1">
            <Image
              src={LogoImage}
              alt="Logo"
              height={40}
              width={120}
              className="max-h-10 w-auto"
              onClick={() => router.push("/")}
            />
            <h4 className="!font-orbitron !text-white">Beyt</h4>
          </div>

          <AuthButton />
        </div>

        {/* Mobile Menu */}
        <nav
          className={`absolute top-20 w-full bg-white shadow-lg rounded-b-lg p-6 px-8 z-[9] transform transition-all duration-300 ease-in-out ${
            isOpen
              ? "ltr:left-0 rtl:right-0 opacity-100"
              : "ltr:-left-[100%] rtl:-right-[100%] opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 text-gray-800    ">
            <li>
              <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
                {translate("home")}
              </Link>
            </li>
            {session?.user?.role === "admin" && (
              <li>
                <Link
                  href={`/${locale}/admin`}
                  onClick={() => setIsOpen(false)}
                >
                  {translate("adminPanel")}
                </Link>
              </li>
            )}
            <li>
              <Link
                href={`/${locale}/properties`}
                onClick={() => setIsOpen(false)}
              >
                {translate("properties")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsOpen(false)}
              >
                {translate("contactUs")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale === "en" ? "ar" : "en"}`}
                onClick={() => setIsOpen(false)}
              >
                {locale === "en" ? "العربية" : "English"}
              </Link>
            </li>
            <li>
              <GeneralButton
                type="outlined"
                className="flex items-center justify-center gap-3 !py-3 !px-4 whitespace-nowrap bg-transparent"
                onClick={() => {
                  if (!(status === "authenticated")) {
                    toast.dismiss();
                    toast.error(translate("loginBeforeAddProperty"));
                    document.getElementById("login-button")?.click();
                  } else {
                    if (!!session?.user?.phoneNumber) {
                      router.push(`/${locale}/properties/create`);
                    } else {
                      openModal("updatePhoneNumber", {});
                      toast.dismiss();
                      toast.error(translate("incompleteProfileError"));
                    }
                  }
                }}
              >
                {translate("addProperty")}
                <AddPropertyIcon size={21} className="text-emerald-500" />
              </GeneralButton>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default MobileNav;
