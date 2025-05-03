import { NextResponse } from "next/server";

import { authClient } from "@/lib/auth-client";

export async function POST() {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          NextResponse.redirect("/login");
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
