"use client";
import Link from "next/link";
import AuthButton from "@/components/Reusables/AuthButton";
import { AddPropertyIcon } from "@/imports/icons";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import GeneralButton from "../Buttons/GeneralButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";
import { LogoImage } from "@/imports/images";

const DesktopNav = () => {
  const { locale } = useParams();

  const { data: session, status } = useSession();

  const translate = useTranslations("header");

  const router = useRouter();

  return (
    <section>
      <header className="hidden md:block text-white p-0 shadow-md rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90% px-12 min-h-24 max-h-24">
        <div className="mx-auto flex justify-between items-center py-5">
          <div className="flex items-center gap-8">
            <div className="flex gap-2 items-center mr-8">
              <Image
                src={LogoImage}
                alt="Logo"
                height={48}
                width={144}
                className="min-h-12 min-w-12 max-h-12 max-w-12 object-contain"
              />
              <h4 className="!font-orbitron">Beyt</h4>
            </div>
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
              <Link
                href={`/${locale === "en" ? "ar" : "en"}`}
                onClick={() => setIsOpen(false)}
              >
                {locale === "en" ? "العربية" : "English"}
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <GeneralButton
              type="outlined"
              className="text-white border-white flex items-center gap-3 !py-3 !px-4 hover:bg-transparent whitespace-nowrap"
              onClick={() => {
                if (!(status === "authenticated")) {
                  toast.dismiss();
                  toast.error(translate("loginBeforeAddProperty"));
                  document.getElementById("login-button")?.click();
                } else {
                  if (!!session?.user?.phoneNumber) {
                    router.push(`/${locale}/properties/create`);
                  } else {
                    toast.dismiss();
                    toast.error(translate("incompleteProfileError"));
                  }
                }
              }}
            >
              {translate("addProperty")}
              <AddPropertyIcon size={21} color="#fff" />
            </GeneralButton>
            <AuthButton />
          </div>
        </div>
      </header>
    </section>
  );
};

export default DesktopNav;
