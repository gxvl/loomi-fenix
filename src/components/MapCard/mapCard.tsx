"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetMapLocations } from "@/src/hooks/queries/useGetMapLocations";
import { useMemo, useState } from "react";
import MapView from "../MapView/mapView";

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

const extractCity = (address: string): string => {
  const parts = address.split(",");

  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1].trim();

    const cityParts = lastPart.split("-");
    if (cityParts.length >= 2) {
      return cityParts[cityParts.length - 2].trim();
    }

    return lastPart.trim();
  }

  return address;
};

// Verifica se o endereço é do Brasil baseado nas UFs
const isBrazilianAddress = (address: string): boolean => {
  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO"
  ];

  const upperAddress = address.toUpperCase();
  return brazilianStates.some((state) => upperAddress.endsWith(state));
};

export const MapCard = () => {
  const { data: mapData, isLoading } = useGetMapLocations();
  const [placeFilter, setPlaceFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const uniquePlaces = useMemo(() => {
    if (!mapData?.data.locations) return [];

    const brazilianLocations = mapData.data.locations.filter((loc) =>
      isBrazilianAddress(loc.address)
    );

    const cities = Array.from(
      new Set(brazilianLocations.map((loc) => extractCity(loc.address)))
    );
    return cities.sort();
  }, [mapData]);

  const uniqueCategories = useMemo(() => {
    if (!mapData?.data.locations) return [];

    const brazilianLocations = mapData.data.locations.filter((loc) =>
      isBrazilianAddress(loc.address)
    );

    const categories = Array.from(
      new Set(brazilianLocations.map((loc) => loc.category))
    );
    return categories.sort().map((cat) => ({
      value: cat,
      label: categoryLabels[cat]
    }));
  }, [mapData]);

  const filteredLocations = useMemo(() => {
    if (!mapData?.data.locations) return [];

    return mapData.data.locations.filter((location) => {
      const locationCity = extractCity(location.address);

      const isBrazil = isBrazilianAddress(location.address);

      const matchesPlace =
        placeFilter === "all" || locationCity === placeFilter;
      const matchesType =
        typeFilter === "all" || location.category === typeFilter;

      return isBrazil && matchesPlace && matchesType;
    });
  }, [mapData, placeFilter, typeFilter]);

  const currentCategoryLabel =
    typeFilter === "all"
      ? "Todos os tipos"
      : categoryLabels[typeFilter] || typeFilter;

  return (
    <div className="border-border-gray bg-card-blue flex h-full w-full flex-col gap-5 rounded-2xl border-[0.5px] px-6 py-8">
      <div className="flex justify-between">
        <h4 className="font-montserrat text-xl font-bold">
          Mapa de clientes por região
        </h4>
        <div className="flex items-center gap-2">
          {/* Select de Locais */}
          <Select value={placeFilter} onValueChange={setPlaceFilter}>
            <SelectTrigger className="bg-default-blue font-inter w-45 rounded-full border-none">
              <SelectValue
                placeholder="Todos os locais"
                className="text-light-white"
              >
                {placeFilter === "all" ? "Todos os locais" : placeFilter}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="font-inter bg-default-blue text-white ease-in">
              <SelectItem value="all">Todos os locais</SelectItem>
              {uniquePlaces.map((place) => (
                <SelectItem key={place} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="bg-default-blue font-inter w-45 rounded-full border-none">
              <SelectValue
                placeholder="Todos os tipos"
                className="text-light-white"
              >
                {currentCategoryLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="font-inter bg-default-blue text-white ease-in">
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
      <div className="h-max w-full rounded-4xl">
        {isLoading ? (
          <div className="flex h-100 w-full items-center justify-center text-white">
            Carregando mapa...
          </div>
        ) : (
          <MapView locations={filteredLocations} />
        )}
      </div>
    </div>
  );
};
