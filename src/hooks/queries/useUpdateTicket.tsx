import { UpdateTicketRequest } from "@/src/common/entities/tickets";
import { updateTicket } from "@/src/services/tickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicketRequest }) =>
      updateTicket(id, data),
    onSuccess: () => {
      // Invalida a query de tickets para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
};
