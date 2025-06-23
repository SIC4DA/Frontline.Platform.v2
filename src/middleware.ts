import { type NextRequest, NextResponse } from "next/server";

import { authClient } from "./lib/auth-client";

const PUBLIC_PATHS: string[] = ["/mock-deal"];
const AUTH_PATHS = ["/register", "/login", "/onboarding", "/verify-email", "/check-email"];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const response = NextResponse.next();

  response.headers.set("current-pathname", pathname);
  response.headers.set("current-url", url.toString());

  if (PUBLIC_PATHS.includes(pathname)) return response;

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: request.headers,
    },
  });

  if (!AUTH_PATHS.includes(pathname) && pathname !== "/account-setup" && session?.user && !session?.user?.username) {
    return NextResponse.redirect(new URL("/account-setup", request.nextUrl.origin));
  }

  if (pathname === "/account-setup" && session?.user?.username) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (AUTH_PATHS.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (!AUTH_PATHS.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)"],
};
