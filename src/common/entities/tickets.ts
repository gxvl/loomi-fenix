export interface Ticket {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketsResponse {
  data: Ticket[];
}

export interface CreateTicketRequest {
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
}

export interface CreateTicketResponse {
  data: Ticket;
}

export interface GetTicketResponse {
  data: Ticket;
}

export interface UpdateTicketRequest {
  priority: string;
  client: string;
  email: string;
  subject: string;
  responsible: string;
}

export interface UpdateTicketResponse {
  data: Ticket;
}
