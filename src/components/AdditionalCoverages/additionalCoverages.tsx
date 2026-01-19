import { useState } from "react";
import { SimulatorCheckbox } from "../SimulatorCheckbox/simulatorCheckbox";

interface Coverage {
  id: string;
  name: string;
  value: number;
  checked: boolean;
}

interface AdditionalCoveragesProps {
  onCoveragesChange?: (selectedCoverages: Coverage[]) => void;
}

export function AdditionalCoverages({
  onCoveragesChange
}: AdditionalCoveragesProps) {
  const [coverages, setCoverages] = useState<Coverage[]>([
    {
      id: "1",
      name: "Cobertura contra roubo e furto",
      value: 25.0,
      checked: true
    },
    { id: "2", name: "Danos por colisão", value: 35.0, checked: true },
    { id: "3", name: "Cobertura contra incêndio", value: 20.0, checked: true },
    {
      id: "4",
      name: "Fenômenos naturais (granizo, enchente)",
      value: 30.0,
      checked: false
    }
  ]);

  const handleCheckboxChange = (id: string) => {
    const updatedCoverages = coverages.map((coverage) =>
      coverage.id === id
        ? { ...coverage, checked: !coverage.checked }
        : coverage
    );
    setCoverages(updatedCoverages);
    onCoveragesChange?.(updatedCoverages.filter((c) => c.checked));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-white">Coberturas Adicionais</h3>

      <div className="flex flex-col gap-3">
        {coverages.map((coverage) => (
          <div
            key={coverage.id}
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 transition-all"
          >
            <SimulatorCheckbox
              label={coverage.name}
              checked={coverage.checked}
              onChange={() => handleCheckboxChange(coverage.id)}
            />
            <span className="font-montserrat text-sm font-bold text-white">
              + {formatCurrency(coverage.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
