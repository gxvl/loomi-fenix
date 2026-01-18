"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { KpisTrend } from "@/src/common/entities/dashboard";

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
    <div className=" px-6 h-max pt-10 bg-card-blue flex flex-col gap-5 w-[60%] rounded-2xl">
      <div className="flex justify-between">
        <h4 className="font-montserrat font-bold text-xl">
          Evolução dos KPI&apos;s
        </h4>
        <div className="bg-[#24293B] rounded-full p-3 flex gap-3 relative">
          {kpis.map((kpi) => (
            <Button
              key={kpi.id}
              onClick={() => setSelectedKPI(kpi.id)}
              variant={selectedKPI === kpi.id ? "glowingcard" : "buttongray"}
              className="font-montserrat px-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
            >
              {kpi.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full ">
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
