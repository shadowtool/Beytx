import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { fetchUser } from "@/lib/queryFunctions";

export const UserContext = createContext({
  userData: {},
  isLoggedIn: false,
  refreshUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const {
    data: userData,
    isSuccess,
    refetch: refreshUserData,
  } = useQuery({
    queryKey: [ROUTES.GET_LOGGED_USER_INFO],
    queryFn: () => fetchUser(),
    retry: 1,
  });

  const isLoggedIn = isSuccess && !!userData;

  return (
    <UserContext.Provider value={{ userData, isLoggedIn, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
