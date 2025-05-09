import ContextWrapper from "@/context/ContextWrapper";
import "./globals.css";
import { Montserrat, Raleway, Orbitron } from "next/font/google";
import { cookies } from "next/headers";
import Analytics from "@/components/Reusables/Misc/Analytics";
import Script from "next/script";

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
        <Script
          id="google-tag-manager-noscript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              <!-- Google Tag Manager (noscript) -->
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KPM9CD9"
              height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
              <!-- End Google Tag Manager (noscript) -->
            `,
          }}
        />
      </body>
    </html>
  );
}
