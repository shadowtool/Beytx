import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const propertyTypesTranslations = useTranslations("PropertyTypes");
  const footerTranslations = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="container mx-auto px-2 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center md:justify-start mt-4">
          <img
            src="/images/beyt.png"
            alt="Logo"
            className="max-w-30 max-h-8 mr-12"
          />
          <img
            src="/images/app-store.png"
            alt="App Store"
            className="w-32 mr-2 ml-10"
          />
          <img
            src="/images/google-play.png"
            alt="Google Play"
            className="w-32"
          />
        </div>

        <div className="text-center py-4 text-sm">
          <a
            href="/properties/villas"
            className="mx-3 hover:text-green-400 transition duration-300"
          >
            {propertyTypesTranslations("villa")}
          </a>
          <a
            href="/properties/apartments"
            className="mx-3 hover:text-green-400 transition duration-300"
          >
            {propertyTypesTranslations("apartment")}
          </a>
          <a
            href="/properties/land"
            className="mx-3 hover:text-green-400 transition duration-300"
          >
            {propertyTypesTranslations("land")}
          </a>
        </div>

        <div className="flex space-x-6 mt-6 md:mt-0">
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

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <a
          href="/sitemap"
          className="mx-3 hover:text-green-400 transition duration-300"
        >
          {footerTranslations("siteMap")}
        </a>
        <a
          href="/privacy-policy"
          className="mx-3 hover:text-green-400 transition duration-300"
        >
          {footerTranslations("privacyPolicy")}
        </a>
        <a
          href="/terms"
          className="mx-3 hover:text-green-400 transition duration-300"
        >
          {footerTranslations("termsandconditions")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
