"use client";
import { usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const pathname = usePathname();

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
