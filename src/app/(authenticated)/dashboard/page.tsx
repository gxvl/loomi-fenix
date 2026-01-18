"use client"

import { ConversionCard } from "@/src/components/ConversionCard/conversionCard";
import { KPICard } from "@/src/components/KPICard/kpicard";
import { MapCard } from "@/src/components/MapCard/mapCard";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TopTab } from "@/src/components/TopTab/toptab";

export default function DashboardPage() {
  return <main className="h-screen w-full flex flex-col">
    <TopTab title="Dashboard" />
    <Sidebar />
    <div className="h-screen mt-20  py-16 px-42 ml-32 flex flex-col gap-5">
      <div className="flex gap-10 justify-between">
        <KPICard/>
        <ConversionCard />
      </div>
      <MapCard/>
    </div>
  </main>;
}