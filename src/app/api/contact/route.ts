import { NextRequest, NextResponse } from "next/server";
import { handleContactSubmission } from "@/lib/services/contact.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await handleContactSubmission(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
