import { MapLocationsResponse } from "@/src/common/entities/map";
import api from "./api";

export const getMapLocations = async (): Promise<MapLocationsResponse> => {
  const response = await api.get<MapLocationsResponse>("/map/locations");
  return response.data;
};
