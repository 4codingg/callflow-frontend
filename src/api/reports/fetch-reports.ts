import api from "@/services/axios";

interface IFetchReportsResponse {
  data: {
    reproducedAt: string,
    contactsListName: string
  }[]
}

export const fetchReports = async () => {
  const response = await api.get("/reports");
  return response.data as IFetchReportsResponse;
};
