import { redirect } from "next/navigation";

import { createChat } from "@/services/chat";

export default async function CreateChat() {
  const chatId = await createChat();

  redirect(`/frontline-ai/${chatId}`);
}
