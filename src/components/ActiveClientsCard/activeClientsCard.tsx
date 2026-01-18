import { ActiveClients } from "@/src/common/entities/dashboard";

export const ActiveClientsCard = ({
  activeClients
}: {
  activeClients: ActiveClients;
}) => {
  return (
    <div className="h-full px-6 border-[0.5px] border-border-gray py-10 bg-card-blue flex flex-col gap-5 w-full rounded-2xl">
      <h4 className="font-montserrat font-bold text-xl">Clientes ativos</h4>
    </div>
  );
};
