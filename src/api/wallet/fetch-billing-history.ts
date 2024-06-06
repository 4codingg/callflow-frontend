import api from "@/services/axios";

export interface IFetchBillingHistoryResponse {
  planTransactions: { price: number; processedAt: string; status: string }[];
}

export async function fetchBillingHistory() {
  const response = await api.get(`/transactions/plan`);
  return response.data as IFetchBillingHistoryResponse;
}