import { getTicket } from "@/src/services/tickets";
import { useQuery } from "@tanstack/react-query";

export const useGetTicket = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
    enabled: !!id && enabled
  });
};
