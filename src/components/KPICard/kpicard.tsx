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
    colors: ["#4DD3CC"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["rgba(77, 211, 204, 0.1)"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.3,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#4DD3CC"]
    },
    xaxis: {
      type: "category",
      categories: kpisTrend.labels,
      labels: {
        style: {
          colors: "#fff",
          fontFamily: "Montserrat, sans-serif"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontFamily: "Montserrat, sans-serif"
        }
      }
    },
    tooltip: {
      theme: "dark",
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
      }) {
        const value = series[seriesIndex][dataPointIndex];
        const formattedValue =
          value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}K` : `R$ ${value}`;
        return `<div style="padding: 8px 12px; background: #1A1F2E; border-radius: 8px; font-family: Montserrat, sans-serif; font-size: 14px; color: #fff;">
          ${formattedValue}
        </div>`;
      }
    },
    grid: {
      borderColor: "#2D3447",
      strokeDashArray: 0
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
    <div className="border-border-gray bg-card-blue flex h-full w-full flex-col gap-5 rounded-2xl border-[0.5px] px-6 pt-4 xl:w-[60%]">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h4 className="font-montserrat text-xl font-bold">
          Evolução dos KPI&apos;s
        </h4>
        <div className="flex gap-3 rounded-full bg-[#24293B] p-3">
          {kpis.map((kpi) => (
            <Button
              key={kpi.id}
              onClick={() => setSelectedKPI(kpi.id)}
              variant={selectedKPI === kpi.id ? "glowingcard" : "buttongray"}
              className="font-montserrat rounded-full px-3 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <p className="text-xs font-semibold">{kpi.label}</p>
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
