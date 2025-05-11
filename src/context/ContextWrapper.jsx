"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "./ModalContext";

export default function ContextWrapper({ children }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={false}>
        <ModalProvider>
          <>{children}</>
        </ModalProvider>
        <ToastContainer />
      </SessionProvider>
    </QueryClientProvider>
  );
}
