import { PlanIndicator } from "@/src/common/entities/simulator";

interface PlanIndicatorsProps {
  plans: PlanIndicator[];
}

export function PlanIndicators({ plans }: PlanIndicatorsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6 p-3">
      <h3 className="text-xl font-bold text-white">Indicadores</h3>

      <div className="flex flex-col gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between rounded-2xl border border-[#383E4E] bg-[#23293B] p-6"
          >
            <div className="flex flex-col gap-2">
              <h4 className="font-montserrat text-lg font-bold text-white">
                {plan.name}
              </h4>
              <div className="flex gap-4 text-sm">
                <span className="text-white">
                  Conversão:{" "}
                  <span className="font-bold text-[#00DC04] [text-shadow:0_0_4px_rgba(0,220,4,0.5)]">
                    {plan.conversion}%
                  </span>
                </span>
                <span className="text-white">
                  ROI:{" "}
                  <span className="font-bold text-[#00DC04] [text-shadow:0_0_4px_rgba(0,220,4,0.5)]">
                    {plan.roi}%
                  </span>
                </span>
              </div>
            </div>
            <div className="font-montserrat text-2xl font-bold text-white">
              {formatCurrency(plan.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
