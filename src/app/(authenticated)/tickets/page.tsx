"use client";

import { Button } from "@/components/ui/button";
import LoadingComponent from "@/src/components/LoadingComponent/loading";
import { NewTicketModal } from "@/src/components/NewTicketModal/newTicketModal";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TicketCard } from "@/src/components/TicketCard/ticketCard";
import { TicketTableCard } from "@/src/components/TicketTableCard/ticketTableCard";
import { TopTab } from "@/src/components/TopTab/toptab";
import { useGetTickets } from "@/src/hooks/queries/useGetTickets";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useGetTickets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const tickets = data?.data || [];
  const ticketsAbertos = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === "aberto"
  ).length;
  const ticketsEmAndamento = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === "em andamento"
  ).length;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const ticketsResolvidosHoje = tickets.filter((ticket) => {
    if (ticket.status.toLowerCase() !== "fechado") return false;
    const updatedAt = new Date(ticket.updatedAt);
    updatedAt.setHours(0, 0, 0, 0);
    return updatedAt.getTime() === hoje.getTime();
  }).length;

  const ticketsResolvidos = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === "fechado"
  );
  let tempoMedio = 0;
  let tempoMedioDisplay = "";
  if (ticketsResolvidos.length > 0) {
    const somaTempos = ticketsResolvidos.reduce((acc, ticket) => {
      const criado = new Date(ticket.createdAt).getTime();
      const atualizado = new Date(ticket.updatedAt).getTime();
      const diferenca = (atualizado - criado) / (1000 * 60 * 60);
      return acc + diferenca;
    }, 0);
    tempoMedio = Math.round(somaTempos / ticketsResolvidos.length);

    if (tempoMedio > 48) {
      const dias = Math.round(tempoMedio / 24);
      tempoMedioDisplay = `${tempoMedio}h (${dias} dias)`;
    } else {
      tempoMedioDisplay = `${tempoMedio}h`;
    }
  }

  const cards = [
    { title: "Tickets Abertos", icon: "/open.svg", number: ticketsAbertos },
    { title: "Em andamento", icon: "progress.svg", number: ticketsEmAndamento },
    {
      title: "Resolvidos hoje",
      icon: "solved.svg",
      number: ticketsResolvidosHoje
    },
    {
      title: "Tempo Médio",
      icon: "avgtime.svg",
      number: tempoMedio,
      customDisplay: tempoMedioDisplay
    }
  ];

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
          Erro ao carregar dashboard: {error?.message}
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
      <TopTab
        title="Gestão de Tickets"
        button={
          <NewTicketModal
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            trigger={
              <Button
                className="mr-10 flex w-max items-center rounded-full px-10"
                variant={"glowingdefault"}
              >
                <Plus className="mr-1" />
                <p className="text-base">Novo Ticket</p>
              </Button>
            }
          />
        }
      />
      <Sidebar />
      <div className="mt-20 ml-32 flex h-screen flex-col gap-10 px-42 pt-16">
        <div className="flex flex-col justify-between gap-5 xl:flex-row">
          {cards.map((card) => (
            <TicketCard
              number={card.number}
              key={card.title}
              title={card.title}
              icon={card.icon}
              customDisplay={card.customDisplay}
            />
          ))}
        </div>
        <TicketTableCard tickets={data.data} />
      </div>
    </main>
  );
}
