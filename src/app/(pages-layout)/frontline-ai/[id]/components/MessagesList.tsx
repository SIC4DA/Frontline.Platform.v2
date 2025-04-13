import { UIMessage } from "ai";
import { motion } from "motion/react";
import Image from "next/image";

const MessagesList = ({ messages }: { messages: UIMessage[] }) => {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-grow flex-col gap-10 pb-18">
      {messages.map((message) => {
        if (message.role === "user") {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-background-secondary w-fit self-end rounded-full border border-[#E2E2E2] px-6 py-3">
              {message.content}
            </motion.div>
          );
        } else {
          return (
            <div key={message.id} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-black">
                <Image
                  src="/images/logo.webp"
                  alt="logo"
                  width={24}
                  height={24}
                  className="size-6 object-cover invert"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3 }}
                className="text-foreground">
                {message.content}
              </motion.p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MessagesList;
