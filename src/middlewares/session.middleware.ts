import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PATHS = ["/register", "/login", "/onboarding", "/verify-email", "/check-email"];

export const sessionMiddleware = async (req: NextRequest) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (AUTH_PATHS.includes(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
  }

  if (!AUTH_PATHS.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
};
