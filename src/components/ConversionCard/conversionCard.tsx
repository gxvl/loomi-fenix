"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { KpisTrend } from "@/src/common/entities/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const ConversionCard = ({ kpisTrend }: { kpisTrend: KpisTrend }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      background: "transparent",
      toolbar: {
        show: false
      }
    },
    colors: ["#2B9FE8"],
    plotOptions: {
      bar: {
        columnWidth: "60%",
        distributed: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: kpisTrend.labels,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px"
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
      strokeDashArray: 4
    }
  };

  const series = [
    {
      name: kpisTrend.conversionTrend.name,
      data: kpisTrend.conversionTrend.data
    }
  ];

  return (
    <div className="h-max px-6 pt-10 bg-card-blue flex flex-col gap-5 w-[40%] rounded-2xl">
      <div className="flex items-center justify-between">
        <h4 className="font-montserrat font-bold text-xl">Taxa de conversão</h4>
        <ChevronRight size={26} color="white" className="cursor-pointer" />
      </div>

      <div className="w-full">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};
