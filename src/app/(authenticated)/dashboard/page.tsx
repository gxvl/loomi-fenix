"use client";

import { ActiveClientsCard } from "@/src/components/ActiveClientsCard/activeClientsCard";
import { ConversionCard } from "@/src/components/ConversionCard/conversionCard";
import { KPICard } from "@/src/components/KPICard/kpicard";
import LoadingComponent from "@/src/components/LoadingComponent/loading";
import { MapCard } from "@/src/components/MapCard/mapCard";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TopTab } from "@/src/components/TopTab/toptab";
import { useGetDashboard } from "@/src/hooks/queries/useGetDashboard";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, isError, error } = useGetDashboard();

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

  if (!dashboardData) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <div className="text-xl text-white">Nenhum dado disponível</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col">
      <TopTab title="Dashboard" />
      <Sidebar />
      <div className="mt-20 ml-32 flex min-h-screen flex-col gap-10 px-42 py-16">
        <div className="flex flex-col justify-between gap-10 xl:flex-row">
          <KPICard kpisTrend={dashboardData.kpisTrend} />
          <ConversionCard kpisTrend={dashboardData.kpisTrend} />
        </div>
        <MapCard />
        <ActiveClientsCard activeClients={dashboardData.activeClients} />
      </div>
    </main>
  );
}
