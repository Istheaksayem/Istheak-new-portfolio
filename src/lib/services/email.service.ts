import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

function createTransporter(): Transporter {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface SendContactEmailInput {
  name: string;
  email: string;
  message: string;
  sentAt: Date;
}

export async function sendContactEmail({
  name,
  email,
  message,
  sentAt,
}: SendContactEmailInput): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New message from ${name} – Portfolio Contact`,
    text: `You received a new contact form submission.\n\nName:    ${name}\nEmail:   ${email}\nDate:    ${sentAt.toUTCString()}\n\nMessage:\n${message}\n\n---\nReply to this email to respond directly to ${name}.`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="font-size:20px;font-weight:600;margin-bottom:4px">New Portfolio Contact</h2>
        <p style="color:#555;font-size:14px;margin-top:0">${sentAt.toUTCString()}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr>
            <td style="padding:6px 0;color:#555;width:80px;font-weight:600">Name</td>
            <td style="padding:6px 0">${name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;font-weight:600">Email</td>
            <td style="padding:6px 0"><a href="mailto:${email}" style="color:#6366f1">${email}</a></td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
        <p style="font-size:14px;font-weight:600;margin-bottom:8px">Message</p>
        <p style="font-size:14px;line-height:1.7;white-space:pre-wrap;background:#f9f9f9;border-left:3px solid #6366f1;padding:12px 16px;border-radius:4px">${message}</p>
        <p style="font-size:12px;color:#999;margin-top:24px">Reply directly to this email to contact ${name}.</p>
      </div>
    `,
  });
}
