// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // Protect admin routes
//   if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
//     if (!session) {
//       return NextResponse.redirect(new URL('/admin/login', req.url));
//     }
//   }

//   return res;
// }

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protect admin routes (except /admin/login)
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextUrl.pathname !== "/admin/login"
    ) {
      if (!session) {
        console.log("No session found, redirecting to /admin/login");
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return res;
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.error(); // Return a 500 error response
  }
}

// Apply middleware only to /admin routes
export const config = {
  matcher: "/admin/:path*",
};
