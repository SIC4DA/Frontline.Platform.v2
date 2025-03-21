import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
