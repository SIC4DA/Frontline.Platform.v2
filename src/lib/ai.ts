import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from "@ai-sdk/xai";

import env from "@/config/env";

export const xai = createXai({
  apiKey: env.XAI_API_KEY,
});

export const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

