"use client";
import Link from "next/link";
import AuthButton from "../Reusables/Misc/AuthButton";
import { AddPropertyIcon, CloseIcon, HamMenuIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { LogoImage } from "@/imports/images";
import { useSession } from "next-auth/react";
import GeneralButton from "../Reusables/Buttons/GeneralButton";
import { useModal } from "@/context/ModalContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useParams();
  const translate = useTranslations("header");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { openModal } = useModal();
  const pathname = usePathname();

  const handleAddProperty = () => {
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
  };

  const NavLinks = () => (
    <>
      <Link
        href={`/${locale}`}
        className="text-black md:text-white"
        onClick={() => setIsOpen(false)}
      >
        {translate("home")}
      </Link>
      {session?.user?.role === "admin" && (
        <Link
          href={`/${locale}/admin`}
          className="text-black md:text-white"
          onClick={() => setIsOpen(false)}
        >
          {translate("adminPanel")}
        </Link>
      )}
      <Link
        href={`/${locale}/properties`}
        className="text-black md:text-white"
        onClick={() => setIsOpen(false)}
      >
        {translate("properties")}
      </Link>
      <Link
        href={`/${locale}/contact`}
        className="text-black md:text-white"
        onClick={() => setIsOpen(false)}
      >
        {translate("contactUs")}
      </Link>
      <a
        href={`/${locale === "en" ? "ar" : "en"}`}
        className="text-black md:text-white"
        onClick={() => setIsOpen(false)}
      >
        {locale === "en" ? "العربية" : "English"}
      </a>
    </>
  );

  const Logo = () => (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src={LogoImage}
        alt="Logo"
        height={48}
        width={144}
        className="md:min-h-12 md:min-w-12 md:max-h-12 md:max-w-12 max-h-10 w-auto object-contain"
        onClick={() => router.push("/")}
      />
      <h4 className="!font-orbitron !text-white">Beyt</h4>
    </div>
  );

  const AddPropertyButton = ({ className = "" }) => (
    <GeneralButton
      type="outlined"
      className={`flex items-center justify-center gap-3 w-full !py-3 !px-4 whitespace-nowrap ${className}`}
      onClick={handleAddProperty}
    >
      {translate("addProperty")}
      <AddPropertyIcon
        size={21}
        className={className.includes("text-white") ? "" : "text-emerald-500"}
      />
    </GeneralButton>
  );

  if (pathname?.includes("auth")) {
    return <></>;
  }

  return (
    <section>
      {/* Desktop barigation */}
      <header className="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% shadow-md">
        {/* Mobile Header */}
        <div className="md:hidden p-4">
          <div className="w-full flex justify-between items-center">
            <button
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <CloseIcon size={28} /> : <HamMenuIcon size={28} />}
            </button>
            <Logo />
            <AuthButton />
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute top-20 w-full bg-white shadow-lg rounded-b-lg p-6 px-8 z-[9] transform transition-all duration-300 ease-in-out ${
              isOpen
                ? "ltr:left-0 rtl:right-0 opacity-100"
                : "ltr:-left-[100%] rtl:-right-[100%] opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-4 text-gray-800">
              <NavLinks />
              <li className="w-full flex items-center justify-center px-[10%]">
                <AddPropertyButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block px-12 min-h-24 max-h-24">
          <div className="mx-auto flex justify-between items-center py-5">
            <div className="flex items-center gap-8">
              <div className="flex gap-2 items-center mr-8">
                <Logo />
              </div>
              <div className="flex items-center gap-8">
                <NavLinks />
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <AddPropertyButton className="text-white border-white hover:bg-transparent" />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
