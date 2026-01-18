"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ConversionCard = () => {
  const [selectedKPI, setSelectedKPI] = useState("arpu");
  
  const kpis = [
    { id: "retencao", label: "Retenção" },
    { id: "conversao", label: "Conversão" },
    { id: "churn", label: "Churn" },
    { id: "arpu", label: "ARPU" },
  ];

  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      background: 'transparent',
      toolbar: {
        show: false
      },
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'], 
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px'
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
      theme: 'dark'
    },
    grid: {
      borderColor: '#2D3447',
      strokeDashArray: 4
    }
  };

  const series = [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30]
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
  )
}