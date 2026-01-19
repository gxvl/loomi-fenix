"use client";

import { KpisTrend } from "@/src/common/entities/dashboard";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const ConversionCard = ({ kpisTrend }: { kpisTrend: KpisTrend }) => {
  const [showSecondHalf, setShowSecondHalf] = useState(false);

  const displayedLabels = showSecondHalf
    ? kpisTrend.labels.slice(6, 12)
    : kpisTrend.labels.slice(0, 6);
  const displayedData = showSecondHalf
    ? kpisTrend.conversionTrend.data.slice(6, 12)
    : kpisTrend.conversionTrend.data.slice(0, 6);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
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
    plotOptions: {
      bar: {
        columnWidth: "60%",
        distributed: false,
        borderRadius: 8,
        borderRadiusApplication: "end"
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: displayedLabels,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
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
        return `<div style="padding: 8px 12px; background: #1A1F2E; border-radius: 8px; font-family: Montserrat, sans-serif; font-size: 14px; color: #fff;">
          ${series[seriesIndex][dataPointIndex]} novos clientes
        </div>`;
      }
    },
    grid: {
      borderColor: "#2D3447",
      strokeDashArray: 0
    }
  };

  const series = [
    {
      name: kpisTrend.conversionTrend.name,
      data: displayedData
    }
  ];

  return (
    <div className="border-border-gray bg-card-blue flex h-max w-full flex-col gap-5 rounded-2xl border-[0.5px] px-6 pt-8 xl:w-[40%]">
      <div className="flex items-center justify-between">
        <h4 className="font-montserrat text-xl font-bold">Taxa de conversão</h4>
        <button
          onClick={() => setShowSecondHalf(!showSecondHalf)}
          className="transition-all duration-300 hover:scale-110"
          aria-label={
            showSecondHalf
              ? "Mostrar primeiros meses"
              : "Mostrar próximos meses"
          }
        >
          <ChevronRight
            size={26}
            color="white"
            className={`cursor-pointer transition-transform duration-300 ${showSecondHalf ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>

      <div className="w-full">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={280}
        />
      </div>
    </div>
  );
};
