import { type NextRequest, NextResponse } from "next/server";

import { authClient } from "./lib/auth-client";

const PUBLIC_PATHS: string[] = ["/mock-deal"];
const AUTH_PATHS = [
  "/register",
  "/login",
  "/onboarding",
  "/verify-email",
  "/check-email",
  "/forgot-password",
  "/reset-password",
];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'none';
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://res.cloudinary.com https://lh3.googleusercontent.com https://media.licdn.com https://cdn.brandfetch.io;
    font-src 'self';
    connect-src 'self' https://*.sentry.io https://api.brandfetch.io;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;
  // Replace newlines with spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
  response.headers.set("X-Content-Type-Options", "nosniff");
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|monitoring).*)"],
};

