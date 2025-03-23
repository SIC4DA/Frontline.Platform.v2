import { type BetterAuthClientPlugin } from "better-auth/client";

import type { companyEmail } from ".";

export const companyEmailClient = () => {
  return {
    id: "company-email",
    $InferServerPlugin: {} as ReturnType<typeof companyEmail>,
  } satisfies BetterAuthClientPlugin;
};
