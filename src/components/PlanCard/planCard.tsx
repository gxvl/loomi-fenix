"use client";

export const PlanCard = ({
  plan,
  value,
  isRecommended = false,
  isSelected = false,
  onClick
}: {
  plan: string;
  value: string;
  isRecommended?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-max w-full flex-col gap-5 rounded-2xl border-[0.5px] bg-[#23293B] p-6 transition-all duration-300 hover:bg-[#2A3147] ${
        isSelected
          ? "scale-105 border-[#1876D2] shadow-lg shadow-[#1876D2]/20"
          : "border-[#383E4E]"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-montserrat text-xl font-bold">{plan}</h4>
        {isRecommended && (
          <div className="rounded-3xl bg-[#43D2CA] px-2 py-1">
            <p className="text-sm font-semibold text-black">Recomendado</p>
          </div>
        )}
      </div>
      <h2 className="font-montserrat text-2xl font-bold text-white">{value}</h2>
      <p className="text-sm text-[#A7A9B1]">Por mês</p>
    </div>
  );
};
