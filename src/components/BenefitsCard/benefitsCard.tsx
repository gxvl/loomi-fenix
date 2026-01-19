import { Check } from "lucide-react";

interface BenefitsCardProps {
  benefits: string[];
}

export function BenefitsCard({ benefits }: BenefitsCardProps) {
  return (
    <div className="bg-card-blue border-border-gray flex flex-col gap-6 rounded-3xl border p-8">
      <div className="flex items-center gap-3">
        <div className="bg-glowingblue/10 flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="text-glowingblue h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">Benefícios Incluídos</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-grayblue hover:bg-light-grayblue flex items-center gap-3 rounded-xl p-4 transition-all"
          >
            <div className="bg-accent-blue flex h-8 w-8 items-center justify-center rounded-full">
              <Check className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-white">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
