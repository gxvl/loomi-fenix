"use client";

import { Client } from "@/src/common/entities/dashboard";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-white">{row.original.name}</span>
        <span className="text-sm text-white">{row.original.email}</span>
      </div>
    )
  },
  {
    accessorKey: "secureType",
    header: "Tipo de Seguro",
    cell: ({ row }) => (
      <span className="text-white font-semibold">
        {row.original.secureType}
      </span>
    )
  },
  {
    accessorKey: "monthValue",
    header: "Valor mensal",
    cell: ({ row }) => (
      <span className="text-white font-semibold">
        R$ {row.original.monthValue.toFixed(2)}
      </span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: { [key: string]: string } = {
        Ativo: "bg-[#43D2CA] text-black",
        Pendente: "bg-[#D2B842] text-black",
        Inativo: "bg-red-500/20 text-black"
      };

      return (
        <span
          className={`px-3 py-1 rounded-full font-montserrat text-xs font-medium ${statusColors[status] || "bg-gray-500/20 text-gray-400"}`}
        >
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "renewalDate",
    header: "Renovação",
    cell: ({ row }) => (
      <span className="text-white font-semibold">
        {row.original.renewalDate}
      </span>
    )
  },
  {
    accessorKey: "location",
    header: "Região",
    cell: ({ row }) => (
      <span className="text-white font-semibold">{row.original.location}</span>
    )
  }
];
