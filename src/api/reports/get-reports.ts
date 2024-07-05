import api from "@/services/axios";

interface CostServiceProps {
  totalCost: number;
  ReproduceAt: string;
  NameContactList: string
}

export const getReportsList = async () => {
  const response = await api.get("/reports");
  return response.data as CostServiceProps[];
};
