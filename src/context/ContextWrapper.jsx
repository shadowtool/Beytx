"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "./ModalContext";
import { UserProvider } from "./UserContext";

export default function ContextWrapper({ children }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalProvider>
          <>{children}</>
        </ModalProvider>
      </UserProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
