export type Sender = "visitor" | "admin";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: Sender;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  conversationId: string;
  visitorName: string;
  visitorEmail: string;
  status: "open" | "closed";
  unreadForAdmin: number;
  lastMessage?: string;
  lastMessageAt: string;
  createdAt: string;
}
