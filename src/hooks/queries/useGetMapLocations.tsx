import { useQuery } from "@tanstack/react-query";
import { getMapLocations } from "@/src/services/map";

export const useGetMapLocations = () => {
  return useQuery({
    queryKey: ["mapLocations"],
    queryFn: getMapLocations
  });
};
