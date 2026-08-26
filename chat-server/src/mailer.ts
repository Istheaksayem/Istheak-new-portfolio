import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotificationEmail(
  visitorName: string,
  visitorEmail: string,
  messageText: string
) {
  const toEmail = process.env.NOTIFICATION_EMAIL;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !toEmail) {
    console.warn("[chat] SMTP credentials or NOTIFICATION_EMAIL not configured. Skipping email.");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Chat" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `New Message from ${visitorName}`,
      text: `You have received a new message on your portfolio chat.\n\nVisitor Name: ${visitorName}\nVisitor Email: ${visitorEmail}\n\nMessage:\n${messageText}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Message from Portfolio Chat</h2>
          <p><strong>Name:</strong> ${visitorName}</p>
          <p><strong>Email:</strong> <a href="mailto:${visitorEmail}">${visitorEmail}</a></p>
          <hr />
          <p style="white-space: pre-wrap;">${messageText}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">You can reply to the visitor by replying directly to this email or from your admin dashboard.</p>
        </div>
      `,
      replyTo: visitorEmail, // This allows Istheak to reply directly from his email client to the visitor!
    });
    console.log("[chat] Notification email sent: %s", info.messageId);
  } catch (error) {
    console.error("[chat] Failed to send notification email", error);
  }
}
