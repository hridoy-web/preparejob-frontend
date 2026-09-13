import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fast check: verify session cookie existence
  const sessionCookie = getSessionCookie(request);

  // Redirect unauthenticated users trying to access protected dashboards
  if (!sessionCookie && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate session and role access for dashboard routes
  if (sessionCookie && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const role = session.user.role;

      // Restrict regular users from accessing admin routes
      if (role === "user" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/user", request.url));
      }

      // Restrict admins from accessing standard user routes
      if (role === "admin" && pathname.startsWith("/user")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
      // If session retrieval fails during signout edge cases
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Route matcher configuration
export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
  ],
};