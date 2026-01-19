interface PriceSummaryProps {
  basePrice: number;
  additionalPrice: number;
  totalPrice: number;
}

export function PriceSummary({
  basePrice,
  additionalPrice,
  totalPrice
}: PriceSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="border-border-gray bg-card-blue flex flex-col gap-4 rounded-2xl border p-6">
      <h3 className="font-montserrat text-xl font-bold text-white">
        Resumo do Valor
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">Plano Base</span>
          <span className="font-montserrat text-base font-semibold text-white">
            {formatCurrency(basePrice)}
          </span>
        </div>

        {additionalPrice > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Coberturas Adicionais</span>
            <span className="font-montserrat text-base font-semibold text-[#43D2CA]">
              + {formatCurrency(additionalPrice)}
            </span>
          </div>
        )}

        <div className="border-border-gray my-2 border-t" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">Total Mensal</span>
          <span className="font-montserrat text-3xl font-bold text-[#1876D2]">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>

      <button className="font-montserrat mt-4 w-full rounded-lg bg-[#1876D2] py-3 text-base font-bold text-white transition-all hover:scale-105 hover:bg-[#1565C0]">
        Contratar Plano
      </button>
    </div>
  );
}
