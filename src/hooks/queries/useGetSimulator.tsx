import { getSimulator } from "@/src/services/simulator";
import { useQuery } from "@tanstack/react-query";

export const useGetSimulator = () => {
  return useQuery({
    queryKey: ["simulator"],
    queryFn: getSimulator
  });
};
