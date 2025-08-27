import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { fetchUser } from "@/lib/queryFunctions";

export const UserContext = createContext({
  userData: {},
  isLoggedIn: false,
  refreshUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(false);

  // Check if token exists in localStorage
  useEffect(() => {
    const checkToken = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        setHasToken(!!token);
      }
    };

    // Initial check
    checkToken();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        checkToken();
      }
    };

    // Listen for custom storage events (for same-tab changes)
    const handleCustomStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenChanged", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenChanged", handleCustomStorageChange);
    };
  }, []);

  const {
    data: userData,
    isSuccess,
    refetch: refreshUserData,
  } = useQuery({
    queryKey: [ROUTES.GET_LOGGED_USER_INFO, hasToken],
    queryFn: () => fetchUser(),
    enabled: hasToken, // Only run query when token exists
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
