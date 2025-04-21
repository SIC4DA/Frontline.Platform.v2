import AiStars from "@public/icons/AiStars";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import RequestError from "@/components/shared/RequestError";
import { getChat } from "@/services/chat";

import Chat from "./components/Chat";

export default async function FrontlineAiPage({ params }: { params: Promise<{ id: string }> }) {
  const t = await getTranslations("frontlineAi");
  const { id } = await params;

  if (!id) {
    redirect("/frontline-ai");
  }

  const chat = await getChat(id);

  if (!chat) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  return (
    <section className="flex min-h-dvh flex-col justify-between px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <Link
        href="/frontline-ai"
        className="shadow-white-inset mb-10 flex w-fit items-center gap-2 self-end rounded-xl bg-gradient-to-b from-[#3BBBF6] to-[#31B6F5] px-5 py-3 text-sm text-white duration-300 active:scale-95 max-2xl:text-xs">
        <AiStars />
        {t("newChat")}
      </Link>
      <Chat chatData={chat} />
    </section>
  );
}
