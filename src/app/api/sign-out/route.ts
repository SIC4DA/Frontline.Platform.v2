import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { success } = await auth.api.signOut({
    headers: await headers(),
  });

  if (!success) {
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
