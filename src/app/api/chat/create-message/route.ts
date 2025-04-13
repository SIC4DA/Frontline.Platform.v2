import { createMessage } from "@/services/chat";

export const POST = async (req: Request) => {
  const { chatId, message } = await req.json();

  await createMessage(chatId, message);

  return new Response(null, { status: 200 });
};
