import { useState } from "react";

interface SimulatorInputsProps {
  onValuesChange?: (vehicleValue: number, clientAge: number) => void;
}

export function SimulatorInputs({ onValuesChange }: SimulatorInputsProps) {
  const [vehicleValue, setVehicleValue] = useState(50000);
  const [clientAge, setClientAge] = useState(28);

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVehicleValue(value);
    onValuesChange?.(value, clientAge);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setClientAge(value);
    onValuesChange?.(vehicleValue, value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getVehiclePercentage = () => {
    return ((vehicleValue - 10000) / (500000 - 10000)) * 100;
  };

  const getAgePercentage = () => {
    return ((clientAge - 18) / (90 - 18)) * 100;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="text-lg font-semibold text-white">
          Valor do veículo: {formatCurrency(vehicleValue)}
        </label>
        <div className="relative">
          <input
            type="range"
            min="10000"
            max="500000"
            step="1000"
            value={vehicleValue}
            onChange={handleVehicleChange}
            className="slider w-full"
            style={{
              background: `linear-gradient(to right, #1876D2 0%, #1876D2 ${getVehiclePercentage()}%, #383D4E ${getVehiclePercentage()}%, #383D4E 100%)`
            }}
          />
        </div>
        <div className="text-medium-white flex justify-between text-sm">
          <span>R$ 10.000</span>
          <span>R$ 500.000</span>
        </div>
      </div>

      {/* Idade do Cliente */}
      <div className="flex flex-col gap-4">
        <label className="text-lg font-semibold text-white">
          Idade do Cliente: {clientAge} anos
        </label>
        <div className="relative">
          <input
            type="range"
            min="18"
            max="90"
            step="1"
            value={clientAge}
            onChange={handleAgeChange}
            className="slider w-full"
            style={{
              background: `linear-gradient(to right, #1876D2 0%, #1876D2 ${getAgePercentage()}%, #383D4E ${getAgePercentage()}%, #383D4E 100%)`
            }}
          />
        </div>
        <div className="text-medium-white flex justify-between text-sm">
          <span>18 anos</span>
          <span>90 anos</span>
        </div>
      </div>
    </div>
  );
}
