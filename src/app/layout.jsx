"use client";
import { Montserrat, Playfair_Display, Raleway, Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { useParams } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  const { locale } = useParams();
  return (
    <html lang={locale ?? "en"}>
      <body
        className={`${montserrat.variable} ${raleway.variable} antialiased`}
      >
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
