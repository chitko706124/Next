import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ✅ Protect admin routes
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // ✅ Handle CORS for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const allowedOrigin = req.headers.get("origin") || "http://localhost:5173"; // Set allowed origin dynamically

    res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.headers.set("Access-Control-Allow-Credentials", "true"); // ✅ Allow credentials

    // ✅ Handle preflight requests (OPTIONS)
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: res.headers,
      });
    }

    return res; // ✅ Return the modified response
  }

  return res;
}

// ✅ Apply middleware to admin and API routes
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
