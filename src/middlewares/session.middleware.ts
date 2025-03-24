import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PATHS = [
  "/register",
  "/login",
  "/onboarding",
  "/verify-email",
  "/check-email",
];

export const sessionMiddleware = async (req: NextRequest) => {
  const sessionCookie = getSessionCookie(req, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: false,
  });

  if (AUTH_PATHS.includes(req.nextUrl.pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  if (!AUTH_PATHS.includes(req.nextUrl.pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
};
