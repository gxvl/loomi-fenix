import Image from "next/image";

export const TicketCard = ({
  title,
  icon,
  number,
  customDisplay
}: {
  title: string;
  icon: string;
  number: number;
  customDisplay?: string;
}) => {
  return (
    <div className="border-border-gray animate-all bg-card-blue flex h-max w-full flex-col gap-5 rounded-2xl border-[0.5px] p-6 transition-all duration-300 hover:scale-105">
      <h2 className="text-sm text-white">{title}</h2>
      <div className="flex justify-between">
        <p className="text-2xl font-bold text-white">
          {customDisplay || number}
        </p>
        <Image src={icon} alt={`${title} icon`} width={35} height={35} />
      </div>
    </div>
  );
};
