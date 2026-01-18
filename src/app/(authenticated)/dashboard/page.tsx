"use client";

import { ActiveClientsCard } from "@/src/components/ActiveClientsCard/activeClientsCard";
import { ConversionCard } from "@/src/components/ConversionCard/conversionCard";
import { KPICard } from "@/src/components/KPICard/kpicard";
import LoadingComponent from "@/src/components/LoadingComponent/loading";
import { MapCard } from "@/src/components/MapCard/mapCard";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TopTab } from "@/src/components/TopTab/toptab";
import { useGetDashboard } from "@/src/hooks/queries/useGetDashboard";
import { useGetMapLocations } from "@/src/hooks/queries/useGetMapLocations";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, isError, error } = useGetDashboard();
  const { data: mapData } = useGetMapLocations();

  if (isLoading) {
    return (
      <main className="h-screen w-full flex items-center justify-center">
        <LoadingComponent />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="h-screen w-full flex items-center justify-center">
        <div className="text-red-500 text-xl">
          Erro ao carregar dashboard: {error?.message}
        </div>
      </main>
    );
  }

  if (!dashboardData) {
    return (
      <main className="h-screen w-full flex items-center justify-center">
        <div className="text-white text-xl">Nenhum dado disponível</div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full flex flex-col">
      <TopTab title="Dashboard" />
      <Sidebar />
      <div className="h-screen mt-20  py-16 px-42 ml-32 flex flex-col gap-5">
        <div className="flex gap-10 justify-between">
          <KPICard kpisTrend={dashboardData.kpisTrend} />
          <ConversionCard kpisTrend={dashboardData.kpisTrend} />
        </div>
        <MapCard />
        <ActiveClientsCard activeClients={dashboardData.activeClients} />
      </div>
    </main>
  );
}
