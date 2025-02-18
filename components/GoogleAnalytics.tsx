// components/GoogleAnalytics.tsx
"use client";
import { useEffect } from "react";
import Script from "next/script";

// Replace with your actual Google Analytics ID
const GA_TRACKING_ID = "G-89RGG9NSM5";

// Extend the Window interface to define dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", GA_TRACKING_ID);
    }
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleAnalytics;
