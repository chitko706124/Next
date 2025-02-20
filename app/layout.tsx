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
          src="//electricalglimmerexasperate.com/5b/bb/82/5bbb82961dbc52da117babc3dd9c7a3c.js"
          async
        ></script>
        <script
          async
          data-cfasync="false"
          src="//pl25920512.effectiveratecpm.com/841fc6cde6e92c4531f3519d15ff485b/invoke.js"
        ></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div id="container-841fc6cde6e92c4531f3519d15ff485b"></div>

            <main className="flex-grow bg-background">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
