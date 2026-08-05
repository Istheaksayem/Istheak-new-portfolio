import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// ─── MongoDB helper (singleton connection) ─────────────────────────────────────

let cachedClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI!;
  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient;
}

// ─── Nodemailer transporter ─────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(data: ContactPayload): string | null {
  if (!data.name?.trim() || data.name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "A valid email address is required.";
  }
  if (!data.message?.trim() || data.message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return null;
}

// ─── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // --- Validate ---
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { name, email, message } = body;
    const sentAt = new Date();

    // --- Save to MongoDB ---
    try {
      const client = await getMongoClient();
      const db = client.db("portfolio");
      await db.collection("contacts").insertOne({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        sentAt,
      });
    } catch (dbErr) {
      // Non-fatal: log and continue so the email still goes out
      console.error("[Contact API] MongoDB save failed:", dbErr);
    }

    // --- Send email via SMTP ---
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New message from ${name.trim()} – Portfolio Contact`,
      text: `You received a new contact form submission.\n\nName:    ${name.trim()}\nEmail:   ${email.trim()}\nDate:    ${sentAt.toUTCString()}\n\nMessage:\n${message.trim()}\n\n---\nReply to this email to respond directly to ${name.trim()}.`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <h2 style="font-size:20px;font-weight:600;margin-bottom:4px">New Portfolio Contact</h2>
          <p style="color:#555;font-size:14px;margin-top:0">${sentAt.toUTCString()}</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr>
              <td style="padding:6px 0;color:#555;width:80px;font-weight:600">Name</td>
              <td style="padding:6px 0">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#555;font-weight:600">Email</td>
              <td style="padding:6px 0"><a href="mailto:${email.trim()}" style="color:#6366f1">${email.trim()}</a></td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
          <p style="font-size:14px;font-weight:600;margin-bottom:8px">Message</p>
          <p style="font-size:14px;line-height:1.7;white-space:pre-wrap;background:#f9f9f9;border-left:3px solid #6366f1;padding:12px 16px;border-radius:4px">${message.trim()}</p>
          <p style="font-size:12px;color:#999;margin-top:24px">Reply directly to this email to contact ${name.trim()}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
