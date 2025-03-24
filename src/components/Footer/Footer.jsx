"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Footer = () => {
  const propertyTypesTranslations = useTranslations("PropertyTypes");
  const footerTranslations = useTranslations("Footer");

  const pathname = usePathname();

  return (
    <>
      {pathname?.includes("auth") ? (
        <></>
      ) : (
        <footer className="bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%  text-white py-6 md:p-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mt-4">
              <img
                src="/images/beyt.png"
                alt="Logo"
                className="min-h-10 max-h-10 w-auto object-contain"
              />
              <div className="flex gap-6 mt-6 mb-16">
                <img
                  src="/images/app-store.png"
                  alt="App Store"
                  className="w-32 h-auto object-contain"
                />
                <img
                  src="/images/google-play.png"
                  alt="Google Play"
                  className="w-32 h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-fit flex gap-16">
              <div className="flex flex-col gap-6 items-start">
                <a
                  href="/properties/villas"
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("villa")}
                </a>
                <a
                  href="/properties/apartments"
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("apartment")}
                </a>
                <a
                  href="/properties/land"
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("land")}
                </a>
              </div>

              <div className="flex flex-col gap-6 items-start">
                <a
                  href="/about"
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("aboutUs")}
                </a>
                <a
                  href="/contact"
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("contact")}
                </a>
                <a
                  href="/add-property"
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("addProperty")}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 flex flex-col md:flex-row mt-8 md:mt-3 items-center gap-6 justify-center py-4">
            <a
              href="/sitemap"
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("siteMap")}
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("privacyPolicy")}
            </a>
            <a
              href="/terms"
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("termsandconditions")}
            </a>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
