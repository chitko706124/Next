// components/ClientScript.tsx
"use client";
import Script from "next/script";

const ClientScript = () => {
  const handleError = (e: any) => {
    _qpjaf();
  };

  const handleLoad = (e: any) => {
    _jfxeffcd();
  };

  return (
    <>
      <Script
        src="//auckodsailtoas.net/tag.min.js"
        data-zone="8981374"
        data-cfasync="false"
        strategy="afterInteractive"
        async
        onError={handleError} // Use functions here
        onLoad={handleLoad} // Use functions here
      />
      <Script
        id="propeller-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d, z, s) {
              s.src = '//' + d + '//' + z;
              try { (document.body || document.documentElement).appendChild(s); } catch(e) {}
            })('auckodsailtoas.net', '8981374', document.createElement('script'));
            document.write = function() {};
            window.onload = function() {};
          `,
        }}
      />
    </>
  );
};

export default ClientScript;
