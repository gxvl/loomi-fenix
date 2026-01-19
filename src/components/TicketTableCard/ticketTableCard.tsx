"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Ticket } from "@/src/common/entities/tickets";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DebouncedInput } from "../DebouncedInput/debouncedInput";
import { ticketsColumns } from "../TicketTable/columns";
import { TicketTable } from "../TicketTable/data-table";

interface TicketTableCardProps {
  tickets: Ticket[];
}

export const TicketTableCard = ({ tickets }: TicketTableCardProps) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [responsibleFilter, setResponsibleFilter] = useState("all");

  const uniqueStatuses = useMemo(
    () => Array.from(new Set(tickets.map((t) => t.status))).sort(),
    [tickets]
  );
  const uniquePriorities = useMemo(
    () => Array.from(new Set(tickets.map((t) => t.priority))).sort(),
    [tickets]
  );
  const uniqueResponsibles = useMemo(
    () => Array.from(new Set(tickets.map((t) => t.responsible))).sort(),
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    const lowerSearch = globalFilter.toLowerCase();

    if (
      !lowerSearch &&
      statusFilter === "all" &&
      priorityFilter === "all" &&
      responsibleFilter === "all"
    ) {
      return tickets;
    }

    return tickets.filter((ticket) => {
      if (statusFilter !== "all" && ticket.status !== statusFilter)
        return false;
      if (priorityFilter !== "all" && ticket.priority !== priorityFilter)
        return false;
      if (
        responsibleFilter !== "all" &&
        ticket.responsible !== responsibleFilter
      )
        return false;

      if (lowerSearch === "") return true;

      return (
        ticket.ticketId.toLowerCase().includes(lowerSearch) ||
        ticket.client.toLowerCase().includes(lowerSearch) ||
        ticket.subject.toLowerCase().includes(lowerSearch)
      );
    });
  }, [tickets, globalFilter, statusFilter, priorityFilter, responsibleFilter]);

  return (
    <div className="border-border-gray bg-card-blue flex h-max w-full flex-col gap-5 rounded-2xl border-[0.5px] px-6 py-8">
      <h4 className="font-montserrat text-xl font-bold">Lista de Tickets</h4>

      <div className="flex w-full flex-col items-stretch gap-2 xl:flex-row xl:items-center">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <DebouncedInput
            placeholder="Buscar por ID, cliente ou assunto..."
            value={globalFilter}
            onChange={(value) => setGlobalFilter(value)}
            debounce={300}
            className="bg-default-blue font-inter w-full rounded-full border-none py-2 pr-4 pl-10 text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-auto rounded-full border-none">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white">
            <SelectItem value="all">Todos os status</SelectItem>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-auto rounded-full border-none">
            <SelectValue placeholder="Todas as prioridades" />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white">
            <SelectItem value="all">Todas as prioridades</SelectItem>
            {uniquePriorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-auto rounded-full border-none">
            <SelectValue placeholder="Todos os responsáveis" />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white">
            <SelectItem value="all">Todos os responsáveis</SelectItem>
            {uniqueResponsibles.map((responsible) => (
              <SelectItem key={responsible} value={responsible}>
                {responsible}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <TicketTable columns={ticketsColumns} data={filteredTickets} />
      </div>
    </div>
  );
};
