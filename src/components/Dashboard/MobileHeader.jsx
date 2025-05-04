import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LeftArrowIcon } from "@/imports/icons";

const MobileHeader = ({ userInfo, TABS, selectedTab, setSelectedTab }) => {
  const translate = useTranslations("dashboard");

  if (!selectedTab) {
    return (
      <div className="p-6 flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-600">
          <Image
            src={userInfo?.image || "/images/user-default.png"}
            alt={translate("profileImageAlt")}
            width={144}
            height={144}
            className="object-cover w-full h-full"
          />
        </div>
        <h4>{userInfo?.name}</h4>
        <div className="w-full flex flex-col gap-2">
          {TABS?.map((el) => (
            <button
              key={el.value}
              className="w-full py-2 rounded-lg text-center border border-solid hover:bg-green-300 hover:border-green-600 transition-all duration-300 flex items-center justify-center gap-2 bg-white border-gray-300"
              onClick={() => setSelectedTab(el?.value)}
            >
              {el?.icon}
              <span className="min-w-36 text-left">{translate(el.label)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      className="mb-4 px-4 py-2 border border-solid border-green-600 text-green-600 bg-green-100 flex items-center gap-2 rounded-md transition w-fit"
      onClick={() => setSelectedTab(null)}
    >
      <LeftArrowIcon />
      {translate("back")}
    </button>
  );
};

export default MobileHeader;
