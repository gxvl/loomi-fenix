"use client";

import { Ticket } from "@/src/common/entities/tickets";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Edit } from "lucide-react";
import { useState } from "react";
import { EditTicketModal } from "../EditTicketModal/editTicketModal";

export const ticketsColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketId",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-semibold text-white">{row.original.ticketId}</span>
    )
  },
  {
    accessorKey: "priority",
    header: "Prioridade",
    cell: ({ row }) => {
      const priority = row.original.priority;
      const priorityColors: { [key: string]: string } = {
        Urgente: "bg-red-500 text-white",
        Média: "bg-[#B5EDFF] text-black",
        Baixa: "bg-[#E0F7FF] text-black"
      };

      return (
        <span
          className={`font-montserrat rounded-full px-3 py-1 text-xs font-medium ${priorityColors[priority] || "bg-gray-500/20 text-gray-400"}`}
        >
          {priority}
        </span>
      );
    }
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-white">{row.original.client}</span>
        <span className="text-sm text-white">{row.original.email}</span>
      </div>
    )
  },
  {
    accessorKey: "subject",
    header: "Assunto",
    cell: ({ row }) => (
      <span className="font-semibold text-white">{row.original.subject}</span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: { [key: string]: string } = {
        Aberto: "bg-[#43D2CA] text-black",
        "Em andamento": "bg-[#D2B842] text-black",
        Fechado: "bg-green-500 text-white"
      };

      return (
        <span
          className={`font-montserrat rounded-full px-3 py-1 text-xs font-medium ${statusColors[status] || "bg-gray-500/20 text-gray-400"}`}
        >
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="font-semibold text-white">
          {date.toLocaleDateString("pt-BR")}
        </span>
      );
    }
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
    cell: ({ row }) => (
      <span className="font-semibold text-white">
        {row.original.responsible}
      </span>
    )
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isEditOpen, setIsEditOpen] = useState(false);

      return (
        <div className="flex gap-4">
          <EditTicketModal
            trigger={
              <button className="flex cursor-pointer gap-2 text-blue-400 hover:text-blue-300">
                <Edit className="h-4 w-4" />
                <p className="text-xs text-white">Editar</p>
              </button>
            }
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            ticketId={row.original.id}
          />
          <button className="flex cursor-pointer gap-2 text-blue-400 hover:text-blue-300">
            <p className="text-xs text-white">Ver</p>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      );
    }
  }
];
