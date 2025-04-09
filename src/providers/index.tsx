import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";

export const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextIntlClientProvider>
  );
};
