import ContextWrapper from "@/context/ContextWrapper";
import "./globals.css";
import { Montserrat, Raleway, Orbitron } from "next/font/google";
import { cookies } from "next/headers";
import Analytics from "@/components/Misc/Analytics";

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

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const cookieStore = cookies();

  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <html lang={lang} hrefLang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        <Analytics />
      </head>
      <body
        className={`${montserrat.variable} ${raleway.variable} ${orbitron.variable} antialiased`}
      >
        <>{children}</>
      </body>
    </html>
  );
}
