import api from "@/services/axios";

interface IFetchReportsDetailResponse {
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
      status: string;
    }[];
  };
}


export const fetchReportsDetail = async (id: any) => {
  const response = await api.get(`/reports/${id}`);
  return response.data as IFetchReportsDetailResponse;
};
