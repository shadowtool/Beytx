"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const DashboardSidebar = ({ userData, TABS, selectedTab, setSelectedTab }) => {
  const translate = useTranslations("dashboard");

  return (
    <div className="min-w-64 max-w-64 border border-solid bg-white border-gray-200 shadow-lg p-6 flex flex-col items-center gap-6">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-600">
        <Image
          src={userData?.image || "/images/user-default.png"}
          alt={translate("profileImageAlt")}
          width={144}
          height={144}
          className="object-cover w-full h-full"
        />
      </div>
      <h4>{userData?.name}</h4>
      <div className="w-full flex flex-col gap-2">
        {TABS?.map((el) => (
          <button
            key={el.value}
            className={`w-full py-2 rounded-lg text-center border border-solid hover:bg-green-300 hover:border-green-600 transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedTab === el?.value
                ? "bg-green-300 border-green-600"
                : "bg-white border-gray-300"
            }`}
            onClick={() => setSelectedTab(el?.value)}
          >
            {el?.icon}
            <span className="min-w-36 text-left">{translate(el?.label)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
