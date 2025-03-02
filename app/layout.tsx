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
        {/* <ClientScript /> */}
        {/* <Script
          src="//electricalglimmerexasperate.com/5b/bb/82/5bbb82961dbc52da117babc3dd9c7a3c.js"
          strategy="lazyOnload"
        />
        <Script
          src="//electricalglimmerexasperate.com/841fc6cde6e92c4531f3519d15ff485b/invoke.js"
          strategy="lazyOnload"
          data-cfasync="false"
          async
        />
        <Script
          src="//electricalglimmerexasperate.com/38/d2/7f/38d27f8b2d77fdccea6d13daa02acecf.js"
          strategy="lazyOnload"
        /> */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-background">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
