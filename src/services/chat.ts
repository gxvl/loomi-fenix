import { ChatResponse } from "@/src/common/entities/chat";
import api from "./api";

export const getChat = async (): Promise<ChatResponse> => {
  const response = await api.get<ChatResponse>("/nortus-v1/chat");
  return response.data;
};
