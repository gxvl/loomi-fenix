import {
  CreateTicketRequest,
  CreateTicketResponse,
  GetTicketResponse,
  TicketsResponse,
  UpdateTicketRequest,
  UpdateTicketResponse
} from "@/src/common/entities/tickets";
import api from "./api";

export const getTickets = async (): Promise<TicketsResponse> => {
  const response = await api.get<TicketsResponse>("/tickets");
  return response.data;
};

export const getTicket = async (id: string): Promise<GetTicketResponse> => {
  const response = await api.get<GetTicketResponse>(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (
  data: CreateTicketRequest
): Promise<CreateTicketResponse> => {
  const response = await api.post<CreateTicketResponse>("/tickets", data);
  return response.data;
};

export const updateTicket = async (
  id: string,
  data: UpdateTicketRequest
): Promise<UpdateTicketResponse> => {
  const response = await api.patch<UpdateTicketResponse>(
    `/tickets/${id}`,
    data
  );
  return response.data;
};
