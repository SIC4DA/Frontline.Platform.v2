import { treaty } from "@elysiajs/eden";

import { App } from "@/app/api/[[...slugs]]/route";
import env from "@/config/env";

export const apiClient = treaty<App>(env.NEXT_BASE_URL);
