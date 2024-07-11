import { IPaymentHistory } from "@/@types/PaymentMethod";
import api from "@/services/axios";

interface IFetchHistoryTransactionsResponse {
  historyTransactions: IPaymentHistory[];
}

export async function fetchHistoryTransactions() {
  const response = await api.get(`/transactions`);
  return response.data as IFetchHistoryTransactionsResponse;
}
