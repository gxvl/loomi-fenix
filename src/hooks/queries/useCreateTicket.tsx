import { CreateTicketRequest } from "@/src/common/entities/tickets";
import { createTicket } from "@/src/services/tickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
};
