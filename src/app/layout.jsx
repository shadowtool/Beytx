"use client";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { useParams } from "next/navigation";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  const { locale } = useParams();
  return (
    <html lang={locale ?? "en"}>
      <body className={`${montserrat.variable}`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <UserInfoProvider>
              <>{children}</>
            </UserInfoProvider>
            <ToastContainer />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
