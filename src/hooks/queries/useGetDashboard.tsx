import { Dashboard } from "@/src/common/entities/dashboard";
import { getDashboard } from "@/src/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboard = () => {
  return useQuery<Dashboard>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const response = await getDashboard();
        return response.data;
      } catch (error) {
        console.error("Erro no useGetDashboard:", error);
        throw error;
      }
    }
  });
};
