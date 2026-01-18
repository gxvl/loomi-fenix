"use client";

import { Button } from "@/components/ui/button";
import { KpisTrend } from "@/src/common/entities/dashboard";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const KPICard = ({ kpisTrend }: { kpisTrend: KpisTrend }) => {
  const [selectedKPI, setSelectedKPI] = useState("arpu");

  const kpis = [
    { id: "retencao", label: "Retenção", trend: kpisTrend.retentionTrend },
    { id: "conversao", label: "Conversão", trend: kpisTrend.conversionTrend },
    { id: "churn", label: "Churn", trend: kpisTrend.churnTrend },
    { id: "arpu", label: "ARPU", trend: kpisTrend.arpuTrend }
  ];

  const selectedKPIData = kpis.find((kpi) => kpi.id === selectedKPI);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "area",
      background: "transparent",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 1
    },
    xaxis: {
      type: "category",
      categories: kpisTrend.labels,
      labels: {
        style: {
          colors: "#fff"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff"
        }
      }
    },
    tooltip: {
      theme: "dark"
    },
    grid: {
      borderColor: "#2D3447",
      strokeDashArray: 0
    },
    legend: {
      labels: {
        colors: "#fff"
      }
    }
  };

  const series = selectedKPIData
    ? [
        {
          name: selectedKPIData.trend.name,
          data: selectedKPIData.trend.data
        }
      ]
    : [];

  return (
    <div className="border-border-gray bg-card-blue flex h-full w-[60%] flex-col gap-5 rounded-2xl border-[0.5px] px-6 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-montserrat text-xl font-bold">
          Evolução dos KPI&apos;s
        </h4>
        <div className="relative flex gap-3 rounded-full bg-[#24293B] p-3">
          {kpis.map((kpi) => (
            <Button
              key={kpi.id}
              onClick={() => setSelectedKPI(kpi.id)}
              variant={selectedKPI === kpi.id ? "glowingcard" : "buttongray"}
              className="font-montserrat rounded-full px-3 transition-all duration-300 ease-in-out hover:scale-105"
            >
              {kpi.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="area"
          height={250}
        />
      </div>
    </div>
  );
};
