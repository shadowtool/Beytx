"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { AddPropertyIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import GeneralButton from "../Buttons/GeneralButton";
import { useSession } from "next-auth/react";

const DesktopNav = () => {
  const { locale } = useParams();

  const { data: session } = useSession();

  const translate = useTranslations("header");

  return (
    <section>
      <header className="hidden md:block text-white p-0 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% px-12 min-h-24 max-h-24">
        <div className="container mx-auto flex justify-between items-center py-5">
          <div className="flex items-center gap-16">
            <img
              src="/images/beyt.png"
              alt="Logo"
              className="max-w-36 max-h-12"
            />
            <div className="flex items-center gap-8">
              <Link href={`/${locale}`} className="text-white">
                {translate("home")}
              </Link>
              {session?.user?.role === "admin" && (
                <Link href={`/${locale}/admin`} className="text-white">
                  {translate("adminPanel")}
                </Link>
              )}
              <Link href={`/${locale}/properties`} className="text-white">
                {translate("properties")}
              </Link>
              <Link href={`/${locale}/contact`} className="text-white">
                {translate("contactUs")}
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Link href={`/${locale}/properties/create`}>
              <GeneralButton
                type="outlined"
                className="text-white border-white flex items-center gap-3 !py-3 !px-4 hover:bg-transparent whitespace-nowrap"
              >
                {translate("addProperty")}
                <AddPropertyIcon size={21} color="#fff" />
              </GeneralButton>
            </Link>
            <AuthButton />
          </div>
        </div>
      </header>
    </section>
  );
};

export default DesktopNav;
