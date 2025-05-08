"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { LogoImage } from "@/imports/images";
import Link from "next/link";

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
                <Link
                  href={`/${locale}/properties?type=Villa`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("villa")}
                </Link>
                <Link
                  href={`/${locale}/properties?type=Apartment`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("apartment")}
                </Link>
                <Link
                  href={`/${locale}/properties?type=Land`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {propertyTypesTranslations("land")}
                </Link>
              </div>

              <div className="flex flex-col gap-6 items-start">
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("aboutUs")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("contact")}
                </Link>
                <Link
                  href={`/${locale}/properties/create`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {footerTranslations("addProperty")}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-8 md:mt-3 items-center gap-6 justify-center py-4">
            <a
              href="/sitemap.xml"
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("siteMap")}
            </a>
            <Link
              href={`/${locale}/privacy-policy`}
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("privacyPolicy")}
            </Link>
            <Link
              href={`/${locale}/terms-and-conditions`}
              className="hover:text-green-400 transition duration-300"
            >
              {footerTranslations("termsandconditions")}
            </Link>
          </div>
          <div className="flex justify-center gap-4 mt-6 border-t border-solid max-w-[450px] border-softGray mx-auto pt-4">
            <a
              href="https://www.facebook.com/Beyt.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/beyt.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>

            <a
              href="https://www.tiktok.com/@beyt.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/tiktok-logo.svg"
                alt="TikTok"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://x.com/beytkw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/x-logo.svg" alt="X" width={24} height={24} />
            </a>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
