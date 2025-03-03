"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { AddPropertyIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const Header = () => {
  const translate = useTranslations("Header");

  const { locale } = useParams();

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <section>
      <header className="text-white p-0 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% px-12">
        <div className="container mx-auto flex justify-between items-center py-5">
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

export default Header;
