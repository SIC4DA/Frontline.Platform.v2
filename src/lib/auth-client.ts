import { createAuthClient } from "better-auth/client";
import {
  genericOAuthClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

import env from "@/config/env";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>(), genericOAuthClient()],
});
