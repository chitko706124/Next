// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Toaster } from "@/components/ui/toaster";
// import dynamic from "next/dynamic";
// import { Navbar } from "@/components/ui/navbar";
// import { Footer } from "@/components/ui/footer";
// import Script from "next/script";

// const SupabaseProvider = dynamic(() => import("./supabase-provider"), {
//   ssr: false,
// });

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Information Sharing",
//   description: "We share knowledge and information to people",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* <ClientScript /> */}{" "}
//         <meta name="bidvertiser-verification" content="Bidvertiser2098346" />
//         <Script
//           strategy="afterInteractive"
//           src={`https://www.popads.net/api/website_code?key=da731cbd64d35af5c955fe71dc10cfbaee59d466&website_id=5178638&aab=1&mb=0.01&ppip=2&db=30&dpd=5&tl=1&of=1`}
//         />
//       </head>
//       <body className={inter.className} suppressHydrationWarning>
//         <SupabaseProvider>
//           <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <div id="container-841fc6cde6e92c4531f3519d15ff485b"></div>

//             <main className="flex-grow bg-background">{children}</main>
//             <Footer />
//           </div>
//           <Toaster />
//         </SupabaseProvider>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Script from "next/script";

const SupabaseProvider = dynamic(() => import("./supabase-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Information Sharing",
  description: "We share knowledge and information to people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <ClientScript /> */}{" "}
        <meta name="bidvertiser-verification" content="Bidvertiser2098346" />
        <script
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              /*<![CDATA[*/
              (function(){
                var w = window, s = "ed36e9ff04fc2440cafa7457c2363562",
                    c = [
                      ["siteId", 787 + 83 * 816 - 933 + 358 + 5110698],
                      ["minBid", 0],
                      ["popundersPerIP", "0"],
                      ["delayBetween", 0],
                      ["default", false],
                      ["defaultPerDay", 0],
                      ["topmostLayer", "auto"]
                    ],
                    k = [
                      "d3d3LmNkbjRhZHMuY29tL3pqc2NoYW5uZWwubWluLmNzcw==",
                      "ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvdUxtL2h0d28ubWluLmpz",
                      "d3d3LnlwbXR2bGFrdG0uY29tL3lqc2NoYW5uZWwubWluLmNzcw==",
                      "d3d3LmpsdHJob2JnLmNvbS9NWmJJL2N0d28ubWluLmpz"
                    ],
                    o = -1, r, h, u = function(){
                      clearTimeout(h);
                      o++;
                      if(k[o] && !(1766377004000 < (new Date).getTime() && 1 < o)){
                        r = w.document.createElement("script");
                        r.type = "text/javascript";
                        r.async = true;
                        var e = w.document.getElementsByTagName("script")[0];
                        r.src = "https://" + atob(k[o]);
                        r.crossOrigin = "anonymous";
                        r.onerror = u;
                        r.onload = function(){ clearTimeout(h); w[s.slice(0,16) + s.slice(0,16)] || u(); };
                        h = setTimeout(u, 5E3);
                        e.parentNode.insertBefore(r, e);
                      }
                    };
                    if(!w[s]){
                      try{ Object.freeze(w[s] = c); } catch(e){}
                      u();
                    }
              })();
              /*]]>*/
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* <div id="container-841fc6cde6e92c4531f3519d15ff485b"></div> */}
            {/* PopAds Iframe */}
            <main className="flex-grow bg-background">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
