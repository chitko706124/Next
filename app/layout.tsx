import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <GoogleAnalytics />
            <main className="flex-grow bg-background">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
