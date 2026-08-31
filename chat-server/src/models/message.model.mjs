export function buildVisitorMessage({ name, email, text, socketId }) {
  return {
    role: "visitor",
    name,
    email,
    text: text.trim(),
    createdAt: new Date().toISOString(),
    socketId,
  };
}

export function buildAdminMessage({ text, to }) {
  return {
    role: "admin",
    text,
    createdAt: new Date().toISOString(),
    to,
  };
}
