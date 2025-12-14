import { motion } from "motion/react";
import Image from "next/image";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import type { TMessage } from "@/types/chat";

const MessagesList = ({ messages }: { messages: TMessage[] }) => {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] grow flex-col gap-10 overflow-x-hidden pb-18">
      {messages.map((message, i) => {
        if (message.role === "user") {
          return (
            <motion.div
              key={i.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-background-secondary w-fit self-end rounded-full border border-[#E2E2E2] px-6 py-3 max-md:px-3 max-md:py-1.5 max-md:text-sm">
              {message.content}
            </motion.div>
          );
        } else {
          return (
            <div key={i.toString()} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-black max-md:size-9">
                <Image
                  src="/images/logo.webp"
                  alt="logo"
                  width={24}
                  height={24}
                  className="size-6 object-cover invert max-md:size-4"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3 }}
                className="text-foreground markdown-wrapper mt-2 max-md:text-sm">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {message.content}
                </Markdown>
              </motion.div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MessagesList;
