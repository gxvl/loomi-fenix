import { SimulatorResponse } from "@/src/common/entities/simulator";
import api from "./api";

export const getSimulator = async (): Promise<SimulatorResponse> => {
  const response = await api.get<SimulatorResponse>(
    "/nortus-v1/simulador-planos"
  );
  return response.data;
};
