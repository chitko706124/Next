// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Mail } from "lucide-react";
// import { Button } from "./button";
// import { useSupabase } from "@/app/supabase-provider";

// export function Navbar() {
//   const pathname = usePathname();
//   const supabase = useSupabase();
//   const isAdmin = pathname?.startsWith("/admin");

//   const isActive = (path: string) => pathname === path;

//   return (
//     <nav className="bg-card border-b">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex  items-center space-x-8">
//             <Link href="/" className="text-xl font-bold">
//               BlogSite
//             </Link>

//             <div className="hidden md:flex items-center space-x-4">
//               <Link
//                 href="/"
//                 className={cn(
//                   "px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                   isActive("/")
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                 )}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/about"
//                 className={cn(
//                   "px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                   isActive("/about")
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                 )}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/content"
//                 className={cn(
//                   "px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                   isActive("/content")
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                 )}
//               >
//                 Content
//               </Link>
//               <Link
//                 href="/contact"
//                 className={cn(
//                   "px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                   isActive("/contact")
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                 )}
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {isAdmin ? (
//               <>
//                 <Link href="/admin/messages">
//                   <Button variant="outline" size="sm">
//                     <Mail className="h-4 w-4 mr-2" />
//                     Messages
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => supabase.auth.signOut()}
//                 >
//                   Sign Out
//                 </Button>
//               </>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useSupabase } from "@/app/supabase-provider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = useSupabase();
  const isAdmin = pathname?.startsWith("/admin");
  const hideNavbar = pathname.startsWith("/posts");

  const isActive = (path: string) => pathname === path;

  const handleNavigation = () => {
    window.location.href = "/";
  };
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/content", label: "Content" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ];

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      {!hideNavbar && (
        <nav className="bg-card border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold">
                SharinG
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Admin Controls */}
              <div className="hidden md:flex items-center space-x-4">
                {isAdmin && (
                  <>
                    <Link href="/admin/messages">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" /> Messages
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => supabase.auth.signOut()}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="md:hidden py-4 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block py-2 text-foreground/60 hover:text-foreground transition-colors",
                      isActive(link.href) && "text-foreground font-medium"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <>
                    <Link
                      href="/admin/messages"
                      className="block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-4 w-4 mr-2" /> Messages
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        supabase.auth.signOut();
                        setIsOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
