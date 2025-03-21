import { NextRequest, NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const url = request.nextUrl;

  const response = NextResponse.next();
  response.headers.set("current-pathname", url.pathname);
  response.headers.set("current-url", url.toString());

  return response;
}
