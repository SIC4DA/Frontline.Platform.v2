import { NextRequest, NextResponse } from "next/server";
import { sessionMiddleware } from "./middlewares/session.middleware";

const PUBLIC_PATHS = ["/"];

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  const url = request.nextUrl;

  let response;

  if (!PUBLIC_PATHS.includes(url.pathname)) {
    response = await sessionMiddleware(request);
  }

  if (!response) {
    response = NextResponse.next();
  }

  response.headers.set("current-pathname", url.pathname);
  response.headers.set("current-url", url.toString());
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
