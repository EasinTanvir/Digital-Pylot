import { NextResponse } from "next/server";
import { runAgent } from "@/lib/ai/agent";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    const { reply, messages: updatedMessages } = await runAgent(messages);

    return NextResponse.json({ reply, messages: updatedMessages });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
