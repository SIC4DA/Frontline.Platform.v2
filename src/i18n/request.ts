import { getUserLocale } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";
// import { getUserLocale } from "@/services/locale";

export default getRequestConfig(async () => {
  let locale = "en";

  locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
