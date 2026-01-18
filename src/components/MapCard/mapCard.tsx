"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MapView from "../MapView/mapView";


export const MapCard = () => {

  return (
    <div className="h-full px-6 py-10 bg-card-blue flex flex-col gap-5 w-full rounded-2xl">
      <div className="flex justify-between">
        <h4 className="font-montserrat font-bold text-xl">Mapa de clientes por região</h4>
        <div className="flex gap-2 items-center">
          <Select>
  <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
    <SelectValue placeholder="Theme" className="text-light-white" />
  </SelectTrigger>
  <SelectContent className="font-inter bg-default-blue ease-in text-white">
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
          <Select>
  <SelectTrigger className="w-45 bg-default-blue font-inter border-none rounded-full">
    <SelectValue placeholder="Theme" className="text-light-white" />
  </SelectTrigger>
  <SelectContent className="font-inter bg-default-blue ease-in text-white">
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
        </div>
      </div>
      <div className="w-full h-max rounded-4xl">
        <MapView />
      </div>
    </div>
  )
}