import "./globals.css";
import { Montserrat, Raleway, Orbitron } from "next/font/google";
import { cookies } from "next/headers";
import Analytics from "@/components/Reusables/Misc/Analytics";
import OptimizedCSS from "@/components/Reusables/Misc/OptimizedCSS";
import Script from "next/script";

// Google Tag Manager ID - configurable via environment variable
const GTM_ID = "GTM-5KPM9CD9";

// Optimized font loading - only load essential weights to reduce render blocking
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"], // Reduced weight variants
  display: "swap", // Ensures text remains visible during font load
  preload: true,
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"], // Reduced weight variants
  display: "swap",
  preload: true,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"], // Reduced weight variants
  display: "swap",
  preload: false, // Only preload essential fonts
});

export default function RootLayout({ children }) {
  const cookieStore = cookies();

  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <html lang={lang} hrefLang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* DNS prefetch and preconnect for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />

        {/* Critical inline CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for immediate rendering */
            *{margin:0;padding:0;box-sizing:border-box}
            html{scroll-behavior:smooth;overflow-anchor:none}
            body{overflow-x:hidden;font-family:var(--font-montserrat),system-ui,sans-serif}
            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            /* Prevent layout shift */
            .min-h-screen{min-height:100vh}
          `,
          }}
        />

        <Analytics />
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${raleway.variable} ${orbitron.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
        <OptimizedCSS />
      </body>
    </html>
  );
}
