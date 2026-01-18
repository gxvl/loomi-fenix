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
    <div className="h-full px-6 border-[0.5px] border-border-gray py-10 bg-card-blue flex flex-col gap-5 w-full rounded-2xl">
      <h4 className="font-montserrat font-bold text-xl">Clientes ativos</h4>

      {/* Filtros */}
      <div className="flex gap-3 items-center">
        {/* Busca */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-default-blue text-white border-none rounded-full font-inter text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro Status */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue ease-in text-white">
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
          <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue ease-in text-white">
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
          <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-inter bg-default-blue ease-in text-white">
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
