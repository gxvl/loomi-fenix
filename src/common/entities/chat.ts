export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: "user_message" | "assistant_message";
}

export interface ChatResponse {
  messages: ChatMessage[];
}
