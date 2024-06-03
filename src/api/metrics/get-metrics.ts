import api from "@/services/axios";

interface CostServiceProps {
  totalCost: number;
  month: string;
}

export const getCostPerService = async (type: string) => {
  const response = await api.get("/metrics", {
    params: {
      type: type,
    },
  });
  return response.data as CostServiceProps[];
};
