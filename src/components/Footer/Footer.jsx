"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { LogoImage } from "@/imports/images";

const Footer = () => {
  const { locale } = useParams();

  const propertyTypesTranslations = useTranslations("propertyTypes");

  const footerTranslations = useTranslations("footer");

  const pathname = usePathname();

  return (
    <>
      {pathname?.includes("auth") ? (
        <></>
      ) : (
          <footer className="ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-500 z-[1]  text-white py-6 md:p-6 md:px-16"> 
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mt-4 mb-16">
              <Image
                src={LogoImage}
                alt="Logo"
                height={40}
                width={40}
                className="min-h-10 max-h-10 w-auto object-contain"
              />
            </div>

            <div className="w-fit flex gap-16">
              <div className="flex flex-col gap-6 items-start">
                <a
                  href={`/${locale}/properties?type=Villa`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("villa")} 
                </a>
                <a
                  href={`/${locale}/properties?type=Apartments`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("apartment")}
                </a>
                <a
                  href={`/${locale}/properties?type=Land`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("land")}
                </a>
              </div>

              <div className="flex flex-col gap-6 items-start">
                <a
                  href={`/${locale}/about`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("aboutUs")}
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("contact")}
                </a>
                <a
                  href={`/${locale}/properties/create`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("addProperty")}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-8 md:mt-3 items-center gap-6 justify-center py-4">
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
