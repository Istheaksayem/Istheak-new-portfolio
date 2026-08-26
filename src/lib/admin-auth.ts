import crypto from "crypto";

const SECRET = process.env.ADMIN_TOKEN_SECRET!;

export function signAdminToken(ttlSeconds = 60 * 60 * 8): string {
  const payload = { role: "admin", exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}
