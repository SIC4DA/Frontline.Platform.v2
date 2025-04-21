import { NextResponse } from "next/server";

import { getChatHistory } from "@/services/chat";

export async function GET() {
  try {
    const chats = await getChatHistory();
    return NextResponse.json(chats);
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch chat history" }, { status: 500 });
  }
}
