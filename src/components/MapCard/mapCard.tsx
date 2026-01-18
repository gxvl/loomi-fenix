"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import MapView from "../MapView/mapView";
import { useGetMapLocations } from "@/src/hooks/queries/useGetMapLocations";
import { useState, useMemo } from "react";

// Dicionário de tradução de categorias
const categoryLabels: { [key: string]: string } = {
  commerce: "Comércio",
  education: "Educação",
  entertainment: "Entretenimento",
  food: "Alimentação",
  health: "Saúde",
  heritage: "Patrimônio",
  park: "Parque",
  sports: "Esportes",
  tourism: "Turismo",
  transport: "Transporte"
};

// Função para extrair apenas a cidade do endereço
const extractCity = (address: string): string => {
  // Padrão: "Rua X, bairro, Cidade - UF" -> extrair apenas "Cidade"
  const parts = address.split(",");
  if (parts.length >= 3) {
    // Pega a última parte antes do " - UF"
    const lastPart = parts[parts.length - 1].trim();
    // Remove o " - UF" se existir
    const cityWithState = lastPart.split("-")[0].trim();
    return cityWithState;
  }
  return address;
};

export const MapCard = () => {
  const { data: mapData, isLoading } = useGetMapLocations();
  const [placeFilter, setPlaceFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Extrair cidades únicas dos endereços
  const uniquePlaces = useMemo(() => {
    if (!mapData?.data.locations) return [];
    const cities = Array.from(
      new Set(mapData.data.locations.map((loc) => extractCity(loc.address)))
    );
    return cities.sort();
  }, [mapData]);

  // Extrair categorias únicas com tradução (category)
  const uniqueCategories = useMemo(() => {
    if (!mapData?.data.locations) return [];
    const categories = Array.from(
      new Set(mapData.data.locations.map((loc) => loc.category))
    );
    return categories.sort().map((cat) => ({
      value: cat,
      label: categoryLabels[cat]
    }));
  }, [mapData]);

  // Filtrar locations baseado nos filtros selecionados
  const filteredLocations = useMemo(() => {
    if (!mapData?.data.locations) return [];

    return mapData.data.locations.filter((location) => {
      const locationCity = extractCity(location.address);
      const matchesPlace =
        placeFilter === "all" || locationCity === placeFilter;
      const matchesType =
        typeFilter === "all" || location.category === typeFilter;
      return matchesPlace && matchesType;
    });
  }, [mapData, placeFilter, typeFilter]);

  // CORREÇÃO: Calcular o label atual explicitamente baseado no estado
  const currentCategoryLabel =
    typeFilter === "all"
      ? "Todos os tipos"
      : categoryLabels[typeFilter] || typeFilter;

  return (
    <div className="h-full px-6 py-10 bg-card-blue flex flex-col gap-5 w-full rounded-2xl">
      <div className="flex justify-between">
        <h4 className="font-montserrat font-bold text-xl">
          Mapa de clientes por região
        </h4>
        <div className="flex gap-2 items-center">
          {/* Select de Locais */}
          <Select value={placeFilter} onValueChange={setPlaceFilter}>
            <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
              <SelectValue
                placeholder="Todos os locais"
                className="text-light-white"
              >
                {placeFilter === "all" ? "Todos os locais" : placeFilter}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="font-inter bg-default-blue ease-in text-white">
              <SelectItem value="all">Todos os locais</SelectItem>
              {uniquePlaces.map((place) => (
                <SelectItem key={place} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Select de Categorias (CORRIGIDO) */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
              {/* Forçamos o children do SelectValue para exibir o label traduzido */}
              <SelectValue
                placeholder="Todos os tipos"
                className="text-light-white"
              >
                {currentCategoryLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="font-inter bg-default-blue ease-in text-white">
              <SelectItem value="all">Todos os tipos</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full h-max rounded-4xl">
        {isLoading ? (
          <div className="w-full h-100 flex items-center justify-center text-white">
            Carregando mapa...
          </div>
        ) : (
          <MapView locations={filteredLocations} />
        )}
      </div>
    </div>
  );
};
