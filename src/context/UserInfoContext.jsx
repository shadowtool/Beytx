"use client";
import { axiosInstance } from "@/axios";
import { ROUTES } from "@/constants/routes";
import { fetchUserInfo } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

const UserInfoContext = createContext();

export function UserInfoProvider({ children }) {
  const { data: session } = useSession();

  const {
    data: userInfo,
    isLoading: userInfoLoading,
    isFetched: userInfoFetched,
  } = useQuery({
    queryKey: [ROUTES.GET_USER_INFO, session],
    queryFn: () => fetchUserInfo(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        userInfoLoading,
        userInfoFetched,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}
