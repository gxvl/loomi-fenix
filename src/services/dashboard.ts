import type { AxiosResponse } from "axios";
import api from "./api";
import type { Dashboard } from "@/src/common/entities/dashboard";

/**
 * Função para obter os dados do dashboard.
 * A API retorna diretamente o objeto Dashboard dentro de response.data
 */
export const getDashboard = (): Promise<AxiosResponse<Dashboard>> => {
  return api.get("/nortus-v1/dashboard");
};
