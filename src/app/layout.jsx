"use client";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { PropertyProvider } from "@/context/PropertyContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfoProvider } from "@/context/UserInfoContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${jetbrains.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <UserInfoProvider>
              <PropertyProvider>
                {/* <Header /> */}
                {children}
                {/* <Footer /> */}
              </PropertyProvider>
            </UserInfoProvider>
            <ToastContainer />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
