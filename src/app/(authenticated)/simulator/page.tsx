"use client";

import { AdditionalCoverages } from "@/src/components/AdditionalCoverages/additionalCoverages";
import { IncludedBenefits } from "@/src/components/IncludedBenefits/includedBenefits";
import LoadingComponent from "@/src/components/LoadingComponent/loading";
import { PlanCard } from "@/src/components/PlanCard/planCard";
import { PlanIndicators } from "@/src/components/PlanIndicators/planIndicators";
import { PriceSummary } from "@/src/components/PriceSummary/priceSummary";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { SimulatorInputs } from "@/src/components/SimulatorInputs/simulatorInputs";
import { TopTab } from "@/src/components/TopTab/toptab";
import { useGetSimulator } from "@/src/hooks/queries/useGetSimulator";
import { useState } from "react";

interface Coverage {
  id: string;
  name: string;
  value: number;
  checked: boolean;
}

export default function SimulatorPage() {
  const { data, isLoading, isError, error } = useGetSimulator();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [vehicleValue, setVehicleValue] = useState(50000);
  const [clientAge, setClientAge] = useState(28);
  const [selectedCoverages, setSelectedCoverages] = useState<Coverage[]>([]);
  let basePrice = 0;
  let additionalPrice = 0;
  let totalPrice = 0;

  if (data && selectedPlan) {
    const plan = data.plansIndicators.find((p) => p.name === selectedPlan);
    if (plan) {
      basePrice = plan.value;

      const vehicleMultiplier = vehicleValue / 100000;
      basePrice *= vehicleMultiplier;

      if (clientAge >= 18 && clientAge <= 25) {
        basePrice *= 1.3;
      } else if (clientAge >= 65) {
        basePrice *= 1.2;
      } else if (clientAge >= 26 && clientAge <= 35) {
        basePrice *= 1.1;
      }

      additionalPrice = selectedCoverages.reduce(
        (sum, coverage) => sum + coverage.value,
        0
      );

      totalPrice = basePrice + additionalPrice;
    }
  }

  const handleValuesChange = (
    newVehicleValue: number,
    newClientAge: number
  ) => {
    setVehicleValue(newVehicleValue);
    setClientAge(newClientAge);
  };

  const handleCoveragesChange = (coverages: Coverage[]) => {
    setSelectedCoverages(coverages);
  };

  if (isLoading) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <LoadingComponent />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <div className="text-xl text-red-500">
          Erro ao carregar simulador: {error?.message}
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <div className="text-xl text-white">Nenhum dado disponível</div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col">
      <TopTab title="Simulador de Planos" />
      <Sidebar />
      <div className="mt-20 ml-32 flex h-screen gap-12 px-42 pt-16">
        <div className="bg-card-blue border-border-gray flex h-max w-[65%] flex-col gap-6 rounded-2xl border p-6">
          <h1 className="font-montserrat text-xl font-bold text-white">
            Planos personalizados
          </h1>
          <div className="flex gap-4">
            {data.plansIndicators.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan.name}
                value={`R$ ${plan.value.toFixed(2).replace(".", ",")}`}
                isRecommended={index === data.plansIndicators.length - 1}
                isSelected={selectedPlan === plan.name}
                onClick={() => setSelectedPlan(plan.name)}
              />
            ))}
          </div>
          <SimulatorInputs onValuesChange={handleValuesChange} />
          <AdditionalCoverages onCoveragesChange={handleCoveragesChange} />
        </div>
        <div className="flex h-max w-[40%] flex-col gap-10">
          {selectedPlan && (
            <PriceSummary
              basePrice={basePrice}
              additionalPrice={additionalPrice}
              totalPrice={totalPrice}
            />
          )}
          <div className="bg-card-blue border-border-gray flex flex-col gap-6 rounded-2xl border p-6">
            <IncludedBenefits benefits={data.includedBenefits} />
          </div>
          <div className="bg-card-blue border-border-gray flex flex-col gap-6 rounded-2xl border p-6">
            <PlanIndicators plans={data.plansIndicators} />
          </div>
        </div>
      </div>
    </main>
  );
}
