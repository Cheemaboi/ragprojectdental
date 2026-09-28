import { isBookingIntent, streamGroundedAnswer, type ChatHistoryItem } from "@/lib/rag";

export const runtime = "nodejs";

type ChatRequest = { message?: unknown; history?: unknown };

function validHistory(value: unknown): ChatHistoryItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is ChatHistoryItem => Boolean(item) && typeof item === "object" &&
      ((item as ChatHistoryItem).role === "user" || (item as ChatHistoryItem).role === "assistant") &&
      typeof (item as ChatHistoryItem).content === "string")
    .slice(-8);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 1000) return Response.json({ error: "Please enter a message under 1,000 characters." }, { status: 400 });

    if (isBookingIntent(message)) {
      return Response.json({ action: "booking", message: "I can help you request a visit. Please share a few details below and our team will confirm availability." });
    }

    const { stream, fallback, sources } = await streamGroundedAnswer(message, validHistory(body.history));
    const encoder = new TextEncoder();
    if (!stream) return new Response(fallback ?? "Please contact Bright Smile Dental directly.", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const part of stream) {
            const text = part.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(responseStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Rag-Sources": sources.join(" | ") },
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return Response.json({ error: "I could not reach the clinic assistant just now. Please try again or contact the clinic directly." }, { status: 500 });
  }
}
