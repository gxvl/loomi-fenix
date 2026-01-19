"use client";

import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TopTab } from "@/src/components/TopTab/toptab";

export default function AccountPage() {
  const userData = {
    name: "Geraldo Loomi",
    email: "geraldo.loomi@fenixseguros.com.br",
    role: "Consultor de Seguros",
    phone: "+55 11 98765-4321",
    cpf: "123.456.789-00",
    dateJoined: "15 de Março, 2024",
    totalSales: "R$ 125.000,00",
    activePolicies: 47,
    clientsSatisfaction: "98%"
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
      <TopTab title="Minha Conta" />
      <Sidebar />
      <div className="mt-20 ml-32 flex gap-10 px-42 pt-16 pb-20">
        <div className="flex w-full flex-col gap-6">
          <div className="bg-card-blue border-border-gray flex gap-8 rounded-2xl border p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-[#1876D2] to-[#43D2CA] text-5xl font-bold text-white shadow-lg">
                GL
              </div>
              <button className="rounded-lg bg-[#1A1F2E] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#23293B]">
                Alterar Foto
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <div>
                <h1 className="font-montserrat text-3xl font-bold text-white">
                  {userData.name}
                </h1>
                <p className="mt-1 text-lg text-[#43D2CA]">{userData.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">E-mail</span>
                  <span className="font-montserrat text-base text-white">
                    {userData.email}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">Telefone</span>
                  <span className="font-montserrat text-base text-white">
                    {userData.phone}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">CPF</span>
                  <span className="font-montserrat text-base text-white">
                    {userData.cpf}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">Membro desde</span>
                  <span className="font-montserrat text-base text-white">
                    {userData.dateJoined}
                  </span>
                </div>
              </div>

              <button className="font-montserrat mt-4 w-fit rounded-lg bg-[#1876D2] px-6 py-3 text-base font-bold text-white transition-all hover:scale-105 hover:bg-[#1565C0]">
                Editar Perfil
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-card-blue border-border-gray flex flex-col gap-3 rounded-2xl border p-6">
              <span className="text-sm text-gray-400">Vendas Totais</span>
              <span className="font-montserrat text-3xl font-bold text-white">
                {userData.totalSales}
              </span>
            </div>

            <div className="bg-card-blue border-border-gray flex flex-col gap-3 rounded-2xl border p-6">
              <span className="text-sm text-gray-400">Apólices Ativas</span>
              <span className="font-montserrat text-3xl font-bold text-white">
                {userData.activePolicies}
              </span>
            </div>

            <div className="bg-card-blue border-border-gray flex flex-col gap-3 rounded-2xl border p-6">
              <span className="text-sm text-gray-400">
                Satisfação dos Clientes
              </span>
              <span className="font-montserrat text-3xl font-bold text-[#00DC04] [text-shadow:0_0_4px_rgba(0,220,4,0.5)]">
                {userData.clientsSatisfaction}
              </span>
            </div>
          </div>

          <div className="bg-card-blue border-border-gray flex flex-col gap-6 rounded-2xl border p-8">
            <h2 className="font-montserrat text-2xl font-bold text-white">
              Configurações
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg bg-[#1A1F2E] p-4 transition-all hover:bg-[#23293B]">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    Notificações por E-mail
                  </span>
                  <span className="text-sm text-gray-400">
                    Receber atualizações sobre novos clientes e vendas
                  </span>
                </div>
                <div className="h-6 w-11 cursor-pointer rounded-full bg-[#1876D2] shadow-inner"></div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#1A1F2E] p-4 transition-all hover:bg-[#23293B]">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    Notificações Push
                  </span>
                  <span className="text-sm text-gray-400">
                    Receber alertas no navegador
                  </span>
                </div>
                <div className="bg-button-gray h-6 w-11 cursor-pointer rounded-full shadow-inner"></div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#1A1F2E] p-4 transition-all hover:bg-[#23293B]">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Modo Escuro</span>
                  <span className="text-sm text-gray-400">
                    Tema escuro ativado por padrão
                  </span>
                </div>
                <div className="h-6 w-11 cursor-pointer rounded-full bg-[#1876D2] shadow-inner"></div>
              </div>
            </div>

            <button className="font-montserrat mt-4 w-fit rounded-lg border border-red-500 bg-transparent px-6 py-3 text-base font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white">
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
