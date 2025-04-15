import { createChat } from "@/services/chat";
import { createDeal } from "@/services/deal";
import { redirect } from "next/navigation";

export default async function CreateChat() {
  const chatId = await createChat();
  await createDeal(chatId);

  redirect(`/frontline-ai/${chatId}`);
}
