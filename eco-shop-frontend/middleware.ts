// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const token = request?.nextauth?.token;
    const roles = (token?.decoded as any)?.realm_access?.roles || [];
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/client_space") && roles.includes("admin")) {
      return NextResponse.redirect(
        new URL("/admin_space/addingUser", request.url)
      );
    }

    if (pathname.startsWith("/admin_space") && roles.includes("customer")) {
      return NextResponse.redirect(
        new URL("/client_space/addingUser", request.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/principale/:path*",
    "/client_space/:path*",
    "/admin_space/:path*",
  ],
};
