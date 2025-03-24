"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { AddPropertyIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const DesktopNav = () => {
  const { locale } = useParams();

  const translate = useTranslations("Header");

  return (
    <section>
      <header className="hidden md:block text-white p-0 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% px-12 min-h-24 max-h-24">
        <div className="mx-auto flex justify-between items-center py-5">
          <div className="flex items-center gap-16">
            <img
              src="/images/beyt.png"
              alt="Logo"
              className="max-w-36 max-h-12"
            />
            <div className="flex items-center gap-8">
              <Link
                href={`/${locale}`}
                className="text-white font-medium text-sm"
              >
                {translate("home")}
              </Link>
              <Link
                href={`/${locale}/properties`}
                className="text-white font-medium text-sm"
              >
                {translate("properties")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-white font-medium text-sm"
              >
                {translate("contactUs")}
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Link
              href={`/${locale}/properties/create`}
              className="h-fit w-fit py-2.5 px-6 flex items-center gap-2 text-white border-2 border-solid border-white rounded-lg font-semibold whitespace-nowrap"
            >
              {translate("addProperty")}
              <AddPropertyIcon size={28} color="#fff" />
            </Link>
            <AuthButton />
          </div>
        </div>
      </header>
    </section>
  );
};

export default DesktopNav;
