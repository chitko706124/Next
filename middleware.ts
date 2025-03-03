// // import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // export async function middleware(req: NextRequest) {
// //   const res = NextResponse.next();
// //   const supabase = createMiddlewareClient({ req, res });

// //   const {
// //     data: { session },
// //   } = await supabase.auth.getSession();

// //   // Protect admin routes
// //   if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
// //     if (!session) {
// //       return NextResponse.redirect(new URL('/admin/login', req.url));
// //     }
// //   }

// //   return res;
// // }

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   try {
//     const supabase = createMiddlewareClient({ req, res });

//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     // Protect admin routes (except /admin/login)
//     if (
//       req.nextUrl.pathname.startsWith("/admin") &&
//       req.nextUrl.pathname !== "/admin/login"
//     ) {
//       if (!session) {
//         console.log("No session found, redirecting to /admin/login");
//         return NextResponse.redirect(new URL("/admin/login", req.url));
//       }
//     }

//     return res;
//   } catch (error) {
//     console.error("Middleware Error:", error);
//     return NextResponse.error(); // Return a 500 error response
//   }
// }

// // Apply middleware only to /admin routes
// export const config = {
//   matcher: "/admin/:path*",
// };

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect admin routes
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Handle CORS for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    // Add CORS headers for API routes
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }

    return response;
  }

  return res;
}

// Configure the middleware to run for API routes and admin routes
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
