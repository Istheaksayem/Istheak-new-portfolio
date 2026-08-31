export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactDocument {
  name: string;
  email: string;
  message: string;
  sentAt: Date;
}

export type ContactResult =
  | { ok: true; error: null }
  | { ok: false; error: string };
