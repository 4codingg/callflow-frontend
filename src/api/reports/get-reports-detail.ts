import api from "@/services/axios";

interface IGetReportsDetailResponse {
  data: {
    id: string;
    cost: {
      contacts: {
        length: number;
        costByMessage: number;
        totalCost: number;
      };
      bonus: {
        length: number;
        costByMessage: number;
        totalCost: number;
      };
      total: number;
    };
    reproducedAt: string;
    contactItems: {
      id: string;
      destination: string;
      message: string;
      status: "completed" | "pending" | "failed";
    }[];
  };
}


export const getReportsDetail = async (id: string) => {
  const response = await api.get(`/reports/${id}`);
  return response.data as IGetReportsDetailResponse;
};
