"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [scriptErrors, setScriptErrors] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only load analytics in production or when explicitly enabled
  const isDevelopment = process.env.NODE_ENV === "development";
  const enableAnalytics =
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" || !isDevelopment;

  if (!enableAnalytics || !isClient) {
    return null;
  }

  const handleScriptError = (scriptName, error) => {
    // console.warn(`Analytics script error (${scriptName}):`, error);
    setScriptErrors((prev) => ({ ...prev, [scriptName]: true }));
  };

  const handleScriptLoad = (scriptName) => {
    // console.log(`Analytics script loaded: ${scriptName}`);
  };

  return (
    <>
      {/* Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        onError={(error) => handleScriptError("facebook-pixel", error)}
        onLoad={() => handleScriptLoad("facebook-pixel")}
      >
        {`
          (function() {
            try {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              if (typeof fbq === 'function') {
                fbq('init', '239302990644341');
                fbq('track', 'PageView');
              }
            } catch (error) {
              console.warn('Facebook Pixel initialization failed:', error);
            }
          })();
        `}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=239302990644341&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Google Analytics - Load gtag script first */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CKDT319WH2"
        strategy="afterInteractive"
        onError={(error) => handleScriptError("gtag-script", error)}
        onLoad={() => handleScriptLoad("gtag-script")}
      />

      {/* Google Analytics Configuration */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onError={(error) => handleScriptError("google-analytics", error)}
        onLoad={() => handleScriptLoad("google-analytics")}
      >
        {`
          (function() {
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CKDT319WH2');
            } catch (error) {
              console.warn('Google Analytics initialization failed:', error);
            }
          })();
        `}
      </Script>
    </>
  );
}
