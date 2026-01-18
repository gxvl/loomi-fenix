"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const KPICard = () => {
  const [selectedKPI, setSelectedKPI] = useState("arpu");
  
  const kpis = [
    { id: "retencao", label: "Retenção" },
    { id: "conversao", label: "Conversão" },
    { id: "churn", label: "Churn" },
    { id: "arpu", label: "ARPU" },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'category',
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ],
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
      theme: 'dark'
    },
    grid: {
      borderColor: '#2D3447',
      strokeDashArray: 4
    },
    legend: {
      labels: {
        colors: '#fff'
      }
    }
  };

  const series = [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
  ];

  return (
    <div className=" px-6 h-max pt-10 bg-card-blue flex flex-col gap-5 w-[60%] rounded-2xl">
      <div className="flex justify-between">
        <h4 className="font-montserrat font-bold text-xl">Evolução dos KPI&apos;s</h4>
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
  )
}