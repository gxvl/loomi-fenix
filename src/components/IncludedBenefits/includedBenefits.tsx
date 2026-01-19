interface IncludedBenefitsProps {
  benefits: string[];
}

export function IncludedBenefits({ benefits }: IncludedBenefitsProps) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="text-xl font-bold text-white">Benefícios Inclusos</h3>

      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-table-gray flex items-center gap-2 rounded-full border border-[#393E4E] px-4 py-2"
          >
            <div className="h-2 w-2 rounded-full bg-[#1876D2] shadow-[0_0_4px_0_#53A9FD]" />
            <span className="font-montserrat text-sm font-bold text-white">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
