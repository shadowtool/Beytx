"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { CloseIcon, HamMenuIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { locale } = useParams();

  const translate = useTranslations("Header");

  const router = useRouter();

  return (
    <header className="md:hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-500 shadow-md p-4">
      <div className="w-full flex justify-between items-center">
        <button
          className="text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <CloseIcon size={28} /> : <HamMenuIcon size={28} />}
        </button>

        <img
          src="/images/beyt.png"
          alt="Logo"
          className="max-h-10 w-auto"
          onClick={() => router.push("/")}
        />

        <AuthButton />
      </div>

      {/* Mobile Menu */}
      <nav
        className={`absolute top-20 w-full bg-white shadow-lg rounded-b-lg p-6 px-8 z-[99] transform transition-all duration-300 ease-in-out ${
          isOpen ? "left-0 opacity-100" : "-left-[100%] opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-gray-800    ">
          <li>
            <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
              {translate("home")}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/properties`}
              onClick={() => setIsOpen(false)}
            >
              {translate("properties")}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
              {translate("contactUs")}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/properties/create`}
              className="py-2 px-4 border border-emerald-500 text-emerald-600 rounded-lg block text-center"
              onClick={() => setIsOpen(false)}
            >
              {translate("addProperty")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MobileNav;
