import { createChat } from "@/services/chat";
import { redirect } from "next/navigation";

export default async function CreateChat() {
  const chatId = await createChat();
  redirect(`/frontline-ai/${chatId}`);
}
