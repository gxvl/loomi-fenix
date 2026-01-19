import { getChat } from "@/src/services/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetChat = () => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: getChat
  });
};
