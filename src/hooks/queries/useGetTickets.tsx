import { getTickets } from "@/src/services/tickets";
import { useQuery } from "@tanstack/react-query";

export const useGetTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets
  });
};
