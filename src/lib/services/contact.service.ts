import type { ContactDocument, ContactPayload, ContactResult } from "../models/contact";
import { getMongoClient } from "./db.service";
import { sendContactEmail } from "./email.service";

type ValidationResult = string | null;

export function validate(data: ContactPayload): ValidationResult {
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

async function saveContact(document: ContactDocument): Promise<void> {
  try {
    const client = await getMongoClient();
    const db = client.db("portfolio");
    await db.collection("contacts").insertOne(document);
  } catch (dbErr) {
    console.error("[Contact API] MongoDB save failed:", dbErr);
  }
}

export async function handleContactSubmission(
  data: ContactPayload
): Promise<ContactResult> {
  const validationError = validate(data);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  const sentAt = new Date();

  await saveContact({ name, email, message, sentAt });
  await sendContactEmail({ name, email, message, sentAt });

  return { ok: true, error: null };
}
