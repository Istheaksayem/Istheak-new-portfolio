export const config = {
  port: Number(process.env.CHAT_PORT ?? 3001),
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin",
  mongodbUri: process.env.MONGODB_URI ?? "",
};
