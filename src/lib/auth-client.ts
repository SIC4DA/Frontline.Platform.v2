import { createAuthClient } from "better-auth/client";
import {
  adminClient,
  genericOAuthClient,
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";

import env from "@/config/env";
import { companyEmailClient } from "@/core/auth/plugins/company-email/client";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient(),
    genericOAuthClient(),
    usernameClient(),
    companyEmailClient(),
  ],
});
