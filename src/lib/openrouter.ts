import OpenAI from "openai";

export function createOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing required environment variable: OPENROUTER_API_KEY");
  return new OpenAI({ apiKey, baseURL: "https://openrouter.ai/api/v1" });
}
