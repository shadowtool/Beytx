"use client";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const { locale, ...rest } = useParams();

  const pathname = usePathname();

  useEffect(() => {
    // document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = "ltr";
  }, [locale]);

  const { isBigScreen } = useMediaQuery();

  return (
    <>
      {pathname?.includes("auth") ? (
        <></>
      ) : isBigScreen ? (
        <DesktopNav />
      ) : (
        <MobileNav />
      )}
    </>
  );
};

export default Header;
