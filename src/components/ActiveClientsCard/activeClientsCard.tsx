"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ActiveClients } from "@/src/common/entities/dashboard";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { columns } from "../ClientTable/columns";
import { DataTable } from "../ClientTable/data-table";

export const ActiveClientsCard = ({
  activeClients
}: {
  activeClients: ActiveClients;
}) => {
  console.log(activeClients.filters.secureType);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  // Filtrar dados
  const filteredData = useMemo(() => {
    return activeClients.data.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || client.status === statusFilter;
      const matchesType =
        typeFilter === "all" || client.secureType === typeFilter;
      const matchesLocation =
        locationFilter === "all" || client.location === locationFilter;

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [
    activeClients.data,
    searchTerm,
    statusFilter,
    typeFilter,
    locationFilter
  ]);

  return (
    <div className="border-border-gray bg-card-blue flex h-full w-full flex-col gap-5 rounded-2xl border-[0.5px] px-6 py-5">
      <h4 className="font-montserrat text-xl font-bold">Clientes ativos</h4>

      {/* Filtros */}
      <div className="flex items-center gap-3">
        {/* Busca */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-default-blue font-inter w-full rounded-full border-none py-2 pr-4 pl-10 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filtro Status */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-45 rounded-full border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white ease-in">
            <SelectItem value="all">Todos os status</SelectItem>
            {activeClients.filters.status.slice(1).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro Tipo */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-45 rounded-full border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white ease-in">
            <SelectItem value="all">Todos os tipos</SelectItem>
            {activeClients.filters.secureType.slice(1).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro Locais */}
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="bg-default-blue font-inter w-45 rounded-full border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue text-white ease-in">
            <SelectItem value="all">Todos os locais</SelectItem>
            {activeClients.filters.locations.slice(1).map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};
