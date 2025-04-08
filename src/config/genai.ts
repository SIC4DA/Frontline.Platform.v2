import { GoogleGenerativeAI, type GenerationConfig } from "@google/generative-ai";

import env from "@/config/env";

export const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
